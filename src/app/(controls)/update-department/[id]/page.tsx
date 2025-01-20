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

const UpdateDepartment = ({ params }) => {
  const { id } = React.use(params);
  const language = useSelector((state) => state.language);
  const [employees, setEmployees] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    headOfDepartmentId: 0,
  });
  const fetchEmployees = async () => {
    const res = await fetch(
      `${baseUrl}/Get_All_Employees/${language === "english" ? "eng" : "ar"}`,
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
    setEmployees(data);
  };
  const sendFormData = () => {
    if (
      formData.name.length > 0 &&
      formData.description.length > 0 &&
      formData.headOfDepartmentId > 0
    ) {
      setLoading(true);
      fetch(
        `${baseUrl}/Update_Department/${id}/${language === "english" ? "eng" : "ar"}`,
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
          return res.json();
        })
        .then((res) => {
          setLoading(false);
          console.log(res, "department created");
          router.push("/department");
        })
        .catch((error) => {
          console.log(error.message);
          setErrorMessage(
            language === "english"
              ? "Error creating department. Please try again."
              : "خطأ في إنشاء القسم. الرجاء المحاولة مرة أخرى."
          );
        });
    } else {
      setErrorMessage(
        language === "english" ? "All fields are required" : "كل الحقول مطلوبة"
      );
    }
  };
  const fetchDepartmentData = async () => {
    fetch(
      `${baseUrl}/Get_Department_By_Id/${id}/${language === "english" ? "eng" : "ar"}`,
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
          headOfDepartmentId: res.employeeId,
        });
        console.log(res);
      });
  };
  useEffect(() => {
    fetchDepartmentData();
    fetchEmployees();
  }, []);

  return (
    <div className="bg-image h-[100vh] relative">
      <Overlay />
      <Box>
        <h1 className="text-center font-bold text-4xl text-third">
          {language === "english" ? "Department data" : "بيانات القسم"}
        </h1>
        <p className="font-bold text-center mt-4 mb-10">
          {language === "english"
            ? "Please add department data"
            : "من فضلك ادخل بيانات القسم"}
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
          <p>{language === "english" ? "Head" : "الرئيس"}</p>
          <select
            className="bg-secondary w-full p-4 rounded-md mb-8"
            onChange={(e) => {
              setFormData({ ...formData, headOfDepartmentId: +e.target.value });
            }}
            value={formData.headOfDepartmentId}
          >
            {employees.map((employee, index) => (
              <option key={index} value={employee.employeeId}>
                {employee.name}
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

export default UpdateDepartment;
