const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const projectsController = require('../controllers/projectsController');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer configuration for project media uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        
        // Determine file prefix based on field name
        let prefix = 'project';
        if (file.fieldname === 'project_video') {
            prefix = 'project-video';
        } else if (file.fieldname === 'project_thumbnail') {
            prefix = 'project-thumbnail';
        } else if (file.fieldname === 'project_photos') {
            prefix = 'project-photo';
        }
        
        cb(null, `${prefix}-${uniqueSuffix}${ext}`);
    }
});

// File filter for images and videos
const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'project_video') {
        // Video files
        const allowedVideoTypes = /mp4|avi|mov|wmv|flv|webm|mkv/;
        const extname = allowedVideoTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = /video/.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only video files (MP4, AVI, MOV, WMV, FLV, WebM, MKV) are allowed for project video!'));
        }
    } else if (file.fieldname === 'project_thumbnail' || file.fieldname === 'project_photos') {
        // Image files
        const allowedImageTypes = /jpeg|jpg|png|gif|webp|bmp|svg/;
        const extname = allowedImageTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = /image/.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files (JPEG, JPG, PNG, GIF, WebP, BMP, SVG) are allowed for project images!'));
        }
    } else {
        cb(new Error('Unexpected field name for file upload.'));
    }
};

// Multer upload configuration
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100MB limit for videos
        files: 21 // Maximum 21 files (1 video + 1 thumbnail + 19 photos)
    },
    fileFilter: fileFilter
});

// Multiple file upload configuration
const uploadFields = upload.fields([
    { name: 'project_video', maxCount: 1 },
    { name: 'project_thumbnail', maxCount: 1 },
    { name: 'project_photos', maxCount: 19 } // Up to 19 project photos
]);

// Error handler for multer
const handleMulterError = (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File size too large. Maximum size is 100MB per file.'
            });
        }
        if (error.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({
                success: false,
                message: 'Too many files. Maximum 21 files allowed (1 video + 1 thumbnail + 19 photos).'
            });
        }
        if (error.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                success: false,
                message: 'Unexpected field name for file upload.'
            });
        }
    }
    
    if (error.message.includes('Only video files') || error.message.includes('Only image files')) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
    
    next(error);
};

// Routes

// GET /api/projects - Get all projects with pagination and filtering
router.get('/', projectsController.getAllProjects);

// GET /api/projects/search - Search projects
router.get('/search', projectsController.searchProjects);

// GET /api/projects/with-services - Get projects with service details
router.get('/with-services', projectsController.getProjectsWithServiceDetails);

// GET /api/projects/:id - Get single project by ID
router.get('/:id', projectsController.getProjectById);

// GET /api/services/:service_id/projects - Get projects by service ID (legacy support)
router.get('/services/:service_id/projects', projectsController.getProjectsById);

// GET /api/projects/service/:service_id - Get projects by service ID with pagination
router.get('/service/:service_id', projectsController.getProjectsByServiceId);

// POST /api/projects - Create new project
router.post('/', uploadFields, handleMulterError, projectsController.createProject);

// PUT /api/projects/:id - Update project
router.put('/:id', uploadFields, handleMulterError, projectsController.updateProject);

// DELETE /api/projects/:id - Delete project
router.delete('/:id', projectsController.deleteProject);

// POST /api/projects/upload-media - Upload single media file (utility endpoint)
router.post('/upload-media', upload.single('media'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No media file provided'
            });
        }

        const isVideo = /video/.test(req.file.mimetype);
        const isImage = /image/.test(req.file.mimetype);

        res.json({
            success: true,
            message: `${isVideo ? 'Video' : 'Image'} uploaded successfully`,
            data: {
                url: `/uploads/${req.file.filename}`,
                filename: req.file.filename,
                originalName: req.file.originalname,
                size: req.file.size,
                type: isVideo ? 'video' : 'image',
                mimetype: req.file.mimetype
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
    console.error('Projects routes error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

module.exports = router;