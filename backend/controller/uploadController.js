
import fileModel from "../model/fileModel.js";
import path from "path";
import dotenv from "dotenv";

export const UploadController = async (req, res) => {
  try {
    dotenv.config();
    const backendUrl = process.env.BACKEND_URL;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileObject = {
      path: req.file.path,
      name: req.file.originalname,
    };

    const file = await fileModel.create(fileObject);
    console.log("✅ File saved:", file);

    return res.status(200).json({
      path: `${backendUrl}/files/${file._id}`,
      fileId: file._id
    });

  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ message: err.message });
  }
};

export const DownloadController = async (req, res) => {
  try {
    const file = await fileModel.findById(req.params.fileId);
    if (!file) return res.status(404).json({ message: "File not found" });

    const filePath = path.resolve(file.path);
    res.download(filePath, file.name);
  } catch (error) {
    console.error("Download error:", error);
    return res.status(500).json({ message: error.message });
  }
};
