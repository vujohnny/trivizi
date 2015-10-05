'use strict';
(function() {

function MainController($scope, $http, socket, $filter, uiGmapGoogleMapApi) {
        
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
        
        $scope.emptyPlace = function() {
	        $('.placeHolderLocation').empty(); //<------- need to bind selected categories and push to db
        };
        
        
		// -----------------------------------------------------------------------------------
		
		$scope.showMap = function() {			
			$(".intro-text").fadeOut("slow",function(){
				$("#results-container").fadeIn("slow", function(){
				});
			});
        }

        $scope.seekDeer = function() {
            //console.log("inside getCurrentValue");
            $http.post('/api/things', {
                name: "$"+$scope.budgetAmount+" | "+$scope.calendarArrive+" - "+$scope.calendarDepart+" | "+$scope.specificLocation
            });
            $scope.newThing = '';
            $scope.showMap();
            $scope.expediaReturn($scope.specificLocation); 
        };
        
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
		     
		     
        // -----------------------------------------------------------------------------------
        
        
        // google maps sdk ---------------------------------------------------------------
        uiGmapGoogleMapApi.then(function(maps) {
	        
	        //alert('test');
	        
	        // google maps variables
	        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            	labelIndex = 0,
				infowindow = new google.maps.InfoWindow(),
				marker,
				markersArray = [],
				locations = [],
				i;
				
			
			// init google map on view
            var map = new google.maps.Map(document.getElementById('googleMap'), {
                center: {
                    lat: 38.4740022,
                    lng: -95.426484
                },
                zoom: 3,
                scrollwheel: false,
                draggable: false,
                disableDefaultUI: true
            });
            
            
            // set markers from results on map
			$scope.markersDisplay = function(lat, lng) {
				marker = new google.maps.Marker({
                    position: {lat, lng},
                    map: map,
                    label: labels[labelIndex++ % labels.length],
                    animation: google.maps.Animation.DROP
                });
                markersArray.push(marker);
			}
			
			// google recommended way to remove markers, 3 functions below
			$scope.setMapOnAll = function(map) {
			  for (var i = 0; i < markersArray.length; i++) {
			    markersArray[i].setMap(map);
			  }
			}
			$scope.clearMarkers = function() {
			  $scope.setMapOnAll(null);
			}
			$scope.deleteMarkers = function() {
			  $scope.clearMarkers();
			  markersArray = [];
			  $('.results').empty(); 
			}
			

			// init autocomplete on input search
            var input = document.getElementById('searchTextField');
            var options = {types: ['(cities)']};
            var autocomplete = new google.maps.places.Autocomplete(input, options);
            
            // disables the drop down from closing
            $('.disable-drop').click(function(event){
				event.stopPropagation();
			});


			// move map to city and call expedia api
			$scope.panMap = function(specificLocation) {
				var place = autocomplete.getPlace();
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                }
			}
			
			
			// expedia return ------------------------------------------
			$scope.expediaReturn = function(specificLocation) {
				
				// expedia required call parameters
                var place = autocomplete.getPlace(),
                	apiKey = '70303auc6h8hqutunreio3u8pl',
                    cid = '55505',
                    minorRev = '99',
                    locale = 'en_US',
                    curencyCode = 'USD',
                    adults = $scope.numberOfAdults.value,
                    destinationString = specificLocation,
                    arrivalDate = $scope.calendarArrive,
                    departureDate = $scope.calendarDepart,
                    sort = 'PRICE', 
                    maxResults = '20';
                                    
                $.ajax({
                    type: 'GET',
                    url: 'http://api.ean.com/ean-services/rs/hotel/v3/list?locale='+locale+'&destinationString='+destinationString+'&apiKey='+apiKey+'&minorRev='+minorRev+'&departureDate='+departureDate+'&arrivalDate='+arrivalDate+'&curencyCode='+curencyCode+'&cid='+cid+'&numberOfResults='+maxResults+'&room1='+adults+'&sort='+sort+'',
                    async: false,
                    contentType: "application/json",
                    dataType: 'jsonp',

                    success: function(data) {
	                    						
						console.log(data);	
						
                        $.each(data.HotelListResponse.HotelList.HotelSummary, function(k, v) {
	                        
	                        var averageRate = v.RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo["@averageRate"];
	                        var totalRate = v.RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo["@total"];
	                        
							locations.push({
	                            lat: v.latitude, 
                            	lng: v.longitude,
                            	hotelName: v.name, 
                            	hotelDescription: v.shortDescription, 
                            	hotelThumb: v.thumbNailUrl,  
                            	hotelRating: v.tripAdvisorRating, 
                            	hotelRatingImg: v.tripAdvisorRatingUrl,
                            	hotelRateAverage: averageRate, 
                            	hotelRateTotal: totalRate, 
                            	hotelLink: v.deepLink 
                            });
	                        
                        });
                        
                        
                        // build hotel template
                        for (i = 0; i < locations.length; i++) {
	                        
							if(locations[i].hotelRateTotal < $scope.budgetAmount) {
																
		                        var hotelResults = "<div class=\"hotel-item\"><img src=\"http://images.travelnow.com/"+locations[i].hotelThumb+"\" alt=\""+locations[i].hotelName+"\" class=\"hotelImg\"> <span class=\"hotelTitle\">"+locations[i].hotelName+"</span> <br>Average Nightly: $"+locations[i].hotelRateAverage+"<br> Total: $"+locations[i].hotelRateTotal+"<br><img src=\""+locations[i].hotelRatingImg+"\" class=\"tripAdvisorRating\"><br><button type=\"button\" class=\"bookLink btn btn-primary\"><a href=\""+locations[i].hotelLink+"\" target=\"_blank\">Seek Deer <i class=\"fa fa-hand-peace-o\"></i></a></button></div>";
	                                                        
	                                                        
	                            // set new makers on the map and side nav
	                            $scope.markersDisplay(locations[i].lat, locations[i].lng);
								$('.results').append(hotelResults);
								
								
	                            // on marker click show hotel info
	                            google.maps.event.addListener(marker, 'click', (function(marker, i) {
	                                return function() {
	                                    infowindow.setContent("<img src=\"http://images.travelnow.com/"+locations[i].hotelThumb+"\" alt=\""+locations[i].hotelName+"\" class=\"hotelImg\"> <span class=\"hotelTitle\">"+locations[i].hotelName+"</span> <br>Average Nightly: $"+locations[i].hotelRateAverage+"<br> Total: $"+locations[i].hotelRateTotal+"<br><img src=\""+locations[i].hotelRatingImg+"\" class=\"tripAdvisorRating\"><br><button type=\"button\" class=\"bookLink btn btn-primary\"><a href=\""+locations[i].hotelLink+"\" target=\"_blank\">Seek Deer <i class=\"fa fa-hand-peace-o\"></i></a></button><hr>"); 	
	                                    // ^^^ tried using var hotelResults from #212 but that only showed the first return
	                                                                        
	                                    infowindow.open(map, marker);
	                                }
	                            })(marker, i));

							} else {
							  
							}
                                   
                        }
                        
                    },
					
					// if error on return display error
                    error: function(e) {console.log(e.message);}
                    
                });
                
                // autocomplete location pan map to that city
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                }
			} 

            // end expedia return ------------------------------------------------------------
            
			
            // event handler for autocomplete change
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
	            $scope.specificLocation = autocomplete.getPlace().formatted_address;
	            $scope.panMap();
	            $scope.seekDeer($scope.specificLocation); // <---------- make sure to remove this later to apply this function to the submit button
            }); 


        }); 
        // end google maps sdk ----------------------------------------------------------------
        
		        
		        
	} // end MainController

angular.module('triviziApp')
  .controller('MainController', MainController);

})();
