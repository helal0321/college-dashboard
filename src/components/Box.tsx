"use client";
import React from "react";
import { useSelector } from "react-redux";

const Box = ({ children }) => {
  const language = useSelector((state) => state.language);

  return (
    <div
      className="relative text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[700px] p-10 border border-2 border-third border-x-0 bg-main "
      style={{ direction: language === "english" ? "ltr" : "rtl" }}
    >
      {children}
    </div>
  );
};

export default Box;
