
// import React, { useEffect, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import axios from "axios";
// import "./App.css";

// function App() {
//   const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [downloadLink, setDownloadLink] = useState("");

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

//     setFile(selectedFile);
//     setUploading(true);

//     const formData = new FormData();
//     formData.append("myfile", selectedFile);

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/files/upload`,
//         formData
//       );
//       setDownloadLink(`${import.meta.env.VITE_BACKEND_URL}/api/files/${res.data.file}`);
//     } catch (err) {
//       console.error("Upload Error", err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
//             <p>Uploading...</p>
//           ) : file ? (
//             <p>Uploaded: {file.name}</p>
//           ) : (
//             <p>Drag & Drop file here or click to browse</p>
//           )}
//         </div>

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

import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "./App.css";

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");

  const inputRef = useRef(); // to manually trigger file input

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

    setFile(selectedFile);
    setUploading(true);

    const formData = new FormData();
    formData.append("myfile", selectedFile);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/files/upload`,
        formData
      );
      setDownloadLink(`${import.meta.env.VITE_BACKEND_URL}/api/files/${res.data.file}`);
    } catch (err) {
      console.error("Upload Error", err);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
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
          <input {...getInputProps()} ref={inputRef} />
          {uploading ? (
            <p>Uploading...</p>
          ) : file ? (
            <p>Uploaded: {file.name}</p>
          ) : (
            <p>Drag & Drop file here or use the button below</p>
          )}
        </div>

        <button className="upload-button" onClick={open}>
          Upload File
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
