import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileUploader from "./components/fileuploader";
import CreateQuiz from "./components/CreateQuiz.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FileUploader />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
              