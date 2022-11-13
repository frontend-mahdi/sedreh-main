import React from "react";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import ReactMapGL, {
  NavigationControl,
  Layer,
  Source,
  FullscreenControl,
  setRTLTextPlugin,
} from "react-map-gl";
import {
  Editor,
  EditingMode,
  // DrawPolygonMode,
  DrawPointMode,
  DrawRectangleMode,
} from "react-map-gl-draw";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import {
  getPolygonFromUser,
  getUrlCompare,
  updatePolygonList,
} from "../../features/counter/map";
import SavePolygon from "./SavePolygon";
import { useSelector } from "react-redux";
import { CommonLoading } from "react-loadingg";

setRTLTextPlugin(
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js"
);

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

const locateStyle = {
  marginTop: 80,
  marginLeft: 10,
};

export default function Mapbox() {
  const titlePolygon = useSelector((state) => state.map.titlePolygon);
  const polygonLoading = useSelector((state) => state.map.titlePolygonLoading);
  const polygon = useSelector((state) => state.map.polygon);
  const savedPolyOnMap = useSelector((state) => state.map.savedPolyOnMap);
  // console.log(titlePolygon);

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 35.689198,
    longitude: 51.388973,
    zoom: 11,
    bearing: 0,
    pitch: 0,
  });

  const [clearMap, setClearMap] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [polygonAdded, setPolygonAdded] = useState(false);
  const [urlLayer, setUrlLayer] = useState("");
  const [layerLoading, setLayerLoading] = useState(false);
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState();
  const [mode, setMode] = useState(new EditingMode());
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/streets-v11"
  );
  const mapRef = useRef();
  const editorRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("polygon", polygon);
  }, [polygon]);
  useEffect(() => {
    if (polygonAdded) {
      setMode(new EditingMode());
    }
  }, [polygonAdded]);
  const onUpdate = (payload) => {
    setClearMap(false);

    console.log("onUpdate payload", payload);
    setIsShown(true);
    setPolygonAdded(true);

    if (
      payload.editType == "addFeature" ||
      payload.editType == "movePosition"
    ) {
      dispatch(getPolygonFromUser(payload.data[0]));

      window.localStorage.setItem(
        "currentPolygon",
        JSON.stringify(payload.data[0])
      );
    }
    if (payload.editType === "getFeatures") {
      setMode(new EditingMode());
      setEditFeatures(payload.data);
    }
  };
  const onDelete = () => {
    console.log("onDelete");
    setPolygonAdded(false);
    setIsShown(false);
    setClearMap(true);
    console.log("editorRef.current", editorRef.current);
    if (selectedFeatureIndex >= 0) {
      editorRef.current.deleteFeatures(selectedFeatureIndex);
    }
  };

  const onSelect = (selected) => {
    console.log("onSelect selected", selected);
    setSelectedFeatureIndex(selected.selectedFeatureIndex);
  };

  const drawRect = () => {
    console.log("polygonAdded", polygonAdded);
    if (!polygonAdded) {
      setMode(new DrawRectangleMode());
    } else {
      setMode(new EditingMode());
    }
  };
  const renderDrawTools = () => {
    return (
      <div className="mapboxgl-ctrl-bottom-left">
        <div className="mapboxgl-ctrl-group mapboxgl-ctrl">
          <button
            // disabled={polygonAdded}
            style={{
              cursor: polygonAdded ? "not-allowed" : "pointer",
              backgroundColor: polygonAdded ? "#2e2e2e" : "#000",
            }}
            className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon mapbox-gl-draw_ctrl-draw"
            title="Polygon tool (p)"
            onClick={drawRect}
          />
          {isShown ? <SavePolygon delete={onDelete} /> : null}
          <button
            className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_point "
            title="Point tool"
            onClick={() => setMode(new DrawPointMode())}
          />
          <button
            className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_trash"
            title="delete"
            onClick={onDelete}
          />
        </div>
      </div>
    );
  };
  {
    /* @mahdi: 
      اولین کاری که میکنید اینکه ساختار پوشه های پروژه رو درست میکنید به این صورت
      *-components/
         -common/کامپوننت هایی که داخل پروژه مشترک هستند
            -cards/
            -buttons/
            .
            .
            .
         -rightPanel/قسمت های داخل پنل به تفکیک هریک کامپوننت مجزا شوند
           item1.jsx اسم دلخواه
           .
           .
           .
         -navbar/
         -map/
           Map.jsx
           -features/ابزارهای روی نقشه و یا هرچیزی که مربوط به نقشه هست

      *-redux/فایلای مربوط به ریداکس
      *-helper/توابع به تفکیک کاربرد هر یک در دسته مشخص
        -api/
        -map/
          calcCenter.js
        .
        .
        .
      *-assets/
        -images/
        
      */
  }
  {
    /* @mahdi: 
      کلیه فایلای استایل جانبی و فونت داخل این پوشه
       -public/
         -assets/
           -fonts/
           -css/
           -js/
           
      */
  }
  useEffect(() => {
    if (polygonLoading) {
      setLayerLoading(true);
    } else {
      setLayerLoading(false);
    }
  }, [polygonLoading]);

  useEffect(() => {
    if (!!!!titlePolygon && typeof titlePolygon == "string") {
      console.log("useEffect");
      const layerCode = titlePolygon.slice(7);
      const url = `http://138.201.167.227:8080/geoserver/sedreh/wms?service=WMS&version=1.1.0&request=GetMap&layers=sedreh%3A${layerCode}&bbox={bbox-epsg-3857}&width=672&height=768&srs=EPSG:3857&transparent=true&styles=&format=image%2Fpng`;
      setUrlLayer(url);
      // setUpdate(Math.random());
    }
    return function cleanup() {
      console.log("useEffect clean up");
      setUrlLayer("");
    };
  }, [titlePolygon]);
  useEffect(() => {
    console.log("urlLayer", urlLayer);
  }, [urlLayer]);
  // useEffect(() => {
  //   console.log(savedPolyOnMap, "savedPolyOnMap");
  //   if (savedPolyOnMap.geometry) {
  //     console.log(
  //       "savedPolyOnMap.geometry.coordinates[0][0]",
  //       "savedPolyOnMap.geometry.coordinates[0][2]",
  //       savedPolyOnMap.geometry.coordinates[0][0],
  //       savedPolyOnMap.geometry.coordinates[0][2]
  //     );
  //     setMode(
  //       new DrawRectangleMode(
  //         savedPolyOnMap.geometry.coordinates[0][0],
  //         savedPolyOnMap.geometry.coordinates[0][1]
  //       )
  //     );
  //   }
  // }, [savedPolyOnMap]);

  // dispatch(getUrlCompare(urlLayer));
  useEffect(() => {
    console.log("polygonAdded", polygonAdded);
  }, [polygonAdded]);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        ref={mapRef}
        mapStyle={mapStyle}
        mapboxApiAccessToken="pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        className="mapbox w-580"
      >
        {/* @mahdi:
        بجز تگ بالایی کلیه کامپوننت های زیر بایستی بصورت جداگانه هریک یک فایل جدا شده در دسته بندی مشخص داخل پوشه مپ قرار بگیرد
        */}
        <Geocoder
          mapRef={mapRef}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          mapboxApiAccessToken={
            "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g"
          }
          placeholder="مکان مورد نظر خود ار پیدا کنید ..."
          position="top-left"
        />
        <FullscreenControl style={fullStyle} className="xyz" />
        {layerLoading ? <CommonLoading color="#95DD91" /> : null}
        <div className="nav " style={navStyle}>
          <NavigationControl
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
          />
        </div>
        {titlePolygon ? () => showImage(titlePolygon) : null}
        <Editor
          style={{ width: "100%", height: "100%" }}
          ref={editorRef}
          clickRadius={12}
          mode={mode}
          features={!polygonAdded && clearMap && savedPolyOnMap}
          onSelect={onSelect}
          onUpdate={onUpdate}
          editHandleShape={"circle"}
        />
        {renderDrawTools()}

        {urlLayer.length > 0 && (
          <Source
            id="wms-test-source2"
            type="raster"
            tiles={[urlLayer]}
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
}
