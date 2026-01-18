// Lambert Azimuthal Equal-Area projection (sphere), calibrated to the SimpleMaps US SVG (viewBox 0 0 1000 589).
// NOTE: Parameters (center/scale/translate) were fitted against state centroids on this specific SVG.

const deg2rad = (d) => (d * Math.PI) / 180;

// Fitted parameters for this SVG coordinate system
const LAT0 = 46.47911495917598;
const LON0 = -99.42053876801103;
const SCALE = 1178.579402815456;
const TX = 529.6326587316616;
const TY = 125.8378903645527;

export function projectLatLonToSvgXY(lat, lon) {
  const phi = deg2rad(lat);
  const lam = deg2rad(lon);
  const phi0 = deg2rad(LAT0);
  const lam0 = deg2rad(LON0);

  const sinPhi = Math.sin(phi);
  const cosPhi = Math.cos(phi);
  const sinPhi0 = Math.sin(phi0);
  const cosPhi0 = Math.cos(phi0);

  const dLam = lam - lam0;
  const cosDLam = Math.cos(dLam);
  const sinDLam = Math.sin(dLam);

  const k = Math.sqrt(2 / (1 + sinPhi0 * sinPhi + cosPhi0 * cosPhi * cosDLam));

  const xProj = k * cosPhi * sinDLam;
  const yProj = k * (cosPhi0 * sinPhi - sinPhi0 * cosPhi * cosDLam);

  // SVG y-axis grows downward, hence the minus sign.
  const x = SCALE * xProj + TX;
  const y = -SCALE * yProj + TY;

  return { x, y };
}

const clamp01 = (t) => Math.max(0, Math.min(1, t));

const geoToBox = (lat, lon, box, geo, pad = 6) => {
  const usableW = Math.max(1, box.width - pad * 2);
  const usableH = Math.max(1, box.height - pad * 2);

  const nx = clamp01((lon - geo.lonMin) / (geo.lonMax - geo.lonMin));
  const ny = clamp01((lat - geo.latMin) / (geo.latMax - geo.latMin));

  return {
    x: box.x + pad + nx * usableW,
    y: box.y + pad + (1 - ny) * usableH,
  };
};

const AK_SVG_BOX = { x: 18.7, y: 443.7, width: 284.8, height: 108.3 };
const HI_SVG_BOX = { x: 11.1, y: 320.5, width: 420.6, height: 219.6 };
const VI_DOCK = { x: 965, y: 560 }; // National Park of Virgin Islands
const AS_DOCK = { x: 925, y: 560 }; // National Park of American Samoa

const AK_GEO = { latMin: 51.0, latMax: 71.8, lonMin: -170.0, lonMax: -130.0 };
const HI_GEO = { latMin: 18.8, latMax: 22.4, lonMin: -160.6, lonMax: -154.6 };
const VI_GEO = { latMin: 17.0, latMax: 19.8, lonMin: -66.5, lonMax: -64.0 };
const AS_GEO = { latMin: -15.5, latMax: -12.5, lonMin: -172.5, lonMax: -168.0 };

const inRange = (lat, lon, g) => lat >= g.latMin && lat <= g.latMax && lon >= g.lonMin && lon <= g.lonMax;

export function projectLatLonToUsMapXY(lat, lon) {
  if (inRange(lat, lon, AK_GEO)) return geoToBox(lat, lon, AK_SVG_BOX, AK_GEO, 8);
  if (inRange(lat, lon, HI_GEO)) return geoToBox(lat, lon, HI_SVG_BOX, HI_GEO, 6);
  if (inRange(lat, lon, VI_GEO)) return VI_DOCK;
  if (inRange(lat, lon, AS_GEO)) return AS_DOCK;
  return projectLatLonToSvgXY(lat, lon);
}
