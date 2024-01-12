import express from 'express';
import FileHelper from '../fs_adapters/file_helper.js';
import dotenv from 'dotenv';
import multer from 'multer';
import DBHelper from '../db_adapters/db_helper.js';

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

// create a new instance of our DBHelper
const dbHelper = new DBHelper({
  adapter_type: process.env.DB_ADAPTER_TYPE || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: 'data-server-db',
  user: process.env.DB_USER || 'avrpdev',
  password: process.env.DB_PASSWORD || 'avrpdev',
});

// Middleware to parse JSON requests
router.use(express.json());

// API endpoint to validate a username
router.post('/', upload.single('file'), async (req, res) => {
  // console.log(req.file);
  console.log("[/data:Post] ");

  // Check file existence in the database
  const isFileExists = await dbHelper.IsFileExists(req.body.path, req.body.filename);
  if (isFileExists) {
    res.status(409).send("File already exists. Send a PUT request to update the file.");
    // clean up the upload cache
    await fileHelper.deleteFile(req.file.path);
    return;
  } else {
    // Check if path exists
    const isFolderExists = await dbHelper.IsFolderExists(req.body.path);
    console.log("isFolderExists: ", isFolderExists);

    if (!isFolderExists) {
      if (!req.body.create_folder_if_not_exists) {
        res.status(400).send("Path does not exist. Set create_path_if_not_exists to true to create the path.");
        // clean up the upload cache
        await fileHelper.deleteFile(req.file.path);
        return;
      }

      // create the path
      await dbHelper.CreateFolder(req.body.path);
      await fileHelper.createDir(req.body.path);
    }

    // Insert the file meta into the database
    const fileId = await dbHelper.InsertFile(req.body.path, req.body.filename, req.file.size);
    console.log("file_id: " + fileId);

    // Move the uploaded file from temporary storage to the data root dir
    await fileHelper.importFile(req.file.path, req.body.path, req.body.filename);

    res.status(200).send({ fileId }); // Send fileId back as response
  }
});

router.get('/', async (req, res) => {
  console.log("/data: get", req.query);

  // parse id out of the request
  const fileId = req.query.id;
  if (!fileId) {
    res.status(400).send("Missing parameter: id");
    return;
  }

  // Preparing the response
  try {
    const {folder, filename} = await dbHelper.GetFileInfo(fileId);

    if (!folder || !filename) {
      res.status(404).send("File not found");
      return;
    }

    // Attach the image from folder
    const fileData = await fileHelper.readFile(folder, filename);

    // Set the appropriate headers for the response
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // Send the FormData object as the response
    res.status(200).send(fileData);
  } catch (e) {
    res.status(404).send(`Error querying the database: ${e.message}`);
    return;
  }
});

export default router;
