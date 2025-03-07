import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard';
import ApiService from '../../services/api.service';

// Mock API service
jest.mock('../../services/api.service');

describe('Dashboard Component', () => {
  beforeEach(() => {
    // Setup mock API responses
    ApiService.getDashboardStats.mockResolvedValue({
      data: {
        dogCount: 10,
        litterCount: 5,
        upcomingAppointments: 3,
        pendingInquiries: 2
      }
    });
    
    ApiService.getRecentActivity.mockResolvedValue({
      data: [
        { id: 1, type: 'dog_added', description: 'New dog added', date: new Date().toISOString() },
        { id: 2, type: 'litter_born', description: 'New litter born', date: new Date().toISOString() }
      ]
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders dashboard with loading state initially', () => {
    render(<Dashboard />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders dashboard statistics after loading', async () => {
    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    
    expect(screen.getByText(/10/)).toBeInTheDocument(); // Dog count
    expect(screen.getByText(/5/)).toBeInTheDocument(); // Litter count
    expect(screen.getByText(/3/)).toBeInTheDocument(); // Upcoming appointments
    expect(screen.getByText(/2/)).toBeInTheDocument(); // Pending inquiries
  });

  test('renders recent activity after loading', async () => {
    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    
    expect(screen.getByText(/New dog added/)).toBeInTheDocument();
    expect(screen.getByText(/New litter born/)).toBeInTheDocument();
  });

  test('handles API error gracefully', async () => {
    // Setup API to throw an error
    ApiService.getDashboardStats.mockRejectedValue(new Error('API error'));
    
    render(<Dashboard />);
    
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
