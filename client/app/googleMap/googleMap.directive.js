'use strict';

angular.module('triviziApp')
  .directive('googleMap', function () {
    return {
      templateUrl: 'app/googleMap/googleMap.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
	      


	  	var map = new google.maps.Map(document.getElementById('googleMap'), {
            center: {
                lat: 38.4740022,
                lng: -95.426484
            },
            zoom: 3,
            mapTypeControl: false,
            zoomControl: true,
            scaleControl: true,
            streetViewControl: true,
            scrollwheel: false,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_TOP
            },
            streetViewControlOptions: {
                position: google.maps.ControlPosition.LEFT_TOP
            }
    	});
    	
    	alert('ok laoded');







		/*// marker windows
		infowindow = new google.maps.InfoWindow(),
		i,
		
		// marker vars
		marker,
		myIcon = new google.maps.MarkerImage("assets/images/custom-marker.png", null, null, null, new google.maps.Size(25,36)),
		markersArray = [],
		
		//autocomplete inputs
        options = {types: ['geocode']},
        
        navInput = document.getElementById('navLocationField'),
        navAutocomplete = new google.maps.places.Autocomplete(navInput, options),
        
        introInput = document.getElementById('introLocationField'),
        introAutocomplete = new google.maps.places.Autocomplete(introInput, options),
		
		// map init
		snazzyMap = [{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#747474"},{"lightness":"23"}]},{"featureType":"poi.attraction","elementType":"geometry.fill","stylers":[{"color":"#f38eb0"}]},{"featureType":"poi.government","elementType":"geometry.fill","stylers":[{"color":"#ced7db"}]},{"featureType":"poi.medical","elementType":"geometry.fill","stylers":[{"color":"#ffa5a8"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#c7e5c8"}]},{"featureType":"poi.place_of_worship","elementType":"geometry.fill","stylers":[{"color":"#d6cbc7"}]},{"featureType":"poi.school","elementType":"geometry.fill","stylers":[{"color":"#c4c9e8"}]},{"featureType":"poi.sports_complex","elementType":"geometry.fill","stylers":[{"color":"#b1eaf1"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":"100"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"},{"lightness":"100"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffd4a5"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffe9d2"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"weight":"3.00"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"weight":"0.30"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#747474"},{"lightness":"36"}]},{"featureType":"road.local","elementType":"labels.text.stroke","stylers":[{"color":"#e9e5dc"},{"lightness":"30"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":"100"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#d2e7f7"}]}],
		map = new google.maps.Map(document.getElementById('googleMap'), {
            center: {
                lat: 38.4740022,
                lng: -95.426484
            },
            zoom: 3,
            mapTypeControl: false,
            zoomControl: true,
            scaleControl: true,
            streetViewControl: true,
            scrollwheel: false,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_TOP
            },
            streetViewControlOptions: {
                position: google.maps.ControlPosition.LEFT_TOP
            },
            styles: snazzyMap
    	});*/	      
	      
	      
	      
	      
	    /*
			* google maps functions 
			* for markers, pan map functions
	    */    
	    
	    
	      
	    
/*
		$scope.emptyPlace = function() {
	        $('.placeHolderLocation').empty();
        };
    
		$scope.showMap = function() {			
			$(".intro-text").fadeOut("slow",function(){
				$("#googleMap").css("visibility", "visible");
				$("#results-container, .top-menu").fadeIn("slow", function(){});
			});
        }
		
		$scope.markersDisplay = function(lat, lng) {
			marker = new google.maps.Marker({
                position: {lat, lng},
                optimized: false,
                map: map,
                icon: myIcon,
                animation: google.maps.Animation.DROP
            });
            markersArray.push(marker);
		}     
		
		$scope.deleteMarkers = function() {		
			for (var i = 0; i < markersArray.length; i++) {
				markersArray[i].setMap(null);
			}			  
			markersArray = [];
            $(resultsItem).empty();
		}
		
		$scope.highlightResult = function(hotelId, hotelLat, hotelLng) {
			var selectedId = hotelId;
			$(resultsItem+" "+resultsHotelItem).removeClass("activeResult");
			$(resultsItem+" #"+selectedId+"").addClass("activeResult");
			
			var highlightResult = document.getElementById(selectedId);
			var topPos = highlightResult.offsetTop - 25;
            $(resultsContainer).animate({ scrollTop: topPos }, 500); 
		}
        
        $scope.highlightMarker = function(hotelMarker) {
            google.maps.event.trigger(hotelMarker,'click');
            map.setCenter(hotelMarker.getPosition());
            //map.setZoom(15);
        }
		
        $scope.buildReturn = function(lat, lng, id, name, shortDescription, listImg, rating, ratingImg, rateAverage, roundedAverage, rateTotal, roundedTotal, link, listImgFall) {
           
            if(rateTotal < $scope.budgetAmount && $scope.resultsList.length < 20) { 			  
                
                // map markers and pan map to city
                $scope.markersDisplay(lat, lng);           
                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infowindow.setContent("<div id=\""+id+"\" class=\"markerDisplay typography\"><span class=\"markerTotal\">$"+roundedTotal+"</span> <span class=\"medium-grey\">|</span> <img src=\""+ratingImg+"\" class=\"tripAdvisorRating\"></div>"); 	
                        infowindow.open(map, marker);
                        $scope.highlightResult(id);
                    }
                })(marker, i));
                
                // build navigation list
                $scope.resultsList.push({
                    id: id,
                    name: name,
                    listImg: listImg,
                    listImgFall: listImgFall,
                    ratingImg: ratingImg,
                    roundedAverage: roundedAverage,
                    roundedTotal: roundedTotal,
                    link: link,
                    markerId: marker
                });
                  
            } else {}
            
        }
        
        $scope.panMap = function(id, firstMarker) {
            var place = $scope.destination;
            if (place.geometry.viewport) {
                map.setCenter(firstMarker.getPosition());
                google.maps.event.trigger(firstMarker,'click');
                map.setZoom(15);
            } else {
                map.setCenter(place.geometry.location);
            }            
        }
	
        $scope.navLocationChanged = google.maps.event.addListener(navAutocomplete, 'place_changed', function (e) {
            $scope.destination = navAutocomplete.getPlace();
            $scope.specificLocation = $scope.destination.formatted_address;
            $scope.seekDeer($scope.destination.formatted_address);
        });
    
        $scope.introLocationChanged = google.maps.event.addListener(introAutocomplete, 'place_changed', function () {
            $scope.destination = introAutocomplete.getPlace();
            $scope.specificLocation = $scope.destination.formatted_address;
            $scope.seekDeer($scope.destination.formatted_address);
        });
*/
	      
	      
	      
	      
      }
    };
  });
