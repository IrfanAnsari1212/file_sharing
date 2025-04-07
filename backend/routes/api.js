
import express from "express";
import { UploadController, DownloadController } from "../controller/uploadController.js";
import storage from "../middleware/upload.js";

const router = express.Router();

router.post("/upload", storage.single("myfile"), UploadController);
router.get("/files/:fileId", DownloadController);

export default router;
