"use client";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../constants";

const Employees = () => {
  const language = useSelector((state) => state.language);

  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${baseUrl}/api/Unit/Unit_All_Employees/${language === "english" ? "eng" : "ar"}`,
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
      setEmployees(data);
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
            ? "add or view or delete employees"
            : "اضافة او عرض او حذف الموظفين"}
        </h1>
        <p className="font-bold text-center text-xl mt-4">
          {language === "english"
            ? "here you can manage employees data"
            : "هنا يمكنك ادارة بيانات الموظفين"}
        </p>
        <p className="mt-10 text-2xl font-bold text-center">
          {language === "english" ? "new employee:" : "موظف جديد:"}
        </p>
        <Link
          href="add-employee-unit"
          className="bg-third w-fit mx-auto text-lg px-8 py-4 rounded-lg block mt-6"
        >
          {language === "english" ? "add employee" : "اضافة موظف"}
        </Link>
        <p className="text-center font-bold text-4xl my-10">
          {language === "english"
            ? "list of all employees"
            : "قائمة لجميع الموظفين"}
        </p>
        {loading ? (
          <div className="w-14 h-14 rounded-full border border-third border-4 border-b-transparent mt-20 animate-spin mx-auto"></div>
        ) : (
          <div className="bg-secondary p-6 rounded-lg">
            <div className="flex justify-between items-center border border-x-0 border-t-0 pb-2 border-third">
              <p className="text-center w-1/6 font-bold text-third">
                {language === "english" ? "name" : "الاسم"}
              </p>

              <p className="text-center w-1/6 font-bold text-third">
                {language === "english" ? "CV" : "السيرة الذاتيه"}
              </p>
              <p className="text-center w-1/6 font-bold text-third">
                {language === "english" ? "Job Title" : "المسمي الوظيفي"}
              </p>
              <p className="text-center w-1/6 font-bold text-third">
                {language === "english" ? "unit" : "الوحده"}
              </p>

              <p className="text-center w-1/6 font-bold text-third">
                {language === "english" ? "action" : "الاجراء"}
              </p>
            </div>
            {employees.map((employee, index) => (
              <div
                key={employee.id}
                className="flex justify-between items-center border border-x-0 border-t-0 pb-2 border-third py-4"
              >
                <p className="text-center w-1/6">{employee.name}</p>
                <p className="text-center w-1/6">
                  <a href={employee.resume} target="_blank">
                    cv file
                  </a>
                </p>
                <p className="text-center w-1/6">{employee.job_Title}</p>
                <p className="text-center w-1/6">{employee.unitName}</p>
                <div className="w-1/6 flex justify-center relative">
                  <button
                    className="bg-red-600  px-2 py-1 text-sm rounded-md text-center "
                    onClick={() => {
                      fetch(
                        `${baseUrl}/Remove_Emloyee_From_Unit/${employee.id}`,
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${
                              JSON.parse(localStorage.getItem("userData")).token
                            }`,
                          },
                        }
                      )
                        .then((res) => {
                          console.log(res, "hjg");
                          setEmployees(
                            employees.filter(
                              (element) => employee.id !== element.id
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

export default Employees;
