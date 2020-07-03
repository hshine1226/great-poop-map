import axios from "axios";

const getLatLng = () => {};

// 컨트롤 추가
// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

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

// 주소로 경도 위도 구하기

const getLatLng = (address) => {
  const geocoder = new kakao.maps.services.Geocoder();
  var callback = async function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      const latitude = result[0].y;
      const longitude = result[0].x;

      const clusterer = new kakao.maps.MarkerClusterer({
        map: map,
        averageCenter: true,
        minLevel: 6,
        disableClickZoom: true,
      });
      var marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(latitude, longitude),
      });
      console.log(clusterer.getMinLevel());
      clusterer.addMarker(marker);
    }
  };

  geocoder.addressSearch(address, callback);
};
