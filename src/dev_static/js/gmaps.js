let map;


function render(data){

    var styles = [
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f7f1df"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#d0e3b4"
                }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.medical",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#fbd3da"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#bde6ab"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffe15f"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#efd151"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "black"
                }
            ]
        },
        {
            "featureType": "transit.station.airport",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#cfb2db"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#a2daf2"
                }
            ]
        }
    ];

    map = new google.maps.Map(document.getElementById("map"), {
        center: { lng: 35.215, lat: 31.77 },
        zoom: 14
    });

    
    map.setOptions({styles: styles});

    

    var i;
    
    for(const p of data.sen_list){

        const myLatLng = { lng: parseFloat(p.lng), lat: parseFloat(p.lat)  };

        const marker = new google.maps.Marker({
          position: myLatLng,
          map,
          title: p.name,
        });

        const contentString = `<div class="card">

    <img class="pic" src="/static/img/` + p.img_path + `.jpg" alt="">

    <h2 class="name">` + p.name + `</h2>

    <ul>
      
      <li class="data_label">ID</li>
      <li class="data_li">` + p.name + `</li>
      <li class="data_label">Age</li>
      <li class="data_li">` + p.age + `</li>
      <li class="data_li">Male</li>
      <li class="data_li">Was visited today</li>
      <li class="data_label">Phone</li>
      <li class="data_li">` + p.phone_num + `</li>
      <li class="data_label">Emergency contact</li>
      <li class="data_li">` + p.emergency_contact_num + `</li>
      <li class="data_label">Personal doctor</li>
      <li class="data_li">` + p.doctor_num + `</li>
      <li class="data_label">Address</li>
      <li class="data_li">` + p.address + `</li>
      <li class="data_label">Notes</li>
      <li class="data_li">` + p.notes + `</li>
      
    </ul>
  </div>
        `

    
        const infowindow = new google.maps.InfoWindow({
            content: contentString,
        });

        marker.addListener("click", () => {
            infowindow.open(map, marker);
          });


    }
    
}
function initMap() {

    fetch('/json/list_seniors')
      .then(response => response.json())
      .then(data => render(data));
}
