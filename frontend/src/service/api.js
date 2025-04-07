import axios from "axios";

export const UploadFile = async (fileData, onUploadProgress) => {
  try {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const response = await axios.post(`${backendUrl}/upload`, fileData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onUploadProgress(percent); // send to UI
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error while uploading file", error.message);
  }
};
