"use client";
import Lotti from "lottie-react";
import Load from "@/animations/load.json";

const loading = () => {
    return (
     
        <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 backdrop-blur-md backdrop-filter bg-opacity-50"></div>
          <Lotti size={50} animationData={Load} />
        </div>
      
    );
  };
  
  export default loading;