const express = require('express');
const router = express.Router();
const knex = require('../db/db');
const projectsModel = require('../models/projectsModel');
const fs = require('fs');
const path = require('path');

// Helper function to delete uploaded files
const deleteUploadedFiles = (files) => {
    if (files) {
        Object.values(files).flat().forEach(file => {
            if (file && file.path && fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }
        });
    }
};

// Get all projects with pagination and filtering
exports.getAllProjects = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const serviceId = req.query.service_id || null;
        const offset = (page - 1) * limit;

        const projects = await projectsModel.getAllProjects(limit, offset, serviceId);
        const totalCount = await projectsModel.getProjectCount(serviceId);

        res.json({
            success: true,
            data: projects,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                totalProjects: totalCount,
                hasNextPage: page * limit < totalCount,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        console.error('Error getting all projects:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching projects',
            error: error.message 
        });
    }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
    try {
        const projectId = req.params.id;
        const project = await projectsModel.getProjectById(projectId);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.json({
            success: true,
            data: project
        });
    } catch (error) {
        console.error('Error getting project by ID:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching project',
            error: error.message 
        });
    }
};

// Get projects by service ID (legacy support)
exports.getProjectsById = async (req, res) => {
    try {
        const projects = await knex('projects')
            .where('service_id', req.params.service_id)
            .select('*');
            
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get projects by service ID with pagination
exports.getProjectsByServiceId = async (req, res) => {
    try {
        const serviceId = req.params.service_id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const projects = await projectsModel.getProjectsByServiceId(serviceId, limit, offset);
        const totalCount = await projectsModel.getProjectCount(serviceId);

        res.json({
            success: true,
            data: projects,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                totalProjects: totalCount,
                hasNextPage: page * limit < totalCount,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        console.error('Error getting projects by service ID:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching projects by service',
            error: error.message 
        });
    }
};

// Create new project
exports.createProject = async (req, res) => {
    try {
        const {
            service_id,
            project_name,
            project_description
        } = req.body;

        // Validate required fields
        if (!service_id || !project_name || !project_description) {
            deleteUploadedFiles(req.files);
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: service_id, project_name, project_description'
            });
        }

        // Process uploaded files
        let project_video = null;
        let project_thumbnail = null;
        let project_photos = [];

        if (req.files) {
            // Handle project video
            if (req.files.project_video && req.files.project_video[0]) {
                project_video = `/uploads/${req.files.project_video[0].filename}`;
            }

            // Handle project thumbnail
            if (req.files.project_thumbnail && req.files.project_thumbnail[0]) {
                project_thumbnail = `/uploads/${req.files.project_thumbnail[0].filename}`;
            }

            // Handle project photos
            if (req.files.project_photos) {
                project_photos = req.files.project_photos.map(file => `/uploads/${file.filename}`);
            }
        }

        const projectData = {
            service_id: parseInt(service_id),
            project_name,
            project_video,
            project_photos,
            project_thumbnail,
            project_description
        };

        const projectId = await projectsModel.createProject(projectData);
        const newProject = await projectsModel.getProjectById(projectId);

        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: newProject
        });
    } catch (error) {
        console.error('Error creating project:', error);
        deleteUploadedFiles(req.files);
        res.status(500).json({ 
            success: false, 
            message: 'Error creating project',
            error: error.message 
        });
    }
};

// Update project
exports.updateProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const {
            service_id,
            project_name,
            project_description
        } = req.body;

        // Check if project exists
        const existingProject = await projectsModel.getProjectById(projectId);
        if (!existingProject) {
            deleteUploadedFiles(req.files);
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        // Validate required fields
        if (!service_id || !project_name || !project_description) {
            deleteUploadedFiles(req.files);
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: service_id, project_name, project_description'
            });
        }

        // Start with existing data
        let project_video = existingProject.project_video;
        let project_thumbnail = existingProject.project_thumbnail;
        let project_photos = existingProject.project_photos || [];

        // Track old files for deletion
        const oldFiles = [];

        // Process uploaded files
        if (req.files) {
            // Handle project video update
            if (req.files.project_video && req.files.project_video[0]) {
                if (project_video) {
                    const oldVideoPath = path.join(__dirname, '../../', project_video);
                    if (fs.existsSync(oldVideoPath)) oldFiles.push(oldVideoPath);
                }
                project_video = `/uploads/${req.files.project_video[0].filename}`;
            }

            // Handle project thumbnail update
            if (req.files.project_thumbnail && req.files.project_thumbnail[0]) {
                if (project_thumbnail) {
                    const oldThumbnailPath = path.join(__dirname, '../../', project_thumbnail);
                    if (fs.existsSync(oldThumbnailPath)) oldFiles.push(oldThumbnailPath);
                }
                project_thumbnail = `/uploads/${req.files.project_thumbnail[0].filename}`;
            }

            // Handle project photos update
            if (req.files.project_photos) {
                // Delete old photos
                if (Array.isArray(project_photos)) {
                    project_photos.forEach(photoUrl => {
                        const oldPhotoPath = path.join(__dirname, '../../', photoUrl);
                        if (fs.existsSync(oldPhotoPath)) oldFiles.push(oldPhotoPath);
                    });
                }
                // Set new photos
                project_photos = req.files.project_photos.map(file => `/uploads/${file.filename}`);
            }
        }

        const projectData = {
            service_id: parseInt(service_id),
            project_name,
            project_video,
            project_photos,
            project_thumbnail,
            project_description
        };

        const updated = await projectsModel.updateProject(projectId, projectData);

        if (updated) {
            // Delete old files after successful update
            oldFiles.forEach(filePath => {
                try {
                    fs.unlinkSync(filePath);
                } catch (err) {
                    console.warn('Could not delete old file:', filePath, err.message);
                }
            });

            const updatedProject = await projectsModel.getProjectById(projectId);
            res.json({
                success: true,
                message: 'Project updated successfully',
                data: updatedProject
            });
        } else {
            deleteUploadedFiles(req.files);
            res.status(400).json({
                success: false,
                message: 'Failed to update project'
            });
        }
    } catch (error) {
        console.error('Error updating project:', error);
        deleteUploadedFiles(req.files);
        res.status(500).json({ 
            success: false, 
            message: 'Error updating project',
            error: error.message 
        });
    }
};

// Delete project
exports.deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id;

        // Get project to access file paths
        const project = await projectsModel.getProjectById(projectId);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        // Delete project from database
        const deleted = await projectsModel.deleteProject(projectId);

        if (deleted) {
            // Delete associated files
            const filesToDelete = [];

            if (project.project_video) {
                filesToDelete.push(path.join(__dirname, '../../', project.project_video));
            }

            if (project.project_thumbnail) {
                filesToDelete.push(path.join(__dirname, '../../', project.project_thumbnail));
            }

            if (Array.isArray(project.project_photos)) {
                project.project_photos.forEach(photoUrl => {
                    filesToDelete.push(path.join(__dirname, '../../', photoUrl));
                });
            }

            // Delete files
            filesToDelete.forEach(filePath => {
                try {
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                } catch (err) {
                    console.warn('Could not delete file:', filePath, err.message);
                }
            });

            res.json({
                success: true,
                message: 'Project deleted successfully'
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Failed to delete project'
            });
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error deleting project',
            error: error.message 
        });
    }
};

// Search projects
exports.searchProjects = async (req, res) => {
    try {
        const { q: searchTerm } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        if (!searchTerm) {
            return res.status(400).json({
                success: false,
                message: 'Search term is required'
            });
        }

        const projects = await projectsModel.searchProjects(searchTerm, limit, offset);

        res.json({
            success: true,
            data: projects,
            searchTerm,
            pagination: {
                currentPage: page,
                limit: limit
            }
        });
    } catch (error) {
        console.error('Error searching projects:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error searching projects',
            error: error.message 
        });
    }
};

// Get projects with service details
exports.getProjectsWithServiceDetails = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const projects = await projectsModel.getProjectsWithServiceDetails(limit, offset);
        const totalCount = await projectsModel.getProjectCount();

        res.json({
            success: true,
            data: projects,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                totalProjects: totalCount,
                hasNextPage: page * limit < totalCount,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        console.error('Error getting projects with service details:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching projects with service details',
            error: error.message 
        });
    }
};
