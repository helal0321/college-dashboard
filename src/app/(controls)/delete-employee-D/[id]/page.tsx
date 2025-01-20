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

const DeleteEmployeeDepartment = ({ params }) => {
  const { id } = React.use(params);
  const language = useSelector((state) => state.language);
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState(0);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchEmployees = async () => {
    const res = await fetch(
      `${baseUrl}/Get_All_Employees_In_Department/${id}/${language === "english" ? "eng" : "ar"}`,
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
    if (employeeId > 0) {
      setLoading(true);
      fetch(`${baseUrl}/Remove_Emloyee_From_Department/${id}/${employeeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userData")).token
          }`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setLoading(false);
          console.log(res, "department deleted");
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
  useEffect(() => {
    fetchEmployees();
  }, []);
  useEffect(() => {
    setEmployeeId(employees[0]?.employeeId);
  }, [employees]);
  return (
    <div className="bg-image h-[100vh] relative">
      <Overlay />
      <Box>
        <h1 className="text-center font-bold text-4xl text-third">
          {language === "english" ? "employee data" : "بيانات الموظف"}
        </h1>
        <p className="font-bold text-center mt-4 mb-10">
          {language === "english"
            ? "Please choose employee"
            : "من فضلك اختر الموظف  "}
        </p>
        <div className="overflow-y-scroll h-[calc(100vh-350px)] custom-scroll pr-3">
          <p>
            {language === "english"
              ? "choose employee to delete from the department"
              : "اختر موظف لحذفه من القسم"}
          </p>
          <select
            className="bg-secondary w-full p-4 rounded-md mb-8"
            value={employeeId}
            onChange={(e) => {
              setEmployeeId(+e.target.value);
            }}
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

export default DeleteEmployeeDepartment;
