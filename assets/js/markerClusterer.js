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

const setToiletsMarker = async () => {
  const center = { lat: 36.3154865690411, lng: 127.446044443222 };
  const toilets = await getToilets(center["lng"], center["lat"]);

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

setToiletsMarker(currentLocation);
