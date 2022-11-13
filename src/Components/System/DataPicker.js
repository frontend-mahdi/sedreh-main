import React, { useState } from "react";
import DatePicker from "react-datepicker2";

export default function DataPicker() {
  const [startDate, setStartDate] = useState(new Date("2014/02/08"));
  const [endDate, setEndDate] = useState(new Date("2014/02/10"));

  window.localStorage.setItem("start", startDate.toISOString().split("T")[0]);
  window.localStorage.setItem("end", endDate.toISOString().split("T")[0]);
  return (
    <div className="data-picker">
      <div className="mb-2 flex">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className="bg-black-rgba rounded-lg"
          placeholder="افزودن تاریخ"
          persianDigits={true}
          isGregorian={false}
          showTodayButton={true}
          timePicker={true}
          inputJalaaliFormat="jYYYY/jM/jD"
        />
        <p className="text-grayer flex justify-center items-center mb-2 ml-4">
          مبدا زمانی
        </p>
      </div>
      <div className="flex">
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className="bg-black-rgba rounded-lg"
          placeholder="افزودن تاریخ"
          persianDigits={true}
          isGregorian={false}
          showTodayButton={true}
          timePicker={true}
          inputJalaaliFormat="jYYYY/jM/jD"
        />
        <p className="text-grayer flex justify-center items-center mb-2 ml-4">
          مقصد زمانی
        </p>
      </div>
    </div>
  );
}
