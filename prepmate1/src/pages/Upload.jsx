import React from "react";
import Container from "../components/container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
  

const Upload = () => {

    const [file ,setFile] = useState(null)
    const navigate = useNavigate()
 
    return(
       <Container>
          <h1 className="text-2xl font-bold mb-4">
            Upload Notes
          </h1>

          <input
          type = "file"
          accept = "application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
            className = "mb-4"
          />

           {file && <p className="text-gray-400 mb-4">Selected: {file.name}</p>}


           <button
           onClick={() => navigate("/topics")}
           className="bg-indigo-600 hover:bg-indigo-500
                   text-white px-6 py-2 rounded-lg"
           >
               Extract Important Topics
           </button>






       </Container>


    )



}
export default Upload


