import axios from "axios";

// 지도 생성

const container = document.getElementById("map");
const options = {
  center: new kakao.maps.LatLng(36.3154865690411, 127.446044443222),
  level: 1,
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

// 주변 화장실 마커 세팅
const getToilets = async (latt, long) => {
  const response = await axios({
    url: `/api/toilets?latt=${latt}&long=${long}`,
    method: "GET",
  });
  if (response.status === 200) {
    const toilets = response.data;
    console.log(toilets);
    const imageSrc = "../../static/poop.png";

    for (let idx = 0; idx < toilets.length; idx++) {
      const long = toilets[idx].location.coordinates[0];
      const latt = toilets[idx].location.coordinates[1];
      // 마커 이미지의 이미지 크기 입니다
      const imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(latt, long), // 마커를 표시할 위치
        title: toilets[idx].name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다

        image: markerImage, // 마커 이미지
      });

      marker.setMap(map);
    }
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
