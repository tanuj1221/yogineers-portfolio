const { generateSlug } = require('../utils/helpers');
const newBlogModel = require("../models/newBlogModel");
const fs = require('fs');
const path = require('path');

// Helper function to calculate reading time (average 200 words per minute)
const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
};

// Helper function to count words
const countWords = (content) => {
    return content.split(/\s+/).filter(word => word.length > 0).length;
};

// Helper function to delete uploaded files on error
const deleteUploadedFiles = (files) => {
    if (files) {
        Object.values(files).forEach(fileArray => {
            if (Array.isArray(fileArray)) {
                fileArray.forEach(file => {
                    if (fs.existsSync(file.path)) {
                        fs.unlinkSync(file.path);
                    }
                });
            } else if (fileArray && fs.existsSync(fileArray.path)) {
                fs.unlinkSync(fileArray.path);
            }
        });
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, status = 'published', featured } = req.query;
        const offset = (page - 1) * limit;
        
        const blogs = await newBlogModel.getAllBlogs({
            limit: parseInt(limit),
            offset: parseInt(offset),
            category,
            status,
            featured: featured === 'true' ? true : undefined
        });
        
        const totalCount = await newBlogModel.getBlogCount({ category, status, featured });
        
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
        console.error('Error fetching blogs:', error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

exports.getBlogBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const blog = await newBlogModel.getBlogBySlug(slug);
        
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        // Increment view count
        await newBlogModel.incrementViewCount(blog.id);
        blog.views_count += 1;

        res.json({
            success: true,
            data: blog
        });
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await newBlogModel.getBlogById(id);
        
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        // Increment view count
        await newBlogModel.incrementViewCount(blog.id);
        blog.views_count += 1;

        res.json({
            success: true,
            data: blog
        });
    } catch (error) {
        console.error('Error fetching blog by ID:', error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

exports.createBlog = async (req, res) => {
    try {
        const { 
            title, 
            subtitle, 
            content, 
            excerpt, 
            author_name, 
            category, 
            tags, 
            meta_title, 
            meta_description,
            status = 'published',
            is_featured = false 
        } = req.body;

        // Validate required fields
        if (!title || !content || !author_name) {
            if (req.files) deleteUploadedFiles(req.files);
            return res.status(400).json({
                success: false,
                message: 'Title, content, and author name are required'
            });
        }

        // Generate slug
        const slug = generateSlug(title);
        
        // Check if slug already exists
        const existingBlog = await newBlogModel.getBlogBySlug(slug);
        if (existingBlog) {
            if (req.files) deleteUploadedFiles(req.files);
            return res.status(400).json({
                success: false,
                message: 'A blog with this title already exists'
            });
        }

        // Calculate reading time and word count
        const reading_time = calculateReadingTime(content);
        const word_count = countWords(content);

        // Handle image uploads
        let featured_image = null;
        let banner_image = null;
        let images = [];

        if (req.files) {
            if (req.files.featured_image) {
                featured_image = `/uploads/${req.files.featured_image[0].filename}`;
            }
            if (req.files.banner_image) {
                banner_image = `/uploads/${req.files.banner_image[0].filename}`;
            }
            if (req.files.content_images) {
                images = req.files.content_images.map(file => ({
                    url: `/uploads/${file.filename}`,
                    alt: file.originalname,
                    caption: ''
                }));
            }
        }

        // Parse tags if it's a string
        let parsedTags = [];
        if (tags) {
            try {
                // If tags is already a valid JSON string, parse it
                if (typeof tags === 'string' && (tags.startsWith('[') || tags.startsWith('{'))) {
                    parsedTags = JSON.parse(tags);
                } else if (typeof tags === 'string') {
                    // If it's a comma-separated string, convert to array
                    parsedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
                } else {
                    // If it's already an array, use it as is
                    parsedTags = tags;
                }
            } catch (e) {
                console.warn('Error parsing tags, treating as comma-separated string:', e.message);
                parsedTags = tags.toString().split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
            }
        }

        const blogData = {
            title,
            subtitle,
            slug,
            content,
            excerpt,
            author_name,
            featured_image,
            banner_image,
            images: JSON.stringify(images),
            reading_time,
            word_count,
            status,
            category,
            tags: JSON.stringify(parsedTags),
            meta_title,
            meta_description,
            is_featured: is_featured === 'true' || is_featured === true
        };

        const newBlogId = await newBlogModel.createBlog(blogData);

        res.status(201).json({
            success: true,
            message: 'Blog created successfully',
            data: { 
                blogId: newBlogId,
                slug: slug
            }
        });
    } catch (error) {
        console.error('Error creating blog:', error);
        if (req.files) deleteUploadedFiles(req.files);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to create blog'
        });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            title, 
            subtitle, 
            content, 
            excerpt, 
            author_name, 
            category, 
            tags, 
            meta_title, 
            meta_description,
            status,
            is_featured 
        } = req.body;

        // Check if blog exists
        const existingBlog = await newBlogModel.getBlogById(id);
        if (!existingBlog) {
            if (req.files) deleteUploadedFiles(req.files);
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        let updateData = { ...req.body };

        // If title is being updated, generate new slug
        if (title && title !== existingBlog.title) {
            const newSlug = generateSlug(title);
            const slugExists = await newBlogModel.getBlogBySlug(newSlug);
            if (slugExists && slugExists.id !== parseInt(id)) {
                if (req.files) deleteUploadedFiles(req.files);
                return res.status(400).json({
                    success: false,
                    message: 'A blog with this title already exists'
                });
            }
            updateData.slug = newSlug;
        }

        // Recalculate reading time and word count if content changed
        if (content) {
            updateData.reading_time = calculateReadingTime(content);
            updateData.word_count = countWords(content);
        }

        // Handle new image uploads
        if (req.files) {
            if (req.files.featured_image) {
                // Delete old featured image
                if (existingBlog.featured_image) {
                    const oldImagePath = path.join(__dirname, '../../uploads', path.basename(existingBlog.featured_image));
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
                updateData.featured_image = `/uploads/${req.files.featured_image[0].filename}`;
            }
            
            if (req.files.banner_image) {
                // Delete old banner image
                if (existingBlog.banner_image) {
                    const oldImagePath = path.join(__dirname, '../../uploads', path.basename(existingBlog.banner_image));
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
                updateData.banner_image = `/uploads/${req.files.banner_image[0].filename}`;
            }
            
            if (req.files.content_images) {
                const newImages = req.files.content_images.map(file => ({
                    url: `/uploads/${file.filename}`,
                    alt: file.originalname,
                    caption: ''
                }));
                
                // Merge with existing images if any
                let existingImages = [];
                try {
                    existingImages = existingBlog.images ? JSON.parse(existingBlog.images) : [];
                } catch (e) {
                    existingImages = [];
                }
                
                updateData.images = JSON.stringify([...existingImages, ...newImages]);
            }
        }

        // Parse tags if provided
        if (tags) {
            try {
                // If tags is already a valid JSON string, parse and re-stringify
                if (typeof tags === 'string' && (tags.startsWith('[') || tags.startsWith('{'))) {
                    const parsedTags = JSON.parse(tags);
                    updateData.tags = JSON.stringify(parsedTags);
                } else if (typeof tags === 'string') {
                    // If it's a comma-separated string, convert to JSON array
                    const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
                    updateData.tags = JSON.stringify(tagArray);
                } else {
                    // If it's already an array or object, stringify it
                    updateData.tags = JSON.stringify(tags);
                }
            } catch (e) {
                console.warn('Error parsing tags, treating as comma-separated string:', e.message);
                const tagArray = tags.toString().split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
                updateData.tags = JSON.stringify(tagArray);
            }
        }

        // Handle boolean fields
        if (is_featured !== undefined) {
            updateData.is_featured = is_featured === 'true' || is_featured === true;
        }

        await newBlogModel.updateBlog(id, updateData);

        res.json({
            success: true,
            message: 'Blog updated successfully'
        });
    } catch (error) {
        console.error('Error updating blog:', error);
        if (req.files) deleteUploadedFiles(req.files);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to update blog'
        });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if blog exists
        const existingBlog = await newBlogModel.getBlogById(id);
        if (!existingBlog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        // Delete associated images
        const imagesToDelete = [];
        
        if (existingBlog.featured_image) {
            imagesToDelete.push(path.join(__dirname, '../../uploads', path.basename(existingBlog.featured_image)));
        }
        
        if (existingBlog.banner_image) {
            imagesToDelete.push(path.join(__dirname, '../../uploads', path.basename(existingBlog.banner_image)));
        }
        
        if (existingBlog.images) {
            try {
                const contentImages = JSON.parse(existingBlog.images);
                contentImages.forEach(img => {
                    imagesToDelete.push(path.join(__dirname, '../../uploads', path.basename(img.url)));
                });
            } catch (e) {
                console.warn('Could not parse images JSON:', e.message);
            }
        }

        // Delete the blog from database
        await newBlogModel.deleteBlog(id);

        // Delete image files
        imagesToDelete.forEach(imagePath => {
            if (fs.existsSync(imagePath)) {
                try {
                    fs.unlinkSync(imagePath);
                } catch (e) {
                    console.warn('Could not delete image:', imagePath, e.message);
                }
            }
        });

        res.json({
            success: true,
            message: 'Blog deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to delete blog'
        });
    }
};

exports.incrementLike = async (req, res) => {
    try {
        const { id } = req.params;
        
        const blog = await newBlogModel.getBlogById(id);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        await newBlogModel.incrementLikeCount(id);
        
        res.json({
            success: true,
            message: 'Blog liked successfully'
        });
    } catch (error) {
        console.error('Error liking blog:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.searchBlogs = async (req, res) => {
    try {
        const { q, page = 1, limit = 10 } = req.query;
        
        if (!q) {
            return res.status(400).json({
                success: false,
                message: 'Search query is required'
            });
        }

        const offset = (page - 1) * limit;
        const blogs = await newBlogModel.searchBlogs(q, parseInt(limit), parseInt(offset));
        const totalCount = await newBlogModel.getSearchCount(q);

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
        console.error('Error searching blogs:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
