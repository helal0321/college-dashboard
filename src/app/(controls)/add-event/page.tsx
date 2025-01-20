"use client";
import Box from "@/components/Box";
import Button from "@/components/Button";
import Overlay from "@/components/Overlay";
import TextInput from "@/components/textInput";
import React from "react";
import { useState, useEffect } from "react";
import { apiToken, baseUrl } from "../constants";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const AddEvents = () => {
  const language = useSelector((state) => state.language);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    Event_Start_Date: "",
    Image: "",
  });

  const sendFormData = () => {
    console.log(formData);
    if (
      formData.Name.length > 0 &&
      formData.Description.length > 0 &&
      formData.Event_Start_Date.length > 0 &&
      formData.Image.name
    ) {
      setLoading(true);
      let data = new FormData();
      data.append("Name", formData.Name);
      data.append("Description", formData.Description);
      data.append("Event_Start_Date", formData.Event_Start_Date);
      data.append("Image", formData.Image);
      fetch(
        `${baseUrl}/Create_Event/${language === "english" ? "eng" : "ar"}`,
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
          console.log(res);
          setLoading(false);
          router.push("/events");
        })

        .catch((error) => {
          console.log(error);
        });
    } else {
      setErrorMessage(
        language === "english" ? "all fields are required" : "كل الحقول مطلوبة"
      );
    }
  };

  return (
    <div className="bg-image h-[100vh] relative">
      <Overlay />
      <Box>
        <h1 className="text-center font-bold text-4xl text-third">
          {language === "english" ? "events data" : "بيانات الاحداث"}
        </h1>
        <p className="font-bold text-center mt-4 mb-10">
          {language === "english"
            ? "please add events data"
            : "يرجى إضافة بيانات الاحداث"}
        </p>
        <div className="overflow-y-scroll h-[calc(100vh-350px)] custom-scroll pr-3">
          <p>{language === "english" ? "Title" : "العنوان"}</p>
          <TextInput
            placeholder={
              language === "english" ? "add title" : "اضف عنوان الخبر"
            }
            value={formData.Name}
            onChange={(e) => {
              setFormData({ ...formData, Name: e.target.value });
            }}
          />
          <p>{language === "english" ? "Description" : "الوصف"}</p>
          <TextInput
            placeholder={
              language === "english" ? "add description" : "اضف وصف للخبر"
            }
            value={formData.Description}
            onChange={(e) => {
              setFormData({ ...formData, Description: e.target.value });
            }}
          />
          <p>{language === "english" ? "Date" : "التاريخ"}</p>
          <TextInput
            type="date"
            placeholder={
              language === "english" ? "add date" : "اضف تاريخ الخبر"
            }
            value={formData.Event_Start_Date}
            onChange={(e) => {
              setFormData({ ...formData, Event_Start_Date: e.target.value });
            }}
          />
          <p>{language === "english" ? "Image" : "صورة"}</p>

          <TextInput
            type="file"
            placeholder={
              language === "english" ? "upload image" : "ادخل الصورة"
            }
            onChange={(e) => {
              setFormData({ ...formData, Image: e.target.files[0] });
            }}
          />
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

export default AddEvents;
