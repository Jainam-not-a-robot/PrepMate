import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Topics from "./pages/Topics";
import TopicActions from "./pages/TopicAction";
import ImportantQuestions from "./pages/ImportantQuestions";
import Quiz from "./pages/Quiz";
import Processing from "./pages/processing";

import AuthLayout from "./pages/auth/AuthLayout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

const App = () => {
  const location = useLocation();

  // Show navbar ONLY on home
  const showNavbar = location.pathname === "/";

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Main app pages (NO NAVBAR) */}
        <Route path="/upload" element={<Upload />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topics/:topicId" element={<TopicActions />} />
        <Route path="/topics/:topicId/questions" element={<ImportantQuestions />} />
        <Route path="/topics/:topicId/quiz" element={<Quiz />} />
        <Route path="/quiz/all" element={<Quiz mode="all" />} />
        <Route path="/processing" element={<Processing />} />

        {/* User pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />

        {/* Auth pages (WITH AuthLayout) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;



