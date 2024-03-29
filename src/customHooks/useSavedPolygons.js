import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useSavedPolygons = () => {
  const [savedPolygons, setSavedPolygons] = useState([]);
  const _savedPolygons = useSelector((state) => state.menu.savedPolygons);

  useEffect(() => {
    console.log("savedPolygons", _savedPolygons);
    // if (_savedPolygons.length > 0) {
    setSavedPolygons(_savedPolygons);
    window.localStorage.setItem(
      "savedPolygons",
      JSON.stringify(_savedPolygons)
    );
    // }
  }, [_savedPolygons]);
  return [savedPolygons];
};

export default useSavedPolygons;
