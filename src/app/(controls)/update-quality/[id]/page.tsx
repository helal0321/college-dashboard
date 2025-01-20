"use client";
import Box from "@/components/Box";
import Button from "@/components/Button";
import Overlay from "@/components/Overlay";
import TextInput from "@/components/textInput";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { baseUrl } from "../..//constants";
const AddQuality = ({ params }) => {
  const language = useSelector((state) => state.language);
  const { id } = React.use(params);
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
      fetch(
        `${baseUrl}/Update_Quality/${id}/${language === "english" ? "eng" : "ar"}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("userData")).token
            }`,
          },
          body: JSON.stringify(formData),
        }
      )
        .then((res) => {
          setLoading(false);
          console.log(res, "hjg");
          router.push("/quality");
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
  const fetchQualityData = async () => {
    fetch(
      `${baseUrl}/Get_Quality_By_Id/${id}/${language === "english" ? "eng" : "ar"}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userData")).token
          }`,

          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setFormData({
          name: res.name,
          description: res.description,
        });
        console.log(res);
      });
  };
  useEffect(() => {
    fetchQualityData();
  }, []);

  return (
    <div className="bg-image h-[100vh] relative">
      <Overlay />
      <Box>
        <h1 className="text-center font-bold text-4xl text-third">
          {language === "english" ? "Quality Data" : "بيانات الجودة"}
        </h1>
        <p className="font-bold text-center mt-4 mb-10">
          {language === "english"
            ? "please add quality data"
            : "من فضلك ادخل بيانات الجوده"}
        </p>
        <div className="overflow-y-scroll h-[calc(100vh-350px)] custom-scroll pr-3">
          <p>{language === "english" ? "Title" : "العنوان"}</p>
          <TextInput
            placeholder={
              language === "english" ? "add title" : "أضف عنوان الجودة "
            }
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
          <p>{language === "english" ? "Description" : "الوصف"}</p>
          <TextInput
            placeholder={language === "english" ? "add description" : "أضف وصف"}
            value={formData.description}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
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

export default AddQuality;
