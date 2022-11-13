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
  const titlePolygon = useSelector((state) => state.map?.titlePolygon);
  const polygonTitle = useSelector((state) => state.map.polygonTitle);

  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!!!!titlePolygon && typeof titlePolygon == "string") {
      setShowPopup(true);
    }
  }, [titlePolygon]);
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
  const removeImage = () => {
    dispatch(getPolygonTitle(""));
  };
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
          <p className="mb-10 flex justify-center items-center mr-2" dir="rtl">
            {new Date().getHours()}:{new Date().getMinutes()}
            <br></br>
            {today}
          </p>
        </div>
        {showPopup && (
          <button onClick={removeImage} className="saq">
            <div className="bg-black-rgba w-20 h-11 flex justify-center rounded-xl">
              <div className="flex justify-center items-center">
                <button className="text-gray w-8 flex justify-center items-center">
                  بستن
                </button>
              </div>
            </div>
          </button>
        )}
      </div>

      {(isShownFirst || isShownSecond || isShownThird || isShownFourth) && (
        <div className="right-system bg-black-rgba fixed right-14 w-80 h-580 text-gray items-center rounded-l-2xl gap-10 flex flex-col z-10 justify-start mt-28">
          <div className="w-full h-full rounded-l-2xl">
            {isShownFirst && <FirstButton />}
            {isShownSecond && <SecondButton />}
            {isShownThird && <ThirdButton />}
            {isShownFourth && <FourthButton />}
          </div>
        </div>
      )}
    </div>
  );
}
