import React from "react";
import gallery from "../../Images/gallery-right.png";
import square from "../../Images/square-right.png";
import pause from "../../Images/pause-right.png";
import document from "../../Images/document-right.png";
import DataPicker from "./DataPicker";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { savePolygonHandler } from "../../features/counter/menu";
import {
  getPolygonTitle,
  getButtonCompare,
  getTotalMiddlePolygon,
  updatePolygonList,
  setPolyOnMap,
} from "../../features/counter/map";
import FirstButton from "./FirstButton";
import SecondButton from "./SecondButton";
import ThirdButton from "./ThirdButton";
import FourthButton from "./FourthButton";
// custom hook
import useTimeDate from "./TimeDate";
let options = { year: "numeric", month: "long", day: "numeric" };
let today = new Date().toLocaleDateString("fa-IR", options);

export default function RightPanel() {
  const [saveImages, setSavedImages] = useState([]);
  const [savedPolygons, setSavedPolygons] = useState([]);
  const [saveRegions, setSavedRegions] = useState([]);
  const [savedElements, setSavedElements] = useState([]);
  const [arrList, setArrList] = useState([]);
  const [centerPolyg, setCenterPolyg] = useState("");
  const [isShownFirst, setIsShownFirst] = React.useState(false);
  const [isShownSecond, setIsShownSecond] = React.useState(false);
  const [isShownThird, setIsShownThird] = React.useState(false);
  const [isShownFourth, setIsShownFourth] = React.useState(false);
  const [isShownButton, setIsShownButton] = React.useState(true);
  const [savedItems, setSavedItems] = React.useState([]);
  const [downloadItem, setDownloadItem] = React.useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const titleSubmitLoading = useSelector(
    (state) => state.map.titleSubmitLoading
  );

  const polygon = useSelector((state) => state?.map?.polygon);
  const _saveImages = useSelector((state) => state.menu.saveImages);
  const fetchedImages = useSelector((state) => state.menu.fetchedImages);
  const selectedLayer = useSelector((state) => state.map?.titlePolygon);
  const polygonTitle = useSelector((state) => state.map.polygonTitle);

  const [showPopup, setShowPopup] = useState(false);
  // custom hooks
  const [{ date, time }] = useTimeDate();
  const dispatch = useDispatch();
  useEffect(() => {
    const layerName = selectedLayer.layerName;
    if (!!!!layerName && typeof layerName == "string") {
      setShowPopup(true);
    }
  }, [selectedLayer]);
  useEffect(() => {}, [fetchedImages]);
  useEffect(() => {
    if (_saveImages.length > 0) {
      console.log("saveImages", _saveImages);
      setSavedImages(_saveImages);
      window.localStorage.setItem("savedPictures", JSON.stringify(_saveImages));
    }
  }, [_saveImages]);

  // }, []);
  useEffect(() => {
    console.log(
      "savedPolygons >>>>",
      window.localStorage.getItem("savedPolygons")
    );
    var data = window.localStorage.getItem("savedPolygons");
    setSavedPolygons(JSON.parse(data));
  }, []);
  useEffect(() => {
    console.log("polygonTitle", polygonTitle);
    const polyArr = polygon?.geometry?.coordinates[0];
    if (polyArr?.length > 0) {
      setCenterPolyg(calcPolyCenter(polyArr));
    }
  }, [polygon]);
  useEffect(() => {
    if (!!!!polygonTitle.title) {
      const newPoly = {
        title: polygonTitle.title,
        desc: polygonTitle.desc,
        center: centerPolyg,
        shape: polygon,
      };
      dispatch(updatePolygonList(newPoly));
      dispatch(savePolygonHandler(newPoly));
      window.localStorage.setItem("savedPolygons", JSON.stringify(newPoly));
    }
  }, [polygonTitle]);

  useEffect(() => {
    if (titleSubmitLoading) {
      setSubmitLoading(true);
    } else {
      setSubmitLoading(false);
    }
  }, [titleSubmitLoading]);
  const menuItemShowHandler = (id) => {
    switch (id) {
      case 1:
        if (isShownFirst) {
          setIsShownFirst(false);
        } else {
          setIsShownFirst(true);
          setIsShownSecond(false);
          setIsShownThird(false);
          setIsShownFourth(false);
        }
        break;
      case 2:
        if (isShownSecond) {
          setIsShownSecond(false);
        } else {
          setIsShownFirst(false);
          setIsShownSecond(true);
          setIsShownThird(false);
          setIsShownFourth(false);
        }
        break;
      case 3:
        if (isShownThird) {
          setIsShownThird(false);
        } else {
          setIsShownFirst(false);
          setIsShownSecond(false);
          setIsShownThird(true);
          setIsShownFourth(false);
        }
        break;
      case 4:
        if (isShownFourth) {
          setIsShownFourth(false);
        } else {
          setIsShownFirst(false);
          setIsShownSecond(false);
          setIsShownThird(false);
          setIsShownFourth(true);
        }
        break;
      default:
        setIsShownFirst(false);
        setIsShownSecond(false);
        setIsShownThird(false);
        setIsShownFourth(false);
        break;
    }
  };

  dispatch(getButtonCompare(isShownThird));

  // const handleClickButton = () => {
  //   setIsShownButton((current) => !current);
  // };

  // @mahdi : cleaning funtions
  const calcPolyCenter = function (polygon) {
    let lats = 0;
    let lons = 0;
    let lengthPolyg = polygon?.length - 1;
    for (let i = 0; i < lengthPolyg; i++) {
      const lat = polygon[i][0];
      const lon = polygon[i][1];
      lats = lat + lats;
      lons += lon;
    }
    return [(lats / lengthPolyg).toFixed(5), (lons / lengthPolyg).toFixed(5)];
  };

  useEffect(() => {
    if (!!!!centerPolyg && centerPolyg.length > 0) {
      dispatch(getTotalMiddlePolygon(centerPolyg));
    }
  }, [centerPolyg]);
  // const setShape = (shape) => {
  //   dispatch(setPolyOnMap(shape));
  // };

  // const setCenter = (centerPolyg) => {
  //   dispatch(getTotalMiddlePolygon(centerPolyg));
  // };
  return (
    <div>
      <div
        className="right-system bg-black-rgba fixed right-0 w-14 h-580 text-gray items-center rounded-l-2xl gap-10 flex flex-col z-10 justify-start mt-28 focus:rounded-none"
        style={{
          borderRadius:
            isShownFirst || isShownSecond || isShownThird || isShownFourth
              ? "0px"
              : "",
        }}
      >
        <div className="mt-10">
          <button
            onClick={() => menuItemShowHandler(1)}
            className={`${isShownFirst ? "bg-primarythree" : null} rounded `}
          >
            <img
              src={gallery}
              alt=""
              className="hover:bg-primarythree hover:rounded after:bg-primarythree after:rounded"
              title="مشاهده تصاویر"
            />
          </button>
        </div>
        <div>
          <button
            onClick={() => menuItemShowHandler(2)}
            className={`${isShownSecond ? "bg-primarythree" : null} rounded `}
          >
            <img
              src={square}
              alt=""
              className="hover:bg-primarythree hover:rounded after:bg-primarythree after:rounded"
              title="مشاهده محدوده ها"
            />
          </button>
        </div>
        <div>
          <button
            onClick={() => menuItemShowHandler(3)}
            className={`${isShownThird ? "bg-primarythree" : null} rounded `}
          >
            <img
              src={pause}
              alt=""
              className="hover:bg-primarythree hover:rounded after:bg-primarythree after:rounded"
              title="مقایسه تصاویر"
            />
          </button>
        </div>
        <div>
          <button
            onClick={() => menuItemShowHandler(4)}
            className={`${isShownFourth ? "bg-primarythree" : null} rounded `}
          >
            <img
              src={document}
              alt=""
              className="hover:bg-primarythree hover:rounded after:bg-primarythree after:rounded"
              title="لیست دانلودها"
            />
          </button>
        </div>
        <div className="absolute bottom-0">
          <div className="mb-5 text-center " dir="rtl">
            {/* <p className="m_time"> */}

            {/* {new Date().toLocaleString("fa-IR-u-nu-latn", {
                hour: "numeric",
                minute: "numeric",
                hour12: false,
              })} */}
            {/* {new Date().getHours()}:{new Date().getMinutes()} */}
            {/* </p> */}

            <p className="font-medium text-white bg-gray-background">{time}</p>
            <p className="px-2 pt-2">{date}</p>
          </div>
        </div>
        {/* {showPopup && (
          <button onClick={removeImage}>
            <div className="bg-black-rgba w-20 h-11 flex justify-center rounded-xl">
              <div className="flex justify-center items-center">
                <button className="text-gray w-8 flex justify-center items-center">
                  بستن
                </button>
              </div>
            </div>
          </button>
        )} */}
      </div>

      {(isShownFirst || isShownSecond || isShownThird || isShownFourth) && (
        <div className="right-system bg-black-rgba fixed right-14 w-80 h-580 text-gray items-center rounded-l-2xl gap-10 flex flex-col z-10 justify-start mt-28">
          <div className="w-full h-full rounded-l-2xl">
            {isShownFirst && <FirstButton closeTabs={menuItemShowHandler} />}
            {isShownSecond && <SecondButton closeTabs={menuItemShowHandler} />}
            {isShownThird && <ThirdButton closeTabs={menuItemShowHandler} />}
            {isShownFourth && <FourthButton closeTabs={menuItemShowHandler} />}
          </div>
        </div>
      )}
    </div>
  );
}
