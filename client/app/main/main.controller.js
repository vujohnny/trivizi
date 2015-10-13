'use strict';
(function() {

function MainController($scope, $http, socket, $filter) {
	
		/*
			* global vars for google maps & results
			* views info init, dropboxes, select inputs
		*/	
		
        var // results vars
			resultsContainer = ".results",
			resultsHotelItem = ".hotel-item",
        
			// marker windows
			infowindow = new google.maps.InfoWindow(),
			i,
			
			// marker vars
			marker,
			myIcon = new google.maps.MarkerImage("assets/images/custom-marker.png", null, null, null, new google.maps.Size(25,36)),
			markersArray = [],
			
			//autocomplete inputs
            options = {types: ['(cities)']},
            
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
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL,
                    position: google.maps.ControlPosition.LEFT_TOP
                },
                scrollwheel: false,
                styles: snazzyMap
        	});		
		
		$scope.budgetAmount = 1000;
    
    	$scope.resultsList = [];
		        
        $scope.typesOfPlaces = ['Romantic', 'Tropical', 'Party', 'Pets Ok', 'Family'];
  
        $scope.numberOfAdults = {
			"type": "select", 
			"name": "totalAdults",
			"value": "2", 
			"values": [ "1", "2", "3", "4", "5", "6", "7", "8"] 
		};
        
        $scope.arriveDate = {
            defaultValue: new Date(),
            minDate: new Date() - 1,
            maxDate: new Date().setFullYear(new Date().getFullYear() + 2),
            showweeks: false,
            mode: "month"
        }
        
        $scope.departDate = {
            defaultValue: new Date(),
            minDate: new Date() - 1,
            maxDate: new Date().setFullYear(new Date().getFullYear() + 2),
            showweeks: false,
            mode: "month"
        };
        
        /*
	        * global functions for views, maps, builds
	        * main seekdeer function submit
	    */
    
        $scope.seekDeer = function() {
            //console.log("inside getCurrentValue");
            $http.post('/api/things', {
                name: "$"+$scope.budgetAmount+" | "+$scope.calendarArrive+" - "+$scope.calendarDepart+" | "+$scope.specificLocation
            });
            $scope.newThing = '';
            $scope.showMap();
            $scope.eanReturn($scope.destination);
        };
	    
	    $('.disable-drop').click(function(event){
			event.stopPropagation();
		});
    
        $scope.emptyPlace = function() {
	        $('.placeHolderLocation').empty();
        };
    
		$scope.showMap = function() {			
			$(".intro-text").fadeOut("slow",function(){
				$("#googleMap").css("visibility", "visible");
				$("#results-container, .top-menu").fadeIn("slow", function(){});
			});
        }
        
	    /*
			* google maps functions 
			* for markers, pan map functions
	    */      
		
		$scope.markersDisplay = function(lat, lng) {
			marker = new google.maps.Marker({
                position: {lat, lng},
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
            $(resultsContainer).empty();
		}
		
		$scope.highlightResult = function(id) {
			var selectedId = id;
			$(resultsContainer+" "+resultsHotelItem).removeClass("activeResult");
			$(resultsContainer+" #"+selectedId+"").addClass("activeResult");
			
			var topPos = $("#"+selectedId).offset().top;
			//document.getElementById('results-container').scrollTop = topPos;
            $("#results-container").animate({ scrollTop: topPos }, 500);
            console.log(topPos);
		}
        
        $scope.highlightMarker = function(hotelInfo) {
            google.maps.event.trigger(hotelInfo,'click');
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
        
		$scope.navPanMap = function(destination) {
			var place = navAutocomplete.getPlace();
            if (place.geometry.viewport) {
                //map.fitBounds(place.geometry.viewport);
                map.setCenter(place.geometry.location);
                map.setZoom(14);
            } else {
                map.setCenter(place.geometry.location);
            }
		}
        
        $scope.introPanMap = function(destination) {
			var place = introAutocomplete.getPlace();
            if (place.geometry.viewport) {
                //map.fitBounds(place.geometry.viewport);
                map.setCenter(place.geometry.location);
                map.setZoom(14);
            } else {
                map.setCenter(place.geometry.location);
            }
		}
		
        $scope.navLocationChanged = google.maps.event.addListener(navAutocomplete, 'place_changed', function (e) {
            $scope.navPanMap();
            $scope.destination = navAutocomplete.getPlace().formatted_address;
            $scope.specificLocation = $scope.destination; // for main view, should remain different to seperate category
            $scope.seekDeer($scope.destination);
        });
    
        $scope.introLocationChanged = google.maps.event.addListener(introAutocomplete, 'place_changed', function () {
            $scope.introPanMap();
            $scope.destination = introAutocomplete.getPlace().formatted_address;
            $scope.specificLocation = $scope.destination; // for main view, should remain different to seperate category
            $scope.seekDeer($scope.destination);
        });
        				
        /*
            * ean request $http call
            * $http() returns a $promise that we can add handlers with .then()
            * if getting cross origin error install 
            * http://bit.ly/1zhiKzg 
        */ 
    
        $scope.eanReturn = function(destination) {
            
            $http({
                method: 'jsonp',
                url: 'http://api.ean.com/ean-services/rs/hotel/v3/list?callback=JSON_CALLBACK',
                params: { 
                    "apiKey": "70303auc6h8hqutunreio3u8pl",
                    "minorRev": "99",
                    "locale": "en_US",  
                    "cid": "55505",
                    "destinationString": destination,
                    "arrivalDate": "11/19/2015", //"11/19/2015", //$scope.calendarArrive,
                    "departureDate": "11/20/2015", //"11/20/2015", //$scope.calendarDepart,
                    "curencyCode": "USD",
                    "numberOfResults": "200",
                    "room1": $scope.numberOfAdults.value                    
                }
            })
                .then(function (response) {

                    //console.log(response.data);
                    $scope.deleteMarkers();
                    $scope.resultsList = [];
                    $.each(response.data.HotelListResponse.HotelList.HotelSummary, function(k, v) {

                        var lat 				= v.latitude, 
                            lng 				= v.longitude,
                            id		 			= v.hotelId,
                            name 				= v.name, 
                            shortDescription 	= v.shortDescription, 
                            listImg 			= v.thumbNailUrl.replace("_t", "_z"),
                            listImgFall			= v.thumbNailUrl.replace("_t", "_b"),
                            rating				= v.tripAdvisorRating, 
                            ratingImg			= v.tripAdvisorRatingUrl,
                            rateAverage 		= v.RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo["@averageRate"],
                            roundedAverage 		= Math.round(rateAverage),
                            rateTotal 			= v.RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo["@total"],
                            roundedTotal 		= Math.round(rateTotal),
                            link				= v.deepLink.replace(/&amp;/g, '&');
                        
                        $scope.buildReturn(lat, lng, id, name, shortDescription, listImg, rating, ratingImg, rateAverage, roundedAverage, rateTotal, roundedTotal, link, listImgFall);

                    }); // end each loop
                }); // end promise for http request
            
        } // end ean request    
        
        /*
	        * watch functions for
	        * input fields
	        * budget, where, adults, calendar
	    */        
	    
        $scope.$watch("arriveDate.defaultValue", function(){
            $scope.calendarArrive = $filter('date')($scope.arriveDate.defaultValue, 'MM/dd/yyyy');
            //console.log("From: " + $scope.calendarArrive);
        });
        
        $scope.$watch("departDate.defaultValue", function(){
            $scope.calendarDepart = $filter('date')($scope.departDate.defaultValue, 'MM/dd/yyyy');
            //console.log("To: " + $scope.calendarDepart);
        });
        
        $scope.$watch("budgetAmount", function(){
            //console.log($scope.budgetAmount);
        }); 
        
        $scope.$watch("numberOfAdults.value  ", function(){
            //console.log($scope.numberOfAdults.value);
        });         

	} // end MainController

angular.module('triviziApp').controller('MainController', MainController);})();


/*
    * angular directive for image source fallback
    * in case image size isnt provided
*/        
	    
angular.module('triviziApp').directive('fallbackSrc', function () {
    var fallbackSrc = {
        link: function postLink(scope, iElement, iAttrs) {
            iElement.bind('error', function() {
            angular.element(this).attr("src", iAttrs.fallbackSrc);
            });
        }
    }
    return fallbackSrc;
});