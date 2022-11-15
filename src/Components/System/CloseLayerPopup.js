import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { getPolygonTitle } from "../../features/counter/map";
import { useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";

export default function CloseLayerPopup(props) {
  const dispatch = useDispatch();
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
          className="px-4 py-2 rounded-sm text-white flex justify-between items-baseline "
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
          <span style={{ color: "#858585", fontSize: ".85rem" }}>
            lat:{center[1]} lon:{center[0]}
          </span>

          <div
            className=" text-center"
            style={{ color: "#858585", fontSize: ".85rem" }}
          >
            <p className="cursor-default  px-auto">{date}</p>
          </div>
          <div className=" text-center  ">
            <p className="cursor-default  px-auto">{title}</p>
          </div>
          <div className=" text-center  ">
            <p className="cursor-default  px-auto">تصویر شماره {id}</p>
          </div>
        </div>
      )}
    </Popup>
    // <Popup modal nested>
    //   {(close) => (
    //     <div
    //       className="modal mr-[48vw] mb-8 bg-black px-4 py-2 rounded-sm text-white cursor-pointer"
    //       style={{ userSelect: "element" }}
    //     >
    //       <FaTimes className="inline " onClick={close} />
    //       <button className="inline mx-2">بستن تصویر</button>
    //     </div>
    //   )}
    // </Popup>
  );
}
