import React, { useState, useEffect } from "react";
import { SlPicture } from "react-icons/sl";
import DataPicker from "./DataPicker";
import { useSelector, useDispatch } from "react-redux";
import {
  getPolygonLoading,
  getPolygonTitle,
  getSubmitLoading,
  getTotalMiddlePolygon,
  getPolygonTitleRight,
  getPolygonTitleLeft,
  updatePolygonList,
} from "../../features/counter/map";
import {
  fetchImagesEmptyHandler,
  getImagesHandler,
  savePolygonHandler,
} from "../../features/counter/menu";
import BoxLoading from "react-loadingg/lib/BoxLoading";
import RightPopup from "./RightPopup";
import squaresave from "../../Images/square.png";
import save from "../../Images/save.png";
import pic from "../../Images/pic.png";
import useSavedImages from "./customHooks/useSavedImages";
import calcCenterHandler from "./utils/calcCenter";
import usePolygonCenter from "./customHooks/usePolygonCenter";

export default function FirstButton({ closeTabs }) {
  const fetchedImages = useSelector((state) => state.menu.fetchedImages);

  const polygon = useSelector((state) => state.map.polygon);
  const polygonTitle = useSelector((state) => state.map.polygonTitle);
  const fetchedImagesEmpty = useSelector(
    (state) => state.menu.fetchedImagesEmpty
  );

  // custom hooks
  const [centerPolyg] = usePolygonCenter();
  const [saveImages] = useSavedImages();

  const dispatch = useDispatch();

  const handleClickButton = () => {
    setIsShownButton((current) => !current);
  };
  const [isShownButton, setIsShownButton] = React.useState(true);
  const getImagesCollactionHandler = function () {
    dispatch(getSubmitLoading(true));
    fetch("http://138.201.167.227/api/get-image-collection/", {
      method: "POST",
      body: JSON.stringify({
        start: window.localStorage.getItem("start"),
        end: window.localStorage.getItem("end"),
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
        if (data?.length == 0) dispatch(fetchImagesEmptyHandler(true));

        data.forEach((item, i) => {
          item.id = i + 1;
          item.saved = false;
          item.center = centerPolyg;
          item.shape = polygon;
        });
        console.log("data", data);
        dispatch(getImagesHandler(data));
        dispatch(getSubmitLoading(false));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const fetchAndShowImageHandler = function (element, side) {
    dispatch(getPolygonLoading(true));
    fetch("http://138.201.167.227/api/get-image/", {
      method: "POST",
      body: JSON.stringify({
        image_name: element.name,
        geom: {
          type: "FeatureCollection",
          // features: [JSON.parse(window.localStorage.getItem("currentPolygon"))],
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

  const titleSubmitLoading = useSelector(
    (state) => state.map.titleSubmitLoading
  );

  const removeImage = () => {
    dispatch(getPolygonTitle(""));
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex flex-row text-center w-full">
          <div
            className="w-1/2 rounded-tl-2xl py-2"
            style={{ borderBottom: isShownButton && "4px solid #95DD91" }}
          >
            <button className="" onClick={handleClickButton}>
              تصاویر ذخیره شده
            </button>
          </div>
          <div
            className="w-1/2 rounded-tl-2xl py-2"
            style={{ borderBottom: !isShownButton && "4px solid #95DD91" }}
          >
            <button className="" onClick={handleClickButton}>
              افزودن تصویر
            </button>
          </div>
        </div>

        {isShownButton ? (
          <div className="text-gray py-4 overflow-auto" dir="rtl">
            {saveImages.length > 0 ? (
              saveImages.map((element, index) => {
                return (
                  <div
                    key={index}
                    dir="rtl"
                    className="bg-green-background w-64  rounded-lg mb-3 mx-auto"
                  >
                    <div className="bg-green-background-title  rounded-t-lg flex justify-between  items-center">
                      <p className="flex items-center mr-4">{element.title}</p>
                      <button>
                        <div
                          className="w-4 h-4 ml-4"
                          title="نمایش تصویر"
                          onClick={() => {
                            removeImage();
                            fetchAndShowImageHandler(element);
                            closeTabs();
                          }}
                        >
                          <SlPicture />
                        </div>
                      </button>
                    </div>
                    <div className="flex flex-col p-2">
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
          <div
            className="flex flex-col items-stretch justify-between py-4 "
            style={{ height: "calc(100% - 43.95px)" }}
          >
            <div className="flex flex-col items-center">
              <p className="mb-2">انتخاب تاریخ تصویر</p>
              <DataPicker />
              <button
                className="bg-primarythree w-40  rounded-lg  mt-2 text-black"
                onClick={getImagesCollactionHandler}
              >
                ثبت
                {titleSubmitLoading ? <BoxLoading color="#95DD91" /> : null}
              </button>
            </div>

            <div className="w-full  overflow-auto h-full" dir="rtl">
              {titleSubmitLoading ? (
                <BoxLoading color="#95DD91" />
              ) : fetchedImages.length > 0 ? (
                fetchedImages.map((todo, index) => (
                  <div key={index}>
                    <div className="mt-3">
                      <p>{todo.date}</p>
                      <p>Sentinel-2</p>
                      <p>
                        {todo.center[0]} - {todo.center[1]}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <RightPopup
                        title="ذخیره"
                        source={squaresave}
                        data={todo}
                      />
                      <RightPopup
                        onClick={() => {
                          fetchAndShowImageHandler(todo);
                          closeTabs();
                        }}
                        title="ذخیره و نمایش"
                        source={save}
                        data={todo}
                      />
                    </div>
                  </div>
                ))
              ) : (
                fetchedImagesEmpty && (
                  <p className="text-center py-4">
                    تصویری در این بازه زمانی پیدا نشد
                  </p>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
