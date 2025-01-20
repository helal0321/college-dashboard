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
        `${baseUrl}/Get_All_Employees/${language === "english" ? "eng" : "ar"}`,
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
          href="add-employee"
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
                {language === "english" ? "image" : "صورة"}
              </p>
              <p className="text-center w-1/6 font-bold text-third">
                {language === "english" ? "User Name" : "اسم المستخدم"}
              </p>
              <p className="text-center w-1/6 font-bold text-third">
                {language === "english" ? "Email" : "الايميل"}
              </p>
              <p className="text-center w-1/6 font-bold text-third">
                {language === "english" ? "CV" : "السيرة الذاتيه"}
              </p>
              <p className="text-center w-1/6 font-bold text-third">
                {language === "english" ? "Job Title" : "المسمي الوظيفي"}
              </p>
              <p className="text-center w-1/6 font-bold text-third">
                {language === "english" ? "department" : "القسم"}
              </p>

              <p className="text-center w-1/6 font-bold text-third">
                {language === "english" ? "action" : "الاجراء"}
              </p>
            </div>
            {employees.map((employee, index) => (
              <div
                key={employee.employeeId}
                className="flex justify-between items-center border border-x-0 border-t-0 pb-2 border-third py-4"
              >
                <p className="text-center w-1/6">
                  <img src={employee.image} className="w-20 h-20" />
                </p>
                <p className="text-center w-1/6">{employee.name}</p>
                <p className="text-center w-1/6">{employee.email}</p>
                <p className="text-center w-1/6">
                  <a href={employee.resume} target="_blank">
                    cv file
                  </a>
                </p>
                <p className="text-center w-1/6">{employee.job_Title}</p>
                <p className="text-center w-1/6">{employee.departmentName}</p>
                <div className="w-1/6 flex justify-center relative">
                  <button
                    onClick={() => {
                      if (selectedOption === index) setSelectedOption(null);
                      else {
                        setSelectedOption(index);
                      }
                    }}
                  >
                    <span
                      className={`bg-white w-2 ${
                        language === "english" ? "mr-1" : "ml-1"
                      } h-2 inline-block rounded-full`}
                    ></span>
                    <span
                      className={`bg-white w-2 ${
                        language === "english" ? "mr-1" : "ml-1"
                      } h-2 inline-block rounded-full`}
                    ></span>
                    <span className="bg-white w-2 h-2 inline-block rounded-full"></span>
                  </button>
                  <div
                    className={`absolute ${
                      language === "english" ? "left-0" : "right-0"
                    } flex flex-col bg-main p-4 border border-1 bottom-[70%] z-20 rounded-lg border-third ${
                      selectedOption !== index && "hidden"
                    }`}
                  >
                    <Link
                      href={`/update-employee/${employee.employeeId}`}
                      className="bg-third text-sm mb-2 px-2 py-1 rounded-md text-center"
                    >
                      {language === "english" ? "update" : "تعديل"}
                    </Link>
                    <button
                      className="bg-red-600  px-2 py-1 text-sm rounded-md text-center "
                      onClick={() => {
                        fetch(
                          `${baseUrl}/Delete_Employee/${employee.employeeId}`,
                          {
                            method: "delete",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${
                                JSON.parse(localStorage.getItem("userData"))
                                  .token
                              }`,
                            },
                          }
                        )
                          .then((res) => {
                            console.log(res, "hjg");
                            setEmployees(
                              employees.filter(
                                (element) =>
                                  employee.employeeId !== element.employeeId
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

                {/* <button
                    className="bg-red-600 px-2 py-1 rounded-md"
                    onClick={() => {
                      fetch(
                        `https://devapi.runasp.net/api/Accounts/Delete/${employee.employeeId}`,
                        {
                          method: "delete",
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
                        })

                        .catch((error) => {
                          console.log(error.message);
                        });
                    }}
                  >
                    {language === "english" ? "delete" : "حذف"}
                  </button> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;
