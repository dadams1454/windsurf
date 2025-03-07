// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// API Endpoints
const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    ME: `${API_BASE_URL}/auth/me`,
    PROFILE: `${API_BASE_URL}/auth/profile`,
  },
  
  // Dogs
  DOGS: {
    LIST: `${API_BASE_URL}/dogs`,
    DETAILS: (id) => `${API_BASE_URL}/dogs/${id}`,
    CREATE: `${API_BASE_URL}/dogs`,
    UPDATE: (id) => `${API_BASE_URL}/dogs/${id}`,
    DELETE: (id) => `${API_BASE_URL}/dogs/${id}`,
    PEDIGREE: (id) => `${API_BASE_URL}/dogs/${id}/pedigree`,
    MEDICAL: (id) => `${API_BASE_URL}/dogs/${id}/medical`,
  },
  
  // Litters
  LITTERS: {
    LIST: `${API_BASE_URL}/litters`,
    DETAILS: (id) => `${API_BASE_URL}/litters/${id}`,
    CREATE: `${API_BASE_URL}/litters`,
    UPDATE: (id) => `${API_BASE_URL}/litters/${id}`,
    DELETE: (id) => `${API_BASE_URL}/litters/${id}`,
    PUPPIES: (id) => `${API_BASE_URL}/litters/${id}/puppies`,
    ADD_PUPPY: (id) => `${API_BASE_URL}/litters/${id}/puppies`,
  },
  
  // Sales
  SALES: {
    LIST: `${API_BASE_URL}/sales`,
    DETAILS: (id) => `${API_BASE_URL}/sales/${id}`,
    CREATE: `${API_BASE_URL}/sales`,
    UPDATE: (id) => `${API_BASE_URL}/sales/${id}`,
    DELETE: (id) => `${API_BASE_URL}/sales/${id}`,
    PAYMENTS: (id) => `${API_BASE_URL}/sales/${id}/payments`,
    ADD_PAYMENT: (id) => `${API_BASE_URL}/sales/${id}/payments`,
  },
  
  // Financial
  FINANCIAL: {
    SUMMARY: `${API_BASE_URL}/financial/summary`,
    REVENUE: `${API_BASE_URL}/financial/revenue`,
    EXPENSES: `${API_BASE_URL}/financial/expenses`,
    TRANSACTIONS: `${API_BASE_URL}/financial/transactions`,
    ADD_TRANSACTION: `${API_BASE_URL}/financial/transactions`,
    REPORTS: `${API_BASE_URL}/financial/reports`,
  },
  
  // Documents
  DOCUMENTS: {
    LIST: `${API_BASE_URL}/documents`,
    DETAILS: (id) => `${API_BASE_URL}/documents/${id}`,
    CREATE: `${API_BASE_URL}/documents`,
    UPDATE: (id) => `${API_BASE_URL}/documents/${id}`,
    DELETE: (id) => `${API_BASE_URL}/documents/${id}`,
    TEMPLATES: `${API_BASE_URL}/documents/templates`,
    GENERATE: (id) => `${API_BASE_URL}/documents/${id}/generate`,
    VERSIONS: (id) => `${API_BASE_URL}/documents/${id}/versions`,
  },
  
  // Website
  WEBSITE: {
    CONFIG: `${API_BASE_URL}/website`,
    UPDATE_CONFIG: `${API_BASE_URL}/website`,
    TEMPLATES: `${API_BASE_URL}/website/templates`,
    PAGES: `${API_BASE_URL}/website/pages`,
    PAGE_DETAILS: (id) => `${API_BASE_URL}/website/pages/${id}`,
    CREATE_PAGE: `${API_BASE_URL}/website/pages`,
    UPDATE_PAGE: (id) => `${API_BASE_URL}/website/pages/${id}`,
    DELETE_PAGE: (id) => `${API_BASE_URL}/website/pages/${id}`,
    PUBLISH: `${API_BASE_URL}/website/publish`,
  },
  
  // Dashboard
  DASHBOARD: {
    STATS: `${API_BASE_URL}/dashboard/stats`,
    ALERTS: `${API_BASE_URL}/dashboard/alerts`,
    TASKS: `${API_BASE_URL}/dashboard/tasks`,
    ACTIVITY: `${API_BASE_URL}/dashboard/activity`,
    INQUIRIES: `${API_BASE_URL}/dashboard/inquiries`,
  },
  
  // Contacts
  CONTACTS: {
    LIST: `${API_BASE_URL}/contacts`,
    DETAILS: (id) => `${API_BASE_URL}/contacts/${id}`,
    CREATE: `${API_BASE_URL}/contacts`,
    UPDATE: (id) => `${API_BASE_URL}/contacts/${id}`,
    DELETE: (id) => `${API_BASE_URL}/contacts/${id}`,
  },
  
  // Pedigree
  PEDIGREE: {
    ANALYTICS: `${API_BASE_URL}/pedigree/analytics`,
  },
};

export default API_ENDPOINTS;
