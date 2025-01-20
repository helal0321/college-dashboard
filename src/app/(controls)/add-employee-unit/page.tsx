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
  const [units, setUnits] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedUnit, setSelectedUnit] = useState(-1);
  const [formData, setFormData] = useState({
    Name: "",
    Job_Title: "",
    Resume: "",
  });
  const fetchUnits = async () => {
    const res = await fetch(
      `${baseUrl}/api/Unit/${language === "english" ? "eng" : "ar"}`,
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
    setUnits(data);
  };

  const sendFormData = () => {
    console.log(selectedUnit);
    if (
      formData.Name.length > 0 &&
      formData.Resume.name &&
      formData.Job_Title.length > 0 &&
      selectedUnit >= 0
    ) {
      setLoading(true);
      let data = new FormData();
      data.append("Name", formData.Name);
      data.append("Job_Title", formData.Job_Title);

      data.append("Resume", formData.Resume);

      fetch(
        `${baseUrl}/Add_Emloyee_To_Unit/${selectedUnit}/${language === "english" ? "eng" : "ar"}`,
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
          router.push("/employees-units");
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
    setSelectedUnit(units[0]?.id);
  }, [units]);
  useEffect(() => {
    fetchUnits();
  }, []);

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
          <p>{language === "english" ? "name" : "الاسم"}</p>
          <TextInput
            placeholder={
              language === "english" ? "add employee name" : "أضف اسم الموظف "
            }
            value={formData.Name}
            onChange={(e) => {
              setFormData({ ...formData, Name: e.target.value });
            }}
          />
          <p>{language === "english" ? "job title" : "المسمي الوظيفي"}</p>
          <TextInput
            placeholder={
              language === "english"
                ? "add employee job title"
                : "أضف المسمي الوظيفي  "
            }
            value={formData.Job_Title}
            onChange={(e) => {
              setFormData({ ...formData, Job_Title: e.target.value });
            }}
          />

          <p>{language === "english" ? "resume" : "السيرة الذاتية"}</p>
          <TextInput
            type="file"
            placeholder={
              language === "english" ? "add PDF description" : "أضف ملف الوصف"
            }
            onChange={(e) => {
              setFormData({ ...formData, Resume: e.target.files[0] });
            }}
          />

          <>
            <p>{language === "english" ? "unit" : "الوحده"}</p>
            <select
              className="bg-secondary w-full p-4 rounded-md mb-8"
              value={selectedUnit}
              onChange={(e) => {
                console.log(e.target.value);
                setSelectedUnit(e.target.value);
              }}
            >
              {units.map((unit, index) => (
                <option key={index} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
          </>
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
