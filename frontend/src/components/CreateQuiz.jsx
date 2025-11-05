import React, { useState } from "react";

function CreateQuiz() {
  const [numQuestions, setNumQuestions] = useState(5);
  const [timeLimit, setTimeLimit] = useState(30);
  const [quizCreated, setQuizCreated] = useState(false);

  const handleCreateQuiz = () => {
   
    setQuizCreated(true);
   
  };

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
          maxWidth: 500,
          padding: "24px 18px",
          background: "#2c2c2c",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "32px", color: "white", fontWeight: "bold" }}>Create Quiz</h2>
        <div style={{ margin: "16px 0", fontSize: "1.3rem", color: "white", display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
          <label htmlFor="numQuestions">How many questions?</label>
          <input
            id="numQuestions"
            type="number"
            min="1"
            value={numQuestions}
            onChange={e => setNumQuestions(e.target.value)}
            style={{
              marginLeft: "18px",
              padding: "7px 18px",
              fontSize: "1.2rem",
              borderRadius: "7px",
              border: "1px solid #555",
              background: "#232323",
              color: "white",
              width: "80px",
            }}
          />
        </div>
        <div style={{ margin: "16px 0", fontSize: "1.3rem", color: "white", display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
          <label htmlFor="timeLimit">Time limit per question (seconds):</label>
          <input
            id="timeLimit"
            type="number"
            min="1"
            value={timeLimit}
            onChange={e => setTimeLimit(e.target.value)}
            style={{
              marginLeft: "18px",
              padding: "7px 18px",
              fontSize: "1.2rem",
              borderRadius: "7px",
              border: "1px solid #555",
              background: "#232323",
              color: "white",
              width: "80px",
            }}
          />
        </div>

        <button
          onClick={handleCreateQuiz}
          style={{
            marginTop: "30px",
            padding: "16px 28px",
            fontSize: "1.25rem",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Create Quiz
        </button>
        {quizCreated && (
          <p style={{ color: "lightgreen", fontSize: "1.1rem", marginTop: "18px" }}>
            Quiz created successfully!
          </p>
        )}
      </div>
    </div>
  );
}

export default CreateQuiz;
