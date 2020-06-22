// console.log(res);
// 지도 생성
const container = document.getElementById("map");
const options = {
  center: new kakao.maps.LatLng(36.3154865690411, 127.446044443222),
  level: 4,
};
const map = new kakao.maps.Map(container, options);

// 주소-좌표간 변환 서비스 객체 생성
const geocoder = new kakao.maps.services.Geocoder();

let callback = function (result, status) {
  if (status === kakao.maps.services.Status.OK) {
    const longitude = result[0].x;
    const latitude = result[0].y;
    console.log(longitude, latitude);
    // console.log(result[0]);
  }
};
geocoder.addressSearch(
  "대구광역시 달성군 다사읍 매곡리 1544번지 2호",
  callback
);

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
