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
    Title: "",
    PdfDescription: "",
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
      formData.Title.length > 0 &&
      formData.PdfDescription.name &&
      selectedUnit >= 0
    ) {
      setLoading(true);
      let data = new FormData();
      data.append("Title", formData.Title);

      data.append("PdfDescription", formData.PdfDescription);

      fetch(
        `${baseUrl}/Add_Course_To_Unit/${selectedUnit}/${language === "english" ? "eng" : "ar"}`,
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
          router.push("/courses-units");
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
