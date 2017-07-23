var LhpMap = {
	map: null,
	markers: []
};

var ListKoordinat = new Array();
var dataJSON = ${list};

for (var i = 0, length = dataJSON.length; i < length; i++) {
	ListKoordinat.push(dataJSON[i].koordinat);
}

console.log(dataJSON);
console.log(ListKoordinat);

/**
 * Menampilkan/menyembunyikan Marker.
 */
LhpMap.toggleMarkers = function(opt_enable) {
	if (typeof opt_enable == 'undefined') {
	    opt_enable = !LhpMap.markers[0].getMap();
	}
	for (var n = 0, marker; marker = LhpMap.markers[n]; n++) {
	    marker.setMap(opt_enable ? LhpMap.map : null);
	}
};

/**
 * initialize the map.
 */
var mlatlong = ListKoordinat[0].split(",");

var ruteCenter = new google.maps.LatLng(mlatlong[0], mlatlong[1]);

var rtrim =	function(s) {
	var r = s.length - 1;
	while(r > 0 && s[r] == ' ') {
	    r -= 1;
	}
	return s.substring(0, r + 1);
}

LhpMap.init = function() {
	// Create single instance of a Google Map.
	LhpMap.map = new google.maps.Map(document.getElementById("map-canvas"), {
	    zoom: 20,
	    center: ruteCenter,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	});
	
	var markerPositions = new Array();
    
 	for (var i = 0, length = dataJSON.length; i < length; i++) {
		markerPositions.push(new google.maps.LatLng(dataJSON[i].koordinat.split(",")[0],
                                                    dataJSON[i].koordinat.split(",")[1]));
	}

	var infoWindow = new google.maps.InfoWindow();

	for (var i = 0, length = dataJSON.length; i < length; i++) {
	    var data = dataJSON[i];
	    var latLng = new google.maps.LatLng(data.koordinat.split(",")[0],
                                            data.koordinat.split(",")[1]); 
	    var marker = new google.maps.Marker({
	    	position: latLng,
	    	title: rtrim(data.nama)
	  	});

	    LhpMap.markers.push(marker);

	    // Creating a closure to retain the correct data 
	    //Note how I pass the current data in the loop into the closure (marker, data)
	    (function(marker, data) {

	        // Attaching a click event to the current marker
	        google.maps.event.addListener(marker, "click", function(e) {
	            infoWindow.setContent(data.nama);
	            infoWindow.open(LhpMap, marker);
	        });

	    })(marker, data);
	}

	LhpMap.toggleMarkers(true);
};

// Call the init function when the page loads.
google.maps.event.addDomListener(window, 'load', LhpMap.init);

