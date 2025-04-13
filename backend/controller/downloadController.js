// import fileModel from "../model/fileModel.js";
// import path from "path";

// export const DownloadController = async (req, res) => {
//   try {
//     // Find the file by its ID from the request parameters
//     const file = await fileModel.findById(req.params.fileId);

//     // If the file is not found, return a 404 response
//     if (!file) {
//       return res.status(404).json({ message: "File not found" });
//     }

//     // Resolve the file path to serve it to the user
//     const filePath = path.resolve(file.path);
    
//     // Send the file for download
//     res.download(filePath, file.name);  // file.name is the original file name
//   } catch (error) {
//     console.error("Download error:", error);
//     return res.status(500).json({ message: error.message });
//   }
// };
