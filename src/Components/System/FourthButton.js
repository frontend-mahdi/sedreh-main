import React, { useState, useEffect } from "react";
import { TfiDownload } from "react-icons/tfi";
// import download from "../../Images/download.png";
import { useSelector } from "react-redux";

export default function FourthButton() {
  const [saveImages, setSavedImages] = useState([]);
  const _saveImages = useSelector((state) => state.menu.saveImages);
  useEffect(() => {
    if (_saveImages.length > 0) {
      console.log("saveImages", _saveImages);
      setSavedImages(_saveImages);
      window.localStorage.setItem("savedPictures", JSON.stringify(_saveImages));
    }
  }, [_saveImages]);

  useEffect(() => {
    console.log(
      "savedImages >>>>",
      window.localStorage.getItem("savedPictures")
    );
    var data = window.localStorage.getItem("savedPictures");
    setSavedImages(JSON.parse(data));
  }, []);

  const buttonClicked3 = function (name) {
    const link = "http://138.201.167.227/api/download-image/tiff&";

    fetch("http://138.201.167.227/api/get-image/", {
      method: "POST",
      body: JSON.stringify({
        image_name: name,
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
        const downloadName = data.split(":").pop();
        const url = link.concat(downloadName);

        console.log(url);

        var uri = url;
        window.open(uri, "_blank");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <p className="m-2"> محدوده های ذخیره شده</p>
      <div className="w-full h-1 bg-primarythree mb-3"></div>
      {!!saveImages &&
        saveImages.map((element, index) => {
          return (
            <div
              key={index}
              dir="rtl"
              className="bg-green-background w-64 h-28 rounded-lg mb-1 mt-2"
            >
              <div className="bg-green-background-title rounded-t-lg flex justify-between items-center">
                <p className="flex items-center mr-4">{element.title}</p>
                <button
                  onClick={() => {
                    buttonClicked3(element.name);
                  }}
                >
                  <div alt="" className="w-4 h-4 ml-4" title="مشاهده تصاویر">
                    <TfiDownload />
                  </div>
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
    </div>
  );
}
