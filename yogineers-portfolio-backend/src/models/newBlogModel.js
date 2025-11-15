const db = require('../config/db');

// Helper function to safely parse JSON
const safeJsonParse = (jsonString, defaultValue = []) => {
    if (!jsonString) return defaultValue;
    try {
        return JSON.parse(jsonString);
    } catch (e) {
        console.warn(`Failed to parse JSON:`, e.message);
        return defaultValue;
    }
};

// Helper function to format blog with parsed JSON fields
const formatBlog = (blog) => ({
    ...blog,
    tags: safeJsonParse(blog.tags, []),
    images: safeJsonParse(blog.images, [])
});

const newBlogModel = {
    // Get all blogs with pagination and filtering
    getAllBlogs: async ({ limit = 10, offset = 0, category, status = 'published', featured }) => {
        let query = 'SELECT * FROM newblog WHERE status = ?';
        let params = [status];
        
        if (category) {
            query += ' AND category = ?';
            params.push(category);
        }
        
        if (featured !== undefined) {
            query += ' AND is_featured = ?';
            params.push(featured);
        }
        
        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        params.push(limit, offset);
        
        const [rows] = await db.query(query, params);
        
        // Parse JSON fields with error handling
        return rows.map(formatBlog);
    },

    // Get blog count for pagination
    getBlogCount: async ({ category, status = 'published', featured }) => {
        let query = 'SELECT COUNT(*) as count FROM newblog WHERE status = ?';
        let params = [status];
        
        if (category) {
            query += ' AND category = ?';
            params.push(category);
        }
        
        if (featured !== undefined) {
            query += ' AND is_featured = ?';
            params.push(featured);
        }
        
        const [rows] = await db.query(query, params);
        return rows[0].count;
    },

    // Get blog by ID
    getBlogById: async (id) => {
        const [rows] = await db.query('SELECT * FROM newblog WHERE id = ?', [id]);
        if (rows.length === 0) return null;
        
        return formatBlog(rows[0]);
    },

    // Get blog by slug
    getBlogBySlug: async (slug) => {
        const [rows] = await db.query('SELECT * FROM newblog WHERE slug = ?', [slug]);
        if (rows.length === 0) return null;
        
        return formatBlog(rows[0]);
    },

    // Create new blog
    createBlog: async (blogData) => {
        const {
            title,
            subtitle,
            slug,
            content,
            excerpt,
            author_name,
            featured_image,
            banner_image,
            images,
            reading_time,
            word_count,
            status,
            category,
            tags,
            meta_title,
            meta_description,
            is_featured
        } = blogData;

        const query = `
            INSERT INTO newblog (
                title, subtitle, slug, content, excerpt, author_name,
                featured_image, banner_image, images, reading_time, word_count,
                status, category, tags, meta_title, meta_description, is_featured,
                published_at, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 
                     ${status === 'published' ? 'NOW()' : 'NULL'}, NOW(), NOW())
        `;

        const [result] = await db.query(query, [
            title, subtitle, slug, content, excerpt, author_name,
            featured_image, banner_image, images, reading_time, word_count,
            status, category, tags, meta_title, meta_description, is_featured
        ]);

        return result.insertId;
    },

    // Update blog
    updateBlog: async (id, updateData) => {
        const fields = [];
        const values = [];

        // Build dynamic update query
        Object.keys(updateData).forEach(key => {
            if (updateData[key] !== undefined) {
                fields.push(`${key} = ?`);
                values.push(updateData[key]);
            }
        });

        if (fields.length === 0) {
            throw new Error('No fields to update');
        }

        // Always update the updated_at timestamp
        fields.push('updated_at = NOW()');
        
        // If status is being set to published and published_at is null, set it
        if (updateData.status === 'published') {
            fields.push('published_at = COALESCE(published_at, NOW())');
        }

        values.push(id);

        const query = `UPDATE newblog SET ${fields.join(', ')} WHERE id = ?`;
        await db.query(query, values);
    },

    // Delete blog
    deleteBlog: async (id) => {
        await db.query('DELETE FROM newblog WHERE id = ?', [id]);
    },

    // Increment view count
    incrementViewCount: async (id) => {
        await db.query('UPDATE newblog SET views_count = views_count + 1 WHERE id = ?', [id]);
    },

    // Increment like count
    incrementLikeCount: async (id) => {
        await db.query('UPDATE newblog SET likes_count = likes_count + 1 WHERE id = ?', [id]);
    },

    // Search blogs
    searchBlogs: async (searchTerm, limit = 10, offset = 0) => {
        const query = `
            SELECT * FROM newblog 
            WHERE status = 'published' 
            AND MATCH(title, content, excerpt, author_name) AGAINST(? IN NATURAL LANGUAGE MODE)
            ORDER BY created_at DESC 
            LIMIT ? OFFSET ?
        `;
        
        const [rows] = await db.query(query, [searchTerm, limit, offset]);
        
        // Parse JSON fields
        return rows.map(formatBlog);
    },

    // Get search count
    getSearchCount: async (searchTerm) => {
        const query = `
            SELECT COUNT(*) as count FROM newblog 
            WHERE status = 'published' 
            AND MATCH(title, content, excerpt, author_name) AGAINST(? IN NATURAL LANGUAGE MODE)
        `;
        
        const [rows] = await db.query(query, [searchTerm]);
        return rows[0].count;
    },

    // Get featured blogs
    getFeaturedBlogs: async (limit = 5) => {
        const [rows] = await db.query(
            'SELECT * FROM newblog WHERE is_featured = 1 AND status = "published" ORDER BY created_at DESC LIMIT ?',
            [limit]
        );
        
        // Parse JSON fields
        return rows.map(formatBlog);
    },

    // Get blogs by category
    getBlogsByCategory: async (category, limit = 10, offset = 0) => {
        const [rows] = await db.query(
            'SELECT * FROM newblog WHERE category = ? AND status = "published" ORDER BY created_at DESC LIMIT ? OFFSET ?',
            [category, limit, offset]
        );
        
        // Parse JSON fields
        return rows.map(formatBlog);
    },

    // Get popular blogs (by views)
    getPopularBlogs: async (limit = 10) => {
        const [rows] = await db.query(
            'SELECT * FROM newblog WHERE status = "published" ORDER BY views_count DESC, likes_count DESC LIMIT ?',
            [limit]
        );
        
        // Parse JSON fields
        return rows.map(formatBlog);
    },

    // Get all categories
    getCategories: async () => {
        const [rows] = await db.query(
            'SELECT category, COUNT(*) as count FROM newblog WHERE status = "published" AND category IS NOT NULL GROUP BY category ORDER BY count DESC'
        );
        return rows;
    }
};

module.exports = newBlogModel;
