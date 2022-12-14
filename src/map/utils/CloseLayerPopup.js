import React from "react";
import Popup from "reactjs-popup";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { getPolygonTitle } from "./../../redux/map";

export default function CloseLayerPopup(props) {
  const dispatch = useDispatch();
  const savedImageTitle = useSelector((state) => state.menu.stagedSavedImage);

  const { id, layerName, title, center, date, saved, name } = props.data;

  const removeImage = () => {
    dispatch(getPolygonTitle(""));
  };
  return (
    <Popup
      open
      overlayStyle={{
        background: "none",
        pointerEvents: "none !important",
      }}
      closeOnDocumentClick={false}
      contentStyle={{
        position: "absolute",
        bottom: "2rem",
        left: "0",
        right: "0",
      }}
    >
      {(close) => (
        <div
          className="px-4 py-2 rounded-sm text-white1 flex justify-between items-baseline "
          style={{ width: "4rem !important" }}
        >
          <span
            className=" cursor-pointer"
            onClick={() => {
              close();
              removeImage();
            }}
          >
            <FaTimes className="align-middle" />
          </span>
          <div className=" text-center  ">
            <p className="cursor-default  px-auto">تصویر شماره {id}</p>
          </div>
          <div className=" text-center  ">
            <p className="cursor-default  px-auto">
              {title || savedImageTitle}
            </p>
          </div>

          <span style={{ color: "#858585", fontSize: ".85rem" }}>
            lat:{center[1]} lon:{center[0]}
          </span>

          <div
            className=" text-center"
            style={{ color: "#858585", fontSize: ".85rem" }}
          >
            <p className="cursor-default  px-auto">{date}</p>
          </div>
        </div>
      )}
    </Popup>
  );
}
