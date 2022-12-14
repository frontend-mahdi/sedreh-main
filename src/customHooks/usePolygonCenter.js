import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import calcCenterHandler from "../handlers/calcCenter";

const usePolygonCenter = () => {
  const polygon = useSelector((state) => state?.map?.polygon);

  const [centerPolyg, setCenterPolyg] = useState("");

  useEffect(() => {
    const polyArr = polygon?.geometry?.coordinates[0];
    if (polyArr?.length > 0) {
      setCenterPolyg(calcCenterHandler(polyArr));
    }
  }, [polygon]);
  return [centerPolyg];
};

export default usePolygonCenter;
