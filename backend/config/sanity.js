const { createClient } = require('@sanity/client');
require('dotenv').config();

const sanityClient = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    useCdn: false, // Use CDN for production, false for development
    apiVersion: '2024-01-01', // Use current date
    token: process.env.SANITY_API_TOKEN, // Required for write operations
});

module.exports = sanityClient;
