import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Info from "./info/Info";
// import "./app.css";
import MapApp from "./map/MapApp";
import { saveImageHandler, savePolygonHandler } from "./redux/menu";
const App = () => {
  const infoButton = useSelector((state) => state.map.infoButton);
  const dispatch = useDispatch();
  // set initial value of savedPolygons and savedImages

  // useEffect(() => {
  //   console.log("images mojod hast?");
  //   const condition = !!!!JSON.parse(
  //     window.localStorage.getItem("savedPictures")
  //   );
  //   if (condition) {
  //     console.log("images mojod");
  //     dispatch(
  //       saveImageHandler(
  //         JSON.parse(window.localStorage.getItem("savedPictures"))
  //       )
  //     );
  //   }
  // }, []);
  // useEffect(() => {
  //   return () => {
  //     if (!!!!JSON.parse(window.localStorage.getItem("savedPolygons"))) {
  //       dispatch(
  //         savePolygonHandler(
  //           JSON.parse(window.localStorage.getItem("savedPolygons"))
  //         )
  //       );
  //     }
  //   };
  // }, []);
  return <>{infoButton ? <Info /> : <MapApp />}</>;
};

export default App;
