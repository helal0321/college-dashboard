"use client";
import Box from "@/components/Box";
import Button from "@/components/Button";
import Overlay from "@/components/Overlay";
import TextInput from "@/components/textInput";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiToken, baseUrl } from "../constants";
import { useSelector } from "react-redux";
const AddCourse = () => {
  const language = useSelector((state) => state.language);
  const [departments, setDepartment] = useState([]);
  const [levelYears, setLevelYears] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    Title: "",
    LevelYearId: 0,
    PdfDescription: "",
  });
  const fetchDepartments = async () => {
    const res = await fetch(
      `${baseUrl}/Get_All_Departments/${language === "english" ? "eng" : "ar"}`,
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
    setDepartment(data);
  };

  const fetchLevelYears = async () => {
    const res = await fetch(
      `${baseUrl}/api/LevelYear/${language === "english" ? "eng" : "ar"}`,
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
    setLevelYears(data);
  };
  const sendFormData = () => {
    if (
      formData.Title.length > 0 &&
      formData.PdfDescription.name &&
      formData.LevelYearId > 0
    ) {
      setLoading(true);
      console.log(formData);
      let data = new FormData();
      data.append("Title", formData.Title);
      data.append("LevelYearId", formData.LevelYearId);
      formData.LevelYearId !== 5 &&
        formData.LevelYearId !== 6 &&
        data.append("DepartmentId", formData.DepartmentId);
      data.append("PdfDescription", formData.PdfDescription);
      console.log(data);

      fetch(
        `${baseUrl}/api/Course/Create_Course/${language === "english" ? "eng" : "ar"}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userData")).token
            }`,
          },
          body: data,
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setLoading(false);
          router.push("/courses");
          console.log(res);
        })

        .catch((error) => {
          console.log(error.message);
        });
    } else {
      setErrorMessage(
        language === "english" ? "all fields are required" : "كل الحقول مطلوبة"
      );
    }
  };
  useEffect(() => {
    fetchLevelYears();
    fetchDepartments();
  }, []);
  useEffect(() => {
    if (formData.LevelYearId !== 5 && formData.LevelYearId !== 6) {
      setFormData({
        ...formData,
        DepartmentId: departments[0]?.departmentId
          ? departments[0].departmentId
          : 0,
      });
    }
  }, [departments]);
  useEffect(() => {
    setFormData({
      ...formData,
      LevelYearId: levelYears[0]?.id ? levelYears[0].id : 0,
    });
  }, [levelYears]);
  return (
    <div className="bg-image h-[100vh] relative">
      <Overlay />
      <Box>
        <h1 className="text-center font-bold text-4xl text-third">
          {language === "english" ? "course data" : "بيانات الكورس"}
        </h1>
        <p className="font-bold text-center mt-4 mb-10">
          {language === "english"
            ? "please, add Course Data"
            : "من فضلك ادخل بيانات الكورس"}
        </p>
        <div className="overflow-y-scroll h-[calc(100vh-350px)] custom-scroll pr-3">
          <p>{language === "english" ? "Title" : "العنوان"}</p>
          <TextInput
            placeholder={
              language === "english" ? "add title" : "أضف عنوان الكورس"
            }
            value={formData.Title}
            onChange={(e) => {
              setFormData({ ...formData, Title: e.target.value });
            }}
          />
          <p>{language === "english" ? "level year" : "السنة الدراسية"}</p>
          <select
            className="bg-secondary w-full p-4 rounded-md mb-8"
            value={formData.LevelYearId}
            onChange={(e) => {
              setFormData({ ...formData, LevelYearId: +e.target.value });
            }}
          >
            {levelYears.map((levelYear, index) => (
              <option key={index} value={+levelYear.id}>
                {levelYear.name}
              </option>
            ))}
          </select>
          <p>{language === "english" ? "PdfDescription" : "الوصف"}</p>
          <TextInput
            type="file"
            placeholder={
              language === "english" ? "add PDF description" : "أضف ملف الوصف"
            }
            onChange={(e) => {
              setFormData({ ...formData, PdfDescription: e.target.files[0] });
              console.log(e.target.files[0]);
            }}
          />
          {formData.LevelYearId !== 5 && formData.LevelYearId !== 6 && (
            <>
              <p>{language === "english" ? "Department" : "القسم"}</p>
              <select
                className="bg-secondary w-full p-4 rounded-md mb-8"
                value={formData.DepartmentId}
                onChange={(e) => {
                  setFormData({ ...formData, DepartmentId: +e.target.value });
                }}
              >
                {departments.map((department, index) => (
                  <option key={index} value={department.departmentId}>
                    {department.name}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
        <p className="text-red-600">{errorMessage}</p>
        <Button
          label={language === "english" ? "save data" : "حفظ البيانات"}
          loading={loading}
          onClick={() => {
            sendFormData();
          }}
        />
      </Box>
    </div>
  );
};

export default AddCourse;
