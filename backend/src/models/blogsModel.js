const db = require('../config/db');

const blogsModel = {
    getAllPosts: async () => {
        const [rows] = await db.query('SELECT * FROM blog_posts');
        console.log(`Blog Posts:`, rows);
        return rows;
    },
    
    createBlog: async ({ title, slug, content, author_id=null, featured_image = null }) => {
        const [result] = await db.query(
            `INSERT INTO blog_posts 
             (title, slug, content, author_id, featured_image, status, created_at, updated_at) 
             VALUES (?, ?, ?, ?, ?, 'pending', NOW(), NOW())`,
            [title, slug, content, author_id, featured_image]
        );
        return result.insertId;
    }
    
};

module.exports = blogsModel;