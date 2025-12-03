const express = require('express');
const router = express.Router();
const sanityClient = require('../config/sanity');

/**
 * GET /api/content/tours
 * Fetch all tours from Sanity
 */
router.get('/tours', async (req, res) => {
    try {
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
                "url": asset->url,
                alt
            }
        }`;
        const tours = await sanityClient.fetch(query);

        res.status(200).json({
            success: true,
            count: tours.length,
            data: tours,
        });
    } catch (error) {
        console.error('Fetch tours error:', error);
        res.status(500).json({
            error: 'Failed to fetch tours',
            message: error.message,
        });
    }
});

/**
 * GET /api/content/tours/:id
 * Fetch single tour by ID
 */
router.get('/tours/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = `*[_type == "tour" && _id == $id][0] {
            ...,
            "images": images[]{
                "url": asset->url,
                alt
            },
            "destination": destination->{
                _id,
                name,
                slug
            }
        }`;
        const tour = await sanityClient.fetch(query, { id });

        if (!tour) {
            return res.status(404).json({
                error: 'Tour not found',
            });
        }

        res.status(200).json({
            success: true,
            data: tour,
        });
    } catch (error) {
        console.error('Fetch tour error:', error);
        res.status(500).json({
            error: 'Failed to fetch tour',
            message: error.message,
        });
    }
});

/**
 * GET /api/content/destinations
 * Fetch all destinations from Sanity
 */
router.get('/destinations', async (req, res) => {
    try {
        const query = `*[_type == "destination"] | order(name asc) {
            _id,
            name,
            slug,
            tourCount,
            "cardImage": cardImage{
                "url": asset->url,
                alt
            },
            "heroImage": heroImage{
                "url": asset->url,
                alt
            }
        }`;
        const destinations = await sanityClient.fetch(query);

        res.status(200).json({
            success: true,
            count: destinations.length,
            data: destinations,
        });
    } catch (error) {
        console.error('Fetch destinations error:', error);
        res.status(500).json({
            error: 'Failed to fetch destinations',
            message: error.message,
        });
    }
});

/**
 * GET /api/content/destinations/:id
 * Fetch single destination by ID
 */
router.get('/destinations/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = `*[_type == "destination" && _id == $id][0]{
      ...,
      "tours": *[_type == "tour" && references(^._id)]
    }`;
        const destination = await sanityClient.fetch(query, { id });

        if (!destination) {
            return res.status(404).json({
                error: 'Destination not found',
            });
        }

        res.status(200).json({
            success: true,
            data: destination,
        });
    } catch (error) {
        console.error('Fetch destination error:', error);
        res.status(500).json({
            error: 'Failed to fetch destination',
            message: error.message,
        });
    }
});

/**
 * GET /api/content/blog
 * Fetch all blog posts from Sanity
 */
router.get('/blog', async (req, res) => {
    try {
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
                "url": asset->url,
                alt
            }
        }`;
        const posts = await sanityClient.fetch(query);

        res.status(200).json({
            success: true,
            count: posts.length,
            data: posts,
        });
    } catch (error) {
        console.error('Fetch blog posts error:', error);
        res.status(500).json({
            error: 'Failed to fetch blog posts',
            message: error.message,
        });
    }
});

/**
 * GET /api/content/blog/:id
 * Fetch single blog post by ID
 */
router.get('/blog/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = `*[_type == "blogPost" && _id == $id][0] {
            ...,
            "featuredImage": featuredImage{
                "url": asset->url,
                alt
            }
        }`;
        const post = await sanityClient.fetch(query, { id });

        if (!post) {
            return res.status(404).json({
                error: 'Blog post not found',
            });
        }

        res.status(200).json({
            success: true,
            data: post,
        });
    } catch (error) {
        console.error('Fetch blog post error:', error);
        res.status(500).json({
            error: 'Failed to fetch blog post',
            message: error.message,
        });
    }
});

/**
 * GET /api/content/services
 * Fetch all services from Sanity
 */
router.get('/services', async (req, res) => {
    try {
        const query = `*[_type == "service"] | order(order asc) {
            _id,
            title,
            slug,
            description,
            order,
            "icon": icon{
                "url": asset->url,
                alt
            }
        }`;
        const services = await sanityClient.fetch(query);

        res.status(200).json({
            success: true,
            count: services.length,
            data: services,
        });
    } catch (error) {
        console.error('Fetch services error:', error);
        res.status(500).json({
            error: 'Failed to fetch services',
            message: error.message,
        });
    }
});

/**
 * GET /api/content/packages
 * Fetch all packages from Sanity
 */
router.get('/packages', async (req, res) => {
    try {
        const query = `*[_type == "package"] | order(_createdAt desc) {
            _id,
            title,
            slug,
            description,
            price,
            duration,
            "image": image{
                "url": asset->url,
                alt
            },
            category
        }`;
        const packages = await sanityClient.fetch(query);

        res.status(200).json({
            success: true,
            count: packages.length,
            data: packages,
        });
    } catch (error) {
        console.error('Fetch packages error:', error);
        res.status(500).json({
            error: 'Failed to fetch packages',
            message: error.message,
        });
    }
});

/**
 * GET /api/content/packages/category/:category
 * Fetch packages by category
 */
router.get('/packages/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const query = `*[_type == "package" && category == $category] | order(_createdAt desc) {
            _id,
            title,
            slug,
            description,
            price,
            duration,
            "image": image{
                "url": asset->url,
                alt
            },
            category
        }`;
        const packages = await sanityClient.fetch(query, { category });

        res.status(200).json({
            success: true,
            count: packages.length,
            data: packages,
        });
    } catch (error) {
        console.error('Fetch packages by category error:', error);
        res.status(500).json({
            error: 'Failed to fetch packages by category',
            message: error.message,
        });
    }
});

/**
 * GET /api/content/accommodations
 * Fetch all accommodations from Sanity
 */
router.get('/accommodations', async (req, res) => {
    try {
        const query = `*[_type == "accommodation"] | order(name asc) {
            _id,
            name,
            type,
            location,
            priceRange,
            rating,
            "image": image{
                "url": asset->url,
                alt
            },
            description
        }`;
        const accommodations = await sanityClient.fetch(query);

        res.status(200).json({
            success: true,
            count: accommodations.length,
            data: accommodations,
        });
    } catch (error) {
        console.error('Fetch accommodations error:', error);
        res.status(500).json({
            error: 'Failed to fetch accommodations',
            message: error.message,
        });
    }
});

/**
 * GET /api/content/accommodations/type/:type
 * Fetch accommodations by type
 */
router.get('/accommodations/type/:type', async (req, res) => {
    try {
        const { type } = req.params;
        const query = `*[_type == "accommodation" && type == $type] | order(name asc) {
            _id,
            name,
            type,
            location,
            priceRange,
            rating,
            "image": image{
                "url": asset->url,
                alt
            },
            description
        }`;
        const accommodations = await sanityClient.fetch(query, { type });

        res.status(200).json({
            success: true,
            count: accommodations.length,
            data: accommodations,
        });
    } catch (error) {
        console.error('Fetch accommodations by type error:', error);
        res.status(500).json({
            error: 'Failed to fetch accommodations by type',
            message: error.message,
        });
    }
});

/**
 * GET /api/content/hot-deals
 * Fetch all hot deals from Sanity
 */
router.get('/hot-deals', async (req, res) => {
    try {
        const query = `*[_type == "hotDeal" && isActive == true] | order(_createdAt desc) {
            _id,
            title,
            description,
            price,
            originalPrice,
            tag,
            "image": image{
                "url": asset->url,
                alt
            }
        }`;
        const hotDeals = await sanityClient.fetch(query);

        res.status(200).json({
            success: true,
            count: hotDeals.length,
            data: hotDeals,
        });
    } catch (error) {
        console.error('Fetch hot deals error:', error);
        res.status(500).json({
            error: 'Failed to fetch hot deals',
            message: error.message,
        });
    }
});

/**
 * GET /api/content/popup-offer
 * Fetch active popup offer from Sanity
 */
router.get('/popup-offer', async (req, res) => {
    try {
        // Get the most recently created active popup offer
        const query = `*[_type == "popupOffer" && isActive == true] | order(_createdAt desc)[0] {
            _id,
            title,
            description,
            ctaText,
            ctaLink,
            startDate,
            endDate,
            "image": image{
                "url": asset->url,
                alt
            }
        }`;
        const popupOffer = await sanityClient.fetch(query);

        res.status(200).json({
            success: true,
            data: popupOffer || null,
        });
    } catch (error) {
        console.error('Fetch popup offer error:', error);
        res.status(500).json({
            error: 'Failed to fetch popup offer',
            message: error.message,
        });
    }
});

/**
 * GET /api/content/faq
 * Fetch all FAQs from Sanity
 */
router.get('/faq', async (req, res) => {
    try {
        const query = `*[_type == "faq"] | order(order asc) {
            _id,
            question,
            answer,
            category,
            order
        }`;
        const faqs = await sanityClient.fetch(query);

        res.status(200).json({
            success: true,
            count: faqs.length,
            data: faqs,
        });
    } catch (error) {
        console.error('Fetch FAQs error:', error);
        res.status(500).json({
            error: 'Failed to fetch FAQs',
            message: error.message,
        });
    }
});

/**
 * GET /api/content/testimonial
 * Fetch all testimonials from Sanity
 */
router.get('/testimonial', async (req, res) => {
    try {
        const query = `*[_type == "testimonial"] | order(_createdAt desc) {
            _id,
            name,
            role,
            content,
            rating,
            "image": image{
                "url": asset->url,
                alt
            }
        }`;
        const testimonials = await sanityClient.fetch(query);

        res.status(200).json({
            success: true,
            count: testimonials.length,
            data: testimonials,
        });
    } catch (error) {
        console.error('Fetch testimonials error:', error);
        res.status(500).json({
            error: 'Failed to fetch testimonials',
            message: error.message,
        });
    }
});

module.exports = router;
