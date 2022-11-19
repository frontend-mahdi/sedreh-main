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
import { FaTrash, FaTrashAlt } from "react-icons/fa";

export default function ThirdButton() {
  const dispatch = useDispatch();
  const [isShownButton, setIsShownButton] = useState(false);
  const [selectedRight, setSelectedRight] = useState({ center: [0, 0], id: 0 });
  const [selectedLeft, setSelectedLeft] = useState({ center: [0, 0], id: 0 });
  const [centerPolyg, setCenterPolyg] = useState("");

  const handleClickButton = () => {
    setIsShownButton((current) => !current);
  };

  const [saveImages] = useSavedImages();

  const setCenter = (centerPolyg) => {
    console.log("center>>>>>>>>>>>>>", centerPolyg);
    dispatch(getTotalMiddlePolygon(centerPolyg));
  };
  const removeImageBySide = (side) => {
    if (side == "left") {
      setSelectedLeft({ center: [0, 0], id: 0 });
      dispatch(getPolygonTitleLeft(""));
    } else if (side == "right") {
      setSelectedRight({ center: [0, 0], id: 0 });
      setSelectedLeft({ center: [0, 0], id: 0 });
      dispatch(getPolygonTitleRight(""));
      dispatch(getPolygonTitleLeft(""));
    }
  };
  const fetchAndShowImage = function (element, side) {
    fetch("http://138.201.167.227/api/get-image/", {
      method: "POST",
      body: JSON.stringify({
        image_name: element.name,
        geom: {
          type: "FeatureCollection",
          features: [element.shape],
        },
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (side == "left") {
          dispatch(getPolygonTitleLeft({ layerName: data, ...element }));
        } else if (side == "right") {
          dispatch(getPolygonTitleRight({ layerName: data, ...element }));
        }
        dispatch(getPolygonLoading(false));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleRight = (element) => {
    setSelectedRight(element);
  };
  const handleLeft = (element) => {
    setSelectedLeft(element);
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
            saveImages
              .filter(
                (element) => element.center[0] == selectedRight?.center[0]
              )
              .map((element, index) => {
                return (
                  <div
                    key={index}
                    dir="rtl"
                    className="bg-green-background w-64 rounded-lg mb-3 mx-auto"
                    style={{
                      border:
                        selectedLeft.id == element.id &&
                        selectedLeft.center == element.center &&
                        "3px solid #419971",
                    }}
                  >
                    <div className="bg-green-background-title py-1 pb-0 rounded-t-lg flex justify-between items-center">
                      <p className="flex items-center mr-4">{element.title}</p>
                      <div>
                        {selectedLeft.id == element.id &&
                          selectedLeft.center == element.center && (
                            <button
                              title="حذف لایه"
                              className="px-2"
                              onClick={() => removeImageBySide("left")}
                            >
                              <FaTrashAlt fontSize=".97rem" />
                            </button>
                          )}
                        <button
                          className="disabled:bg-[#00000000] disabled:hover:bg-[#00000000]"
                          disabled={
                            selectedLeft.id != 0 &&
                            (selectedLeft.id != element.id ||
                              selectedLeft.center != element.center)
                          }
                          onClick={() => {
                            fetchAndShowImage(element, "left");
                            setCenter(element.center);
                            handleLeft(element);
                          }}
                        >
                          <img
                            src={diffrence}
                            alt="مقایسه"
                            className="w-4 h-4 ml-4"
                            title="مقایسه"
                          />
                        </button>
                      </div>
                    </div>
                    <div className="pt-2 px-2 pb-2">
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
                  className="bg-green-background w-64 rounded-lg mb-3 mx-auto"
                  style={{
                    border:
                      selectedRight.id == element.id &&
                      selectedRight.center == element.center &&
                      "3px solid #419971",
                  }}
                >
                  <div className="bg-green-background-title py-1 pb-0 rounded-t-lg flex justify-between items-center">
                    <p className="flex items-center mr-4">{element.title}</p>
                    <div>
                      {selectedRight.id == element.id &&
                        selectedRight.center == element.center && (
                          <button
                            title="حذف لایه"
                            className="px-2"
                            onClick={() => removeImageBySide("right")}
                          >
                            <FaTrashAlt fontSize=".97rem" />
                          </button>
                        )}
                      <button
                        className="disabled:bg-[#00000000] disabled:hover:bg-[#00000000]"
                        disabled={
                          selectedRight.id != 0 &&
                          (selectedRight.id != element.id ||
                            selectedRight.center != element.center)
                        }
                        onClick={() => {
                          fetchAndShowImage(element, "right");
                          setCenter(element.center);
                          handleRight(element);
                        }}
                      >
                        <img
                          src={diffrence}
                          alt="مقایسه"
                          className="w-4 h-4 ml-4"
                          title="مقایسه"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="pt-2 px-2 pb-2">
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
