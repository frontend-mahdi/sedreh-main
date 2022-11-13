import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import ReactMapGL from "react-map-gl";
import MapboxCompare from "mapbox-gl-compare";

import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl-compare/dist/mapbox-gl-compare.css";
import { useSelector } from "react-redux";
import {
  Layer,
  Source,
  NavigationControl,
  FullscreenControl,
} from "react-map-gl";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g";

const Compare = function Compare() {
  const middlePoygonx = useSelector((state) => state.map?.middlePoygon);
  const urlCompare = useSelector((state) => state.map?.urlCompare);
  const titlePolygonLeft = useSelector((state) => state.map?.titlePolygonLeft);
  const titlePolygonRight = useSelector(
    (state) => state.map?.titlePolygonRight
  );
  const [urlLayerLeft, setUrlLayerLeft] = useState("");
  const [urlLayerRight, setUrlLayerRight] = useState("");

  const navStyle = {
    position: "absolute",
    padding: "10px",
    top: 150,
    left: 0,
  };

  const fullStyle = {
    marginTop: 120,
    marginLeft: 10,
    zIndex: 1,
    height: 1,
  };

  // const renderDrawTools = () => {
  //   return (
  //     <div className="mapboxgl-ctrl-bottom-left">
  //       <div className="mapboxgl-ctrl-group mapboxgl-ctrl">
  //         <button
  //           // disabled={polygonAdded}
  //           style={{
  //             cursor: polygonAdded ? "not-allowed" : "pointer",
  //             backgroundColor: polygonAdded ? "#2e2e2e" : "#000",
  //           }}
  //           className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon mapbox-gl-draw_ctrl-draw"
  //           title="Polygon tool (p)"
  //           onClick={drawRect}
  //         />
  //         {isShown ? <SavePolygon delete={onDelete} /> : null}
  //         <button
  //           className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_point "
  //           title="Point tool"
  //           onClick={() => setMode(new DrawPointMode())}
  //         />
  //         <button
  //           className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_trash"
  //           title="delete"
  //           onClick={onDelete}
  //         />
  //       </div>
  //     </div>
  //   );
  // };
  // latitude: +middlePoygonx[1];
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    longitude: 51.388973,
    latitude: 35.689198,
    zoom: 11,
    bearing: 0,
    pitch: 0,
  });
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );
  const beforeRef = useRef();
  const afterRef = useRef();
  const style = {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
  };

  useEffect(() => {
    console.log("middlePoygonx", middlePoygonx);
    setViewport({
      ...viewport,
      latitude: +middlePoygonx[1],
      longitude: +middlePoygonx[0],
    });
  }, [middlePoygonx]);
  useEffect(() => {
    const beforeMap = beforeRef.current.getMap();
    const afterMap = afterRef.current.getMap();
    const map = new MapboxCompare(beforeMap, afterMap, "#comparison-container");

    return () => map.remove();
  }, []);
  useEffect(() => {
    if (!!!!titlePolygonLeft && typeof titlePolygonLeft == "string") {
      const layerCode = titlePolygonLeft.slice(7);
      const url = `http://138.201.167.227:8080/geoserver/sedreh/wms?service=WMS&version=1.1.0&request=GetMap&layers=sedreh%3A${layerCode}&bbox={bbox-epsg-3857}&width=672&height=768&srs=EPSG:3857&transparent=true&styles=&format=image%2Fpng`;
      setUrlLayerLeft(url);
    }
  }, [titlePolygonLeft]);
  useEffect(() => {
    if (!!!!titlePolygonRight && typeof titlePolygonRight == "string") {
      const layerCode = titlePolygonRight.slice(7);
      const url = `http://138.201.167.227:8080/geoserver/sedreh/wms?service=WMS&version=1.1.0&request=GetMap&layers=sedreh%3A${layerCode}&bbox={bbox-epsg-3857}&width=672&height=768&srs=EPSG:3857&transparent=true&styles=&format=image%2Fpng`;
      setUrlLayerRight(url);
    }
  }, [titlePolygonRight]);
  return (
    <div id="comparison-container" style={{ ...style, width: "100%" }}>
      <ReactMapGL
        ref={beforeRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        style={style}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <FullscreenControl
          style={fullStyle}
          className="xyz"
          captureScroll={true}
        />
        <div className="nav " style={navStyle}>
          <NavigationControl
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
          />
        </div>
        <Geocoder
          mapRef={beforeRef}
          onViewportChange={handleViewportChange}
          mapboxApiAccessToken={
            "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g"
          }
          placeholder="مکان مورد نظر خود ار پیدا کنید ..."
          position="top-left"
        />

        {/* {renderDrawTools()} */}

        {urlLayerLeft.length > 0 && (
          <Source
            id="wms-test-source2"
            type="raster"
            tiles={[urlLayerLeft]}
            encoding="mapbox"
            tileSize={256}
          >
            <Layer
              id="wms-test-source2"
              type="raster"
              source="wms-test-source2"
              paint={{}}
            />
          </Source>
        )}
      </ReactMapGL>
      <ReactMapGL
        ref={afterRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        style={style}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={MAPBOX_TOKEN}
        dragPan={true}
      >
        {/* <FullscreenControl style={fullStyle} className="xyz" /> */}

        <Geocoder
          mapRef={afterRef}
          onViewportChange={handleViewportChange}
          mapboxApiAccessToken={
            "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g"
          }
          placeholder="مکان مورد نظر خود ار پیدا کنید ..."
          position="top-left"
        />
        {urlLayerRight.length > 0 && (
          <Source
            id="wms-test-source2"
            type="raster"
            tiles={[urlLayerRight]}
            encoding="mapbox"
            tileSize={256}
          >
            <Layer
              id="wms-test-source2"
              type="raster"
              source="wms-test-source2"
              paint={{}}
            />
          </Source>
        )}
      </ReactMapGL>
    </div>
  );
};

export default Compare;
