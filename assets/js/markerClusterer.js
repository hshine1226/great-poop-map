import { googleMap, getCurrentLocation } from "./googleMap";
import axios from "axios";

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

const setToiletsMarker = async (bl, ur) => {
  const toilets = await getBoxToilets(bl, ur);

  let markers = toilets.map(function (toilet, i) {
    return new google.maps.Marker({
      position: {
        lat: toilet.location.coordinates[1],
        lng: toilet.location.coordinates[0],
      },
      label: toilet.name,
    });
  });

  var markerCluster = new MarkerClusterer(googleMap, markers, {
    imagePath:
      "https://github.com/googlemaps/v3-utility-library/blob/master/packages/markerclustererplus/images/m1.png?raw=true",
  });
};

googleMap.addListener("bounds_changed", function () {
  const bounds = googleMap.getBounds();

  // 현재 지도의 범위 내의 upper right, bottom left 좌표를 Array 형태로 받아온다.
  const bl = [bounds.Ua.i, bounds.Za.i];
  const ur = [bounds.Ua.j, bounds.Za.j];
  setToiletsMarker(bl, ur);
});

// setToiletsMarker(currentLocation);
