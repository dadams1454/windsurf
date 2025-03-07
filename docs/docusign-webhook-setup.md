# DocuSign Webhook Configuration Guide

This guide provides step-by-step instructions for setting up webhooks in DocuSign Connect to enable real-time signature status updates in the Dog Breeder SaaS platform.

## Prerequisites

1. DocuSign Developer Account
2. Access to the DocuSign Admin Console
3. Your application deployed with a publicly accessible URL or ngrok for local testing

## Configuration Steps

### 1. Log in to DocuSign Admin Console

1. Navigate to [DocuSign Admin Console](https://admindemo.docusign.com/) (use production URL for production environments)
2. Sign in with your DocuSign developer account credentials

### 2. Access Connect Settings

1. Click on **Settings** in the top navigation bar
2. Select **Connect** from the dropdown menu

### 3. Create a New Connect Configuration

1. Click **Add Configuration**
2. Select **Custom** as the integration type

### 4. Configure Basic Settings

1. **Name**: Enter a descriptive name (e.g., "Dog Breeder SaaS Webhook")
2. **URL to Publish**: Enter your webhook endpoint URL
   - Production: `https://your-app-domain.com/api/docusign/webhook`
   - Development: Use ngrok URL (e.g., `https://abcd1234.ngrok.io/api/docusign/webhook`)
3. **Authentication**: Set to "None" for initial testing, then update to "Basic" for production
4. **Include Certificate With Data**: Select "Yes" (recommended for security)
5. **Data Format**: Select "JSON"
6. **Content Type**: Select "application/json"

### 5. Configure Trigger Events

1. Under **Envelope Events**, select:
   - Envelope Sent
   - Envelope Delivered
   - Envelope Completed
   - Envelope Declined
   - Envelope Voided
2. Under **Recipient Events**, select:
   - Recipient Sent
   - Recipient Delivered
   - Recipient Completed
   - Recipient Declined

### 6. Configure Additional Options

1. **Require Acknowledgement**: Select "Yes" (this ensures DocuSign retries if your endpoint doesn't respond)
2. **Include Documents**: Select "No" (unless you need the signed documents)
3. **Include Certificate of Completion**: Select "No" (unless specifically needed)
4. **Include SOAP Documents**: Select "No"
5. **Include Document Fields**: Select "No" (unless you need form field data)

### 7. Add Required Custom Headers (for Verification)

1. Click on **Custom Headers**
2. Add a header:
   - Name: `X-DocuSign-Signature-1`
   - Value: Leave empty (DocuSign will fill this)

### 8. Test Configuration

1. Click **Test Configuration** button
2. DocuSign will send a test notification to your webhook endpoint
3. Check your application logs to verify receipt

### 9. Save Configuration

1. Once testing is successful, click **Save**
2. The configuration is now active

## Webhook Security Implementation

For production environments, implement the following security measures in your webhook endpoint:

1. Use HTTPS for your webhook endpoint
2. Verify the HMAC signature sent in X-DocuSign-Signature-1 header
3. Implement rate limiting
4. Add IP filtering to only accept requests from DocuSign IP ranges

## Troubleshooting

### Common Issues

1. **Webhook not receiving events**:
   - Check that your URL is publicly accessible
   - Verify firewall settings
   - Check DocuSign Connect logs for failed deliveries

2. **Webhook returns errors**:
   - Check your server logs
   - Ensure your endpoint handles JSON payloads properly
   - Verify route permissions in your application

3. **Events are duplicated**:
   - Implement idempotency in your webhook handler
   - Use envelope IDs as unique identifiers

For additional help, refer to the [DocuSign Connect Documentation](https://developers.docusign.com/platform/webhooks/).
