import axios from 'axios';

const DOCUSIGN_BASE_URL = 'https://demo.docusign.net/restapi'; // Use demo environment for testing
const INTEGRATION_KEY = 'YOUR_INTEGRATION_KEY';
const SECRET_KEY = 'YOUR_SECRET_KEY';
const ACCOUNT_ID = 'YOUR_ACCOUNT_ID';

// Function to get access token
async function getAccessToken() {
  const response = await axios.post('https://account-d.docusign.com/oauth/token', {
    grant_type: 'password',
    client_id: INTEGRATION_KEY,
    client_secret: SECRET_KEY,
    username: 'YOUR_USERNAME',
    password: 'YOUR_PASSWORD',
    scope: 'signature'
  });
  return response.data.access_token;
}

// Function to send document for signature
async function sendDocumentForSignature(documentId, recipientEmail, recipientName) {
  const accessToken = await getAccessToken();
  const envelopeDefinition = {
    emailSubject: 'Please sign this document',
    documents: [
      {
        documentBase64: 'BASE64_ENCODED_DOCUMENT', // Replace with actual base64 encoded document
        name: 'Document Name',
        fileExtension: 'pdf',
        documentId: '1'
      }
    ],
    recipients: {
      signers: [
        {
          email: recipientEmail,
          name: recipientName,
          recipientId: '1',
          routingOrder: '1'
        }
      ]
    },
    status: 'sent'
  };

  const response = await axios.post(
    `${DOCUSIGN_BASE_URL}/v2.1/accounts/${ACCOUNT_ID}/envelopes`,
    envelopeDefinition,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data;
}

// Function to check the status of a document
async function getEnvelopeStatus(envelopeId) {
  const accessToken = await getAccessToken();
  const response = await axios.get(
    `${DOCUSIGN_BASE_URL}/v2.1/accounts/${ACCOUNT_ID}/envelopes/${envelopeId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  return response.data.status;
}

export default {
  sendDocumentForSignature,
  getEnvelopeStatus
};
