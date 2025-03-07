import axios from 'axios';
import API_ENDPOINTS from '../config/api';

// Create axios instance with default config
const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('auth_token');
    // If token exists, add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle token expiration
    if (error.response && error.response.status === 401) {
      // Clear local storage
      localStorage.removeItem('auth_token');
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Service class
class ApiService {
  // Auth methods
  static login(credentials) {
    return apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  }

  static register(userData) {
    return apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  }

  static logout() {
    return apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  }

  static getCurrentUser() {
    return apiClient.get(API_ENDPOINTS.AUTH.ME);
  }

  static updateProfile(profileData) {
    return apiClient.put(API_ENDPOINTS.AUTH.PROFILE, profileData);
  }

  // Dogs methods
  static getDogs(params = {}) {
    return apiClient.get(API_ENDPOINTS.DOGS.LIST, { params });
  }

  static getDogById(id) {
    return apiClient.get(API_ENDPOINTS.DOGS.DETAILS(id));
  }

  static createDog(dogData) {
    return apiClient.post(API_ENDPOINTS.DOGS.CREATE, dogData);
  }

  static updateDog(id, dogData) {
    return apiClient.put(API_ENDPOINTS.DOGS.UPDATE(id), dogData);
  }

  static deleteDog(id) {
    return apiClient.delete(API_ENDPOINTS.DOGS.DELETE(id));
  }

  static getDogPedigree(id) {
    return apiClient.get(API_ENDPOINTS.DOGS.PEDIGREE(id));
  }

  static getDogMedical(id) {
    return apiClient.get(API_ENDPOINTS.DOGS.MEDICAL(id));
  }

  // Litters methods
  static getLitters(params = {}) {
    return apiClient.get(API_ENDPOINTS.LITTERS.LIST, { params });
  }

  static getLitterById(id) {
    return apiClient.get(API_ENDPOINTS.LITTERS.DETAILS(id));
  }

  static createLitter(litterData) {
    return apiClient.post(API_ENDPOINTS.LITTERS.CREATE, litterData);
  }

  static updateLitter(id, litterData) {
    return apiClient.put(API_ENDPOINTS.LITTERS.UPDATE(id), litterData);
  }

  static deleteLitter(id) {
    return apiClient.delete(API_ENDPOINTS.LITTERS.DELETE(id));
  }

  static getLitterPuppies(id) {
    return apiClient.get(API_ENDPOINTS.LITTERS.PUPPIES(id));
  }

  static addPuppy(litterId, puppyData) {
    return apiClient.post(API_ENDPOINTS.LITTERS.ADD_PUPPY(litterId), puppyData);
  }

  // Sales methods
  static getSales(params = {}) {
    return apiClient.get(API_ENDPOINTS.SALES.LIST, { params });
  }

  static getSaleById(id) {
    return apiClient.get(API_ENDPOINTS.SALES.DETAILS(id));
  }

  static createSale(saleData) {
    return apiClient.post(API_ENDPOINTS.SALES.CREATE, saleData);
  }

  static updateSale(id, saleData) {
    return apiClient.put(API_ENDPOINTS.SALES.UPDATE(id), saleData);
  }

  static deleteSale(id) {
    return apiClient.delete(API_ENDPOINTS.SALES.DELETE(id));
  }

  static getSalePayments(id) {
    return apiClient.get(API_ENDPOINTS.SALES.PAYMENTS(id));
  }

  static addPayment(saleId, paymentData) {
    return apiClient.post(API_ENDPOINTS.SALES.ADD_PAYMENT(saleId), paymentData);
  }

  // Financial methods
  static getFinancialSummary() {
    return apiClient.get(API_ENDPOINTS.FINANCIAL.SUMMARY);
  }

  static getRevenue(params = {}) {
    return apiClient.get(API_ENDPOINTS.FINANCIAL.REVENUE, { params });
  }

  static getExpenses(params = {}) {
    return apiClient.get(API_ENDPOINTS.FINANCIAL.EXPENSES, { params });
  }

  static getTransactions(params = {}) {
    return apiClient.get(API_ENDPOINTS.FINANCIAL.TRANSACTIONS, { params });
  }

  static addTransaction(transactionData) {
    return apiClient.post(API_ENDPOINTS.FINANCIAL.ADD_TRANSACTION, transactionData);
  }

  static getFinancialReports(params = {}) {
    return apiClient.get(API_ENDPOINTS.FINANCIAL.REPORTS, { params });
  }

  // Documents methods
  static getDocuments(params = {}) {
    return apiClient.get(API_ENDPOINTS.DOCUMENTS.LIST, { params });
  }

  static getDocumentById(id) {
    return apiClient.get(API_ENDPOINTS.DOCUMENTS.DETAILS(id));
  }

  static createDocument(documentData) {
    return apiClient.post(API_ENDPOINTS.DOCUMENTS.CREATE, documentData);
  }

  static updateDocument(id, documentData) {
    return apiClient.put(API_ENDPOINTS.DOCUMENTS.UPDATE(id), documentData);
  }

  static deleteDocument(id) {
    return apiClient.delete(API_ENDPOINTS.DOCUMENTS.DELETE(id));
  }

  static getDocumentTemplates() {
    return apiClient.get(API_ENDPOINTS.DOCUMENTS.TEMPLATES);
  }

  static generateDocument(id, templateData) {
    return apiClient.post(API_ENDPOINTS.DOCUMENTS.GENERATE(id), templateData);
  }

  static getDocumentVersions(id) {
    return apiClient.get(API_ENDPOINTS.DOCUMENTS.VERSIONS(id));
  }

  // Website methods
  static getWebsiteConfig() {
    return apiClient.get(API_ENDPOINTS.WEBSITE.CONFIG);
  }

  static updateWebsiteConfig(configData) {
    return apiClient.put(API_ENDPOINTS.WEBSITE.UPDATE_CONFIG, configData);
  }

  static getWebsiteTemplates() {
    return apiClient.get(API_ENDPOINTS.WEBSITE.TEMPLATES);
  }

  static getWebsitePages() {
    return apiClient.get(API_ENDPOINTS.WEBSITE.PAGES);
  }

  static getWebsitePageDetails(id) {
    return apiClient.get(API_ENDPOINTS.WEBSITE.PAGE_DETAILS(id));
  }

  static createWebsitePage(pageData) {
    return apiClient.post(API_ENDPOINTS.WEBSITE.CREATE_PAGE, pageData);
  }

  static updateWebsitePage(id, pageData) {
    return apiClient.put(API_ENDPOINTS.WEBSITE.UPDATE_PAGE(id), pageData);
  }

  static deleteWebsitePage(id) {
    return apiClient.delete(API_ENDPOINTS.WEBSITE.DELETE_PAGE(id));
  }

  static publishWebsite() {
    return apiClient.post(API_ENDPOINTS.WEBSITE.PUBLISH);
  }

  // Dashboard methods
  static getDashboardStats() {
    return apiClient.get(API_ENDPOINTS.DASHBOARD.STATS);
  }

  static getDashboardAlerts() {
    return apiClient.get(API_ENDPOINTS.DASHBOARD.ALERTS);
  }

  static getDashboardTasks() {
    return apiClient.get(API_ENDPOINTS.DASHBOARD.TASKS);
  }

  static getDashboardActivity() {
    return apiClient.get(API_ENDPOINTS.DASHBOARD.ACTIVITY);
  }

  static getDashboardInquiries() {
    return apiClient.get(API_ENDPOINTS.DASHBOARD.INQUIRIES);
  }

  // Contacts methods
  static getContacts(params = {}) {
    return apiClient.get(API_ENDPOINTS.CONTACTS.LIST, { params });
  }

  static getContactById(id) {
    return apiClient.get(API_ENDPOINTS.CONTACTS.DETAILS(id));
  }

  static createContact(contactData) {
    return apiClient.post(API_ENDPOINTS.CONTACTS.CREATE, contactData);
  }

  static updateContact(id, contactData) {
    return apiClient.put(API_ENDPOINTS.CONTACTS.UPDATE(id), contactData);
  }

  static deleteContact(id) {
    return apiClient.delete(API_ENDPOINTS.CONTACTS.DELETE(id));
  }

  // Pedigree methods
  static getPedigreeAnalytics(params = {}) {
    return apiClient.get(API_ENDPOINTS.PEDIGREE.ANALYTICS, { params });
  }
}

export default ApiService;
