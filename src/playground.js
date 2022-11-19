import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactMapGL from "react-map-gl";
import MapboxCompare from "mapbox-gl-compare";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl-compare/dist/mapbox-gl-compare.css";
// import "./styles.css";

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g";

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
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
    const beforeMap = beforeRef.current.getMap();
    const afterMap = afterRef.current.getMap();
    const map = new MapboxCompare(beforeMap, afterMap, "#comparison-container");

    return () => map.remove();
  }, []);

  return (
    <div id="comparison-container" style={{ ...style, width: "100%" }}>
      <ReactMapGL
        ref={beforeRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        style={style}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxApiAccessToken={MAPBOX_TOKEN}
      />
      <ReactMapGL
        ref={afterRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        style={style}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        mapboxApiAccessToken={MAPBOX_TOKEN}
      />
    </div>
  );
}
