
// import express from "express";
// import { UploadController, DownloadController } from "../controller/uploadController.js";
// import storage from "../middleware/upload.js";

// const router = express.Router();

// router.post("/upload", storage.single("myfile"), UploadController);
// router.get("/files/:fileId", DownloadController);

// export default router;



import express from 'express';
import { UploadController } from '../controllers/uploadController.js';
// import { DownloadController } from '../controllers/downloadController.js';  // Add this import

const router = express.Router();

// File upload route
router.post('/upload', UploadController);

// File download route (new route)
router.get('/files/:fileId', DownloadController);

export default router;
