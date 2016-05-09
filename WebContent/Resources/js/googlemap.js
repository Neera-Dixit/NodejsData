var pos;
var selectedMarkerLat;
var selectedMarkerLng;
var map;
var service;
var directionsService;
var directionsDisplay;


function test(map){
	alert(map);
}

//map,directionsService,directionsDisplay,startlat,startlng,endlat,endlng

function showRoute(){

startlat=pos.lat;
startlng=pos.lng;
endlat=selectedMarkerLat;
endlng=selectedMarkerLng;

	//console.log(startlat+" : "+startlng+ " : "+selectedMarkerLat+ " : "+selectedMarkerLng);
 
 		//alert("");
     	var start = new google.maps.LatLng(startlat,startlng);
        var end = new google.maps.LatLng(endlat,endlng);
        var bounds = new google.maps.LatLngBounds();
        bounds.extend(start);
        bounds.extend(end);
        map.fitBounds(bounds);
        
        var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING
        };
        
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                directionsDisplay.setMap(map);
            } else {
                alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
            }
        });
   }
            

            
 $(document).ready(function(){
 
        var loc;
        var infoWindow;
        var overlays = [];
        var resultList = [];
        var isMobile = $(window).width < 767;
		

        $('#searchBtn').click(function(){
        	var query = $('#query').val();

        	if(query!="")
        		searchUserRequestData();
           
            });
                  
            
           function getCurrentPositionOfUser(){
           
             navigator.geolocation.getCurrentPosition (
                    function(position) {    
                        var coords = position.coords;

                        pos = {
                                lat: coords.latitude,
                                lng: coords.longitude
                              };
                        
                        loc = new google.maps.LatLng(coords.latitude, coords.longitude);
                        map = new google.maps.Map(document.getElementById("map_canvas"), {
                            mapTypeId: google.maps.MapTypeId.ROADMAP,
                            mapTypeControl: false,
                            center: loc,
                            zoom: 13
                        });  
                        
                        service = new google.maps.places.PlacesService(map);  
                        directionsService = new google.maps.DirectionsService();     
                        directionsDisplay = new google.maps.DirectionsRenderer();                 
                        infoWindow = new google.maps.InfoWindow({map: map});  

                        infoWindow.setPosition(pos);
                        infoWindow.setContent('Your Location');
                        map.setCenter(pos);          
                    },      
                    function(error) {
                        if (error.code == 1) {              
                            $('#location-details').append('Please enable location tracking in your web browser');
                        } else if (error.code == 2) {
                            $('#location-details').append('Unable to determine location - please ensure location tracking is enabled in your browser');         
    
                        } else {
                            $('#location-details').append('Unable to determine location');
                        }
                    },
                    {enableHighAccuracy: true}
                );  
           
           }
 
        try {           
            if (typeof navigator.geolocation !== 'undefined') {   
              
              
          		getCurrentPositionOfUser();
              
              
            } else {
                $('#location-details').append('Your browser does not support location tracking');
            }
        } catch (e) {   
            alert('An error has occured');
        }   
        
        function plotResultList(){
             
            var iterator = 0;                  
            
            for(var i = 0; i < resultList.length; i++){
            
             
                              
                setTimeout(function(){
                    var lat = resultList[iterator].geometry.location.Za;
                    var lng = resultList[iterator].geometry.location.Ya;
                    var name = resultList[iterator].name;
                    var addr = resultList[iterator].formatted_address;
                    var reference = resultList[iterator].reference;
                    
                   // console.log(lat + " : "+lng);
                    
            var marker = new google.maps.Marker({
                        position: resultList[iterator].geometry.location,
                        map: map,
                        title: name,
                        animation: isMobile? 'undefined' : google.maps.Animation.DROP
                    });
                    overlays.push(marker);
                    
                    google.maps.event.addListener(marker, 'click', function(event) {
                   // console.log(event.latLng.lat()+" : "+event.latLng.lng());
                    
                    selectedMarkerLat=event.latLng.lat();
                    selectedMarkerLng=event.latLng.lng();
                        infoWindow.close();
                        var request = {
                            reference: reference
                        };
                        
                       service.getDetails(request, function(place, status){
                       
                         var content = "<h6>" + name + "</h6>";
                            if(status == google.maps.places.PlacesServiceStatus.OK){    
                                  if(typeof place.rating !== 'undefined'){
                                    var badgeType = '';
                                    if (place.rating < 2){
                                        badgeType = 'badge-important';
                                    } else if (place.rating >= 2 && place.rating <= 3){
                                        badgeType = 'badge-warning';
                                    } else {
                                        badgeType = 'badge-success';
                                    }
                                    content += "<p><small>Rating: <span class='badge " + badgeType + "'>" + place.rating + "</span></small></p>"; 
                                }    
                                
                                if(typeof place.formatted_address !== 'undefined'){
                                    content += "<br><small>" + place.formatted_address + "</small>";
                                }
                                
                                if(typeof place.formatted_phone_number !== 'undefined'){
                                    content += "<br><small><a href='tel:" + place.formatted_phone_number + "'>" + place.formatted_phone_number + "</a></small>";                                 
                                }
                                
                                if(typeof place.website !== 'undefined'){
                                    content += "<br><small><a href='" + place.website + "'>website</a></small>";
                                
                                }
                               
                             
                             content += "<br><b><a onclick='showRoute()'>Show Route</a></b>";    
                            }                            
                            
                            infoWindow.setContent(content);
                            infoWindow.open(map, marker);         
                        });
                    });
                    iterator++;
                }, isMobile? 0: (i * 75));
            }
        }
        
       /*  $('#search').submit(function(e){
        	 e.preventDefault();
        	 searchUserRequestData();
             
        });  */

        function searchUserRequestData(){

        	var query = $('#query').val();
            var request = {
                location: map.getCenter(),
                radius: '5000',
                query: query            
            };
                        
            service.textSearch(request, function(results, status, pagination){
                for(var i = 0; i < overlays.length; i++){                   
                    overlays[i].setMap(null);
                }
                resultList.length = 0;
                overlays.length = 0;
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    resultList = resultList.concat(results);
                    plotResultList();
                }
            });
			
         }

        
    });

   