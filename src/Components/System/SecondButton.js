import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import pic from "../../Images/pic.png";
import {
  getTotalMiddlePolygon,
  updatePolygonList,
  setPolyOnMap,
} from "../../features/counter/map";
import { savePolygonHandler } from "../../features/counter/menu";
import { GrLocation } from "react-icons/gr";
import { IconContext } from "react-icons";
import calcCenterHandler from "./utils/calcCenter";

export default function SecondButton() {
  const [savedPolygons, setSavedPolygons] = useState([]);
  const _savedPolygons = useSelector((state) => state.map?.savedPolygons);

  const dispatch = useDispatch();

  useEffect(() => {
    if (_savedPolygons.length > 0) {
      console.log("savedPolygons", _savedPolygons);
      setSavedPolygons(_savedPolygons);
      window.localStorage.setItem(
        "savedPolygons",
        JSON.stringify(_savedPolygons)
      );
    }
  }, [_savedPolygons]);

  const setShape = (shape) => {
    dispatch(setPolyOnMap(shape));
  };

  useEffect(() => {
    console.log(
      "savedPolygons >>>>",
      window.localStorage.getItem("savedPolygons")
    );
    var data = window.localStorage.getItem("savedPolygons");
    setSavedPolygons(JSON.parse(data));
  }, []);

  return (
    <div className="h-12 w-full flex">
      <div className="w-full rounded-tl-2xl flex justify-center items-center flex-col">
        <p className="mb-2"> محدوده های ذخیره شده</p>
        <div className="w-full h-1 bg-primarythree">
          {!!savedPolygons &&
            savedPolygons?.map((item, index) => (
              <div
                key={index}
                dir="rtl"
                className="bg-green-background w-64 h-12 rounded-lg mt-8"
              >
                <div className="bg-green-background-title mb-1 mt-1 rounded-t-lg ">
                  <div className="flex items-center mr-4  justify-between">
                    <p>{item.title}</p>
                    <button
                      onClick={() => setShape(item.shape)}
                      className="ml-4"
                    >
                      {/* <IconContext.Provider
                        value={{
                          color: "white",
                          style: { color: "white" },
                        }}
                      >
                        <>
                          <GrLocation color="white" />
                        </>
                      </IconContext.Provider> */}
                      <GrLocation color="#fff " />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col justify-center mr-4">
                  <p>
                    {item.center[0]}-{item.center[1]}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
