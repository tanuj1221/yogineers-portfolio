const { generateSlug } = require('../utils/helpers')
const blogsModel = require("../models/blogsModel");
const config = require('../config/pathConfig')

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogsModel.getAllPosts(); // Add await here
        res.json(blogs); 
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ error: error.message });
    }
};


exports.createBlog = async (req, res) => {
    try {
        const { title, content,featured_image} = req.body;
        const author_id = 1; // From authentication middleware
        
        // Generate slug
        const slug = generateSlug(title);
        
        // let featured_image = imageUrl;
    
        // featured_image = req.file ? `/uploads/${req.file.filename}` : null;
    
    
        // Create blog using model
        const newPostId = await blogsModel.createBlog({
            title,
            slug,
            content,
            // author_id,
            featured_image
        });

        res.status(201).json({ 
            success: true,
            message: 'Blog submitted for approval',
            data: { postId: newPostId }
        });
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ 
            success: false,
            message: error.message || 'Failed to create blog'
        });
    }
}