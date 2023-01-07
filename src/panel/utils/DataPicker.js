import React, { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/colors/green.css";
export default function DataPicker({
  placeholder,
  value,
  onChange,
  currentDate,
  readOnly,
  format,
  maxDate,
  minDate,
}) {
  const [startDate, setStartDate] = useState(new Date("2022/10/18"));
  const [endDate, setEndDate] = useState(new Date("2022/11/01"));
  const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
  useEffect(() => {
    window.localStorage.setItem("start", startDate.toISOString().split("T")[0]);
    window.localStorage.setItem("end", endDate.toISOString().split("T")[0]);
  }, []);
  return (
    <>
      <DatePicker
        className="bg-dark green"
        onOpenPickNewDate={false}
        weekDays={weekDays}
        format={format}
        calendarPosition="bottom-center"
        currentDate={currentDate}
        calendar={persian}
        locale={persian_fa}
        inputClass="text-black1 px-2 py-1 rounded bg-E4F7E3"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        maxDate={maxDate}
        minDate={minDate}
      />
      {/* <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          value={moment("2022/10/18")}
          className="bg-black1-rgba rounded-lg px-2 py-1"
          placeholder="افزودن تاریخ"
          persianDigits={true}
          isGregorian={false}
          showTodayButton={true}
          timePicker={true}
          inputJalaaliFormat="jYYYY/jM/jD"
          calendarStyles={{ zIndex: "999" }}
        /> */}
    </>
  );
}
DataPicker.defaultProps = {
  onChange: () => {},
  value: "",
  readOnly: false,
  format: "DD MMMM YYYY",
  maxDate: null,
  minDate: null,
};
