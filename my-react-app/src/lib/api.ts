import { client } from './sanity';

/**
 * API Client for Lindberg Safaris (Direct Sanity)
 */

// Tours API
export const toursAPI = {
    getAll: async () => {
        const query = `*[_type == "tour"] | order(_createdAt desc) {
            _id,
            title,
            slug,
            duration,
            groupSize,
            price,
            featured,
            rating,
            reviews,
            "images": images[]{
                url,
                alt
            }
        }`;
        const data = await client.fetch(query);
        return { data }; // Keeping { data } structure to minimize component changes
    },

    getById: async (id: string) => {
        const query = `*[_type == "tour" && _id == $id][0] {
            ...,
            "images": images[]{
                url,
                alt
            },
            "destination": destination->{
                _id,
                name,
                slug
            }
        }`;
        const data = await client.fetch(query, { id });
        return { data };
    },
};

// Destinations API
export const destinationsAPI = {
    getAll: async () => {
        const query = `*[_type == "destination"] | order(name asc) {
            _id,
            name,
            slug,
            tourCount,
            "cardImage": cardImage{
                url,
                alt
            },
            "heroImage": heroImage{
                url,
                alt
            }
        }`;
        const data = await client.fetch(query);
        return { data };
    },

    getById: async (id: string) => {
        const query = `*[_type == "destination" && _id == $id][0]{
            ...,
            "tours": *[_type == "tour" && references(^._id)]
        }`;
        const data = await client.fetch(query, { id });
        return { data };
    },
};

// Blog API
export const blogAPI = {
    getAll: async () => {
        const query = `*[_type == "blogPost"] | order(publishedAt desc) {
            _id,
            title,
            slug,
            excerpt,
            publishedAt,
            author,
            category,
            readTime,
            "featuredImage": featuredImage{
                url,
                alt
            }
        }`;
        const data = await client.fetch(query);
        return { data };
    },

    getById: async (id: string) => {
        const query = `*[_type == "blogPost" && _id == $id][0] {
            ...,
            "featuredImage": featuredImage{
                url,
                alt
            }
        }`;
        const data = await client.fetch(query, { id });
        return { data };
    },
};

// Services API
export const servicesAPI = {
    getAll: async () => {
        const query = `*[_type == "service"] | order(order asc) {
            _id,
            title,
            slug,
            description,
            order,
            icon,
            "image": image{
                url,
                alt
            }
        }`;
        const data = await client.fetch(query);
        return { data };
    },
};

// Packages API
export const packagesAPI = {
    getAll: async () => {
        const query = `*[_type == "package"] | order(_createdAt desc) {
            _id,
            title,
            slug,
            description,
            price,
            duration,
            "image": image{
                url,
                alt
            },
            category
        }`;
        const data = await client.fetch(query);
        return { data };
    },
    getByCategory: async (category: string) => {
        const query = `*[_type == "package" && category == $category] | order(_createdAt desc) {
            _id,
            title,
            slug,
            description,
            price,
            duration,
            "image": image{
                url,
                alt
            },
            category
        }`;
        const data = await client.fetch(query, { category });
        return { data };
    },
};

// Accommodations API
export const accommodationsAPI = {
    getAll: async () => {
        const query = `*[_type == "accommodation"] | order(name asc) {
            _id,
            name,
            type,
            location,
            pricePerNight,
            rating,
            "image": image{
                url,
                alt
            },
            description
        }`;
        const data = await client.fetch(query);
        return { data };
    },
    getByType: async (type: string) => {
        const query = `*[_type == "accommodation" && type == $type] | order(name asc) {
            _id,
            name,
            type,
            location,
            pricePerNight,
            rating,
            "image": image{
                url,
                alt
            },
            description
        }`;
        const data = await client.fetch(query, { type });
        return { data };
    },
    getById: async (id: string) => {
        const query = `*[_type == "accommodation" && _id == $id][0] {
            _id,
            name,
            type,
            location,
            pricePerNight,
            rating,
            "image": image{
                url,
                alt
            },
            description,
            amenities,
            "gallery": gallery[]{
                url,
                alt
            }
        }`;
        const data = await client.fetch(query, { id });
        return { data };
    },
};

// Hot Deals API
export const hotDealsAPI = {
    getAll: async () => {
        const query = `*[_type == "hotDeal" && isActive == true] | order(_createdAt desc) {
            _id,
            title,
            description,
            price,
            originalPrice,
            tag,
            "image": image{
                url,
                alt
            }
        }`;
        const data = await client.fetch(query);
        return { data };
    },
};

// Pop-up Offer API
export const popupAPI = {
    getActive: async () => {
        const query = `*[_type == "popupOffer" && isActive == true] | order(_createdAt desc)[0] {
            _id,
            title,
            description,
            ctaText,
            ctaLink,
            startDate,
            endDate,
            "image": image{
                url,
                alt
            }
        }`;
        const data = await client.fetch(query);
        return { data };
    },
};

// FAQ API
export const faqAPI = {
    getAll: async () => {
        const query = `*[_type == "faq"] | order(order asc) {
            _id,
            question,
            answer,
            category,
            order
        }`;
        const data = await client.fetch(query);
        return { data };
    },
};

// Testimonial API
export const testimonialAPI = {
    getAll: async () => {
        const query = `*[_type == "testimonial"] | order(_createdAt desc) {
            _id,
            name,
            location,
            text,
            rating,
            "image": {
                "url": coalesce(image.url, image)
            }
        }`;
        const data = await client.fetch(query);
        return { data };
    },
};

// Health check (Stub for compatibility)
export const healthCheck = async () => {
    return { success: true, message: 'Frontend-only mode' };
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
    healthCheck,
};

