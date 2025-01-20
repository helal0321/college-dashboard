"use client";
import { apiToken } from "../../constants";
import Box from "@/components/Box";
import Button from "@/components/Button";
import Overlay from "@/components/Overlay";
import TextInput from "@/components/textInput";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const Page = ({ params }) => {
  const language = useSelector((state) => state.language);

  const { id } = React.use(params);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    glucoseLevel: "",
    bloodPressure: "",
    temperature: "",
    patientId: id,
  });

  const sendFormData = () => {
    if (
      formData.date.length > 0 &&
      formData.time.length > 0 &&
      formData.glucoseLevel.length > 0 &&
      formData.bloodPressure.length > 0 &&
      formData.temperature.length > 0
    ) {
      setLoading(true);
      fetch("https://devapi.runasp.net/api/PhysiologicalIndicators", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("userData")).token}`,
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          setLoading(false);
          console.log(res, "hjg");
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
  return (
    <div className="bg-image h-[100vh] relative">
      <Overlay />
      <Box>
        <h1 className="text-center font-bold text-4xl text-third">
          {language === "english" ? "indicator data" : "بيانات المؤشر"}
        </h1>
        <p className="font-bold text-center mt-4 mb-10">
          {language === "english"
            ? "please add indicator data"
            : "من فضلك ادخل بيانات المؤشر"}
        </p>
        <div className="overflow-y-scroll h-[calc(100vh-350px)] custom-scroll pr-3">
          <p>{language === "english" ? "date:" : "التاريخ:"}</p>
          <TextInput
            placeholder={
              language === "english" ? "indicator date" : "تاريخ المؤشر"
            }
            value={formData.date}
            onChange={(e) => {
              setFormData({ ...formData, date: e.target.value });
            }}
            type="date"
          />

          <p>{language === "english" ? "time:" : "الوقت"}</p>

          <TextInput
            placeholder={
              language === "english" ? "indicator time" : "وقت المؤشر"
            }
            value={formData.time}
            onChange={(e) => {
              setFormData({ ...formData, time: e.target.value });
            }}
            type="time"
          />
          <p>{language === "english" ? "glucose level:" : "مستوي السكر"}</p>
          <TextInput
            placeholder={
              language === "english"
                ? "patient glucose level"
                : "مستوي سكر المريض"
            }
            value={formData.glucoseLevel}
            onChange={(e) => {
              setFormData({ ...formData, glucoseLevel: e.target.value });
            }}
          />
          <p>{language === "english" ? "blood pressure" : "ضغط السكر"}</p>
          <TextInput
            placeholder={
              language === "english"
                ? "patient blood pressure"
                : "ضغط سكر المريض"
            }
            value={formData.bloodPressure}
            onChange={(e) => {
              setFormData({ ...formData, bloodPressure: e.target.value });
            }}
          />
          <p>{language === "english" ? "temperature" : "درجة الحرارة"}</p>
          <TextInput
            placeholder={
              language === "english"
                ? "patient temperature"
                : "درجة حرارة المريض"
            }
            value={formData.temperature}
            onChange={(e) => {
              setFormData({ ...formData, temperature: e.target.value });
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

export default Page;
