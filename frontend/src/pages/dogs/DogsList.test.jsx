import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import DogsList from './DogsList';
import ApiService from '../../services/api.service';

// Mock API service
jest.mock('../../services/api.service');

describe('DogsList Component', () => {
  const mockDogs = [
    { 
      id: 1, 
      name: 'Rex', 
      breed: 'German Shepherd', 
      age: 3, 
      gender: 'Male', 
      status: 'Available',
      imageUrl: 'https://example.com/rex.jpg' 
    },
    { 
      id: 2, 
      name: 'Luna', 
      breed: 'Labrador Retriever', 
      age: 2, 
      gender: 'Female', 
      status: 'Sold',
      imageUrl: 'https://example.com/luna.jpg' 
    }
  ];

  beforeEach(() => {
    // Setup mock API responses
    ApiService.getDogs.mockResolvedValue({ data: mockDogs });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders dogs list with loading state initially', () => {
    render(<DogsList />);
    // Check for loading indicator according to pattern used across components
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders dogs cards after loading', async () => {
    render(<DogsList />);
    
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('Rex')).toBeInTheDocument();
    expect(screen.getByText('Luna')).toBeInTheDocument();
    expect(screen.getByText('German Shepherd')).toBeInTheDocument();
    expect(screen.getByText('Labrador Retriever')).toBeInTheDocument();
  });

  test('implements search functionality', async () => {
    render(<DogsList />);
    
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
    
    // Find search input and type in it
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'Rex' } });
    
    // Only Rex should be visible, Luna should be filtered out
    expect(screen.getByText('Rex')).toBeInTheDocument();
    expect(screen.queryByText('Luna')).not.toBeInTheDocument();
  });

  test('handles empty state when no dogs match filter', async () => {
    render(<DogsList />);
    
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
    
    // Find search input and type something that won't match any dogs
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'NoMatchingDog' } });
    
    // Should show empty state message according to the pattern
    expect(screen.getByText(/no dogs found/i)).toBeInTheDocument();
  });

  test('handles API error gracefully', async () => {
    // Setup API to throw an error
    ApiService.getDogs.mockRejectedValue(new Error('API error'));
    
    render(<DogsList />);
    
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
    
    // Should show error alert according to pattern used across components
    expect(screen.getByText(/error loading dogs/i)).toBeInTheDocument();
  });
});
