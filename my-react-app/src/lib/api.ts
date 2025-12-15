const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * API Client for Lindberg Safaris Backend
 */

// Generic fetch wrapper with error handling
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'API request failed');
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Tours API
export const toursAPI = {
    getAll: async () => {
        return fetchAPI('/content/tours');
    },

    getById: async (id: string) => {
        return fetchAPI(`/content/tours/${id}`);
    },
};

// Destinations API
export const destinationsAPI = {
    getAll: async () => {
        return fetchAPI('/content/destinations');
    },

    getById: async (id: string) => {
        return fetchAPI(`/content/destinations/${id}`);
    },
};

// Blog API
export const blogAPI = {
    getAll: async () => {
        return fetchAPI('/content/blog');
    },

    getById: async (id: string) => {
        return fetchAPI(`/content/blog/${id}`);
    },
};

// Services API
export const servicesAPI = {
    getAll: async () => {
        return fetchAPI('/content/services');
    },
};

// Packages API
export const packagesAPI = {
    getAll: async () => {
        return fetchAPI('/content/packages');
    },
    getByCategory: async (category: string) => {
        return fetchAPI(`/content/packages/category/${category}`);
    },
};

// Accommodations API
export const accommodationsAPI = {
    getAll: async () => {
        return fetchAPI('/content/accommodations');
    },
    getByType: async (type: string) => {
        return fetchAPI(`/content/accommodations/type/${type}`);
    },
    getById: async (id: string) => {
        return fetchAPI(`/content/accommodations/${id}`);
    },
};

// Hot Deals API
export const hotDealsAPI = {
    getAll: async () => {
        return fetchAPI('/content/hot-deals');
    },
};

// Pop-up Offer API
export const popupAPI = {
    getActive: async () => {
        return fetchAPI('/content/popup-offer');
    },
};

// FAQ API
export const faqAPI = {
    getAll: async () => {
        return fetchAPI('/content/faq');
    },
};

// Testimonial API
export const testimonialAPI = {
    getAll: async () => {
        return fetchAPI('/content/testimonial');
    },
};

// Upload API
export const uploadAPI = {
    uploadImage: async (file: File, documentType?: string) => {
        const formData = new FormData();
        formData.append('image', file);
        if (documentType) {
            formData.append('documentType', documentType);
        }

        const response = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Upload failed');
        }

        return await response.json();
    },

    getImages: async () => {
        return fetchAPI('/upload/images');
    },

    deleteImage: async (publicId: string) => {
        return fetchAPI(`/upload/${publicId}`, {
            method: 'DELETE',
        });
    },
};

// Health check
export const healthCheck = async () => {
    return fetchAPI('/health');
};

export default {
    tours: toursAPI,
    destinations: destinationsAPI,
    blog: blogAPI,
    services: servicesAPI,
    packages: packagesAPI,
    accommodations: accommodationsAPI,
    hotDeals: hotDealsAPI,
    popup: popupAPI,
    faq: faqAPI,
    testimonial: testimonialAPI,
    upload: uploadAPI,
    healthCheck,
};
