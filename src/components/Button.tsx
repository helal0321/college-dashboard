import React from "react";

const Button = ({ label, loading, onClick }) => {
  return (
    <button
      className="bg-third text-white w-full py-3 mt-6 text-xl rounded-md"
      onClick={onClick}
    >
      {loading ? (
        <div className="w-8 h-8 bg-transparent border-4 border-b-transparent animate-spin border-white rounded-full mx-auto"></div>
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
