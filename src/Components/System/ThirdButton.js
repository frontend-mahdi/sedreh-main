import React, { useEffect, useState } from "react";
import diffrence from "../../Images/diffrence.png";
import { useSelector, useDispatch } from "react-redux";
import {
  getPolygonLoading,
  getPolygonTitle,
  getSubmitLoading,
  getButtonCompare,
  getTotalMiddlePolygon,
  getPolygonTitleRight,
  getPolygonTitleLeft,
  updatePolygonList,
  setPolyOnMap,
} from "../../features/counter/map";
import {
  getImagesHandler,
  savePolygonHandler,
} from "../../features/counter/menu";
import useSavedImages from "./customHooks/useSavedImages";
import calcCenterHandler from "./utils/calcCenter";

export default function ThirdButton() {
  const dispatch = useDispatch();
  const [isShownButton, setIsShownButton] = React.useState(true);
  const [centerPolyg, setCenterPolyg] = useState("");

  const handleClickButton = () => {
    setIsShownButton((current) => !current);
  };

  const [saveImages] = useSavedImages();

  const setCenter = (centerPolyg) => {
    dispatch(getTotalMiddlePolygon(centerPolyg));
  };

  const fetchAndShowImage = function (element, side) {
    dispatch(getPolygonLoading(true));
    fetch("http://138.201.167.227/api/get-image/", {
      method: "POST",
      body: JSON.stringify({
        image_name: element.name,
        geom: {
          type: "FeatureCollection",
          features: [JSON.parse(window.localStorage.getItem("currentPolygon"))],
        },
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(getPolygonTitle({ layerName: data, ...element }));

        if (side == "left") {
          dispatch(getPolygonTitleLeft(data));
        } else if (side == "right") {
          dispatch(getPolygonTitleRight(data));
        }
        dispatch(getPolygonLoading(false));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-row text-center w-full ">
        <div
          className="w-1/2 rounded-tl-2xl py-2"
          style={{ borderBottom: isShownButton && "4px solid #95DD91" }}
        >
          <button onClick={handleClickButton}>تصویر سمت چپ</button>
        </div>
        <div
          className="w-1/2 rounded-tl-2xl py-2"
          style={{ borderBottom: !isShownButton && "4px solid #95DD91" }}
        >
          <button onClick={handleClickButton}>تصویر سمت راست</button>
        </div>
      </div>

      {isShownButton ? (
        <div className="text-gray py-4 overflow-auto " dir="rtl">
          {saveImages.length > 0 ? (
            saveImages.map((element, index) => {
              return (
                <div
                  key={index}
                  dir="rtl"
                  className="bg-green-background w-64 h-28 rounded-lg mb-3 mx-auto"
                >
                  <div className="bg-green-background-title rounded-t-lg flex justify-between items-center">
                    <p className="flex items-center mr-4">{element.title}</p>
                    <button
                      onClick={() => {
                        fetchAndShowImage(element, "left");
                        setCenter(element.center);
                      }}
                    >
                      <img
                        src={diffrence}
                        alt="مقایسه"
                        className="w-4 h-4 ml-4"
                        title="مقایسه"
                        onClick={console.log(element.id)}
                      />
                    </button>
                  </div>
                  <div className="flex flex-col m-4">
                    {element.date}
                    <p>Sentinel-2</p>
                    <p>
                      {element.center[0]} - {element.center[1]}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center py-4">تصویر ذخیره شده ای وجود ندارد</p>
          )}
        </div>
      ) : (
        <div className="text-gray py-4 overflow-auto" dir="rtl">
          {saveImages.length > 0 ? (
            saveImages.map((element, index) => {
              return (
                <div
                  key={index}
                  dir="rtl"
                  className="bg-green-background w-64 h-28 rounded-lg mb-3 mx-auto"
                >
                  <div className="bg-green-background-title rounded-t-lg flex justify-between items-center">
                    <p className="flex items-center mr-4">{element.title}</p>
                    <button
                      onClick={() => {
                        fetchAndShowImage(element, "right");
                        setCenter(element.center);
                      }}
                    >
                      <img
                        src={diffrence}
                        alt="مقایسه"
                        className="w-4 h-4 ml-4"
                        title="مقایسه"
                        onClick={console.log(element.id)}
                      />
                    </button>
                  </div>
                  <div className="flex flex-col m-4">
                    {element.date}
                    <p>Sentinel-2</p>
                    <p>
                      {element.center[0]} - {element.center[1]}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center py-4">تصویر ذخیره شده ای وجود ندارد</p>
          )}
        </div>
      )}
    </div>
  );
}
