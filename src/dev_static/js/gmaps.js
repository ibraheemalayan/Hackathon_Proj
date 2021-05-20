let map;

var current_id = null;


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
        center: { lng: data.current_lng , lat: data.current_lat },
        zoom: 14
    });

    
    map.setOptions({styles: styles});

    const starting_lat_lng = { lng: parseFloat(data.current_lng), lat: parseFloat(data.current_lat)  };

    const marker = new google.maps.Marker({
      position: starting_lat_lng,
      map,
      icon:"/static/img/placeholder.png",
      title: p.name,
    });

    var i;
    
    for(const p of data.sen_list){

        const myLatLng = { lng: parseFloat(p.lng), lat: parseFloat(p.lat)  };

        const marker = new google.maps.Marker({
          position: myLatLng,
          map,
          icon:(p.checked_in_today)?"/static/img/location_green.png":"/static/img/location_red.png",
          title: p.name,
        });

        const m = (p.gender == "male")? `Male` : `Female`;
        const d = (p.checked_in_today)?`Was visited today`:`Was not visited yet`;

        const contentString = `<div class="card">

    <img class="pic" src="/static/img/` + p.img_path + `.jpg" alt="">

    <h2 class="name">` + p.name + `</h2>

    <ul>
      
      <li class="data_label">ID</li>
      <li class="data_li">` + p.name + `</li>
      <li class="data_label">Age</li>
      <li class="data_li">` + p.age + `</li>
      <li class="data_li">` + m + `</li>
      <li class="data_li">` + d +`</li>
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
      <li><button onclick="OpenPopUp(` + p.id + `)" class="btn">Submit Feedback</button></li>
      <li><button onclick="window.open('https://www.google.com/maps/dir/` + data.current_lat + `,` + data.current_lng + `/` + p.lat + `,` + p.lng + `/@` + p.lat + `,` + p.lng + `,15z');" class="btn">Navigate ↗</button></li>
      
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

function OpenPopUp(id){

    current_id = id;
    var modal = document.getElementById("pop_up");
    modal.style.display = "block";
    document.getElementById("map").classList.add("blur");
}

var modal = document.getElementById("pop_up");
var span = document.getElementById("close");

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// ///////////////////////////

function OpenPathPopUp(){
    var modal = document.getElementById("path_pop_up");
    modal.style.display = "block";
    document.getElementById("map").classList.add("blur");
}

var p = document.getElementById("path_pop_up");
var close = document.getElementById("close_path");

close.onclick = function() {
  p.style.display = "none";
  document.getElementById("map").classList.remove("blur");
}

window.onclick = function(event) {
  if (event.target == p) {
    p.style.display = "none";
  }
}


function green(){

    modal.style.display = "none";
  document.getElementById("map").classList.remove("blur");
    window.open("/green_point/" + current_id);
}