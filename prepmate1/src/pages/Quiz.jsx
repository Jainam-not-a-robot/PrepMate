import { useParams } from "react-router-dom";
import { topics } from "../data/parsedData";
import { useState } from "react";
import Container from "../components/container";
import React from "react";
const Quiz = ({ mode }) => {
  const { topicId } = useParams();

  let questions = [];

  if (mode === "all") {
    topics.forEach((t) => questions.push(...t.questions));
  } else {
    const topic = topics.find((t) => t.id === topicId);
    questions = topic.questions;
  }

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (opt) => {
    if (opt === questions[index].answer) {
      setScore(score + 1);
    }
    setIndex(index + 1);
  };

  if (index >= questions.length) {
    return (
      <Container>
        <h2 className="text-2xl font-bold">
          Score: {score} / {questions.length}
        </h2>
      </Container>
    );
  }

  const q = questions[index];

  return (
    <Container>
      <h2 className="text-xl font-bold mb-4">
        Question {index + 1}
      </h2>

      <p className="mb-4">{q.question}</p>

      {q.options.map((op, i) => (
        <button
          key={i}
          onClick={() => handleAnswer(op)}
          className="block w-full text-left border p-3 mb-2 rounded
                     hover:bg-indigo-500/10"
        >
          {op}
        </button>
      ))}
    </Container>
  );
};

export default Quiz;
