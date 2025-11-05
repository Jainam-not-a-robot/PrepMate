import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function FileUploader() {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [showFilename, setShowFilename] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setProgress(0);
    setUploading(true);
    setShowFilename(false);

    // Simulate progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setShowFilename(true);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleRemove = () => {
    setFile(null);
    setProgress(0);
    setUploading(false);
    setShowFilename(false);
    fileInputRef.current.value = null;
  };

  const uploadComplete = file && progress === 100;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#232323",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <button
          onClick={handleButtonClick}
          style={{
            padding: "20px",
            fontSize: "2rem",
            background: "#181818",
            color: "white",
            borderRadius: "16px",
            border: "3px solid white",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "32px",
            width: "100%"
          }}
        >
          Choose File
        </button>

        {(uploading || progress === 100) && (
          <div
            style={{
              height: "8px",
              width: "100%",
              background: "#232323",
              borderRadius: "4px",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "green",
                transition: "width 0.3s"
              }}
            />
          </div>
        )}

        {showFilename && file && (
          <div
            style={{
              color: "white",
              fontSize: "1.2rem",
              marginTop: "24px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "center"
            }}
          >
            <span style={{ fontSize: "1.5rem", color: "green" }}>✓</span>
            <span>Selected: {file.name}</span>
            <button
              onClick={handleRemove}
              style={{
                marginLeft: "8px",
                padding: "2px 14px",
                fontSize: "0.95rem",
                background: "black",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Remove
            </button>
          </div>
        )}

        {uploadComplete && (
          <button
            onClick={() => navigate("/create-quiz")}
            style={{
              marginTop: "36px",
              padding: "18px 24px",
              fontSize: "1.4rem",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              width: "100%",
              fontWeight: "bold"
            }}
          >
            Create Quiz
          </button>
        )}
      </div>
    </div>
  );
}

export default FileUploader;
