import { googleMap } from "./googleMap";
import { setToiletsMarker, clearMarkers } from "./markerClusterer";

const mapContainer = document.getElementById("googleMap-container");

const toiletName = document.getElementById("js-toiletName");
const toiletTime = document.getElementById("js-toiletTime");
const findWayBtn = document.getElementById("js-findWay");
const commentBtn = document.getElementById("js-comment");
const findToiletBtn = document.getElementById("js-findToilet");
const commentAchor = document.getElementById("js-commentAchor");

export const addToiletDetail = (toilet) => {
  toiletName.innerHTML = toilet.name;
  toiletTime.innerHTML = toilet.openTime;
  commentAchor.href = `/toilets/${toilet._id}`;

  findWayBtn.classList.remove("invisible");
  commentBtn.classList.remove("invisible");
};

const findBtnClick = () => {
  clearMarkers();
  const bounds = googleMap.getBounds();
  // 현재 지도의 범위 내의 upper right, bottom left 좌표를 Array 형태로 받아온다.

  const bl = [bounds.Va.i, bounds.Za.i];
  const ur = [bounds.Va.j, bounds.Za.j];
  setToiletsMarker(bl, ur);
};

const commentBtnClick = () => {};

if (mapContainer) {
  findToiletBtn.addEventListener("click", findBtnClick);
  commentBtn.addEventListener("click", commentBtnClick);
}
