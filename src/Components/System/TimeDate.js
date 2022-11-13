import React, { useState, useEffect } from "react";

const useTimeDate = () => {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 60000);
  }, []);
  return [
    {
      date: dateState.toLocaleDateString("fa-IR-u-nu-latn", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      time: dateState.toLocaleString("fa-IR-u-nu-latn", {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }),
    },
  ];
};

export default useTimeDate;
