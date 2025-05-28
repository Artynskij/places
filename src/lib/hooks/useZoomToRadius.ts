export const getZoomToRadius = (zoom: number, latitude: number) => {
  const EARTH_RADIUS = 6378137; // в метрах
  const metersPerPixel = (2 * Math.PI * EARTH_RADIUS * Math.cos(latitude * Math.PI / 180)) / Math.pow(2, zoom + 8);
  const radius = metersPerPixel * 256; // 256px — ширина стандартного тайла
  return radius;
};