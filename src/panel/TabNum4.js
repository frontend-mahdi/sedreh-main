import React, { useEffect, useState } from "react";
import { TfiDownload } from "react-icons/tfi";
import { API } from "../apiUrl";
import useSavedImages from "./../customHooks/useSavedImages";
import { BoxLoading } from "react-loadingg";
export default function TabNum4() {
  const [saveImages] = useSavedImages();
  const [url1, setUrl1] = useState("");
  const [loading, setLoading] = useState(false);

  const a = () => {
    fetch("https://cors-anywhere.herokuapp.com/" + fileURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `FileName.pdf`);

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      });
  };
  const buttonClicked3 = function (element) {
    setLoading(true);

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
        const baselink = `${API}/api/download-image/tiff&`;
        const downloadName = data.split(":").pop();
        const url = baselink.concat(downloadName);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${element.title + "-" + element.date}.zip`
        );

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  };
  const buttonClicked3old = function (element) {
    setLoading(true);
    const link = `${API}/api/download-image/tiff&`;

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
        setLoading(false);
        const downloadName = data.split(":").pop();
        const url = link.concat(downloadName);
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
    <div className="flex flex-col h-full">
      <div className="flex flex-row text-center w-full py-2">
        <div
          className="w-full rounded-tl-2xl pb-3 pt-2"
          style={{ borderBottom: "4px solid #95DD91" }}
        >
          تصاویر ذخیره شده
        </div>
      </div>
      <div className="text-ED py-4 overflow-auto" dir="rtl">
        {!loading ? (
          saveImages.length > 0 &&
          saveImages.map((element, index) => {
            return (
              <div
                key={index}
                dir="rtl"
                className="bg-primary-background w-64 mx-auto h-28 rounded-lg mb-1 mt-2"
              >
                <div className="bg-primary-background-title rounded-t-lg flex justify-between items-center">
                  <p className="flex items-center mr-4">{element.title}</p>
                  <button
                    onClick={() => {
                      buttonClicked3(element);
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
          })
        ) : (
          <BoxLoading color="#95DD91" />
        )}
        {}
      </div>
    </div>
  );
}
