// 지도 생성
const container = document.getElementById("map");
const options = {
  center: new kakao.maps.LatLng(36.3154865690411, 127.446044443222),
  level: 6,
};
const map = new kakao.maps.Map(container, options);

// 주소-좌표간 변환 서비스 객체 생성
const geocoder = new kakao.maps.services.Geocoder();

let callback = function (result, status) {
  if (status === kakao.maps.services.Status.OK) {
    const longitude = result[0].x;
    const latitude = result[0].y;
    console.log(result);
    console.log(latitude, longitude);
  }
};

geocoder.addressSearch("대전시 동구 대전로 542번길 78", callback);

// 클러스터에 마커 추가
var clusterer = new kakao.maps.MarkerClusterer({
  map: map,
  averageCenter: true,
  minLevel: 6,
  disableClickZoom: true,
});

var myLocation = new kakao.maps.Marker({
  position: new kakao.maps.LatLng(36.3154865690411, 127.446044443222),
});

clusterer.addMarker(myLocation);

kakao.maps.event.addListener(clusterer, "clusterclick", function (cluster) {
  console.log(cluster.getCenter());
  console.log("inin");
});
