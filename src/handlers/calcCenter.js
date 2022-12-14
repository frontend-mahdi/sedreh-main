const calcCenterHandler = (polygon) => {
  // const polygon = [[lat,lon],...]
  let lats = 0;
  let lons = 0;
  let lengthPolyg = polygon?.length - 1;
  for (let i = 0; i < lengthPolyg; i++) {
    const lat = polygon[i][0];
    const lon = polygon[i][1];
    lats = lat + lats;
    lons += lon;
  }
  return [(lats / lengthPolyg).toFixed(5), (lons / lengthPolyg).toFixed(5)];
};

export default calcCenterHandler;
