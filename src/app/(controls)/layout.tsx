"use client";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function ControlsLayout({ children }) {
  const language = useSelector((state) => state.language);

  return (
    <div>
      <Link
        className="bg-third absolute left-10 px-4 py-2 flex items-center w-fit rounded-full top-10 inline-block  text-white z-[100]"
        href="/home"
      >
        <span className="inline-block border border-[8px] mr-2 border-white border-y-transparent border-l-transparent"></span>
        {language === "english" ? "return home" : "اذهب الي الرئيسية"}
      </Link>
      {children}
    </div>
  );
}
