import React from "react";
import Container from "../components/container";
import { Link } from "react-router-dom";
function Home(){

  return(
    <Container>
    <h1 className="text-4xl font-bold text-indigo-400 mb-4">
        Welcome to Prepmate

    </h1>

    <p className="text-gray-300 text-lg mb-6">
        PrepMate helps you prepare smarter using your own notes.
        Upload a PDF, extract important topics, practice key questions,
        and test yourself with quizzes — all automatically.
      </p>

          <p className="text-gray-400 mb-8">
        No subjects. No clutter. Just upload and start learning.
      </p>

       <Link
        to="/upload"
        className="inline-block bg-indigo-600 hover:bg-indigo-500
                   transition text-white px-6 py-3 rounded-lg font-medium"
      >
        Get Started → Upload Notes
      </Link>
      
   </Container>
  )
}
export default Home 