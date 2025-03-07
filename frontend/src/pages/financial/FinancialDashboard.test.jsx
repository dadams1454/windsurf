import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import FinancialDashboard from './FinancialDashboard';
import ApiService from '../../services/api.service';

// Mock Chart.js
jest.mock('react-chartjs-2', () => ({
  Bar: () => <div data-testid="bar-chart">Bar Chart</div>,
  Pie: () => <div data-testid="pie-chart">Pie Chart</div>,
  Line: () => <div data-testid="line-chart">Line Chart</div>
}));

// Mock API service
jest.mock('../../services/api.service');

describe('FinancialDashboard Component', () => {
  const mockFinancialData = {
    summary: {
      totalRevenue: 5000,
      totalExpenses: 3000,
      netIncome: 2000
    },
    revenueBreakdown: [
      { category: 'Sales', amount: 4000 },
      { category: 'Services', amount: 1000 }
    ],
    expenses: [
      { category: 'Food', amount: 1000 },
      { category: 'Veterinary', amount: 1500 },
      { category: 'Supplies', amount: 500 }
    ],
    recentTransactions: [
      { id: 1, date: '2025-03-01', description: 'Puppy Sale', amount: 1200, type: 'income' },
      { id: 2, date: '2025-03-02', description: 'Vet Visit', amount: -300, type: 'expense' }
    ]
  };

  beforeEach(() => {
    // Setup mock API responses
    ApiService.getFinancialSummary.mockResolvedValue({ data: mockFinancialData.summary });
    ApiService.getRevenueBreakdown.mockResolvedValue({ data: mockFinancialData.revenueBreakdown });
    ApiService.getExpenses.mockResolvedValue({ data: mockFinancialData.expenses });
    ApiService.getRecentTransactions.mockResolvedValue({ data: mockFinancialData.recentTransactions });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders financial dashboard with loading state initially', () => {
    render(<FinancialDashboard />);
    // Check for loading indicator according to pattern used across components
    expect(screen.getAllByRole('progressbar').length).toBeGreaterThan(0);
  });

  test('renders financial summary after loading', async () => {
    render(<FinancialDashboard />);
    
    await waitFor(() => {
      // Summary data should be displayed
      expect(screen.getByText('$5,000.00')).toBeInTheDocument(); // Total Revenue
      expect(screen.getByText('$3,000.00')).toBeInTheDocument(); // Total Expenses
      expect(screen.getByText('$2,000.00')).toBeInTheDocument(); // Net Income
    });
  });

  test('renders charts after data loads', async () => {
    render(<FinancialDashboard />);
    
    await waitFor(() => {
      // Charts should be rendered
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
      expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    });
  });

  test('renders recent transactions list', async () => {
    render(<FinancialDashboard />);
    
    await waitFor(() => {
      expect(screen.getByText('Puppy Sale')).toBeInTheDocument();
      expect(screen.getByText('Vet Visit')).toBeInTheDocument();
    });
  });

  test('handles API error gracefully', async () => {
    // Setup API to throw an error
    ApiService.getFinancialSummary.mockRejectedValue(new Error('API error'));
    
    render(<FinancialDashboard />);
    
    await waitFor(() => {
      // Should show error alert according to pattern used across components
      expect(screen.getByText(/error loading financial data/i)).toBeInTheDocument();
    });
  });

  test('implements search functionality for transactions', async () => {
    // This would test the search functionality mentioned in the component pattern
    // Implement when search functionality details are available
  });
});
