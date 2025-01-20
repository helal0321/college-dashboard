"use client";
import Box from "@/components/Box";
import Button from "@/components/Button";
import Overlay from "@/components/Overlay";
import TextInput from "@/components/textInput";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { baseUrl } from "../../constants";

const UpdateNews = ({ params }) => {
  const { id } = React.use(params);
  const language = useSelector((state) => state.language);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    News_Date: "",
    Image: "",
  });

  const sendFormData = () => {
    console.log(formData);
    if (
      formData.Name.length > 0 &&
      formData.Description.length > 0 &&
      formData.News_Date.length > 0 &&
      formData.Image.name
    ) {
      setLoading(true);
      let data = new FormData();
      data.append("Name", formData.Name);
      data.append("Description", formData.Description);
      data.append("News_Date", formData.News_Date);
      data.append("Image", formData.Image);
      fetch(
        `${baseUrl}/Update_News/${id}/${language === "english" ? "eng" : "ar"}`,
        {
          method: "PUT",
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
          router.push("/news");
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
  const fetchNewsData = async () => {
    fetch(
      `${baseUrl}/Get_News_By_Id/${id}/${language === "english" ? "eng" : "ar"}`,
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
          Name: res.name,
          Description: res.description,
          News_Date: res.news_Date,
          Image: res.img,
        });
        console.log(res);
      });
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  return (
    <div className="bg-image h-[100vh] relative">
      <Overlay />
      <Box>
        <h1 className="text-center font-bold text-4xl text-third">
          {language === "english" ? "news data" : "بيانات الأخبار"}
        </h1>
        <p className="font-bold text-center mt-4 mb-10">
          {language === "english"
            ? "please add news data"
            : "يرجى إضافة بيانات الأخبار"}
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
            value={formData.News_Date}
            onChange={(e) => {
              setFormData({ ...formData, News_Date: e.target.value });
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

export default UpdateNews;
