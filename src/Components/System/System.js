import React from "react";
import NavSystem from "./NavSystem";
import RightPanel from "./RightPanel";
import Mapbox from "./Mapbox";
import Compare from "./Compare";
import { useSelector } from "react-redux";

export default function System() {
  const buttonCompare = useSelector((state) => state.map.buttonCompare);

  return (
    <div>
      <NavSystem />
      <RightPanel />
      {buttonCompare ? <Compare /> : <Mapbox />}
    </div>
  );
}
