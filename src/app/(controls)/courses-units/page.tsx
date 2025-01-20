"use client";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import { apiToken, baseUrl } from "../constants";
import { useSelector } from "react-redux";

const UnitCourses = () => {
  const language = useSelector((state) => state.language);

  const [loading, setLoading] = useState(true);

  const [selectedOption, setSelectedOption] = useState(null);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(
        `${baseUrl}/api/Unit/Unit_All_Courses/${language === "english" ? "eng" : "ar"}`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userData")).token
            }`,

            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setCourses(data);
      setLoading(false);
      console.log(data);
    };
    fetchData();
  }, []);
  return (
    <div className="bg-main h-[100vh] overflow-y-scroll">
      <div
        className="text-white w-[1200px] mx-auto py-20"
        style={{ direction: language === "english" ? "ltr" : "rtl" }}
      >
        <h1 className="text-center text-4xl font-bold text-third">
          {language === "english"
            ? "add or view or delete Courses"
            : "إضافة أو عرض أو حذف الكورسات"}
        </h1>
        <p className="font-bold text-center text-xl mt-4">
          {language === "english"
            ? "here you can manage Courses Data"
            : "هنا يمكنك إدارة بيانات الكورسات"}
        </p>
        <p className="mt-10 text-2xl font-bold text-center">
          {language === "english" ? "add New Course:" : "اضافة كورس جديد"}
        </p>
        <Link
          href="add-course-unit"
          className="bg-third w-fit mx-auto text-lg px-8 py-4 rounded-lg block mt-6"
        >
          {language === "english" ? "add New Course:" : "اضافة كورس جديد"}
        </Link>
        <p className="text-center font-bold text-4xl my-10">
          {language === "english"
            ? "list of all Courses"
            : "قائمة بجميع الكورسات"}
        </p>
        {loading ? (
          <div className="w-14 h-14 rounded-full border border-third border-4 border-b-transparent mt-20 animate-spin mx-auto"></div>
        ) : (
          <div className="bg-secondary p-6 rounded-lg">
            <div className="flex justify-between items-center border border-x-0 border-t-0 pb-2 border-third">
              <p className="text-center w-1/6 font-bold text-third">
                {language === "english" ? "Title" : "العنوان"}
              </p>

              <p className="text-center w-1/6 font-bold text-third">
                {language === "english" ? "description" : "الوصف"}
              </p>
              <p className="text-center w-1/6 font-bold text-third">
                {language === "english" ? "unit" : "الوحده"}
              </p>

              <p className="text-center w-1/6 font-bold text-third">
                {language === "english" ? "action" : "الاجراء"}
              </p>
            </div>
            {courses.map((course, index) => (
              <div
                key={course.id}
                className="flex justify-between items-center border border-x-0 border-t-0 pb-2 border-third py-4"
              >
                <p className="text-center w-1/6">{course.title}</p>
                <p className="text-center w-1/6">
                  <a href={course.pdfDescription} target="_blank">
                    pdf file
                  </a>
                </p>
                <p className="text-center w-1/6">{course.unitName}</p>

                <div className="w-1/6 flex justify-center relative">
                  <button
                    className="bg-red-600  px-2 py-1 text-sm rounded-md text-center "
                    onClick={() => {
                      fetch(`${baseUrl}/Remove_Course_From_Unit/${course.id}`, {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${
                            JSON.parse(localStorage.getItem("userData")).token
                          }`,
                        },
                      })
                        .then((res) => {
                          console.log(res, "hjg");
                          setCourses(
                            courses.filter(
                              (element) => course.id !== element.id
                            )
                          );
                          setSelectedOption(null);
                        })

                        .catch((error) => {
                          console.log(error.message);
                        });
                    }}
                  >
                    {language === "english" ? "delete" : "حذف"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitCourses;
