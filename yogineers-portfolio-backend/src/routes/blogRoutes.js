const express = require('express');
const router = express.Router();
const path = require('path');
const blogsController = require("../controllers/blogsController");


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         const ext = path.extname(file.originalname);
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, `img-${uniqueSuffix}${ext}`);
//     }
// });

router.get('/all-blogs', blogsController.getAllBlogs);

router.post(
    '/create-blog',
    blogsController.createBlog
);

module.exports = router;