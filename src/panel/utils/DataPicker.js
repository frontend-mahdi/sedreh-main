import moment from "moment-jalaali";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker2";

export default function DataPicker() {
  const [startDate, setStartDate] = useState(new Date("2022/10/18"));
  const [endDate, setEndDate] = useState(new Date("2022/11/01"));

  useEffect(() => {
    window.localStorage.setItem("start", startDate.toISOString().split("T")[0]);
    window.localStorage.setItem("end", endDate.toISOString().split("T")[0]);
  }, []);
  return (
    <div className="data-picker ">
      <div className="mb-2 flex" dir="rtl">
        <p className="text-Seventy flex justify-center items-center mb-2 ml-4 w-1/2">
          مبدا زمانی
        </p>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          // defaultValue
          value={moment("2022/10/18")}
          className="bg-black1-rgba rounded-lg px-2 py-1"
          placeholder="افزودن تاریخ"
          persianDigits={true}
          isGregorian={false}
          showTodayButton={true}
          timePicker={true}
          inputJalaaliFormat="jYYYY/jM/jD"
          calendarStyles={{ zIndex: "999" }}
        />
      </div>
      <div className="flex" dir="rtl">
        <p className="text-Seventy flex justify-center items-center mb-2 ml-4 w-1/2">
          مقصد زمانی
        </p>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          value={moment("2022/11/01")}
          className="bg-black1-rgba rounded-lg px-2 py-1"
          placeholder="افزودن تاریخ"
          persianDigits={true}
          isGregorian={false}
          showTodayButton={true}
          timePicker={true}
          inputJalaaliFormat="jYYYY/jM/jD"
          calendarStyles={{ zIndex: "999" }}
        />
      </div>
    </div>
  );
}
