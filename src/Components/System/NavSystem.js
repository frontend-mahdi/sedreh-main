import React from "react";
import logobl from "../../Images/logobl.png";
import search from "../../Images/search.png";
import device from "../../Images/device.png";
import message from "../../Images/message.png";
import RightPopupConnection from "./RightPopupConnection";
import RightPanelGuide from "./RightPanelGuide";
import Info from "./Info";
import { useState } from "react";
import { getInfoButton } from "../../features/counter/map";
import { useDispatch } from "react-redux";

export default function NavSystem() {
  const dispatch = useDispatch();
  const [info, setInfo] = useState(false);

  const infoChanger = function () {
    setInfo((e) => !e);
  };
  dispatch(getInfoButton(info));

  return (
    <div className="navbar-system w-screen h-20 bg-gray-nav flex justify-evenly items-center absolute z-10">
      <div className="flex gap-2">
        <button
          onClick={infoChanger}
          className="communicate bg-black-rgba text-gray rounded-lg flex justify-center items-center w-36 h-10"
        >
          <p>راهنمای سامانه</p>
          <img src={message} alt="" className="ml-2" />
        </button>

        <div>
          <RightPopupConnection
            btn={
              <button className="guide bg-black-rgba text-gray rounded-lg flex justify-center items-center w-28 h-10">
                <p>ارتباط با ما</p>
                <img src={device} alt="" className="ml-2" />
              </button>
            }
          />
        </div>
      </div>
      <div
        className="search-bar text-gray rounded-lg w-1/3 h-11 flex justify-start items-center"
        dir="rtl"
      ></div>
      <img src={logobl} alt="logo" className="logo" />
    </div>
  );
}
