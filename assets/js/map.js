import axios from "axios";

// 지도 생성

const container = document.getElementById("map");
const options = {
  center: new kakao.maps.LatLng(36.3154865690411, 127.446044443222),
  level: 4,
};
const map = new kakao.maps.Map(container, options);

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
const mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
const zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

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
      let marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(latt, long), // 마커를 표시할 위치
        title: toilets[idx].name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: markerImage, // 마커 이미지
      });

      // 마커의 해당 화장실 id 추가
      marker.id = toilets[idx]._id;

      // 마커에 표시할 인포윈도우를 생성합니다
      const infowindow = new kakao.maps.InfoWindow({
        content: toilets[idx].name, // 인포윈도우에 표시할 내용
      });

      kakao.maps.event.addListener(
        marker,
        "mouseover",
        makeOverListener(map, marker, infowindow)
      );
      kakao.maps.event.addListener(
        marker,
        "mouseout",
        makeOutListener(infowindow)
      );
      // Click Listener
      kakao.maps.event.addListener(marker, "click", () =>
        handleClickListener(marker)
      );
      marker.setMap(map);
    }
  }
};

const setToiletDetail = (toilet) => {
  console.log(toilet);
  const tbody = document.getElementById("jsTbody");
  const tr = document.createElement("tr");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  td1.className = "px-6 py-4 whitespace-no-wrap border-b border-gray-200";
  td2.className = "px-6 py-4 whitespace-no-wrap border-b border-gray-200";
  td3.className =
    "px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium";
  const a = document.createElement("a");
  a.href = "#";
  a.className = "text-indigo-600 hover:text-indigo-900";
  a.innerHTML = "길찾기";
  const title = document.createElement("div");
  title.innerHTML = toilet.name;
  title.className = "text-sm leading-5 font-medium text-gray-900";
  const time = document.createElement("div");
  time.innerHTML = toilet.openTime;
  time.className = "text-sm leading-5 font-medium text-gray-900";

  tbody.append(tr);
  tr.append(td1);
  tr.append(td2);
  tr.append(td3);
  td1.append(title);
  td2.append(time);
  td3.append(a);
};

const getToiletById = async (id) => {
  const response = await axios({
    url: `/api/${id}`,
    method: "GET",
  });
  if (response.status === 200) {
    const toilet = response.data;
    setToiletDetail(toilet);
  }
};
const handleClickListener = (marker) => {
  const toiletId = marker.id;
  getToiletById(toiletId);
};

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다
const makeOverListener = (map, marker, infowindow) => {
  return function () {
    infowindow.open(map, marker);
  };
};

// 인포윈도우를 닫는 클로저를 만드는 함수입니다
const makeOutListener = (infowindow) => {
  return function () {
    infowindow.close();
  };
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
