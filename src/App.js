import React from "react";
import "./App.css";
import System from "./Components/System/System";
import Data from "./Components/Data";
import Compare from "./Components/System/Compare";
import Info from "./Components/System/Info";
import { useSelector } from "react-redux";
import SavePolygon from "./Components/System/SavePolygon";

const App = () => {
  const buttonCompare = useSelector((state) => state.map.buttonCompare);
  const infoButton = useSelector((state) => state.map.infoButton);

  return (
    <>
      {/* <SavePolygon /> */}
      <div>{infoButton ? <Info /> : <System />}</div>
    </>
  );
};

export default App;
