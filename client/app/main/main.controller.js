'use strict';
(function() {

function MainController($scope, $http, socket, $filter, uiGmapGoogleMapApi) {
	
		/*
			* view info setup, 
			* dropboxes, 
			* select inputs
		*/
        
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
	        * global functions for views
	        * div class specific functions
	        * main seekdeer function submit
	        * only place to gather div specific functions
	    */
	    
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

        $scope.seekDeer = function() {
            //console.log("inside getCurrentValue");
            $http.post('/api/things', {
                name: "$"+$scope.budgetAmount+" | "+$scope.calendarArrive+" - "+$scope.calendarDepart+" | "+$scope.specificLocation
            });
            $scope.newThing = '';
            $scope.showMap();
            $scope.expediaReturn($scope.specificLocation); 
        };
        
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
		          
        /*
	        * google maps promise
	        * is loaded asynchronously
	        * check app.js file for api key & params 
	    */
	    
		uiGmapGoogleMapApi.then(function(maps) {
	        	
	        	/*
					* google maps required vars
			    */        
			    
		        var // marker windows
		        	labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		        	resultsContainer = ".results",
	            	labelIndex = 0,
					infowindow = new google.maps.InfoWindow(),
					i,
					
					// marker vars
					marker,
					markersArray = [],
					locations = [],
					
					//autocomplete inputs
					options = {types: ['(cities)']},
					input = document.getElementById('searchTextField'),
					autocomplete = new google.maps.places.Autocomplete(input, options),
					inputTop = document.getElementById('searchTextFieldTop'),
					autocompleteTop = new google.maps.places.Autocomplete(inputTop, options),					
					
					// map init
					snazzyMap = [{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#747474"},{"lightness":"23"}]},{"featureType":"poi.attraction","elementType":"geometry.fill","stylers":[{"color":"#f38eb0"}]},{"featureType":"poi.government","elementType":"geometry.fill","stylers":[{"color":"#ced7db"}]},{"featureType":"poi.medical","elementType":"geometry.fill","stylers":[{"color":"#ffa5a8"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#c7e5c8"}]},{"featureType":"poi.place_of_worship","elementType":"geometry.fill","stylers":[{"color":"#d6cbc7"}]},{"featureType":"poi.school","elementType":"geometry.fill","stylers":[{"color":"#c4c9e8"}]},{"featureType":"poi.sports_complex","elementType":"geometry.fill","stylers":[{"color":"#b1eaf1"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":"100"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"},{"lightness":"100"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffd4a5"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffe9d2"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"weight":"3.00"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"weight":"0.30"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#747474"},{"lightness":"36"}]},{"featureType":"road.local","elementType":"labels.text.stroke","stylers":[{"color":"#e9e5dc"},{"lightness":"30"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":"100"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#d2e7f7"}]}],
					map = new google.maps.Map(document.getElementById('googleMap'), {
		                center: {
		                    lat: 38.4740022,
		                    lng: -95.426484
		                },
		                zoom: 2,
		                scrollwheel: false,
		                styles: snazzyMap
	            	});
	            
	            
			    /*
					* google maps functions 
					* for markers, pan map functions
			    */      
				
				$scope.markersDisplay = function(lat, lng) {
					marker = new google.maps.Marker({
	                    position: {lat, lng},
	                    map: map,
	                    label: labels[labelIndex++ % labels.length],
	                    animation: google.maps.Animation.DROP
	                });
	                markersArray.push(marker);
				}
				
				$scope.deleteMarkers = function() {		
					for (var i = 0; i < markersArray.length; i++) {
						markersArray[i].setMap(null);
					}			  
					markersArray = [];
					locations = [];
					//$(resultsContainer).empty(); 
				}
				
				$scope.highlightResult = function(hotelId, hotelLat, hotelLng) {
					//console.log(hotelId+","+hotelLat+","+hotelLng);
					var selectedId = hotelId;
					$(".results .hotel-item").removeClass("activeResult");
					$(".results #"+selectedId+"").addClass("activeResult");
					
					var highlightResult = document.getElementById(selectedId);
					var topPos = highlightResult.offsetTop - 75;
					document.getElementById('results-container').scrollTop = topPos;
				}
				
				$scope.highlightMarker = function() {
					alert();
				}
	            
				$scope.panMap = function(specificLocation) {
					var place = autocomplete.getPlace();
	                if (place.geometry.viewport) {
	                    map.fitBounds(place.geometry.viewport);
	                } else {
	                    map.setCenter(place.geometry.location);
	                }
				}
				
				$scope.panMapTop = function(specificLocation) {
					var place = autocompleteTop.getPlace();
	                if (place.geometry.viewport) {
	                    map.fitBounds(place.geometry.viewport);
	                } else {
	                    map.setCenter(place.geometry.location);
	                }
				}
				
				google.maps.event.addListener(autocomplete, 'place_changed', function() {
		            $scope.specificLocation = autocomplete.getPlace().formatted_address;
		            $scope.panMap();
		            $scope.seekDeer($scope.specificLocation);
	            }); 
	            
	            google.maps.event.addListener(autocompleteTop, 'place_changed', function() {
		            $scope.specificLocation = autocompleteTop.getPlace().formatted_address;
		            $scope.panMapTop();
		            $scope.seekDeer($scope.specificLocation);
	            }); 
	            				
				/*
					* ean api call 
					* returns ean hotel listings
			    */ 
			    
				$scope.expediaReturn = function(specificLocation) {
									
					/*
						* ean request url required parameters
				    */  
				    
	                var // account specific parameters
	                	apiKey = '70303auc6h8hqutunreio3u8pl',
	                    cid = '55505',
	                    minorRev = '99',
	                    
	                    // search parameters
	                    locale = 'en_US',
	                    curencyCode = 'USD',
	                    adults = $scope.numberOfAdults.value,
	                    destinationString = specificLocation,
	                    arrivalDate = $scope.calendarArrive,
	                    departureDate = $scope.calendarDepart,
	                    maxResults = '40'
	               
					/*
						* ean request ajax call
				    */
	                                
	                $.ajax({
	                    type: 'GET',
	                    url: 'http://api.ean.com/ean-services/rs/hotel/v3/list?locale='+locale+'&destinationString='+destinationString+'&apiKey='+apiKey+'&minorRev='+minorRev+'&departureDate='+departureDate+'&arrivalDate='+arrivalDate+'&curencyCode='+curencyCode+'&cid='+cid+'&numberOfResults='+maxResults+'&room1='+adults+'',
	                    async: false,
	                    contentType: "application/json",
	                    dataType: 'jsonp',
	
	                    success: function(data) {
		                    						
							$scope.deleteMarkers();
							//console.log(data);	
	                        $.each(data.HotelListResponse.HotelList.HotelSummary, function(k, v) {
		                        
		                        var averageRate = v.RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo["@averageRate"];
		                        var totalRate = v.RoomRateDetailsList.RoomRateDetails.RateInfos.RateInfo.ChargeableRateInfo["@total"];
		                        
		                        var roundedAverage = Math.round(averageRate);
		                        var roundedTotal = Math.round(totalRate);
		                        
		                        var hotelImg = v.thumbNailUrl.replace("_t", "_b");
		                        	                        
								locations.push({
		                            lat: v.latitude, 
	                            	lng: v.longitude,
	                            	hotelId: v.hotelId,
	                            	hotelName: v.name, 
	                            	hotelDescription: v.shortDescription, 
	                            	hotelThumb: hotelImg,  
	                            	hotelRating: v.tripAdvisorRating, 
	                            	hotelRatingImg: v.tripAdvisorRatingUrl,
	                            	hotelRateAverage: averageRate, 
	                            	hotelRoundedAverage: roundedAverage,
	                            	hotelRateTotal: totalRate, 
	                            	hotelRoundedTotal: roundedTotal,
	                            	hotelLink: v.deepLink 
	                            });                
	                        });
	                        
	                        /*
								* setup results
								* displat results as markers on map
								* append marker windows
								* append side results
						    */
						    
	                        for (i = 0; i < locations.length; i++) {
		                        
								if(locations[i].hotelRateTotal < $scope.budgetAmount) {
									
									
									// results side navigation populate					
			                        var hotelResults = "<div id=\""+locations[i].hotelId+"\" class=\"hotel-item typography\" onClick=\"highlightMarker()\"><img src=\"http://images.travelnow.com/"+locations[i].hotelThumb+"\" alt=\""+locations[i].hotelName+"\" class=\"hotelImg\"><div class=\"hotelAverage\">$"+locations[i].hotelRoundedAverage+"<div class=\"hotelPerNight\">per night</div></div><div class=\"hotelTotal\">Total: $"+locations[i].hotelRoundedTotal+"</div><a href=\""+locations[i].hotelLink+"\" target=\"_blank\"><div class=\"hotelTitle\">"+locations[i].hotelName+"</div></a><div class=\"hotelRating\"><img src=\""+locations[i].hotelRatingImg+"\" class=\"tripAdvisorRating\"></div></div>";
		                          	$(resultsContainer).append(hotelResults);       
		                          	          
									
									// map markers populate
									$scope.markersDisplay(locations[i].lat, locations[i].lng);
		                            google.maps.event.addListener(marker, 'click', (function(marker, i) {
		                                return function() {
		                                    infowindow.setContent("<div id=\""+locations[i].hotelId+"\" class=\"markerDisplay typography\"><span class=\"markerTotal\">$"+locations[i].hotelRoundedTotal+"</span> <span class=\"medium-grey\">|</span> <img src=\""+locations[i].hotelRatingImg+"\" class=\"tripAdvisorRating\"></div>"); 	
		                                    infowindow.open(map, marker);
		                                    $scope.highlightResult(locations[i].hotelId, locations[i].lat, locations[i].lng);
		                                }
		                            })(marker, i));
		                            
	
								} else {}
	                        }
	                        console.log($scope.hotelResultsItem);
	                    }, // end success return from ean
						
	                    error: function(e) {console.log(e.message);}
	                    // end error return from ean
	                    
				}); // end ajax call
	            	            
			} // end ean request 
			
        }); // end google maps promise
        
	} // end MainController

angular.module('triviziApp').controller('MainController', MainController);})();
