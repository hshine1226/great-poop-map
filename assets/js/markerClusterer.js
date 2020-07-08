import axios from "axios";
import { googleMap } from "./googleMap";
import { addToiletDetail } from "./home";

export let markerCluster;

const getToilets = async (latt, long) => {
  const response = await axios({
    url: `/api/toilets?latt=${latt}&long=${long}`,
    method: "GET",
  });
  if (response.status === 200) {
    const toilets = response.data;

    return toilets;

    // for (let idx = 0; idx < toilets.length; idx++) {
    //   const long = toilets[idx].location.coordinates[0];
    //   const latt = toilets[idx].location.coordinates[1];
    // }
  }
};

const getBoxToilets = async (bl, ur) => {
  const response = await axios({
    url: `api/toilets/box`,
    method: "POST",
    data: {
      bl,
      ur,
    },
  });
  if (response.status === 200) {
    const toilets = response.data;
    return toilets;
  }
};

export const clearMarkers = () => {
  if (markerCluster) {
    markerCluster.clearMarkers();
  }
};

export const setToiletsMarker = async (bl, ur) => {
  const toilets = await getBoxToilets(bl, ur);

  let markers = toilets.map(function (toilet, i) {
    const marker = new google.maps.Marker({
      position: {
        lat: toilet.location.coordinates[1],
        lng: toilet.location.coordinates[0],
      },
      label: toilet.name,
    });

    marker.id = toilet._id;

    const handleMarkerClick = async () => {
      const toiletId = marker.id;
      const response = await axios({
        url: `api/toilets/${toiletId}`,
        method: "GET",
      });
      if (response.status === 200) {
        const toilet = response.data;
        addToiletDetail(toilet);
        console.log(toilet);
      }
    };

    // 마커에 click 이벤트 리스너 등록
    marker.addListener("click", handleMarkerClick);
    return marker;
  });

  markerCluster = new MarkerClusterer(googleMap, markers, {
    imagePath:
      "https://github.com/googlemaps/v3-utility-library/blob/master/packages/markerclustererplus/images/m1.png?raw=true",
  });
};
