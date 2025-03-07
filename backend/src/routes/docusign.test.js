const request = require('supertest');
const express = require('express');
const docusignRoutes = require('./docusign');
const { Document } = require('../models');

// Mock the Document model
jest.mock('../models', () => ({
  Document: {
    update: jest.fn().mockResolvedValue([1])
  }
}));

describe('DocuSign Webhook Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/docusign', docusignRoutes);
    
    // Reset mock implementations
    Document.update.mockClear();
  });

  describe('POST /webhook', () => {
    test('should update document status when valid webhook is received', async () => {
      const webhookPayload = {
        envelopeId: 'test-envelope-123',
        status: 'completed'
      };

      const response = await request(app)
        .post('/api/docusign/webhook')
        .send(webhookPayload);

      expect(response.status).toBe(200);
      expect(response.text).toBe('Webhook received');
      expect(Document.update).toHaveBeenCalledWith(
        { signatureStatus: 'completed' },
        { where: { envelopeId: 'test-envelope-123' } }
      );
    });

    test('should handle errors gracefully', async () => {
      // Setup Document.update to throw an error
      Document.update.mockRejectedValue(new Error('Database error'));

      const webhookPayload = {
        envelopeId: 'test-envelope-123',
        status: 'completed'
      };

      const response = await request(app)
        .post('/api/docusign/webhook')
        .send(webhookPayload);

      expect(response.status).toBe(500);
      expect(response.text).toBe('Internal Server Error');
    });

    test('should handle missing payload data', async () => {
      const webhookPayload = {
        // Missing envelopeId and status
      };

      const response = await request(app)
        .post('/api/docusign/webhook')
        .send(webhookPayload);

      expect(response.status).toBe(500); // This would ideally be a 400 in a more robust implementation
    });
  });
});
