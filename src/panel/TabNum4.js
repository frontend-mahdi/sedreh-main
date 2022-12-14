import React, { useEffect, useState } from "react";
import { TfiDownload } from "react-icons/tfi";
import { API } from "../apiUrl";
import useSavedImages from "./../customHooks/useSavedImages";
export default function TabNum4() {
  const [saveImages] = useSavedImages();
  const [url1, setUrl1] = useState("");
  const buttonClicked3 = function (name) {
    const link = `${API}/api/download-image/tiff&`;

    const poly =
      [JSON.parse(window.localStorage.getItem("currentPolygon"))] || "[]";
    fetch(`${API}/api/get-image/`, {
      method: "POST",
      body: JSON.stringify({
        image_name: name,
        geom: {
          type: "FeatureCollection",
          features: [JSON.parse(poly)],
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
        setUrl1(url);
        var uri = url;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    if (!!!!window && !!!!url1) {
      window.open(url1, "_blank");
    }
  }, [url1]);

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="py-2 w-full">
        <p
          className="w-full text-center pb-3 pt-2"
          style={{ borderBottom: "4px solid #95DD91" }}
        >
          {" "}
          تصاویر ذخیره شده
        </p>
      </div>
      {!!saveImages &&
        saveImages.map((element, index) => {
          return (
            <div
              key={index}
              dir="rtl"
              className="bg-primary-background w-64 h-28 rounded-lg mb-1 mt-2"
            >
              <div className="bg-primary-background-title rounded-t-lg flex justify-between items-center">
                <p className="flex items-center mr-4">{element.title}</p>
                <button
                  onClick={() => {
                    buttonClicked3(element.name);
                  }}
                >
                  <div alt="" className="w-4 h-4 ml-4" title="دانلود تصویر">
                    <TfiDownload />
                  </div>
                </button>
              </div>
              <div className="flex flex-col m-4">
                {element.date}
                <p>Sentinel-2</p>
                <p>
                  {element?.center[0]} - {element?.center[1]}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}
