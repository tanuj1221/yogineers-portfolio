// src/models/projectsModel.js
const db = require('../config/db');

const projectsModel = {
    // Get all projects with optional pagination and filtering
    getAllProjects: async (limit = 10, offset = 0, serviceId = null) => {
        let query = 'SELECT * FROM projects';
        let params = [];
        
        if (serviceId) {
            query += ' WHERE service_id = ?';
            params.push(serviceId);
        }
        
        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));
        
        const [rows] = await db.query(query, params);
        return rows.map(row => ({
            ...row,
            project_photos: row.project_photos ? JSON.parse(row.project_photos) : []
        }));
    },

    // Get project by ID
    getProjectById: async (projectId) => {
        const [rows] = await db.query('SELECT * FROM projects WHERE project_id = ?', [projectId]);
        if (rows.length === 0) return null;
        
        const project = rows[0];
        return {
            ...project,
            project_photos: project.project_photos ? JSON.parse(project.project_photos) : []
        };
    },

    // Get projects by service ID
    getProjectsByServiceId: async (serviceId, limit = 10, offset = 0) => {
        const [rows] = await db.query(
            'SELECT * FROM projects WHERE service_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
            [serviceId, parseInt(limit), parseInt(offset)]
        );
        return rows.map(row => ({
            ...row,
            project_photos: row.project_photos ? JSON.parse(row.project_photos) : []
        }));
    },

    // Create new project
    createProject: async (projectData) => {
        const {
            service_id,
            project_name,
            project_video,
            project_photos,
            project_thumbnail,
            project_description
        } = projectData;

        const photosJson = Array.isArray(project_photos) ? JSON.stringify(project_photos) : project_photos;

        const [result] = await db.query(
            `INSERT INTO projects 
            (service_id, project_name, project_video, project_photos, project_thumbnail, project_description) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [service_id, project_name, project_video, photosJson, project_thumbnail, project_description]
        );

        return result.insertId;
    },

    // Update project
    updateProject: async (projectId, projectData) => {
        const {
            service_id,
            project_name,
            project_video,
            project_photos,
            project_thumbnail,
            project_description
        } = projectData;

        const photosJson = Array.isArray(project_photos) ? JSON.stringify(project_photos) : project_photos;

        const [result] = await db.query(
            `UPDATE projects SET 
            service_id = ?, 
            project_name = ?, 
            project_video = ?, 
            project_photos = ?, 
            project_thumbnail = ?, 
            project_description = ?, 
            updated_at = CURRENT_TIMESTAMP 
            WHERE project_id = ?`,
            [service_id, project_name, project_video, photosJson, project_thumbnail, project_description, projectId]
        );

        return result.affectedRows > 0;
    },

    // Delete project
    deleteProject: async (projectId) => {
        const [result] = await db.query('DELETE FROM projects WHERE project_id = ?', [projectId]);
        return result.affectedRows > 0;
    },

    // Get total project count
    getProjectCount: async (serviceId = null) => {
        let query = 'SELECT COUNT(*) as count FROM projects';
        let params = [];
        
        if (serviceId) {
            query += ' WHERE service_id = ?';
            params.push(serviceId);
        }
        
        const [rows] = await db.query(query, params);
        return rows[0].count;
    },

    // Search projects by name or description
    searchProjects: async (searchTerm, limit = 10, offset = 0) => {
        const [rows] = await db.query(
            `SELECT * FROM projects 
            WHERE project_name LIKE ? OR project_description LIKE ? 
            ORDER BY created_at DESC LIMIT ? OFFSET ?`,
            [`%${searchTerm}%`, `%${searchTerm}%`, parseInt(limit), parseInt(offset)]
        );
        return rows.map(row => ({
            ...row,
            project_photos: row.project_photos ? JSON.parse(row.project_photos) : []
        }));
    },

    // Get projects with service details
    getProjectsWithServiceDetails: async (limit = 10, offset = 0) => {
        const [rows] = await db.query(
            `SELECT p.*, s.service_name 
            FROM projects p 
            LEFT JOIN services s ON p.service_id = s.service_id 
            ORDER BY p.created_at DESC LIMIT ? OFFSET ?`,
            [parseInt(limit), parseInt(offset)]
        );
        return rows.map(row => ({
            ...row,
            project_photos: row.project_photos ? JSON.parse(row.project_photos) : []
        }));
    }
};

module.exports = projectsModel;