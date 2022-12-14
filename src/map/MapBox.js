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
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { useSelector } from "react-redux";
import { CommonLoading } from "react-loadingg";
import {
  Editor,
  EditingMode,
  DrawPointMode,
  DrawRectangleMode,
} from "react-map-gl-draw";
import Geocoder from "react-map-gl-geocoder";

import { getTotalMiddlePolygon } from "./../redux/map";

import usePolygonCenter from "../customHooks/usePolygonCenter";
import CloseLayerPopup from "./utils/CloseLayerPopup";
import SavePolygon from "./utils/SavePolygon";
import { GEO_API } from "../apiUrl";
setRTLTextPlugin(
  "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js"
);

const navStyle = {
  position: "absolute",
  padding: "39px",
  top: 50,
  left: 0,
};

const fullStyle = {
  marginTop: 44,
  marginLeft: 10,
  left: 0,
  zIndex: 1,
  height: 1,
};

export default function Mapbox() {
  const MAPBOX_TOKEN =
    "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g";
  const selectedLayer = useSelector((state) => state.map.titlePolygon);
  const polygonLoading = useSelector((state) => state.map.titlePolygonLoading);
  const middlePoygon = useSelector((state) => state.map?.middlePoygon);
  const savedPolyOnMap = useSelector((state) => state.map.savedPolyOnMap);

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 35.689198,
    longitude: 51.388973,
    zoom: 11,
    bearing: 0,
    pitch: 0,
  });

  const [currentPolygon, setCurrentPolygon] = useState([]);
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

  // custom hooks
  const [centerPolyg] = usePolygonCenter();

  const mapRef = useRef();
  const editorRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!!!centerPolyg && centerPolyg.length > 0) {
      dispatch(getTotalMiddlePolygon(centerPolyg));
    }
  }, [centerPolyg]);

  useEffect(() => {
    if (selectedLayer?.center?.length > 0) {
      setViewport((viewport) => {
        return {
          ...viewport,
          latitude: +selectedLayer?.center[1] || 35.689198,
          longitude: +selectedLayer?.center[0] || 51.388973,
        };
      });
    }
  }, [selectedLayer]);
  useEffect(() => {
    if (middlePoygon?.length > 0) {
      setViewport((viewport) => {
        return {
          ...viewport,
          latitude: +middlePoygon[1] || 35.689198,
          longitude: +middlePoygon[0] || 51.388973,
        };
      });
    }
  }, [middlePoygon]);

  useEffect(() => {
    // console.log("savedPolyOnMap", savedPolyOnMap);
    if (savedPolyOnMap.length > 0) {
      setClearMap(false);
    }
  }, [savedPolyOnMap]);
  useEffect(() => {
    if (polygonAdded) {
      setMode(new EditingMode());
      changeCursor("none");
    }
  }, [polygonAdded]);

  const onUpdate = (payload) => {
    // setClearMap(false);

    console.log("onUpdate payload", payload);
    if (payload.data[0].geometry.type == "Polygon") {
      setIsShown(true);
      setPolygonAdded(true);
    }

    if (
      payload.editType == "addFeature"
      //  ||payload.editType == "movePosition"
    ) {
      setCurrentPolygon(payload.data[0]);
    }
    if (payload.editType === "getFeatures") {
      setMode(new EditingMode());
      setEditFeatures(payload.data);
    }
  };
  const onDelete = () => {
    console.log("onDelete");
    setPolygonAdded(false);
    changeCursor("none");
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
      changeCursor("add");
    } else {
      setMode(new EditingMode());
      changeCursor("none");
    }
  };
  const drawPoint = () => {
    changeCursor("add");
    setMode(new DrawPointMode());
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
          {isShown ? (
            <SavePolygon data={currentPolygon} delete={onDelete} />
          ) : null}
          <button
            className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_point "
            title="Point tool"
            onClick={drawPoint}
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

  useEffect(() => {
    if (polygonLoading) {
      setLayerLoading(true);
    } else {
      setLayerLoading(false);
    }
  }, [polygonLoading]);

  useEffect(() => {
    const layerName = selectedLayer.layerName;
    if (!!!!layerName && typeof layerName == "string") {
      console.log("useEffect");
      const layerCode = layerName.slice(7);
      const url = `${GEO_API}/geoserver/sedreh/wms?service=WMS&version=1.1.0&request=GetMap&layers=sedreh%3A${layerCode}&bbox={bbox-epsg-3857}&width=672&height=768&srs=EPSG:3857&transparent=true&styles=&format=image%2Fpng`;
      setUrlLayer(url);
      // setUpdate(Math.random());
    }
    return function cleanup() {
      console.log("useEffect clean up");
      setUrlLayer("");
    };
  }, [selectedLayer]);

  const changeCursor = (state) => {
    const layer = document.querySelector("div.overlays");
    if (state == "add") layer.classList.add("cursor-pointer");
    else layer.classList.remove("cursor-pointer");
  };
  return (
    <div>
      <ReactMapGL
        {...viewport}
        style={{ cursor: "pointer" }}
        ref={mapRef}
        mapStyle={mapStyle}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={(nextViewport) => {
          setViewport(nextViewport);
        }}
        className="mapbox w-580"
      >
        <Geocoder
          mapRef={mapRef}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          placeholder="مکان مورد نظر خود را پیدا کنید..."
          position="top-left"
        />
        <FullscreenControl style={fullStyle} className="xyz" />
        {layerLoading ? <CommonLoading color="#95DD91" /> : null}
        <div className="nav" style={navStyle}>
          <NavigationControl
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
          />
        </div>

        <Editor
          style={{ width: "100%", height: "100%" }}
          ref={editorRef}
          clickRadius={12}
          mode={mode}
          features={clearMap ? null : !polygonAdded && savedPolyOnMap}
          onSelect={onSelect}
          onUpdate={onUpdate}
          editHandleShape={"circle"}
        />
        {renderDrawTools()}

        {!!!!selectedLayer.layerName && (
          <CloseLayerPopup data={selectedLayer} />
        )}
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
