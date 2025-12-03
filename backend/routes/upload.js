const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');
const sanityClient = require('../config/sanity');
const upload = require('../middleware/upload');
const fs = require('fs').promises;

/**
 * POST /api/upload
 * Upload image to Cloudinary and optionally save to Sanity
 */
router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'lindberg-safaris', // Organize images in a folder
            resource_type: 'auto',
        });

        // Delete temporary file
        await fs.unlink(req.file.path);

        // Prepare response data
        const imageData = {
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
        };

        // If document type is provided, save to Sanity
        if (req.body.documentType) {
            const sanityDoc = {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: result.public_id,
                },
                url: result.secure_url,
                metadata: {
                    width: result.width,
                    height: result.height,
                    format: result.format,
                },
            };

            // You can extend this to create specific document types
            // For now, just return the Cloudinary data
        }

        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            data: imageData,
        });
    } catch (error) {
        console.error('Upload error:', error);

        // Clean up file if it exists
        if (req.file) {
            try {
                await fs.unlink(req.file.path);
            } catch (unlinkError) {
                console.error('Error deleting file:', unlinkError);
            }
        }

        res.status(500).json({
            error: 'Failed to upload image',
            message: error.message,
        });
    }
});

/**
 * GET /api/upload/images
 * Fetch all images from Sanity (if stored there)
 */
router.get('/images', async (req, res) => {
    try {
        // Query Sanity for all image documents
        // This is a placeholder - adjust based on your schema
        const query = '*[_type == "image"]';
        const images = await sanityClient.fetch(query);

        res.status(200).json({
            success: true,
            count: images.length,
            data: images,
        });
    } catch (error) {
        console.error('Fetch images error:', error);
        res.status(500).json({
            error: 'Failed to fetch images',
            message: error.message,
        });
    }
});

/**
 * DELETE /api/upload/:publicId
 * Delete image from Cloudinary
 */
router.delete('/:publicId', async (req, res) => {
    try {
        const { publicId } = req.params;

        // Delete from Cloudinary
        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result === 'ok') {
            res.status(200).json({
                success: true,
                message: 'Image deleted successfully',
            });
        } else {
            res.status(404).json({
                error: 'Image not found',
            });
        }
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({
            error: 'Failed to delete image',
            message: error.message,
        });
    }
});

module.exports = router;
