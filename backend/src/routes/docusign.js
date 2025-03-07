const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { Document } = require('../models');
const { logger } = require('../utils/logger');

// Configuration for DocuSign webhook verification
const DOCUSIGN_HMAC_KEY = process.env.DOCUSIGN_HMAC_KEY || ''; // Get from environment variables
const DOCUSIGN_CONNECT_ALLOWLIST = (process.env.DOCUSIGN_IP_RANGES || '').split(',');

// Middleware to verify DocuSign signature
const verifyDocuSignSignature = (req, res, next) => {
  try {
    // Skip verification in development if key is not set
    if (!DOCUSIGN_HMAC_KEY && process.env.NODE_ENV === 'development') {
      logger.warn('DocuSign signature verification skipped: No HMAC key configured');
      return next();
    }

    // Get the signature from the header
    const signature = req.header('X-DocuSign-Signature-1');
    
    if (!signature) {
      logger.error('DocuSign webhook rejected: Missing signature header');
      return res.status(401).send('Unauthorized: Missing signature');
    }

    // IP allowlist check (if configured)
    if (DOCUSIGN_CONNECT_ALLOWLIST.length > 0 && !DOCUSIGN_CONNECT_ALLOWLIST.includes(req.ip)) {
      logger.error(`DocuSign webhook rejected: IP not in allowlist: ${req.ip}`);
      return res.status(403).send('Forbidden: IP not allowed');
    }

    // Create HMAC using your shared key and the request body
    const hmac = crypto.createHmac('sha256', DOCUSIGN_HMAC_KEY);
    const calculatedSignature = hmac.update(JSON.stringify(req.body)).digest('base64');
    
    // Compare signatures
    if (signature !== calculatedSignature) {
      logger.error('DocuSign webhook rejected: Invalid signature');
      return res.status(401).send('Unauthorized: Invalid signature');
    }
    
    logger.info('DocuSign webhook signature verified successfully');
    next();
  } catch (error) {
    logger.error('Error verifying DocuSign signature:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Webhook endpoint to receive DocuSign notifications
router.post('/webhook', verifyDocuSignSignature, async (req, res) => {
  try {
    const { envelopeId, status, event, recipientStatuses } = req.body;
    
    if (!envelopeId || !status) {
      logger.error('DocuSign webhook rejected: Missing required fields', { body: req.body });
      return res.status(400).send('Bad Request: Missing required fields');
    }

    // Log the event details
    logger.info('Received DocuSign webhook', { 
      envelopeId, 
      status, 
      event,
      recipients: recipientStatuses?.map(r => ({ 
        email: r.email, 
        status: r.status 
      }))
    });

    // Check if this envelope has already been processed with this status
    const document = await Document.findOne({ where: { envelopeId } });
    
    if (document && document.signatureStatus === status) {
      logger.info(`DocuSign webhook: Envelope ${envelopeId} already has status ${status}`);
      return res.status(200).send('Webhook received (duplicate)');
    }

    // Update document status in the database
    const [updatedRows] = await Document.update(
      { 
        signatureStatus: status,
        signatureUpdatedAt: new Date(),
        signatureData: JSON.stringify(req.body)
      }, 
      { 
        where: { envelopeId } 
      }
    );

    if (updatedRows === 0) {
      logger.warn(`DocuSign webhook: No document found with envelopeId ${envelopeId}`);
    } else {
      logger.info(`DocuSign webhook: Updated document status to ${status} for envelope ${envelopeId}`);
    }

    // Respond with a 200 status to acknowledge receipt
    res.status(200).send('Webhook received');
  } catch (error) {
    logger.error('Error processing DocuSign webhook:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to get envelope status
router.get('/envelope/:envelopeId', async (req, res) => {
  try {
    const { envelopeId } = req.params;
    
    const document = await Document.findOne({ 
      where: { envelopeId },
      attributes: ['id', 'title', 'signatureStatus', 'signatureUpdatedAt']
    });
    
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    
    res.status(200).json(document);
  } catch (error) {
    logger.error('Error retrieving envelope status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
