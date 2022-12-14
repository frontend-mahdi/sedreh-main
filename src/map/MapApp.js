import React from "react";
import { useSelector } from "react-redux";

import MapBox from "./MapBox";
import Navbar from "./../navbar/Navbar";
import RightPanel from "../panel/RightPanel";
import Compare from "./Compare";
const MapApp = () => {
  const buttonCompare = useSelector((state) => state.map.buttonCompare);

  return (
    <div>
      <Navbar />
      <RightPanel />
      {buttonCompare ? <Compare /> : <MapBox />}
      {/* <Mapbox /> */}
    </div>
  );
};

export default MapApp;
