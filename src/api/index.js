const API_BASE_URL = '/api';

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('token');
    this.baseUrl = API_BASE_URL;
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  // Health check - directly fetch to detect backend status
  async healthCheck() {
    const startTime = Date.now();
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      const responseTime = Date.now() - startTime;
      
      return {
        success: true,
        backend: 'online',
        database: data.database === 'connected' ? 'online' : 'offline',
        responseTime,
        timestamp: data.timestamp,
      };
    } catch (error) {
      return {
        success: false,
        backend: 'offline',
        database: 'unknown',
        responseTime: Date.now() - startTime,
        error: error.message,
      };
    }
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  }

  // Auth APIs
  async login(username, password) {
    const url = `${API_BASE_URL}/login`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.status === 'success') {
      this.setToken(data.data.token);
    }
    return data;
  }

  async logout() {
    try {
      await this.request('/logout', {
        method: 'POST',
      });
    } catch (error) {
      // Ignore logout errors
    }
    this.setToken(null);
    return { status: 'success' };
  }

  // Division APIs
  async getDivisions(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/divisions?${queryString}` : '/divisions';
    return this.request(endpoint);
  }

  async createDivision(formData) {
    const headers = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    delete headers['Content-Type'];

    const response = await fetch(`${API_BASE_URL}/divisions`, {
      method: 'POST',
      headers,
      body: formData,
    });

    return response.json();
  }

  async updateDivision(id, formData) {
    const headers = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    delete headers['Content-Type'];

    const response = await fetch(`${API_BASE_URL}/divisions/${id}`, {
      method: 'PUT',
      headers,
      body: formData,
    });

    return response.json();
  }

  async deleteDivision(id) {
    return this.request(`/divisions/${id}`, {
      method: 'DELETE',
    });
  }

  // Employee APIs
  async getEmployees(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/employees?${queryString}` : '/employees';
    return this.request(endpoint);
  }

  async createEmployee(formData) {
    // For file upload, we need to use FormData
    const headers = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    delete headers['Content-Type']; // Let browser set boundary

    const response = await fetch(`${API_BASE_URL}/employees`, {
      method: 'POST',
      headers,
      body: formData,
    });

    return response.json();
  }

  async updateEmployee(id, formData) {
    const headers = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    // Let browser set Content-Type for multipart/form-data
    delete headers['Content-Type'];

    // Some servers (and PHP's handling of multipart with PUT) don't parse files
    // correctly for PUT requests. Use POST with method override so Laravel
    // correctly handles the multipart form data.
    if (formData instanceof FormData) {
      formData.append('_method', 'PUT');
    }

    const response = await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    return response.json();
  }

  async deleteEmployee(id) {
    return this.request(`/employees/${id}`, {
      method: 'DELETE',
    });
  }

  // User Profile APIs
  async getProfile() {
    return this.request('/profile');
  }

  async updateProfile(formData) {
    const headers = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    delete headers['Content-Type'];

    // Use POST with _method override for FormData PUT requests
    if (formData instanceof FormData) {
      formData.append('_method', 'PUT');
    }

    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'POST',
      headers,
      body: formData,
    });

    return response.json();
  }
}

export const api = new ApiClient();
export default api;
