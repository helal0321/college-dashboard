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

const CreateService = () => {
  const language = useSelector((state) => state.language);
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    Title: "",
    PdfDescription: "",
  });

  const sendFormData = () => {
    if (
      formData.Title.length > 0 &&
      formData.PdfDescription.name &&
      categoryId > 0
    ) {
      setLoading(true);
      let data = new FormData();
      data.append("Title", formData.Title);
      data.append("PdfDescription", formData.PdfDescription);

      fetch(
        `${baseUrl}/api/Service/${categoryId}/${language === "english" ? "eng" : "ar"}`,
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
          console.log(res, "service created");
          router.push("/service");
        })
        .catch((error) => {
          console.log(error.message);
          setErrorMessage(
            language === "english"
              ? "Error creating service. Please try again."
              : "خطأ في إنشاء الخدمة. الرجاء المحاولة مرة أخرى."
          );
        });
    } else {
      setErrorMessage(
        language === "english" ? "All fields are required" : "كل الحقول مطلوبة"
      );
    }
  };
  const fetchCategories = async () => {
    const res = await fetch(
      `${baseUrl}/api/Category/All/${language === "english" ? "eng" : "ar"}`,
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
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="bg-image h-[100vh] relative">
      <Overlay />
      <Box>
        <h1 className="text-center font-bold text-4xl text-third">
          {language === "english" ? "Service data" : "بيانات الخدمة"}
        </h1>
        <p className="font-bold text-center mt-4 mb-10">
          {language === "english"
            ? "Please add service data"
            : "من فضلك ادخل بيانات الخدمة"}
        </p>
        <div className="overflow-y-scroll h-[calc(100vh-350px)] custom-scroll pr-3">
          <p>{language === "english" ? "Title" : "العنوان"}</p>
          <TextInput
            placeholder={language === "english" ? "Enter name" : "ادخل الاسم"}
            value={formData.Title}
            onChange={(e) => {
              setFormData({ ...formData, Title: e.target.value });
            }}
          />
          <p>{language === "english" ? "Description" : "الوصف"}</p>
          <TextInput
            type="file"
            placeholder={
              language === "english" ? "upload description" : "تحميل الوصف"
            }
            onChange={(e) => {
              setFormData({ ...formData, PdfDescription: e.target.files[0] });
            }}
          />
          <p>{language === "english" ? "Category" : "الفئة"}</p>
          <select
            className="bg-secondary w-full p-4 rounded-md mb-8"
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
            }}
          >
            {categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
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

export default CreateService;
