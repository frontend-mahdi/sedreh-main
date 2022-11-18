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
import useSavedPolygons from "./customHooks/useSavedPolygons";

export default function SecondButton() {
  const fetchedImages = useSelector((state) => state.menu.fetchedImagesEmpty);

  // custom hook
  const [savedPolygons] = useSavedPolygons();

  const dispatch = useDispatch();

  const setShape = (shape) => {
    dispatch(setPolyOnMap(shape));
  };

  return (
    <div className="h-12 w-full flex">
      <div className="w-full rounded-tl-2xl flex justify-center items-center flex-col">
        <p className="mb-2"> محدوده های ذخیره شده</p>
        <div className="w-full h-1 bg-primarythree">
          {savedPolygons.length > 0 ? (
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
            ))
          ) : (
            <p className="text-center py-4">محدودی ذخیره شده ای وجود ندارد</p>
          )}
        </div>
      </div>
    </div>
  );
}
