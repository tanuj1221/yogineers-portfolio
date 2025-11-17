const multer = require('multer');
const path = require('path');

// Configure Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to allow only Excel/CSV files
const fileFilter = (req, file, cb) => {
  const filetypes = /xlsx|csv/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const allowedMimeTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'text/csv', // .csv
  ];

  console.log('Uploaded File Details:', {
    originalname: file.originalname,
    mimetype: file.mimetype,
    extname: path.extname(file.originalname).toLowerCase(),
  });

  if (extname && allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only Excel (.xlsx) and CSV (.csv) files are allowed!'));
  }
};

// Initialize Multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

module.exports = upload;