// 지도 생성
const container = document.getElementById("map");
const options = {
  center: new kakao.maps.LatLng(36.3154865690411, 127.446044443222),
  level: 4,
};
const map = new kakao.maps.Map(container, options);

// 컨트롤 추가
// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// 주소-좌표간 변환 서비스 객체 생성
const geocoder = new kakao.maps.services.Geocoder();
let longitude, latitude;

var callback = async function (result, status) {
  if (status === kakao.maps.services.Status.OK) {
    latitude = result[0].y;
    longitude = result[0].x;
    // console.log(latitude, longitude);
  }
};

geocoder.addressSearch("해남군 송지면", callback);

// 클러스터에 마커 추가
const clusterer = new kakao.maps.MarkerClusterer({
  map: map,
  averageCenter: true,
  minLevel: 6,
  disableClickZoom: true,
});

var marker = new kakao.maps.Marker({
  position: new kakao.maps.LatLng(36.3154865690411, 127.446044443222),
});

clusterer.addMarker(marker);

// 마커 클러스터러에 클릭이벤트를 등록합니다
// 마커 클러스터러를 생성할 때 disableClickZoom을 true로 설정하지 않은 경우
// 이벤트 헨들러로 cluster 객체가 넘어오지 않을 수도 있습니다
kakao.maps.event.addListener(clusterer, "clusterclick", function (cluster) {
  // 현재 지도 레벨에서 1레벨 확대한 레벨
  const level = map.getLevel() - 1;

  // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
  map.setLevel(level, { anchor: cluster.getCenter() });
});

// 현재 내 위치 구하기
const tryBtn = document.getElementById("myLoc");
const handleClickBtn = () => {
  getMyLoc();
};
tryBtn.addEventListener("click", handleClickBtn);
function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  map.setCenter(new kakao.maps.LatLng(latitude, longitude));

  setMarker(latitude, longitude);
}
const getMyLoc = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};

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

// 주소로 latitude, longitude 받아오기

const getLatLng = (address) => {
  // 주소로 좌표를 검색합니다
  geocoder.addressSearch(address, function (result, status) {
    // 정상적으로 검색이 완료됐으면
    if (status === kakao.maps.services.Status.OK) {
      const latitude = result[0].y;
      const longitude = result[0].x;
      // console.log(latitude, longitude);
    }
  });
};

// DB에 있는 마커 지도에 표시하기
