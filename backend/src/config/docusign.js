/**
 * DocuSign API configuration
 * This file centralizes all DocuSign-related configuration variables
 */

module.exports = {
  // DocuSign API credentials
  integrationKey: process.env.DOCUSIGN_INTEGRATION_KEY,
  userId: process.env.DOCUSIGN_USER_ID,
  authServer: process.env.DOCUSIGN_AUTH_SERVER || 'https://account-d.docusign.com',
  
  // OAuth configuration
  oAuthBasePath: process.env.DOCUSIGN_OAUTH_BASE_PATH || 'account-d.docusign.com',
  scopes: (process.env.DOCUSIGN_SCOPES || 'signature').split(','),
  redirectUri: process.env.DOCUSIGN_REDIRECT_URI || 'http://localhost:3000/api/docusign/callback',
  
  // API endpoints
  basePath: process.env.DOCUSIGN_BASE_PATH || 'https://demo.docusign.net/restapi',
  apiVersion: process.env.DOCUSIGN_API_VERSION || 'v2.1',
  
  // Webhook configuration
  hmacKey: process.env.DOCUSIGN_HMAC_KEY,
  webhookUrl: process.env.DOCUSIGN_WEBHOOK_URL || 'http://localhost:3000/api/docusign/webhook',
  ipRanges: (process.env.DOCUSIGN_IP_RANGES || '').split(','),
  
  // Application configuration
  jwtExpiresIn: parseInt(process.env.DOCUSIGN_JWT_EXPIRES_IN || '3600', 10),
  privateKeyLocation: process.env.DOCUSIGN_PRIVATE_KEY_LOCATION,

  // Get envelope URL function
  getEnvelopeUrl: (envelopeId) => {
    const baseUrl = process.env.DOCUSIGN_BASE_PATH || 'https://demo.docusign.net/restapi';
    return `${baseUrl}/v2.1/accounts/${process.env.DOCUSIGN_ACCOUNT_ID}/envelopes/${envelopeId}`;
  },
  
  // Check if DocuSign is properly configured
  isConfigured: () => {
    return !!(
      process.env.DOCUSIGN_INTEGRATION_KEY &&
      process.env.DOCUSIGN_USER_ID &&
      process.env.DOCUSIGN_ACCOUNT_ID
    );
  },
  
  // Get envelope status URL function
  getEnvelopeStatusUrl: (envelopeId) => {
    const baseUrl = process.env.DOCUSIGN_BASE_PATH || 'https://demo.docusign.net/restapi';
    return `${baseUrl}/v2.1/accounts/${process.env.DOCUSIGN_ACCOUNT_ID}/envelopes/${envelopeId}`;
  }
};
