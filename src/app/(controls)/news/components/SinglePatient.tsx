import Link from "next/link";
import React from "react";
import { useState } from "react";
const SinglePatient = ({ patient }) => {
  const [optionsOpenned, setOptionsOpenned] = useState(false);
  return (
    <div className="bg-secondary p-4 mb-5 rounded-lg text-lg flex justify-between items-center relative">
      <p className="w-1/3">{patient.name}</p>
      <p className="w-1/3 flex justify-center">
        health status: {patient.latestHealthStatus}
      </p>
      <div className="w-1/3 flex justify-end">
        <button
          onClick={() => {
            setOptionsOpenned(!optionsOpenned);
          }}
        >
          <span className="bg-white w-2 mr-1 h-2 inline-block rounded-full"></span>
          <span className="bg-white w-2 mr-1 h-2 inline-block rounded-full"></span>
          <span className="bg-white w-2 h-2 inline-block rounded-full"></span>
        </button>
      </div>
      <div
        className={`absolute right-4 flex flex-col bg-main p-4 border border-1 bottom-[80%] z-20 rounded-lg border-third ${!optionsOpenned && "hidden"}`}
      >
        <Link
          href={`/update-patient/${patient.id}`}
          className="bg-orange-600 text-sm mb-2 px-2 py-1 rounded-md"
        >
          details
        </Link>
        <Link
          href={`/update-patient/${patient.id}`}
          className="bg-third text-sm mb-2 px-2 py-1 rounded-md"
        >
          update
        </Link>
        <button
          className="bg-red-600 px-2 py-1 text-sm rounded-md"
          onClick={() => {
            fetch(`https://devapi.runasp.net/api/HospitalDash/${hospital.id}`, {
              method: "delete",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJBZG1pbkBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTczMjc5NjY0NCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzExMyIsImF1ZCI6Ik15U2VjdXJlS2V5In0.QFwY4u83Jdqq9mOShsoF1SGHRADPAikxt5muvLPJsUM`,
              },
            })
              .then((res) => {
                console.log(res, "hjg");
                setHospitals(
                  hospitals.filter((element) => hospital.id !== element.id)
                );
              })

              .catch((error) => {
                console.log(error.message);
              });
          }}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default SinglePatient;
