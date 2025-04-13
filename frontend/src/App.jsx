
// import React, { useEffect, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import axios from "axios";
// import "./App.css";

// function App() {
//   const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [downloadLink, setDownloadLink] = useState("");
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setCursorPosition({ x: e.clientX - 150, y: e.clientY - 150 });
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   const onDrop = async (acceptedFiles) => {
//     const selectedFile = acceptedFiles[0];
//     if (!selectedFile) return;

//     await handleUpload(selectedFile);
//   };

//   const handleUpload = async (file) => {
//     setFile(file);
//     setUploading(true);
//     setProgress(0);

//     const formData = new FormData();
//     formData.append("myfile", file);

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/upload`,
//         formData,
//         {
//           onUploadProgress: (progressEvent) => {
//             const percentCompleted = Math.round(
//               (progressEvent.loaded * 100) / progressEvent.total
//             );
//             setProgress(percentCompleted);
//           },
//         }
//       );

//       setDownloadLink(res.data.path);
//     } catch (err) {
//       console.error("Upload Error", err);
//       alert(`Upload failed: ${err.message}`);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
//     onDrop,
//     noClick: true,
//     noKeyboard: true,
//     multiple: false,
//     accept: {
//       'application/*': ['.pdf', '.doc', '.docx'],
//       'image/*': ['.png', '.jpg', '.jpeg'],
//       'text/plain': ['.txt'],
//     },
//   });

//   return (
//     <div className="app">
//       <div
//         className="background-glow"
//         style={{ top: `${cursorPosition.y}px`, left: `${cursorPosition.x}px` }}
//       ></div>

//       <div className="container">
//         <h1>🔥 File Sharing App</h1>
//         <p>Hover to watch the glow & drop files to upload</p>

//         <div
//           {...getRootProps()}
//           className={`dropzone ${isDragActive ? "active" : ""}`}
//         >
//           <input {...getInputProps()} />
//           {uploading ? (
//             <div>
//               <p>Uploading: {file.name}</p>
//               <progress value={progress} max="100" />
//               <p>{progress}%</p>
//             </div>
//           ) : file ? (
//             <p>Uploaded: {file.name}</p>
//           ) : (
//             <p>Drag & Drop file here or use the button below</p>
//           )}
//         </div>

//         <button className="upload-button" onClick={open}>
//           Select File
//         </button>

//         {downloadLink && (
//           <div className="download-link">
//             <p>File uploaded successfully ✅</p>
//             <a href={downloadLink} target="_blank" rel="noreferrer">
//               Download Link
//             </a>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;



import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "./App.css";

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX - 150, y: e.clientY - 150 });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const onDrop = async (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) return;

    await handleUpload(selectedFile);
  };

  const handleUpload = async (file) => {
    setFile(file);
    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("myfile", file);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      setDownloadLink(res.data.path);
    } catch (err) {
      console.error("Upload Error", err);
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    multiple: false,
    accept: {
      'application/*': ['.pdf', '.doc', '.docx'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'text/plain': ['.txt'],
    },
  });

  return (
    <div className="app">
      <div
        className="background-glow"
        style={{ top: `${cursorPosition.y}px`, left: `${cursorPosition.x}px` }}
      ></div>

      <div className="container">
        <h1>🔥 File Sharing App</h1>
        <p>Hover to watch the glow & drop files to upload</p>

        <div
          {...getRootProps()}
          className={`dropzone ${isDragActive ? "active" : ""}`}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <div>
              <p>Uploading: {file.name}</p>
              <progress value={progress} max="100" />
              <p>{progress}%</p>
            </div>
          ) : file ? (
            <p>Uploaded: {file.name}</p>
          ) : (
            <p>Drag & Drop file here or use the button below</p>
          )}
        </div>

        <button className="upload-button" onClick={open}>
          Select File
        </button>

        {downloadLink && (
          <div className="download-link">
            <p>File uploaded successfully ✅</p>
            <a href={downloadLink} target="_blank" rel="noreferrer">
              Download Link
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

