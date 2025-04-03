import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // Importing the check icon from react-icons/fa

const Congratulations: React.FC = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    // Redirect to the home page when "Continue" is clicked.
    navigate("/dashboard");
  };

  return (
    <div className="px-24 py-10 flex flex-col gap-8">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex items-center justify-center p-40 bg-[#fff8f4] border-8 border-[#2dc36c] rounded-full">
          <FaCheckCircle className="text-9xl text-[#2dc36c]" /> {/* Using the imported check icon */}
        </div>
        <div className="w-2/5 text-center">
          <p className="text-3xl font-medium leading-relaxed font-poppins">
            Congratulations! Your organisation has been successfully authenticated
          </p>
        </div>
        <div className="w-2/5 flex justify-center items-center">
          <button
            onClick={handleContinue}
            className="w-full bg-[#2dc36c] border-2 border-[#2dc36c] py-5 px-8 rounded-full text-white text-lg font-medium font-poppins transition-all duration-300 ease-in-out hover:bg-[#fff8f4] hover:text-[#2dc36c]"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Congratulations;
