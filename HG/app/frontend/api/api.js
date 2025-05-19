import axios from "axios";

// filepath: [api.js](http://_vscodecontentref_/1)
const API_BASE_URL = "http://localhost:9000"; // Use your backend port here = 'http://localhost:3000'; // Adjust this to match your backend URL

// User APIs
export const userAPI = {
  getAllUsers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createUser: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/user/${userId}`,
        userData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Company APIs
export const companyAPI = {
  getAllCompanies: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/company`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createCompany: async (companyData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/company`, companyData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateCompany: async (companyId, companyData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/company/${companyId}`, companyData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteCompany: async (companyId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/company/${companyId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Country APIs
export const countryAPI = {
  getAllCountries: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/country`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createCountry: async (countryData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/country`, countryData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateCountry: async (countryId, countryData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/country/${countryId}`, countryData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteCountry: async (countryId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/country/${countryId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Invoice APIs
export const invoiceAPI = {
  getAllInvoices: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/invoices`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createInvoice: async (invoiceData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/invoices`, invoiceData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateInvoice: async (invoiceId, invoiceData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/invoices/${invoiceId}`, invoiceData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteInvoice: async (invoiceId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/invoices/${invoiceId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Customer APIs
export const customerAPI = {
  getAllCustomers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/customers`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createCustomer: async (customerData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/customers`, customerData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateCustomer: async (customerId, customerData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/customers/${customerId}`, customerData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteCustomer: async (customerId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/customers/${customerId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Configure Tax APIs
export const configureTaxAPI = {
  getAllConfigureTax: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/configure_tax`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createConfigureTax: async (taxData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/configure_tax`, taxData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateConfigureTax: async (taxId, taxData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/configure_tax/${taxId}`, taxData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteConfigureTax: async (taxId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/configure_tax/${taxId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Invoice Product APIs
export const invoiceProductAPI = {
  getAllInvoiceProducts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/invoice_product`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createInvoiceProduct: async (productData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/invoice_product`, productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateInvoiceProduct: async (productId, productData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/invoice_product/${productId}`, productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteInvoiceProduct: async (productId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/invoice_product/${productId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Category APIs
export const categoryAPI = {
  getAllCategories: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/category`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createCategory: async (categoryData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/category`, categoryData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateCategory: async (categoryId, categoryData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/category/${categoryId}`, categoryData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteCategory: async (categoryId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/category/${categoryId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
