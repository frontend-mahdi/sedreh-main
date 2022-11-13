import React from "react";
import Popup from "reactjs-popup";
import Info from "./Info";

export default function RightPanelGuide(props) {
  return (
    <Popup trigger={<div>{props.btn}</div>} position="center" modal nested>
      <div dir="rtl">
        <Info />
      </div>
    </Popup>
  );
}
