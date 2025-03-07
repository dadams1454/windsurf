const express = require('express');
const router = express.Router();
const { Document } = require('../models'); // Import your Document model

// Middleware to verify DocuSign signature (optional, for added security)
const verifyDocuSignSignature = (req, res, next) => {
  // Implement verification logic here
  next();
};

// Webhook endpoint to receive DocuSign notifications
router.post('/webhook', verifyDocuSignSignature, async (req, res) => {
  try {
    const { envelopeId, status } = req.body;

    // Log the event for debugging
    console.log(`Received DocuSign event for envelope: ${envelopeId} with status: ${status}`);

    // Update document status in the database based on envelopeId
    await Document.update({ signatureStatus: status }, { where: { envelopeId } });

    // Respond with a 200 status to acknowledge receipt
    res.status(200).send('Webhook received');
  } catch (error) {
    console.error('Error processing DocuSign webhook:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
