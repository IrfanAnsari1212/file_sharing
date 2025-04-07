
import axios from "axios";

export const UploadFile = async (fileData, onUploadProgress) => {
  try {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const response = await axios.post(`${backendUrl}/upload`, fileData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onUploadProgress(percent);
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error while uploading file", error.message);
    throw error;
  }
};

export const DownloadFile = async (fileId) => {
  try {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.get(`${backendUrl}/files/${fileId}`, {
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    console.log("Error while downloading file", error.message);
    throw error;
  }
};
