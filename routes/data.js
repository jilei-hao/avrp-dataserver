import express from 'express';
import FileHelper from '../fs_adapters/file_helper.js';
import dotenv from 'dotenv';
import multer from 'multer';

// read in environment variables from .env file
dotenv.config();

// create a router for our express app
const router = express.Router();

// configure multer to parse multipart form data
const upload = multer({ dest: process.env.UPLOAD_FILE_CACHE || '../testing/upload_file_cache'});

// create a new instance of our LocalFSAdapter
const fileHelper = new FileHelper({
  adapter_type: process.env.FILE_ADAPTER_TYPE || 'local',
  data_root_dir: process.env.DATA_ROOT_DIR || '../testing/data_root_dir',
});

// Middleware to parse JSON requests
router.use(express.json());

// API endpoint to validate a username
router.post('/', upload.single('file'), async (req, res) => {
  console.log("[/data(post)]: data root dir: " + process.env.DATA_ROOT_DIR);

  console.log(req.file);

  // Move the uploaded file from temporary storage to the data root dir
  await fileHelper.importFile(req.file.path, req.body.path, req.body.filename);

  res.status(200).send("File uploaded successfully");
});

router.get('/', async (req, res) => {
  console.log("/data: get");
});

export default router;
