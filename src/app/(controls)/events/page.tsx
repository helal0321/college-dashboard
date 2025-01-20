"use client";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import { apiToken, baseUrl } from "../constants";
import { useSelector } from "react-redux";

const Patients = () => {
  const language = useSelector((state) => state.language);

  const [loading, setLoading] = useState(true);

  const [selectedOption, setSelectedOption] = useState(null);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(
        `${baseUrl}/Get_All_Events/${language === "english" ? "eng" : "ar"}`,
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
      setEvents(data);
      setLoading(false);
      console.log(data);
    };
    fetchData();
  }, []);
  return (
    <div className="bg-main h-[100vh] overflow-y-scroll">
      <div
        className="text-white w-[1200px] mx-auto py-20"
        style={{ direction: language === "english" ? "ltr" : "rtl" }}
      >
        <h1 className="text-center text-4xl font-bold text-third">
          {language === "english"
            ? "add or view or delete event"
            : "إضافة أو عرض أو حذف الفعالية"}
        </h1>
        <p className="font-bold text-center text-xl mt-4 ">
          {language === "english"
            ? "here you can manage event data"
            : "هنا يمكنك ادارة بيانات الفعاليات"}
        </p>
        <p className="mt-10 text-2xl font-bold text-center">
          {language === "english" ? "new event:" : "فعالية جديدة"}
        </p>
        <Link
          href="add-event"
          className="bg-third w-fit mx-auto text-lg px-8 py-4 rounded-lg block mt-6"
        >
          {language === "english" ? "add event" : "اضافة فعالية"}
        </Link>
        <p className="text-center font-bold text-4xl my-10">
          {language === "english"
            ? "list of all events"
            : "قائمة لجميع الفعاليات"}
        </p>
        {loading ? (
          <div className="w-14 h-14 rounded-full border border-third border-4 border-b-transparent mt-20 animate-spin mx-auto"></div>
        ) : (
          <div className="bg-secondary p-6 rounded-lg">
            <div className="flex justify-between items-center border border-x-0 border-t-0 pb-2 border-third">
              <p className="text-center w-1/6 font-bold text-third">
                {language === "english" ? "Image" : "صورة"}
              </p>
              <p className="text-center w-1/6 font-bold text-third">
                {language === "english" ? "Title" : "العنوان"}
              </p>

              <p className="text-center w-1/6 font-bold text-third">
                {language === "english" ? "Date" : "التاريخ"}
              </p>

              <p className="text-center w-1/6 font-bold text-third">
                {language === "english" ? "action" : "الاجراء"}
              </p>
            </div>
            {events.map((event, index) => (
              <div
                key={event.eventId}
                className="flex justify-between items-center border border-x-0 border-t-0 pb-2 border-third py-4"
              >
                <p className="text-center w-1/6">
                  <img src={event.img} className="w-20 h-20" />
                </p>
                <p className="text-center w-1/6">{event.name}</p>
                <p className="text-center w-1/6">{event.event_Start_Date}</p>

                <div className="w-1/6 flex justify-center relative">
                  <button
                    onClick={() => {
                      if (selectedOption === index) setSelectedOption(null);
                      else {
                        setSelectedOption(index);
                      }
                    }}
                  >
                    <span
                      className={`bg-white w-2 ${
                        language === "english" ? "mr-1" : "ml-1"
                      } h-2 inline-block rounded-full`}
                    ></span>
                    <span
                      className={`bg-white w-2 ${
                        language === "english" ? "mr-1" : "ml-1"
                      } h-2 inline-block rounded-full`}
                    ></span>
                    <span className="bg-white w-2 h-2 inline-block rounded-full"></span>
                  </button>
                  <div
                    className={`absolute ${
                      language === "english" ? "left-0" : "right-0"
                    } flex flex-col bg-main p-4 border border-1 bottom-[70%] z-20 rounded-lg border-third ${
                      selectedOption !== index && "hidden"
                    }`}
                  >
                    <Link
                      href={`/update-event/${event.eventId}`}
                      className="bg-third text-sm mb-2 px-2 py-1 rounded-md text-center"
                    >
                      {language === "english" ? "update" : "تعديل"}
                    </Link>
                    <button
                      className="bg-red-600  px-2 py-1 text-sm rounded-md text-center "
                      onClick={() => {
                        fetch(`${baseUrl}/Delete_Event/${event.eventId}`, {
                          method: "delete",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${
                              JSON.parse(localStorage.getItem("userData")).token
                            }`,
                          },
                        })
                          .then((res) => {
                            console.log(res, "hjg");
                            setEvents(
                              events.filter(
                                (element) => event.eventId !== element.eventId
                              )
                            );
                            setSelectedOption(null);
                          })

                          .catch((error) => {
                            console.log(error.message);
                          });
                      }}
                    >
                      {language === "english" ? "delete" : "حذف"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* <div className="w-[1000px] mx-auto">
          {patients.map((patient, index) => (
            <div
              key={index}
              className="bg-secondary p-4 mb-5  rounded-lg text-lg flex justify-between items-center relative"
            >
              <p className="w-1/3">{patient.name}</p>
              <p className="w-1/3 flex justify-center">
                health status:{" "}
                {patient.latestHealthStatus === null
                  ? "not specified"
                  : patient.latestHealthStatus}
              </p>
              <div className="w-1/3 flex justify-end">
                <button
                  onClick={() => {
                    if (selectedOption === index) setSelectedOption(null);
                    else {
                      setSelectedOption(index);
                    }
                  }}
                >
                  <span className="bg-white w-2 mr-1 h-2 inline-block rounded-full"></span>
                  <span className="bg-white w-2 mr-1 h-2 inline-block rounded-full"></span>
                  <span className="bg-white w-2 h-2 inline-block rounded-full"></span>
                </button>
              </div>
              <div
                className={`absolute right-4 flex flex-col bg-main p-4 border border-1 bottom-[70%] z-20 rounded-lg border-third ${selectedOption !== index && "hidden"}`}
              >
                <Link
                  href={`/details/${patient.name}/${patient.id}`}
                  className="bg-orange-600 text-sm mb-2 px-2 py-1 rounded-md"
                >
                  details
                </Link>
                <Link
                  href={`/update-patient/${patient.name}/${patient.id}`}
                  className="bg-third text-sm mb-2 px-2 py-1 rounded-md"
                >
                  update
                </Link>
                <button
                  className="bg-red-600 px-2 py-1 text-sm rounded-md"
                  onClick={() => {
                    fetch(
                      `https://devapi.runasp.net/api/Patients/${patient.id}`,
                      {
                        method: "delete",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: apiToken,
                        },
                      }
                    )
                      .then((res) => {
                        console.log(res, "hjg");
                        setPatients(
                          patients.filter(
                            (element) => patient.id !== element.id
                          )
                        );
                        setSelectedOption(null);
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
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Patients;
