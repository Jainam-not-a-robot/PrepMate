import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/container";

const steps = [
  " Reading your file...",
  " Analyzing content...",
  " Extracting important topics...",
  " Generating questions...",
  " Building test structure...",
  " Almost done...",
];

const Processing = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((s) => {
        if (s < steps.length - 1) return s + 1;
        return s;
      });
    }, 1200);

    const progressTimer = setInterval(() => {
      setProgress((p) => {
        if (p < 100) return p + 1;
        return p;
      });
    }, 60);

    const doneTimer = setTimeout(() => {
      navigate("/topics");
    }, 8000);

    return () => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
      clearTimeout(doneTimer);
    };
  }, [navigate]);

  return (
    <Container>
      <div className="max-w-2xl mx-auto text-center">

        <h1 className="text-4xl font-bold mb-4">
          🤖 PrepMate AI is working...
        </h1>

        <p className="text-gray-400 mb-10">
          Please wait while we process your notes.
        </p>

        
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur">

          {/* Spinner */}
          <div className="text-6xl mb-6 animate-spin">⚙️</div>

          {/* Step Text */}
          <p className="text-xl font-semibold mb-6">
            {steps[currentStep]}
          </p>

          {/* Progress Bar */}
          <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-3 text-sm text-gray-400">
            {progress}% complete
          </p>

        </div>
      </div>
    </Container>
  );
};

export default Processing;
