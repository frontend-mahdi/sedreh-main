import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
export const convertGeorgToPersian = (date) => {
  return new DateObject({
    // 1400-09-12
    date,
    format: "YYYY-MM-DD",
  })
    .convert(persian, persian_fa)
    .format();
};
