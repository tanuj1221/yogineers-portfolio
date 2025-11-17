const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const newBlogController = require('../controllers/newBlogController');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `blog-${uniqueSuffix}${ext}`);
    }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only image files (JPEG, JPG, PNG, GIF, WebP) are allowed!'));
    }
};

// Multer upload configuration
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 20 * 1024 * 1024, // 20MB limit
        files: 20 // Maximum 20 files per request
    },
    fileFilter: fileFilter
});

// Multiple file upload configuration
const uploadFields = upload.fields([
    { name: 'featured_image', maxCount: 1 },
    { name: 'banner_image', maxCount: 1 },
    { name: 'content_images', maxCount: 15 } // Up to 15 content images
]);

// Error handler for multer
const handleMulterError = (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File size too large. Maximum size is 20MB per file.'
            });
        }
        if (error.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                success: false,
                message: 'Too many files. Maximum 20 files allowed.'
            });
        }
        if (error.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                success: false,
                message: 'Unexpected field name for file upload.'
            });
        }
    }
    
    if (error.message.includes('Only image files')) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
    
    next(error);
};

// Routes

// GET /api/v2/blogs - Get all blogs with pagination and filtering
router.get('/', newBlogController.getAllBlogs);

// GET /api/v2/blogs/search - Search blogs
router.get('/search', newBlogController.searchBlogs);

// GET /api/v2/blogs/featured - Get featured blogs
router.get('/featured', async (req, res) => {
    try {
        const newBlogModel = require('../models/newBlogModel');
        const blogs = await newBlogModel.getFeaturedBlogs(req.query.limit || 5);
        res.json({
            success: true,
            data: blogs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// GET /api/v2/blogs/popular - Get popular blogs
router.get('/popular', async (req, res) => {
    try {
        const newBlogModel = require('../models/newBlogModel');
        const blogs = await newBlogModel.getPopularBlogs(req.query.limit || 10);
        res.json({
            success: true,
            data: blogs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// GET /api/v2/blogs/categories - Get all categories
router.get('/categories', async (req, res) => {
    try {
        const newBlogModel = require('../models/newBlogModel');
        const categories = await newBlogModel.getCategories();
        res.json({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// GET /api/v2/blogs/category/:category - Get blogs by category
router.get('/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        
        const newBlogModel = require('../models/newBlogModel');
        const blogs = await newBlogModel.getBlogsByCategory(category, parseInt(limit), parseInt(offset));
        const totalCount = await newBlogModel.getBlogCount({ category, status: 'published' });
        
        res.json({
            success: true,
            data: blogs,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalCount / limit),
                totalBlogs: totalCount,
                hasNextPage: page * limit < totalCount,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// GET /api/v2/blogs/id/:id - Get single blog by ID
router.get('/id/:id', newBlogController.getBlogById);

// GET /api/v2/blogs/:slug - Get single blog by slug
router.get('/:slug', newBlogController.getBlogBySlug);

// POST /api/v2/blogs - Create new blog
router.post('/', uploadFields, handleMulterError, newBlogController.createBlog);

// PUT /api/v2/blogs/:id - Update blog
router.put('/:id', uploadFields, handleMulterError, newBlogController.updateBlog);

// DELETE /api/v2/blogs/:id - Delete blog
router.delete('/:id', newBlogController.deleteBlog);

// POST /api/v2/blogs/:id/like - Increment like count
router.post('/:id/like', newBlogController.incrementLike);

// POST /api/v2/blogs/upload-image - Upload single image (utility endpoint)
router.post('/upload-image', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No image file provided'
            });
        }

        res.json({
            success: true,
            message: 'Image uploaded successfully',
            data: {
                url: `/uploads/${req.file.filename}`,
                filename: req.file.filename,
                originalName: req.file.originalname,
                size: req.file.size
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Error handling middleware
router.use((error, req, res, next) => {
    console.error('Blog routes error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

module.exports = router;
