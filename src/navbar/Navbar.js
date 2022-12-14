import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import logobl from "./../assets/img/logobl.png";
import search from "./../assets/img/search.png";
import device from "./../assets/img/device.png";
import message from "./../assets/img/message.png";

// import RightPanelGuide from "./RightPanelGuide";
// import Info from "./Info";

import RightPopupConnection from "./RightPopupConnection";
import { getInfoButton } from "../redux/map";

export default function Navbar() {
  const dispatch = useDispatch();
  const [info, setInfo] = useState(false);

  const infoChanger = function () {
    setInfo((e) => !e);
  };
  useEffect(() => {
    dispatch(getInfoButton(info));
  }, [info]);

  return (
    <div
      dir="rtl"
      className="w-screen h-20 bg-ED-nav flex flex-row-reverse justify-evenly items-center absolute z-10"
    >
      <div className="flex gap-2">
        <button
          onClick={infoChanger}
          className="communicate bg-black1-rgba text-ED rounded-lg flex justify-center items-center w-36 h-10"
        >
          <p> راهنمای سامانه </p> <img src={message} alt="" className="ml-2" />
        </button>
        <div>
          <RightPopupConnection
            btn={
              <button className="guide bg-black1-rgba text-ED rounded-lg flex justify-center items-center w-28 h-10">
                <p> ارتباط با ما </p>{" "}
                <img src={device} alt="" className="ml-2" />
              </button>
            }
          />{" "}
        </div>{" "}
      </div>{" "}
      <div
        className="search-bar text-ED rounded-lg w-1/3 h-11 flex justify-start items-center"
        dir="rtl"
      ></div>{" "}
      <img src={logobl} alt="logo" className="logo" />
    </div>
  );
}
