// app.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const app = express();
require('dotenv').config()
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const blogRoutes = require('./routes/blogRoutes')
const newBlogRoutes = require('./routes/newBlogRoutes')
const contactRoutes = require('./routes/contactRoutes')
const projectsRoutes = require('./routes/projectsRoutes')
const faqRoutes = require('./routes/faqRoutes');
const ImageKit = require('imagekit');
const pool = require('./config/db');
const multer = require('multer');

// Middleware
app.use(cors());
// Serving static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const frontendPath = path.join(__dirname, '..', 'dist'); // adjust based on where 'build' is
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});


// Routes 
// app.get('/', (req, res) => {
//     res.send("Backend is running!")
// })
app.use('/api/projects', projectsRoutes)
app.use('/api', contactRoutes);
app.use('/api', uploadRoutes);
app.use('/api', serviceRoutes);
app.use('/api', blogRoutes)
app.use('/api/v2/blogs', newBlogRoutes)
app.use('/api', faqRoutes);

/// ImageKit configuration
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// Configure multer for file uploads with increased limits
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { 
        fileSize: 50 * 1024 * 1024, // 50MB limit for videos
        files: 15 // Max 15 files total
    },
    fileFilter: (req, file, cb) => {
        // Allow images and videos
        if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image and video files are allowed!'), false);
        }
    }
});

// Helper function to upload files to ImageKit
async function uploadToImageKit(file, folder) {
    try {
        return new Promise((resolve, reject) => {
            const uploadOptions = {
                file: file.buffer,
                fileName: `${Date.now()}_${file.originalname.replace(/\s+/g, '_')}`,
                folder: folder,
                useUniqueFileName: true
            };

            // Add transformation for images to optimize them
            if (file.mimetype.startsWith('image/')) {
                uploadOptions.transformation = {
                    pre: 'l-text,i-Yogineers Tech,fs-20,l-end',
                    post: [
                        {
                            type: 'transformation',
                            value: 'w-800,h-600,c-maintain_ratio'
                        }
                    ]
                };
            }

            imagekit.upload(uploadOptions, (error, result) => {
                if (error) {
                    console.error('ImageKit upload error:', error);
                    return reject(error);
                }
                resolve(result);
            });
        });
    } catch (error) {
        console.error('Upload function error:', error);
        throw error;
    }
}

// Get all services route
app.get('/api/services', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT service_id, service_name FROM services ORDER BY service_name');
        res.json(rows);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Failed to fetch services' });
    }
});

// COMMENTED OUT - Replaced by organized routes in projectsRoutes.js
// Create new project route with file uploads
/*
app.post('/api/projects', upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'video', maxCount: 1 },
    { name: 'photos', maxCount: 10 }
]), async (req, res) => {
    try {

        const { service_id, project_name, project_description } = req.body;
        const files = req.files || {};

        // Validate required fields
        if (!service_id || !project_name || !project_description) {
            return res.status(400).json({ 
                error: 'Missing required fields: service_id, project_name, and project_description are required' 
            });
        }

        // Validate service exists
        const [serviceCheck] = await pool.query('SELECT service_id FROM services WHERE service_id = ?', [service_id]);
        if (serviceCheck.length === 0) {
            return res.status(400).json({ error: 'Invalid service_id' });
        }

        // Initialize upload results
        let thumbnailUrl = null;
        let videoUrl = null;
        let photoUrls = [];

        try {
            // Upload thumbnail to ImageKit
            if (files.thumbnail && files.thumbnail.length > 0) {
                console.log('Uploading thumbnail...');
                const result = await uploadToImageKit(files.thumbnail[0], 'project-thumbnails');
                thumbnailUrl = result.url;
                console.log('Thumbnail uploaded:', thumbnailUrl);
            }

            // Upload video to ImageKit
            if (files.video && files.video.length > 0) {
                console.log('Uploading video...');
                const result = await uploadToImageKit(files.video[0], 'project-videos');
                videoUrl = result.url;
                console.log('Video uploaded:', videoUrl);
            }

            // Upload photos to ImageKit
            if (files.photos && files.photos.length > 0) {
                console.log(`Uploading ${files.photos.length} photos...`);
                const uploadPromises = files.photos.map((file, index) => {
                    console.log(`Uploading photo ${index + 1}:`, file.originalname);
                    return uploadToImageKit(file, 'project-photos');
                });
                
                const results = await Promise.all(uploadPromises);
                photoUrls = results.map(result => result.url);
                console.log('Photos uploaded:', photoUrls);
            }

        } catch (uploadError) {
            console.error('File upload error:', uploadError);
            return res.status(500).json({ 
                error: 'Failed to upload files to cloud storage. Please try again.' 
            });
        }

        // Insert project into database
        try {
            const [result] = await pool.query(
                `INSERT INTO projects (
                    service_id, 
                    project_name, 
                    project_video, 
                    project_photos, 
                    project_thumbnail, 
                    project_description
                ) VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    service_id,
                    project_name,
                    videoUrl,
                    photoUrls.length > 0 ? JSON.stringify(photoUrls) : null,
                    thumbnailUrl,
                    project_description
                ]
            );

            console.log('Project created with ID:', result.insertId);

            // Return success response with all URLs
            res.status(201).json({
                success: true,
                message: 'Project created successfully',
                data: {
                    projectId: result.insertId,
                    thumbnailUrl,
                    videoUrl,
                    photoUrls,
                    project_name,
                    service_id
                }
            });

        } catch (dbError) {
            console.error('Database error:', dbError);
            return res.status(500).json({ 
                error: 'Failed to save project to database. Please try again.' 
            });
        }

    } catch (error) {
        console.error('General error in project creation:', error);
        res.status(500).json({ 
            error: 'An unexpected error occurred. Please try again.' 
        });
    }
});
*/

// COMMENTED OUT - Replaced by organized routes in projectsRoutes.js
// Delete project route
/*
app.delete('/api/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // First get the project to check if it exists
        const [existingProject] = await pool.query(
            'SELECT * FROM projects WHERE project_id = ?', 
            [id]
        );
        
        if (existingProject.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }
        
        // Delete the project
        await pool.query(
            'DELETE FROM projects WHERE project_id = ?', 
            [id]
        );
        
        res.json({ 
            success: true, 
            message: `Project "${existingProject[0].project_name}" deleted successfully` 
        });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Failed to delete project' });
    }
});
*/



// Get ImageKit authentication parameters for direct upload (if needed for future features)
app.get('/api/imagekit/auth', (req, res) => {
    try {
        const authParams = imagekit.getAuthenticationParameters();
        res.json(authParams);
    } catch (error) {
        console.error('ImageKit auth error:', error);
        res.status(500).json({ error: 'Failed to generate authentication parameters' });
    }
});

// COMMENTED OUT - Replaced by organized routes in projectsRoutes.js
// Get all projects (optional - for viewing created projects)
/*
app.get('/api/projects', async (req, res) => {
    try {
        const [projects] = await pool.query(`
            SELECT 
                p.*,
                s.service_name 
            FROM projects p 
            JOIN services s ON p.service_id = s.service_id 
            ORDER BY p.created_at DESC
        `);

        // Parse JSON fields
        const processedProjects = projects.map(project => ({
            ...project,
            project_photos: project.project_photos ? JSON.parse(project.project_photos) : []
        }));

        res.json(processedProjects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});
*/

// COMMENTED OUT - Replaced by organized routes in projectsRoutes.js
// Get project by ID (optional)
/*
app.get('/api/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [projects] = await pool.query(`
            SELECT 
                p.*,
                s.service_name 
            FROM projects p 
            JOIN services s ON p.service_id = s.service_id 
            WHERE p.project_id = ?
        `, [id]);

        if (projects.length === 0) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const project = projects[0];
        project.project_photos = project.project_photos ? JSON.parse(project.project_photos) : [];

        res.json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: 'Failed to fetch project' });
    }
});
*/

// Error handling middleware for multer
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File too large. Maximum size is 50MB.' });
        }
        if (error.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({ error: 'Too many files. Maximum is 15 files.' });
        }
    }
    
    if (error.message === 'Only image and video files are allowed!') {
        return res.status(400).json({ error: 'Only image and video files are allowed!' });
    }
    
    next(error);
});




app.use(express.static(frontendPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});


module.exports = app;

