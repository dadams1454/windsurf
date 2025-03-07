import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import DocumentsList from './DocumentsList';
import ApiService from '../../services/api.service';
import DocuSignService from '../../services/docusign.service';

// Mock API services
jest.mock('../../services/api.service');
jest.mock('../../services/docusign.service');

describe('DocumentsList Component', () => {
  const mockDocuments = [
    { 
      id: 1, 
      title: 'Sales Contract', 
      type: 'contract', 
      format: 'pdf', 
      dateCreated: '2025-02-10', 
      dateModified: '2025-02-15', 
      tags: ['sales', 'contract'], 
      signatureStatus: 'sent' 
    },
    { 
      id: 2, 
      title: 'Health Certificate', 
      type: 'certificate', 
      format: 'docx', 
      dateCreated: '2025-02-20', 
      dateModified: '2025-02-20', 
      tags: ['health', 'certificate'],
      signatureStatus: null 
    }
  ];

  beforeEach(() => {
    // Mock the window.prompt for the "Send for Signature" functionality
    global.prompt = jest.fn()
      .mockImplementationOnce(() => 'test@example.com') // First call returns email
      .mockImplementationOnce(() => 'Test User');       // Second call returns name
      
    // Setup mock API responses
    ApiService.getDocuments.mockResolvedValue({ data: mockDocuments });
    DocuSignService.getEnvelopeStatus.mockImplementation((id) => {
      return Promise.resolve(mockDocuments.find(doc => doc.id === id)?.signatureStatus || null);
    });
    DocuSignService.sendDocumentForSignature.mockResolvedValue({ success: true });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders documents list with loading state initially', () => {
    render(<DocumentsList />);
    expect(screen.getByText(/documents/i)).toBeInTheDocument();
  });

  test('renders documents after loading', async () => {
    render(<DocumentsList />);
    
    await waitFor(() => {
      expect(screen.getByText('Sales Contract')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Health Certificate')).toBeInTheDocument();
    expect(screen.getByText('sent')).toBeInTheDocument(); // signature status
  });

  test('allows sending document for signature', async () => {
    render(<DocumentsList />);
    
    await waitFor(() => {
      expect(screen.getByText('Sales Contract')).toBeInTheDocument();
    });
    
    // Find all "Send for Signature" buttons
    const signatureButtons = screen.getAllByText('Send for Signature');
    fireEvent.click(signatureButtons[1]); // Click the second document's button
    
    expect(global.prompt).toHaveBeenCalledTimes(2);
    expect(DocuSignService.sendDocumentForSignature).toHaveBeenCalledWith(2, 'test@example.com', 'Test User');
    
    await waitFor(() => {
      expect(screen.getByText('Document sent for signature!')).toBeInTheDocument();
    });
  });

  test('handles API error gracefully', async () => {
    // Setup API to throw an error
    ApiService.getDocuments.mockRejectedValue(new Error('API error'));
    
    render(<DocumentsList />);
    
    await waitFor(() => {
      expect(screen.getByText('No documents found')).toBeInTheDocument();
    });
  });

  test('handles DocuSign API error gracefully', async () => {
    render(<DocumentsList />);
    
    await waitFor(() => {
      expect(screen.getByText('Sales Contract')).toBeInTheDocument();
    });
    
    // Setup DocuSign API to throw an error
    DocuSignService.sendDocumentForSignature.mockRejectedValue(new Error('DocuSign API error'));
    
    // Find all "Send for Signature" buttons
    const signatureButtons = screen.getAllByText('Send for Signature');
    fireEvent.click(signatureButtons[0]); // Click the first document's button
    
    await waitFor(() => {
      expect(screen.getByText('Failed to send document for signature.')).toBeInTheDocument();
    });
  });
});
