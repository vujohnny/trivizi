'use strict';

angular.module('triviziApp')
    .directive('googleMap', function () {
        return {
            templateUrl: 'app/googleMap/googleMap.html',
            restrict: 'EA',
            link: function ($scope, $element, $attrs) {
                                
                /*
                 * required google map vars for map initialization 
                 * ie markers, marker windows, styles, map options
                 */
                                                                
                var resultsItem = ".results",
                    resultsHotelItem = ".hotel-item",
                    resultsContainer = "#results-container",
                    
                    i,
                    marker,
                    infowindow = new google.maps.InfoWindow(),
                    myIcon = new google.maps.MarkerImage("assets/images/custom-marker.png", null, null, null, new google.maps.Size(25, 36)),
                    markersArray = [],

                    options = {
                        types: ['geocode']
                    },
                    navInput = document.getElementById('navLocationField'),
                    navAutocomplete = new google.maps.places.Autocomplete(navInput, options),
                    //introInput = document.getElementById('introLocationField'),
                    //introAutocomplete = new google.maps.places.Autocomplete(introInput, options),

                    snazzyMap = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a0d6d1"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#dedede"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#dedede"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f1f1f1"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}],
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
                    });

                /*
                 * google maps functions 
                 * for markers, pan map functions
                 */

                $scope.navLocationChanged = google.maps.event.addListener(navAutocomplete, 'place_changed', function (e) {
                    $scope.destination = navAutocomplete.getPlace();
                    $scope.specificLocation = $scope.destination.formatted_address;
                    $scope.seekDeer($scope.destination.formatted_address);
                });
                
//                $scope.introLocationChanged = google.maps.event.addListener(introAutocomplete, 'place_changed', function () {
//                    $scope.destination = introAutocomplete.getPlace();
//                    $scope.specificLocation = $scope.destination.formatted_address;
//                    $scope.seekDeer($scope.destination.formatted_address);
//                });                

                $scope.showMap = function () {
                    $(".intro-text").fadeOut("slow", function () {
                        $("#googleMap").css("visibility", "visible");
                        $("#results-container, .top-menu").fadeIn("slow", function () {});
                    });
                }
                
                $scope.highlightResult = function (hotelId, hotelLat, hotelLng) {
                    var selectedId = hotelId;
                    $(resultsItem+" "+resultsHotelItem).removeClass("activeResult");
                    //$(".btn-book").removeClass("btn-on");
                    $(resultsItem+" #"+selectedId+"").addClass("activeResult");
                    //$(resultsItem+" #"+selectedId+" .hotelInfo .btn-book").addClass("btn-on");

                    var highlightResult = document.getElementById(selectedId);
                    var topPos = highlightResult.offsetTop - 25;
                    $(resultsContainer).animate({ scrollTop: topPos }, 500); 
                }

                $scope.markersDisplay = function (lat, lng) {
                    marker = new google.maps.Marker({
                        position: {
                            lat, lng
                        },
                        optimized: false,
                        map: map,
                        icon: myIcon,
                        animation: google.maps.Animation.DROP
                    });
                    markersArray.push(marker);
                }

                $scope.deleteMarkers = function () {
                    for (var i = 0; i < markersArray.length; i++) {
                        markersArray[i].setMap(null);
                    }
                    markersArray = [];
                    $(resultsItem).empty();
                }

                $scope.highlightMarker = function (hotelMarker) {
                    google.maps.event.trigger(hotelMarker, 'click');
                    map.setCenter(hotelMarker.getPosition());
                    //map.setZoom(15);
                }

                $scope.panMap = function (id, firstMarker) {
                    var place = $scope.destination;
                    if (place.geometry.viewport) {
                        map.setCenter(firstMarker.getPosition());
                        google.maps.event.trigger(firstMarker, 'click');
                        map.setZoom(15);
                    } else {
                        map.setCenter(place.geometry.location);
                    }
                }

                $scope.buildReturn = function (lat, lng, id, name, shortDescription, listImg, rating, ratingImg, rateAverage, roundedAverage, rateTotal, roundedTotal, link, listImgFall, totalNights) {

                    if (rateTotal < $scope.budgetAmount && $scope.resultsList.length < 20) {

                        // map markers and pan map to city
                        $scope.markersDisplay(lat, lng);
                        google.maps.event.addListener(marker, 'click', (function (marker, i) {
                            return function () {
                                infowindow.setContent("<div id=\"" + id + "\" class=\"markerDisplay typography\"><span class=\"markerTotal\">$" + roundedTotal + "</span> <span class=\"medium-grey\">|</span> <img src=\"" + ratingImg + "\" class=\"tripAdvisorRating\"></div>");
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
                            markerId: marker,
                            totalNights: totalNights
                        });

                    } else {}

                }

            }
        };
    });