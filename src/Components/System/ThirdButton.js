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

export default function ThirdButton() {
  const dispatch = useDispatch();
  const [isShownButton, setIsShownButton] = React.useState(true);
  const [centerPolyg, setCenterPolyg] = useState("");

  const handleClickButton = () => {
    setIsShownButton((current) => !current);
  };

  const fetchedImages = useSelector((state) => state.menu.fetchedImages);

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
    if (!!!!centerPolyg && centerPolyg.length > 0) {
      dispatch(getTotalMiddlePolygon(centerPolyg));
    }
  }, [centerPolyg]);

  const setCenter = (centerPolyg) => {
    dispatch(getTotalMiddlePolygon(centerPolyg));
  };

  const polygon = useSelector((state) => state?.map?.polygon);

  const polygonTitle = useSelector((state) => state.map.polygonTitle);

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

  const [saveImages, setSavedImages] = useState([]);
  const _saveImages = useSelector((state) => state.menu.saveImages);
  useEffect(() => {
    if (_saveImages.length > 0) {
      console.log("saveImages", _saveImages);
      setSavedImages(_saveImages);
      window.localStorage.setItem("savedPictures", JSON.stringify(_saveImages));
    }
  }, [_saveImages]);

  const removeImage = () => {
    dispatch(getPolygonTitle(""));
  };

  useEffect(() => {
    console.log(
      "savedImages >>>>",
      window.localStorage.getItem("savedPictures")
    );
    var data = window.localStorage.getItem("savedPictures");
    setSavedImages(JSON.parse(data));
  }, []);

  useEffect(() => {
    if (!!!!centerPolyg && centerPolyg.length > 0) {
      dispatch(getTotalMiddlePolygon(centerPolyg));
    }
  }, [centerPolyg]);
  const setShape = (shape) => {
    dispatch(setPolyOnMap(shape));
  };

  useEffect(() => {
    console.log("polygonTitle", polygonTitle);
    const polyArr = polygon?.geometry?.coordinates[0];
    if (polyArr?.length > 0) {
      setCenterPolyg(calcPolyCenter(polyArr));
    }
  }, [polygon]);

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
    <div className="h-12 w-full flex">
      <div className="w-1/2 rounded-tl-2xl flex justify-center items-center flex-col">
        <button className="mb-2" onClick={handleClickButton}>
          تصویر چپ
        </button>
        {isShownButton == false ? (
          <div className="w-full h-1 bg-primarythree text-black flex justify-center items-center flex-col">
            <div className="text-gray ml-50 mt-40 w-full max-h-32">
              {!!saveImages &&
                saveImages.map((element, index) => {
                  return (
                    <div
                      key={index}
                      dir="rtl"
                      className="bg-green-background w-64 h-28 rounded-lg mb-3"
                    >
                      <div className="bg-green-background-title rounded-t-lg flex justify-between items-center">
                        <p className="flex items-center mr-4">
                          {element.title}
                        </p>
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
                })}
              {}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="w-1/2 flex justify-center items-center flex-col">
        <button className="mb-2" onClick={handleClickButton}>
          تصویر راست
        </button>
        {isShownButton ? (
          <div className="w-full h-1 bg-primarythree text-black flex justify-center items-center flex-col">
            <div className="text-gray mt-40 w-full max-h-32 mr-150">
              {!!saveImages &&
                saveImages.map((element, index) => {
                  return (
                    <div
                      key={index}
                      dir="rtl"
                      className="bg-green-background w-64 h-28 rounded-lg mb-3"
                    >
                      <div className="bg-green-background-title rounded-t-lg flex justify-between items-center">
                        <p className="flex items-center mr-4">
                          {element.title}
                        </p>
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
                })}
              {}
            </div>
          </div>
        ) : (
          <div className="flex bg-primarythree flex-row"></div>
        )}
      </div>
    </div>
  );
}
