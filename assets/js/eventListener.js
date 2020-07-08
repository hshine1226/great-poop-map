import { googleMap } from "./googleMap";
import { setToiletsMarker, clearMarkers } from "./markerClusterer";

const findToiletBtn = document.getElementById("js-findToilet");

const handleBtnClick = () => {
  clearMarkers();
  const bounds = googleMap.getBounds();
  // 현재 지도의 범위 내의 upper right, bottom left 좌표를 Array 형태로 받아온다.
  const bl = [bounds.Ua.i, bounds.Za.i];
  const ur = [bounds.Ua.j, bounds.Za.j];
  setToiletsMarker(bl, ur);
};

findToiletBtn.addEventListener("click", handleBtnClick);
