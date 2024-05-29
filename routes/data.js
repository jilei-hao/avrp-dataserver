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
  const fileId = await dbHelper.GetFileId(req.body.folder, req.body.filename);
  if (fileId !== 0) {
    res.status(409).send("File already exists. Send a PUT request to update the file.");
    // clean up the upload cache
    await fileHelper.deleteFile(req.file.path);
    return;
  } else {
    // Check if path exists
    const folderId = await dbHelper.GetFolderId(req.body.folder);
    console.log("-- folderId: ", folderId);
    console.log("-- create_folder_if_not_exists: ", req.body.create_folder_if_not_exists);

    if (folderId === 0) {
      if (!req.body.create_folder_if_not_exists) {
        res.status(400).send("Folder does not exist. Set create_folder_if_not_exists to true to create the path.");
        // clean up the upload cache
        await fileHelper.deleteFile(req.file.path);
        return;
      }

      // create folder
      await dbHelper.CreateFolder(req.body.folder);
      await fileHelper.createDir(req.body.folder);
    }

    // Insert the file meta into the database
    const fileId = await dbHelper.InsertFile(req.body.folder, req.body.filename, req.file.size);
    console.log("-- fileId: " + fileId);

    // Move the uploaded file from temporary storage to the data root dir
    await fileHelper.importFile(req.file.path, req.body.folder, req.body.filename);

    res.status(200).send({ fileId }); // Send fileId back as response
  }
});

router.head('/', async (req, res) => {
  console.log("/data: head", req.query);
  const fileId = await dbHelper.GetFileId(req.query.folder, req.query.filename);
  if (fileId !== 0) {
    res.setHeader('X-File-Id', fileId);
    res.status(200).end();
  } else {
    res.status(404).end();
  }
  console.log("-- end of /data: head");
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
