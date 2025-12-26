import React from "react";


const Container = ({ children }) => {
  return (
    <div  className="max-w-5xl mx-auto px-6 py-10">
      {children}
    </div>
  );
};

export default Container;