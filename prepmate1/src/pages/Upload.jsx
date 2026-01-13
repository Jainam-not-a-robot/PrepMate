import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/container";

const Upload = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleExtract = () => {
    if (!file) return alert("Please upload a file first");
    navigate("/topics");
  };

  const handleFullTest = () => {
    if (!file) return alert("Please upload a file first");
    navigate("/quiz/all");
  };

  return (
    <Container>
      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <h1 className="text-2xl font-bold mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Upload Your Notes 
        </h1>
        <p className="text-gray-400 mb-10">
          Turn your notes into smart tests, topics & performance analysis.
        </p>

        {/* Upload Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 backdrop-blur shadow-xl">

          <label className="block border-2 border-dashed border-white/20 rounded-xl p-10 text-center cursor-pointer hover:border-indigo-400 transition">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="text-6xl mb-4">📄</div>
            <p className="text-lg font-semibold">
              Drag & drop your PDF here
            </p>
            <p className="text-sm text-gray-400">
              or click to browse files
            </p>
          </label>

          {/* File Preview */}
          {file && (
            <div className="mt-6 flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/10">
              <div>
                <p className="font-semibold">{file.name}</p>
                <p className="text-sm text-gray-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <button
                onClick={removeFile}
                className="text-red-400 hover:text-red-300 text-xl"
              >
                ❌
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-10">
          <button
            disabled={!file}
            onClick={handleExtract}
            className="flex-1 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition disabled:opacity-40 font-semibold"
          >
            🔍 Extract Important Topics
          </button>

          <button
            disabled={!file}
            onClick={handleFullTest}
            className="flex-1 py-4 rounded-xl bg-green-600 hover:bg-green-500 transition disabled:opacity-40 font-semibold"
          >
            🧠 Start Full Test
          </button>
        </div>

   

      </div>
    </Container>
  );
};

export default Upload;


