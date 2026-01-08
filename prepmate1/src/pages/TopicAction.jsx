import React from "react";

import { useNavigate, useParams } from "react-router-dom";
import Container from "../components/container";

const TopicActions = () => {
    const navigate = useNavigate()
     const {topicId} = useParams()

    return(
       <Container>
     <h2 className="text-2xl font-bold mb-6">
         Topics : {topicId}
     </h2>
          <div className="flex gap-6">
               <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg"
               onClick={() => navigate(`/topics/${topicId}/questions`)}
               >
                       Important Questions

               </button>
            

            <button
             onClick={() => navigate(`/topics/${topicId}/quiz`)}
          className="bg-orange-600 text-white px-6 py-3 rounded-lg"
            >
                  Start Quiz

            </button>
          </div>

       </Container>
    )
}
export default TopicActions;
