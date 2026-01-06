import React from "react";
import { topics } from "../data/parsedData";
import { useNavigate } from "react-router-dom";

import Container from "../components/container";
 
const Topics = () => {
  const navigate = useNavigate()

  return(
     <Container>
        <button
        onClick={() => navigate("/quiz/all")}
        className="mb-6 bg-indigo-600 text-white px-6 py-3 rounded-lg"
        >
              Start Full Quiz (All Topics)
        </button>
       
       <h2 className="text-2xl font-bold mb-4">  Important Topics </h2>

       <div className="grid gap-4">
         {topics.map((t) => {
            <div
            key = {t.id}
            className="border border-white/10 p-4 rounded-lg
                       cursor-pointer hover:bg-white/5"

          onClick={() => navigate(`/topics/${t.id}`) }
            >
            {t.title}
            </div>

         })}

       </div>

     </Container>


  )
}

export default Topics