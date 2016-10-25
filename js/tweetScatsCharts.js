<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <title>Rectangle Events</title>
    <style>
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
      #map {
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
	<div id="chart-container"></div>
    <script src="js/jquery-2.2.4.js"></script>
    <script>
      // This example adds a user-editable rectangle to the map.
      // When the user changes the bounds of the rectangle,
      // an info window pops up displaying the new bounds.

      var rectangle;
      var map;
      var infoWindow;
	  var markersArray = [];
	  var ne;
      var sw;
var customIcons = {
	Marcos : {
		icon : 'http://labs.google.com/ridefinder/images/mm_20_blue.png'
	},
	'YiKai Gong' : {
		icon : 'http://labs.google.com/ridefinder/images/mm_20_red.png'
	},
	'rsinnott' : {
		icon : 'http://labs.google.com/ridefinder/images/mm_20_green.png'
	},
	'tweet' : {
		icon : 'http://labs.google.com/ridefinder/images/mm_20_brown.png'
	}
};
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: new google.maps.LatLng(-37.8136, 144.9631),
          zoom: 15
        });

        var bounds = {
          north: -37.797355301720984,
		  east: 144.96495497743228,
          south: -37.798454104311745,
          west: 144.96337407807926
        };

        // Define the rectangle and set its editable property to true.
        rectangle = new google.maps.Rectangle({
          bounds: bounds,
          editable: true,
          draggable: true
        });

        rectangle.setMap(map);
        rectangle.addListener('bounds_changed', showNewRect);
        infoWindow = new google.maps.InfoWindow();
		downloadUrl("phpsqlajax_genxml2.php",processXML);
		downloadUrl("phpsqlajax_genxml2WithTweets.php",processTweetXML);

      }
      // Show the new coordinates for the rectangle in an info window.


      /** @this {google.maps.Rectangle} */
      function showNewRect(event) {
         ne = rectangle.getBounds().getNorthEast();
         sw = rectangle.getBounds().getSouthWest();
		var bounds=rectangle.getBounds();
		var chartData;
        var contentString = '<b>Rectangle moved.</b><br>' +
            'New north-east corner: ' + ne.lat() + ', ' + ne.lng() + '<br>' +
            'New south-west corner: ' + sw.lat() + ', ' + sw.lng()+ '<br>'+
			'<select id="daySelector" style="display:none;"> <option value="Monday">Mon</option><option value="Tuesday">Tue</option> <option value="Wednesday">Wed</option><option value="Thursday">Thu</option><option value="Friday">Fri</option><option value="Saturday">Sat</option><option value="Sunday">Sun</option></select>';

		$.when(makeAjaxCall(ne,sw,"userPoint"), makeAjaxCallForTweet(ne,sw,"tweet")).done(function(a1, a2){
			outerAjaxCallContent(a1,a2);
			$('#daySelector').show();
			$('#daySelector').change(function () {
				console.log("inside day selector")
				$.when(makeAjaxCall2(ne,sw,$('#daySelector').val(),"userPointTime"), makeAjaxCallForTweet2(ne,sw,$('#daySelector').val(),"tweetTime")).done(function(a1, a2){
				console.log(a1);
				console.log(a2)
				innerAjaxCallContent(a1,a2);
				});
			});
        });
        infoWindow.setContent(contentString);
        infoWindow.setPosition(ne);
        infoWindow.open(map);
      }
	
    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDtSjS-3QGgnTFv_93r9ygiRly3k6LsSM&callback=initMap">
    </script>
	<script src="js/fusioncharts.js"></script>
	  <script src="js/fusioncharts.charts.js"></script>
	  <script src="js/themes/fusioncharts.theme.zune.js"></script>
	  <script src="js/gettingPointsAndTweetsInBoundHelper.js"></script>
	  <script src="http://static.fusioncharts.com/code/latest/fusioncharts.js"></script>
	  <script src="http://static.fusioncharts.com/code/latest/themes/fusioncharts.theme.fint.js?cacheBust=56"></script>
  </body>
</html>