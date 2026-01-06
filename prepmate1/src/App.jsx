import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Topics from "./pages/Topics";
import TopicActions from "./pages/TopicAction";
import ImportantQuestions from "./pages/ImportantQuestions";
import Quiz from "./pages/Quiz";
import React from "react";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topics/:topicId" element={<TopicActions />} />
        <Route path="/topics/:topicId/questions" element={<ImportantQuestions />} />
        <Route path="/topics/:topicId/quiz" element={<Quiz />} />
        <Route path="/quiz/all" element={<Quiz mode="all" />} />
      </Routes>
    </>
  );
};

export default App;

