import React, { useEffect } from "react";
import { SlPicture } from "react-icons/sl";
import { useSelector, useDispatch } from "react-redux";
import {
  getPolygonLoading,
  getPolygonTitle,
  getSubmitLoading,
  getPolygonTitleRight,
  getPolygonTitleLeft,
} from "./../redux/map";
import { fetchImagesEmptyHandler, getImagesHandler } from "./../redux/menu";

import BoxLoading from "react-loadingg/lib/BoxLoading";

import squaresave from "./../assets/img/square.png";
import save from "./../assets/img/save.png";

import useSavedImages from "./../customHooks/useSavedImages";
import usePolygonCenter from "./../customHooks/usePolygonCenter";

import DataPicker from "./utils/DataPicker";
import RightPopup from "./utils/RightPopup";
import { API } from "../apiUrl";
import { fetchApi } from "../handlers/axiosHandler";

export default function TabNum1({ closeTabs }) {
  const fetchedImages = useSelector((state) => state.menu.fetchedImages);

  const polygon = useSelector((state) => state.map.polygon);
  const fetchedImagesEmpty = useSelector(
    (state) => state.menu.fetchedImagesEmpty
  );
  useEffect(() => {
    console.log("fetchedImages", fetchedImages);
  }, [fetchedImages]);
  // custom hooks
  const [centerPolyg] = usePolygonCenter();
  const [saveImages] = useSavedImages();

  const dispatch = useDispatch();

  const handleClickButton = () => {
    setIsShownButton((current) => !current);
  };
  const [isShownButton, setIsShownButton] = React.useState(false);
  const [disableSubmit, setDisableSubmit] = React.useState(true);
  useEffect(() => {
    if (
      JSON.parse(window.localStorage.getItem("currentPolygon"))?.length > 0 &&
      polygon?.length != 0
    )
      setDisableSubmit(false);
    else setDisableSubmit(true);

    console.log("polygon", polygon);
  }, [polygon]);
  const getImagesCollactionHandler1 = async () => {
    dispatch(getSubmitLoading(true));
    const { data, status, statusText } = await fetchApi(
      "/api/get-image-collection/",
      "POST",
      JSON.stringify({
        start: window.localStorage.getItem("start"),
        end: window.localStorage.getItem("end"),
        geom: {
          type: "FeatureCollection",
          features: [polygon],
        },
      })
    );
    console.log("data", data);
    if (status == 200) {
      if (data?.length == 0) dispatch(fetchImagesEmptyHandler(true));
      data.forEach((item, i) => {
        item.id = i + 1;
        item.saved = false;
        item.center = centerPolyg;
        item.shape = polygon;
      });
      dispatch(getImagesHandler(data));
    }
    dispatch(getSubmitLoading(false));
  };

  const getImagesCollactionHandler = function () {
    console.log("body", {
      start: window.localStorage.getItem("start"),
      end: window.localStorage.getItem("end"),
      geom: {
        type: "FeatureCollection",
        features: [polygon],
      },
    });
    dispatch(getSubmitLoading(true));
    fetch(`${API}/api/get-image-collection/`, {
      method: "POST",
      body: JSON.stringify({
        start: window.localStorage.getItem("start"),
        end: window.localStorage.getItem("end"),
        geom: {
          type: "FeatureCollection",
          features: [polygon],
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
        console.table("data", data);
        dispatch(getImagesHandler(data));
        dispatch(getSubmitLoading(false));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const fetchAndShowImageHandler = function (element, side) {
    dispatch(getPolygonLoading(true));
    fetch(`${API}/api/get-image/`, {
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
  const showImageAndCloseTab = (todo) => {
    fetchAndShowImageHandler(todo);
    closeTabs();
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex flex-row text-center w-full py-2">
          <div
            className="w-1/2 rounded-tl-2xl pb-3 pt-2"
            style={{ borderBottom: isShownButton && "4px solid #95DD91" }}
          >
            <button className="" onClick={handleClickButton}>
              تصاویر ذخیره شده
            </button>
          </div>
          <div
            className="w-1/2 rounded-tl-2xl pb-3 pt-2"
            style={{ borderBottom: !isShownButton && "4px solid #95DD91" }}
          >
            <button className="" onClick={handleClickButton}>
              افزودن تصویر
            </button>
          </div>
        </div>

        {isShownButton ? (
          <div className="text-ED py-4 overflow-auto" dir="rtl">
            {saveImages.length > 0 ? (
              saveImages.map((element, index) => {
                return (
                  <div
                    key={index}
                    dir="rtl"
                    className="bg-primary-background w-64  rounded-lg mb-3 mx-auto"
                  >
                    <div className="bg-primary-background-title  rounded-t-lg flex justify-between  items-center">
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
                        {element?.center[0]} - {element?.center[1]}
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
            style={{ height: "calc(100% - 52px)" }}
          >
            <div className="flex flex-col items-center ">
              <p className="mb-6">انتخاب تاریخ تصویر</p>
              <DataPicker />
              {titleSubmitLoading ? (
                <BoxLoading color="#95DD91" />
              ) : (
                <button
                  className="bg-primary3 w-3/4 py-2 hover:bg-primary mx-4 rounded-lg  mt-5 text-black1"
                  onClick={getImagesCollactionHandler}
                  disabled={disableSubmit}
                >
                  ثبت
                </button>
              )}
            </div>

            <div className="w-full  overflow-auto h-4/5" dir="rtl">
              {titleSubmitLoading ? (
                <BoxLoading color="#95DD91" />
              ) : fetchedImages.length > 0 ? (
                fetchedImages.map((todo, index) => (
                  <div key={index}>
                    <div className="mt-3 px-4 py-2">
                      <p>{todo.date}</p>
                      <p>Sentinel-2</p>
                      <p>
                        {todo.center[0]} - {todo.center[1]}
                      </p>
                    </div>
                    <div className="flex gap-2 px-4">
                      <RightPopup
                        title="ذخیره"
                        source={squaresave}
                        data={todo}
                        handler={() => console.log("")}
                      />
                      <RightPopup
                        handler={() => showImageAndCloseTab(todo)}
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
