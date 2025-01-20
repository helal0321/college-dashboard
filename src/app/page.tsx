"use client";
import Box from "@/components/Box";
import Button from "@/components/Button";
import Overlay from "@/components/Overlay";
import TextInput from "@/components/textInput";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
export default function SignIn() {
  const language = useSelector((state) => state.language);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const sendFormData = () => {
    console.log(formData);
    if (formData.email.length > 0 && formData.password.length > 0) {
      setLoading(true);
      fetch(
        `https://fca1.runasp.net/api/Accounts/Login/${language === "english" ? "eng" : "ar"}`,
        {
          method: "Post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setLoading(false);
          if (res.statusCode !== 400) {
            localStorage.setItem("userData", JSON.stringify(res));
            if (res.role === "Admin") {
              router.replace("/home");
            } else if (res.role === "Doctor") {
              router.replace(`/update-employee/${res.id}`);
            }
          } else {
            setErrorMessage(res.message);
          }
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
    <div className="h-[100vh] bg-image relative">
      <Overlay />
      <Box>
        <h1 className="text-third font-bold text-center text-4xl mb-4">
          {language === "english" ? "sign in" : "تسجيل الدخول"}
        </h1>
        <p className="text-center font-bold text-lg mb-10">
          {language === "english"
            ? "sign in to your account"
            : "سجل دخول لحسابك الشخصي"}
        </p>
        <p className="text-lg mb-2">
          {language === "english" ? "email:" : "الايميل"}
        </p>
        <TextInput
          value={formData.email}
          placeholder={
            language === "english" ? "your email" : "الايميل الخاص بك"
          }
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
        <p className="text-lg mb-2">
          {language === "english" ? "password:" : "الباسورد"}
        </p>
        <TextInput
          type="password"
          value={formData.password}
          placeholder={
            language === "english" ? "your password" : "الباسورد الخاص بك"
          }
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />
        <p className="text-red-600">{errorMessage}</p>

        <Button
          label={language === "english" ? "sign in" : "تسجيل الدخول"}
          loading={loading}
          onClick={() => {
            sendFormData();
          }}
        />
      </Box>
    </div>
  );
}
