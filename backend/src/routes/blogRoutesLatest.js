// This file has been replaced by newBlogRoutes.js
// Please use /api/v2/blogs endpoints instead

const express = require('express');
const router = express.Router();

router.use('*', (req, res) => {
    res.status(301).json({
        message: 'This endpoint has been moved to /api/v2/blogs',
        newEndpoint: '/api/v2/blogs',
        documentation: 'Please refer to the new v2 blog API endpoints'
    });
});

module.exports = router;