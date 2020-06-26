import axios from "axios";

// 지도 생성

const container = document.getElementById("map");
const options = {
  center: new kakao.maps.LatLng(36.3154865690411, 127.446044443222),
  level: 4,
};
const map = new kakao.maps.Map(container, options);

// 드래그 가능한 마커 생성하기
const setMarker = (latitude, longitude) => {
  // 마커가 표시될 위치입니다
  var markerPosition = new kakao.maps.LatLng(latitude, longitude);

  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    position: markerPosition,
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);

  // 마커가 드래그 가능하도록 설정합니다
  marker.setDraggable(true);
};

// 내 위치 설정하기
const setMyLoc = () => {
  const setBtn = document.getElementById("jsSetMyloc");

  const showPosition = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    map.setCenter(new kakao.maps.LatLng(latitude, longitude));

    setMarker(latitude, longitude);
  };

  const handleClickBtn = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  setBtn.addEventListener("click", handleClickBtn);
};

// // 클러스터에 마커 추가
// const clusterer = new kakao.maps.MarkerClusterer({
//   map: map,
//   averageCenter: true,
//   minLevel: 6,
//   disableClickZoom: true,
// });

// var marker = new kakao.maps.Marker({
//   position: new kakao.maps.LatLng(36.3154865690411, 127.446044443222),
// });

// clusterer.addMarker(marker);

// 주변 화장실 마커 세팅
const getToilets = async (latt, long) => {
  const response = await axios({
    url: `/api/toilets?latt=${latt}&long=${long}`,
    method: "GET",
  });
  if (response.status === 200) {
    console.log(response);
  }
};
const setNearMarker = () => {
  const setBtn = document.getElementById("jsGetToilets");
  const handleClick = () => {
    const latt = map.getCenter().Ga;
    const long = map.getCenter().Ha;
    getToilets(latt, long);
  };

  setBtn.addEventListener("click", handleClick);
};

setMyLoc();
setNearMarker();
