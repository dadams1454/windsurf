import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import LittersList from './LittersList';
import ApiService from '../../services/api.service';

// Mock API service
jest.mock('../../services/api.service');

describe('LittersList Component', () => {
  const mockLitters = [
    { 
      id: 1, 
      name: 'Litter A', 
      sire: 'Rex', 
      dam: 'Luna', 
      whelped: '2025-01-15', 
      puppyCount: 6, 
      status: 'Available'
    },
    { 
      id: 2, 
      name: 'Litter B', 
      sire: 'Max', 
      dam: 'Bella', 
      whelped: '2025-02-10', 
      puppyCount: 4, 
      status: 'Reserved'
    }
  ];

  beforeEach(() => {
    // Setup mock API responses
    ApiService.getLitters.mockResolvedValue({ data: mockLitters });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders litters list with loading state initially', () => {
    render(<LittersList />);
    // Check for loading indicator according to pattern used across components
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders litters table after loading', async () => {
    render(<LittersList />);
    
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('Litter A')).toBeInTheDocument();
    expect(screen.getByText('Litter B')).toBeInTheDocument();
    expect(screen.getByText('Rex')).toBeInTheDocument();
    expect(screen.getByText('Luna')).toBeInTheDocument();
  });

  test('implements search functionality', async () => {
    render(<LittersList />);
    
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
    
    // Find search input and type in it
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'Litter A' } });
    
    // Only Litter A should be visible, Litter B should be filtered out
    expect(screen.getByText('Litter A')).toBeInTheDocument();
    expect(screen.queryByText('Litter B')).not.toBeInTheDocument();
  });

  test('handles empty state when no litters match filter', async () => {
    render(<LittersList />);
    
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
    
    // Find search input and type something that won't match any litters
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'NoMatchingLitter' } });
    
    // Should show empty state message according to the pattern
    expect(screen.getByText(/no litters found/i)).toBeInTheDocument();
  });

  test('handles API error gracefully', async () => {
    // Setup API to throw an error
    ApiService.getLitters.mockRejectedValue(new Error('API error'));
    
    render(<LittersList />);
    
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
    
    // Should show error alert according to pattern used across components
    expect(screen.getByText(/error loading litters/i)).toBeInTheDocument();
  });
});
