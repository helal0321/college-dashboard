"use client";
import React from "react";

const TextInput = ({ placeholder, type = "text", value, onChange }) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      className="w-full p-4 bg-secondary rounded-md mb-8"
      onChange={onChange}
    />
  );
};

export default TextInput;
