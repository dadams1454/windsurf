import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';

// Layout Components
import Dashboard from './pages/Dashboard';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Feature Pages
import DogsList from './pages/dogs/DogsList';
import DogDetails from './pages/dogs/DogDetails';
import LittersList from './pages/litters/LittersList';
import LitterDetails from './pages/litters/LitterDetails';
import SalesList from './pages/sales/SalesList';
import SaleDetails from './pages/sales/SaleDetails';
import PedigreeAnalytics from './pages/pedigree/PedigreeAnalytics';
import WebsiteBuilder from './pages/website/WebsiteBuilder';
import FinancialDashboard from './pages/financial/FinancialDashboard';
import DocumentsList from './pages/documents/DocumentsList';
import DocumentDetails from './pages/documents/DocumentDetails';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock authentication - in a real app, this would check tokens/session
  const checkAuth = () => {
    return isAuthenticated;
  };

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!checkAuth()) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      
      {isAuthenticated && (
        <>
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        </>
      )}
      
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: isAuthenticated ? 8 : 0 }}>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
          <Route path="/register" element={<Register setAuth={setIsAuthenticated} />} />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          {/* Dogs Management */}
          <Route path="/dogs" element={
            <ProtectedRoute>
              <DogsList />
            </ProtectedRoute>
          } />
          <Route path="/dogs/:id" element={
            <ProtectedRoute>
              <DogDetails />
            </ProtectedRoute>
          } />
          
          {/* Litters Management */}
          <Route path="/litters" element={
            <ProtectedRoute>
              <LittersList />
            </ProtectedRoute>
          } />
          <Route path="/litters/:id" element={
            <ProtectedRoute>
              <LitterDetails />
            </ProtectedRoute>
          } />
          
          {/* Sales Management */}
          <Route path="/sales" element={
            <ProtectedRoute>
              <SalesList />
            </ProtectedRoute>
          } />
          <Route path="/sales/:id" element={
            <ProtectedRoute>
              <SaleDetails />
            </ProtectedRoute>
          } />
          
          {/* Financial Dashboard */}
          <Route path="/financial" element={
            <ProtectedRoute>
              <FinancialDashboard />
            </ProtectedRoute>
          } />
          
          {/* Documents Management */}
          <Route path="/documents" element={
            <ProtectedRoute>
              <DocumentsList />
            </ProtectedRoute>
          } />
          <Route path="/documents/:id" element={
            <ProtectedRoute>
              <DocumentDetails />
            </ProtectedRoute>
          } />
          
          {/* Website Builder */}
          <Route path="/website" element={
            <ProtectedRoute>
              <WebsiteBuilder />
            </ProtectedRoute>
          } />
          
          {/* Other Feature Pages */}
          <Route path="/pedigree" element={
            <ProtectedRoute>
              <PedigreeAnalytics />
            </ProtectedRoute>
          } />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
