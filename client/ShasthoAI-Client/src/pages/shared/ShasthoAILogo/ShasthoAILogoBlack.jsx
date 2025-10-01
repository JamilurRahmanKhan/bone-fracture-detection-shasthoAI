import React from "react";
import { Link } from "react-router-dom";
import { Brain } from "lucide-react";

const ShasthoAILogoBlack = () => {
  return (
    <Link to="/" className="flex items-center space-x-3">
      <div className="p-2 bg-blue-600 rounded-lg">
        <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
      </div>
      <div>
        <span className="text-lg sm:text-xl font-bold">Shastho</span>
        <span className="text-lg sm:text-xl font-bold text-blue-400">AI</span>
      </div>
    </Link>
  );
};

export default ShasthoAILogoBlack;
