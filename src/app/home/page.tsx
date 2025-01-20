"use client";
import Box from "@/components/Box";
import Overlay from "@/components/Overlay";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../rtk/languageSlice";

const Home = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      router.replace("/");
    }
  }, []);

  return (
    <div className="bg-image h-[100vh] relative">
      <Overlay />
      <Box>
        <div className="custom-scroll h-[500px] overflow-y-scroll">
          <h1 className="text-center font-bold text-2xl text-third mb-10">
            {language === "english" ? "welcome" : "مرحبا"}:{" "}
            <span className="text-white">
              {localStorage.getItem("userData") &&
                JSON.parse(localStorage.getItem("userData")).userName}
            </span>
          </h1>
          <p className="font-bold text-lg mb-8 text-center">
            {language === "english"
              ? "please choose one of the following options:"
              : ":الرجاء اختيار أحد الخيارات التالية"}
          </p>
          <div className="">
            <Link
              href="/courses"
              className="bg-third w-full block text-center max-w-96 mx-auto py-3 text-lg font-bold rounded-lg mb-8"
            >
              {language === "english"
                ? "add or view Courses"
                : "اضافة او عرض الكورسات"}
            </Link>
            <Link
              href="/news"
              className="bg-third w-full block text-center max-w-96 mx-auto py-3 text-lg font-bold rounded-lg mb-8"
            >
              {language === "english"
                ? "add or view news"
                : "إضافة أو عرض الأخبار"}
            </Link>
            {localStorage.getItem("userData") &&
              JSON.parse(localStorage.getItem("userData")).role === "Admin" && (
                <>
                  <Link
                    href="/events"
                    className="bg-third w-full block text-center max-w-96 mx-auto py-3 text-lg font-bold rounded-lg mb-8"
                  >
                    {language === "english"
                      ? "add or view events"
                      : "إضافة أو عرض الفعاليات"}
                  </Link>
                  <Link
                    href="/employees"
                    className="bg-third w-full block text-center max-w-96 mx-auto py-3 text-lg font-bold rounded-lg mb-8"
                  >
                    {language === "english"
                      ? "add or view employees"
                      : "اضافة او عرض الموظفين"}
                  </Link>
                  <Link
                    href="/department"
                    className="bg-third w-full block text-center max-w-96 mx-auto py-3 text-lg font-bold rounded-lg mb-8"
                  >
                    {language === "english"
                      ? "add or view department"
                      : "اضافة او عرض الاقسام"}
                  </Link>
                  <Link
                    href="/units"
                    className="bg-third w-full block text-center max-w-96 mx-auto py-3 text-lg font-bold rounded-lg mb-8"
                  >
                    {language === "english"
                      ? "add or view units"
                      : "اضافة او عرض الوحدات"}
                  </Link>
                  <Link
                    href="/employees-units"
                    className="bg-third w-full block text-center max-w-96 mx-auto py-3 text-lg font-bold rounded-lg mb-8"
                  >
                    {language === "english"
                      ? "add or view units employees"
                      : "اضافة او عرض موظفين الوحدات"}
                  </Link>
                  <Link
                    href="/courses-units"
                    className="bg-third w-full block text-center max-w-96 mx-auto py-3 text-lg font-bold rounded-lg mb-8"
                  >
                    {language === "english"
                      ? "add or view  units courses"
                      : "اضافة او عرض كورسات الوحدات"}
                  </Link>
                  <Link
                    href="/quality"
                    className="bg-third w-full block text-center max-w-96 mx-auto py-3 text-lg font-bold rounded-lg mb-8"
                  >
                    {language === "english"
                      ? "add or view quality"
                      : "اضافة او عرض الدقه"}
                  </Link>
                  <Link
                    href="/service"
                    className="bg-third w-full block text-center max-w-96 mx-auto py-3 text-lg font-bold rounded-lg mb-8"
                  >
                    {language === "english"
                      ? "add or view Service"
                      : "اضافة او عرض الخدمة"}
                  </Link>
                </>
              )}
          </div>
          <p className="font-bold text-lg mb-4 text-center mt-6">
            {language === "english" ? "choose language:" : ":اختر اللغة"}
          </p>
          <select
            value={language}
            className="bg-secondary w-full block max-w-96 mx-auto p-4 rounded-md mb-8"
            onChange={(e) => {
              dispatch(setLanguage(e.target.value));
            }}
          >
            <option value="english">
              {language === "english" ? "english" : "انجليزي"}
            </option>
            <option value="arabic">
              {language === "english" ? "arabic" : "عربي"}
            </option>
          </select>
          <button
            className="w-fit mx-auto block bg-red-600 px-4 py-2 text-lg rounded-lg font-bold"
            onClick={() => {
              localStorage.removeItem("userData");
              router.replace("/");
            }}
          >
            {language === "english" ? "logout" : "تسجيل الخروج"}
          </button>
        </div>
      </Box>
    </div>
  );
};

export default Home;
