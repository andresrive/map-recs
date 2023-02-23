// const Post = require("../../models/Post.model")

let marker
function initMap() {
    if (!coordenadas) {
        return;
    }

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

    axios.get("http://localhost:3000/home/markers")
        .then(response => {
            response.data.forEach(post => {
                let latLng = {
                    lat: post.latitud,
                    lng: post.longitud
                }
                const infowindow = new google.maps.InfoWindow({
                    content: `<p style="font-weight: bolder; font-size: 1.5rem"> ${post.namePlace} </p>
                    <p style="font-style: italic; font-size: 1.2rem"> ${post.nameCategory} </p>
                    <p> ${post.direction} </p>
                    <img style="width:350px; height:150px" src="${post.image[0]}" alt="img-${post.namePlace}">`
                });
                marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    animation: google.maps.Animation.DROP,
                })
                marker.addListener("click", () => {
                    infowindow.open(map, marker);
                });

            })
        })
        .catch(err => next(err))

    // Crear un infowindow para el marcador


    // Agregar un listener para el evento 'click' en el marcador
    // Abrir el infowindow para mostrar la información del marcador



    autocomplete.addListener("place_changed", () => {

        infowindow.close();


        let newMarker = new google.maps.Marker({
            position: undefined,
            map: map,
            animation: google.maps.Animation.DROP,
        })

        newMarker.setVisible(false);

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

        newMarker.setPosition(place.geometry.location);
        newMarker.setVisible(true);
        infowindowContent.children["place-name"].textContent = place.name;
        infowindowContent.children["place-address"].textContent =
            place.formatted_address;
        infowindow.open(map, newMarker);
    });

    // autocomplete.setTypes(["all"])


}

window.initMap = initMap;

