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

const Patient = ({ params }) => {
  const { id } = React.use(params);
  const language = useSelector((state) => state.language);
  const [departments, setDepartment] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    EmployeeId: id,
    email: "",
    password: "",
    Name: "",
    Job_Title: "",
    Resume: "",
    DepartmentId: 0,
    Image: "",
  });

  const sendFormData = () => {
    console.log(formData);
    if (
      formData.Name.length > 0 &&
      formData.email.length > 0 &&
      formData.password.length > 0 &&
      formData.Job_Title.length > 0 &&
      formData.Image.name &&
      formData.Resume.name
    ) {
      console.log(formData);
      let data = new FormData();
      data.append("EmployeeId", formData.EmployeeId);
      data.append("Name", formData.Name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("Job_Title", formData.Job_Title);
      data.append("Image", formData.Image);
      data.append("Resume", formData.Resume);

      data.append("DepartmentId", formData.DepartmentId);

      setLoading(true);
      fetch(
        `${baseUrl}/Update_Employee/${id}/${language === "english" ? "eng" : "ar"}`,
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
          setLoading(false);
          console.log(res.statusCode);
          if (res.statusCode !== 400) {
            console.log(res, "hjg");
            router.push("/employees");
          } else {
            console.log(res.errors);
          }
        })
        .catch((error) => {
          setErrorMessage(error);
          console.log(error, "popop");
        });
    } else {
      setErrorMessage(
        language === "english" ? "all fields are required" : "كل الحقول مطلوبة"
      );
    }
  };
  const fetchEmployeeData = async () => {
    fetch(
      `${baseUrl}/Get_Employee_By_Id/${id}/${language === "english" ? "eng" : "ar"}`,
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
          EmployeeId: id,
          email: res.email,
          Name: res.name,
          Job_Title: res.job_Title,
          Resume: res.resume,
          Image: res.image,
          DepartmentId: res.departmentId,
          password: "",
        });
        console.log(res);
      });
  };

  const fetchDepartments = async () => {
    const res = await fetch(
      `${baseUrl}/Get_All_Departments/${language === "english" ? "eng" : "ar"}`,
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
    setDepartment(data);
  };

  useEffect(() => {
    fetchEmployeeData();
    fetchDepartments();
  }, []);
  return (
    <div className="bg-image h-[100vh] relative">
      <Overlay />
      <Box>
        <h1 className="text-center font-bold text-4xl text-third">
          {language === "english" ? "employee data" : "بيانات الموظف"}
        </h1>
        <p className="font-bold text-center mt-4 mb-10">
          {language === "english"
            ? "please add employee data"
            : "من فضلك ادخل بيانات الموظف"}
        </p>
        <div className="overflow-y-scroll h-[calc(100vh-350px)] custom-scroll pr-3">
          <p>{language === "english" ? "user name:" : "اسم المستخدم:"}</p>
          <TextInput
            placeholder={
              language === "english" ? "employee name" : "اسم الموظف"
            }
            value={formData.Name}
            onChange={(e) => {
              setFormData({ ...formData, Name: e.target.value });
            }}
          />
          <p>{language === "english" ? "job title:" : ":المسمي الوظيفي"}</p>
          <TextInput
            placeholder={
              language === "english" ? "write job title" : "المسمي الوظيفي"
            }
            value={formData.Job_Title}
            onChange={(e) => {
              setFormData({ ...formData, Job_Title: e.target.value });
            }}
          />

          <p>{language === "english" ? "email:" : "الايميل"}</p>
          <TextInput
            placeholder={
              language === "english" ? "employee email" : "ايميل الموظف"
            }
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
          <p>{language === "english" ? "password:" : "الباسورد"}</p>
          <TextInput
            type="password"
            placeholder={
              language === "english" ? "employee password" : "كلمة مرور الموظف"
            }
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
          <p>{language === "english" ? "Department" : "القسم"}</p>
          <select
            className="bg-secondary w-full p-4 rounded-md mb-8"
            value={formData.DepartmentId || 5}
            onChange={(e) => {
              setFormData({ ...formData, DepartmentId: +e.target.value });
            }}
          >
            {departments.map((department, index) => (
              <option key={index} value={department.departmentId}>
                {department.name}
              </option>
            ))}
          </select>

          <p>{language === "english" ? "CV" : "السيرةالذاتيه"}</p>
          <TextInput
            type="file"
            placeholder={
              language === "english" ? "upload cv" : "تحميل السيرة الذاتيه"
            }
            onChange={(e) => {
              setFormData({ ...formData, Resume: e.target.files[0] });
            }}
          />
          <p>{language === "english" ? "image" : "صورة"}</p>
          <TextInput
            type="file"
            placeholder={
              language === "english" ? "upload image" : "تحميل صورة "
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

export default Patient;
