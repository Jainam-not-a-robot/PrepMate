import { useNavigate } from "react-router-dom";
import bg from "../assets/study-bg.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(2,6,23,0.92), rgba(2,6,23,0.75), rgba(2,6,23,0.4)),
          url(${bg})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-6xl mx-auto px-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            <span className="text-indigo-400">Turn Your Notes</span>
            <br />
            Into <span className="text-white">Smart AI Tests</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-6">
            PrepMate uses AI to convert your PDFs into important topics, questions,
            and full-length mock tests automatically.
          </p>

          <p className="text-gray-400 mb-10">
            Upload. Learn. Analyze. Improve. 
          </p>
           
           



       

          <div className="flex gap-6 mt-10 text-sm text-gray-400">
            <div> AI Question Generator</div>
            <div> Smart Analysis</div>
            <div> Performance Tracking</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;


