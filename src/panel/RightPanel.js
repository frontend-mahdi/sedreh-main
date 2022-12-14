import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import gallery from "./../assets/img/gallery-right.png";
import square from "./../assets/img/square-right.png";
import pause from "./../assets/img/pause-right.png";
import document from "../assets/img/document-right.png";

import { getButtonCompare } from "../redux/map";

import TabNum1 from "./TabNum1";
import TabNum2 from "./TabNum2";
import TabNum3 from "./TabNum3";
import TabNum4 from "./TabNum4";
// custom hook
import useTimeDate from "../customHooks/useTimeDate";

export default function RightPanel() {
  const [isShownFirst, setIsShownFirst] = React.useState(false);
  const [isShownSecond, setIsShownSecond] = React.useState(false);
  const [isShownThird, setIsShownThird] = React.useState(false);
  const [isShownFourth, setIsShownFourth] = React.useState(false);

  // custom hooks
  const [{ date, time }] = useTimeDate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isShownThird) {
      dispatch(getButtonCompare(true));
    } else if (isShownFirst || isShownSecond || isShownFourth) {
      dispatch(getButtonCompare(false));
    }
  }, [isShownThird, isShownFirst, isShownSecond, isShownFourth]);

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

  return (
    <div>
      <div
        className="bg-black1 fixed right-0 w-14 h-[70vh] text-ED items-center rounded-l-2xl gap-10 flex flex-col z-10 justify-start mt-28 focus:rounded-none"
        style={{
          borderRadius:
            isShownFirst || isShownSecond || isShownThird || isShownFourth
              ? "0px"
              : "",
        }}
      >
        <div className="mt-10">
          <button onClick={() => menuItemShowHandler(1)} className="rounded">
            <img
              src={gallery}
              alt=""
              style={{ backgroundColor: isShownFirst && "#95DD91" }}
              className="hover:bg-primary3 hover:rounded after:bg-primary3 after:rounded rounded"
              title="مشاهده تصاویر"
              layout="fixed"
            />
          </button>
        </div>
        <div>
          <button onClick={() => menuItemShowHandler(2)} className="rounded">
            <img
              src={square}
              alt=""
              style={{ backgroundColor: isShownSecond && "#95DD91" }}
              className="hover:bg-primary3 hover:rounded after:bg-primary3 after:rounded rounded"
              title="مشاهده محدوده ها"
              layout="fixed"
            />
          </button>
        </div>
        <div>
          <button onClick={() => menuItemShowHandler(3)} className="rounded">
            <img
              src={pause}
              alt=""
              style={{ backgroundColor: isShownThird && "#95DD91" }}
              className="hover:bg-primary3 hover:rounded after:bg-primary3 after:rounded rounded"
              title="مقایسه تصاویر"
              layout="fixed"
            />
          </button>
        </div>
        <div>
          <button onClick={() => menuItemShowHandler(4)} className="rounded">
            <img
              src={document}
              alt=""
              style={{ backgroundColor: isShownFourth && "#95DD91" }}
              className="hover:bg-primary3 hover:rounded after:bg-primary3 after:rounded rounded"
              title="لیست دانلودها"
              layout="fixed"
            />
          </button>
        </div>
        <div className="absolute bottom-0">
          <div className="mb-5 text-center " dir="rtl">
            <p className="font-medium text-white1 bg-ED-background">{time}</p>
            <p className="px-2 pt-2">{date}</p>
          </div>
        </div>
      </div>

      {(isShownFirst || isShownSecond || isShownThird || isShownFourth) && (
        <div className=" bg-black1-rgba fixed right-14 w-80 h-[70vh] text-ED items-center rounded-l-2xl gap-10 flex flex-col z-10 justify-start mt-28">
          <div className="w-full h-full rounded-l-2xl">
            {isShownFirst && <TabNum1 closeTabs={menuItemShowHandler} />}
            {isShownSecond && <TabNum2 closeTabs={menuItemShowHandler} />}
            {isShownThird && <TabNum3 closeTabs={menuItemShowHandler} />}
            {isShownFourth && <TabNum4 closeTabs={menuItemShowHandler} />}
          </div>
        </div>
      )}
    </div>
  );
}
