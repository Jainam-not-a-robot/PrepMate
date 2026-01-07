import { useParams } from "react-router-dom";
import { topics } from "../data/parsedData";
import { useEffect, useState } from "react";
import Container from "../components/container";
import React from "react";

const Total_Time = 10 * 60

const Quiz = ({ mode }) => {
  const { topicId } = useParams();

  let questions = [];

  if (mode === "all") {
    topics.forEach((t) => questions.push(...t.questions));
  } else {
    const topic = topics.find((t) => t.id === topicId);
    questions = topic.questions;
  }

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState(
    new Array(questions.length).fill(null)
  )
  const [marked, setMarked] = useState(
    new Array(questions.length).fill(null)
  )
  const [showSummary, setShowSummary] = useState(false)
  const [timeleft, setTimeleft] = useState(Total_Time)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (submitted) return;
    if (timeleft === 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeleft((t) => t - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeleft, submitted]);

  const handleOptionSelect = (option) => {
    const newAnswers = [...answers]
    newAnswers[current] = option;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1)
    }
  }

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1)
    }
  }

  const toggleMark = () => {
    const newMarked = [...marked]
    newMarked[current] = !newMarked[current]
    setMarked(newMarked)
  }
  const handleSubmit = () => {
    setSubmitted(true)
  }
  const getStatusColor = (i) => {
    if (marked[i]) return "bg-yellow-500";
    if (answers[i] !== null) return "bg-green-500";
    return "bg-red-500";
  }


  if (showSummary && !submitted) {
    const attempted = answers.filter((a) => a !== null).length;
    const markedCount = marked.filter(Boolean).length;
    const unattempted = questions.length - attempted;

    return (
      <Container>
        <h2 className="text-2xl font-bold mb-4">Test Summary</h2>

        <p>Attempted: {attempted}</p>
        <p>Unattempted: {unattempted}</p>
        <p>Marked for Review: {markedCount}</p>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => setShowSummary(false)}
            className="px-6 py-2 bg-gray-600 rounded"
          >
            Go Back
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-red-600 rounded"
          >
            Confirm Submit
          </button>
        </div>
      </Container>
    );
  }

  if (submitted) {
    let score = 0;
    answers.forEach((ans, i) => {
      if (ans === questions[i].answer) score++;
    })

    return (
      <Container>
        <h2 className="text-2xl font-bold mb-4"> Result</h2>
        <p className="text-lg mb-4">
          Score : {score} / {questions.length}
        </p>

        {questions.map((q, i) => (
          <div className="mb-4 p-4 border rounded" key={i}>
            <p className="font-semibold"> {q.question}</p>
            <p className={
              answers[i] === q.answer
                ? "text-green-400"
                : "text-red-400"

            }>
              Your Answer : {answers[i] ?? "Not Answered"}
            </p>
            <p className="text-indigo-400">
              Correct answer: {q.answer}
            </p>

          </div>
        ))

        }

      </Container>


    )
  }
  const q = questions[current]

  const minutes = Math.floor(timeleft / 60)
  const seconds = timeleft % 60
  return (
    <Container>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          Questions {current + 1} / {questions.length}
        </h2>

        <span className="px-4 py-1 rounded-full bg-red-500/10 text-green-400">
          ⏱ {minutes} : {seconds.toString().padStart(2, "0")}

        </span>
      </div>

      <div className="flex gap-6">

        <div className="w-48 grid grid-cols-4 gap-2">
          {questions.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-10 h-10 text-sm rounded hover:cursor-pointer hover:border-solid hover:border-2 hover:border-indigo-600 flex justify-center items-center transition-all duration-200 ease-in-out  ${getStatusColor(
                i
              )}`}
            >
              {i + 1}
            </div>
          ))}
        </div>

        <div className="flex-1">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
            <p className="text-lg font-semibold mb-4">
              {q.question}
            </p>

            {q.options.map((op, idx) => (
              <label
                key={idx}
                className="block mb-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="option"
                  checked={answers[current] === op}
                  onChange={() => handleOptionSelect(op)}
                />{" "}
                {op}
              </label>
            ))}
          </div>


          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={current === 0}
              className="px-4 py-2 bg-gray-600 rounded disabled:opacity-50"
            >
              ⬅ Previous
            </button>

            <button
              onClick={toggleMark}
              className="px-4 py-2 bg-yellow-600 rounded"
            >
              ⭐ Mark for Review
            </button>

            {current === questions.length - 1 ? (
              <button
                onClick={() => setShowSummary(true)}
                className="px-4 py-2 bg-green-600 rounded"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-indigo-600 rounded"
              >
                Save & Next ➡
              </button>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Quiz;