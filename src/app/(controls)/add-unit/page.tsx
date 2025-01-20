"use client";
import Box from "@/components/Box";
import Button from "@/components/Button";
import Overlay from "@/components/Overlay";
import TextInput from "@/components/textInput";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { baseUrl } from "../constants";

const CreateUnit = () => {
  const language = useSelector((state) => state.language);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const sendFormData = () => {
    if (formData.name.length > 0 && formData.description.length > 0) {
      setLoading(true);
      fetch(`${baseUrl}/api/Unit/${language === "english" ? "eng" : "ar"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userData")).token
          }`,
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          setLoading(false);
          console.log(res, "unit created");
          router.push("/units");
        })
        .catch((error) => {
          console.log(error.message);
          setErrorMessage(
            language === "english"
              ? "Error creating unit. Please try again."
              : "خطأ في إنشاء الوحدة. الرجاء المحاولة مرة أخرى."
          );
        });
    } else {
      setErrorMessage(
        language === "english" ? "All fields are required" : "كل الحقول مطلوبة"
      );
    }
  };

  return (
    <div className="bg-image h-[100vh] relative">
      <Overlay />
      <Box>
        <h1 className="text-center font-bold text-4xl text-third">
          {language === "english" ? "Unit data" : "بيانات الوحدة"}
        </h1>
        <p className="font-bold text-center mt-4 mb-10">
          {language === "english"
            ? "Please add unit data"
            : "من فضلك ادخل بيانات الوحدة"}
        </p>
        <div className="overflow-y-scroll h-[calc(100vh-350px)] custom-scroll pr-3">
          <p>{language === "english" ? "Name" : "الاسم"}</p>
          <TextInput
            placeholder={language === "english" ? "Enter name" : "ادخل الاسم"}
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
          <p>{language === "english" ? "Description" : "الوصف"}</p>
          <TextInput
            placeholder={
              language === "english" ? "Enter description" : "ادخل الوصف"
            }
            value={formData.description}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
            }}
          />
        </div>
        <p className="text-red-600">{errorMessage}</p>
        <Button
          label={language === "english" ? "Save data" : "حفظ البيانات"}
          loading={loading}
          onClick={sendFormData}
        />
      </Box>
    </div>
  );
};

export default CreateUnit;
