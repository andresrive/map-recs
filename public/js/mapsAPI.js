// const Post = require("../../models/Post.model")

// let coordenadas = document.getElementById("direction").value
// console.log(coordenadas)

let marker
function initMap() {
    const myLatLng = { lat: 41.38879, lng: 2.15899 }
    const map = new google.maps.Map(document.getElementById("map"), {
        center: myLatLng,
        zoom: 13,
        mapTypeControl: false,
        mapId: '31c61b2a8f3ed6f9',
        streetViewControl: false
    });


    const input = document.getElementById("pac-input");
    const options = {
        fields: ["formatted_address", "geometry", "name"],
        strictBounds: false,
        types: [],
    };


    const autocomplete = new google.maps.places.Autocomplete(input, options);


    autocomplete.bindTo("bounds", map);

    // const infowindow = new google.maps.InfoWindow();
    // const infowindowContent = document.getElementById("infowindow-content");

    // infowindow.setContent(infowindowContent);




    const features = [
        {
            position: new google.maps.LatLng(41.39550664355469, 2.1620292786643365),
            type: "info",
        },
        {
            position: new google.maps.LatLng(41.38428068389497, 2.176468720113538),
            type: "info",
        },
        {
            position: new google.maps.LatLng(41.39117708987904, 2.180684436927278),
            type: "info",
        }]

    for (let i = 0; i < features.length; i++) {
        marker = new google.maps.Marker({
            position: features[i].position,
            map: map,
            animation: google.maps.Animation.DROP,
        });
    }

    // const marker = new google.maps.Marker({
    //     draggable: true,
    //     animation: google.maps.Animation.DROP,
    //     map,
    //     anchorPoint: new google.maps.Point(0, -29),
    // });
    marker.addListener("click", toggleBounce);


    autocomplete.addListener("place_changed", () => {

        // infowindow.close();
        marker.setVisible(false);

        const place = autocomplete.getPlace();
        console.log(place)

        if (!place.geometry || !place.geometry.location) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
        }

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        // infowindowContent.children["place-name"].textContent = place.name;
        // infowindowContent.children["place-address"].textContent =
        //     place.formatted_address;
        // infowindow.open(map, marker);
    });

    // autocomplete.setTypes(["all"])



    function toggleBounce() {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }

}

window.initMap = initMap;

