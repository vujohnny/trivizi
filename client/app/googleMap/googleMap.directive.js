'use strict';

angular.module('triviziApp')
    .directive('googleMap', function () {
        return {
            templateUrl: 'app/googleMap/googleMap.html',
            restrict: 'EA',
            controller: function ($scope, $timeout, yelp, ean, eanYelp) {
                $timeout(function () {
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
                        snazzyMap = [{
                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": "#a0d6d1"
                            }, {
                                "lightness": 17
                            }]
                        }, {
                            "featureType": "landscape",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": "#ffffff"
                            }, {
                                "lightness": 20
                            }]
                        }, {
                            "featureType": "road.highway",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                "color": "#dedede"
                            }, {
                                "lightness": 17
                            }]
                        }, {
                            "featureType": "road.highway",
                            "elementType": "geometry.stroke",
                            "stylers": [{
                                "color": "#dedede"
                            }, {
                                "lightness": 29
                            }, {
                                "weight": 0.2
                            }]
                        }, {
                            "featureType": "road.arterial",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": "#dedede"
                            }, {
                                "lightness": 18
                            }]
                        }, {
                            "featureType": "road.local",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": "#ffffff"
                            }, {
                                "lightness": 16
                            }]
                        }, {
                            "featureType": "poi",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": "#f1f1f1"
                            }, {
                                "lightness": 21
                            }]
                        }, {
                            "elementType": "labels.text.stroke",
                            "stylers": [{
                                "visibility": "on"
                            }, {
                                "color": "#ffffff"
                            }, {
                                "lightness": 16
                            }]
                        }, {
                            "elementType": "labels.text.fill",
                            "stylers": [{
                                "saturation": 36
                            }, {
                                "color": "#333333"
                            }, {
                                "lightness": 40
                            }]
                        }, {
                            "elementType": "labels.icon",
                            "stylers": [{
                                "visibility": "off"
                            }]
                        }, {
                            "featureType": "transit",
                            "elementType": "geometry",
                            "stylers": [{
                                "color": "#f2f2f2"
                            }, {
                                "lightness": 19
                            }]
                        }, {
                            "featureType": "administrative",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                "color": "#fefefe"
                            }, {
                                "lightness": 20
                            }]
                        }, {
                            "featureType": "administrative",
                            "elementType": "geometry.stroke",
                            "stylers": [{
                                "color": "#fefefe"
                            }, {
                                "lightness": 17
                            }, {
                                "weight": 1.2
                            }]
                        }],

                        map = new google.maps.Map(document.getElementById('googleMap'), {
                            center: {
                                lat: 20.393736,
                                lng: -46.268002
                            },
                            zoom: 2,
                            mapTypeControl: false,
                            zoomControl: true,
                            scaleControl: true,
                            streetViewControl: true,
                            scrollwheel: false,
                            zoomControlOptions: {
                                position: google.maps.ControlPosition.LEFT_CENTER
                            },
                            streetViewControlOptions: {
                                position: google.maps.ControlPosition.LEFT_CENTER
                            },
                            styles: snazzyMap
                        });

                    $scope.googleMap = map;

                    $scope.navLocationChanged = google.maps.event.addListener(navAutocomplete, 'place_changed', function (e) {
                        $scope.destination = navAutocomplete.getPlace();
                        $scope.specificLocation = $scope.destination.formatted_address;
                        
                        //jquery
                        $('.cityPlaceHolder').show();
                        $('.categoryPlaceHolder').hide();
                        //$scope.seekDeer($scope.destination.formatted_address);
                    });

                    $scope.showMap = function () {
                        $(".intro-text").fadeOut("slow", function () {
                            $("#googleMap").css("visibility", "visible");
                            $("#results-container, .top-menu").fadeIn("slow", function () {});
                        });
                    }

                    $scope.highlightResult = function (hotelId, hotelLat, hotelLng) {
                        var selectedId = hotelId;
                        $(resultsItem + " " + resultsHotelItem + " .hotel-item-container").removeClass("activeResult");
                        $(".btn-book").removeClass("btn-on");
                        $(resultsItem + " #" + selectedId + " .hotel-item-container").addClass("activeResult");
                        $(resultsItem + " #" + selectedId + " .hotelInfoContainer .btn-book").addClass("btn-on");

                        var highlightResult = document.getElementById(selectedId);
                        var topPos = highlightResult.offsetTop - 25;
                        $(resultsContainer).animate({
                            scrollTop: topPos
                        }, 500);
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
                        map.setZoom(14);
                    }

                    $scope.panMap = function (id, firstMarker) {
                        var place = $scope.destination;
                        if (place.geometry.viewport) {
                            //map.fitBounds(place.geometry.viewport);
                            //map.setZoom(13);
                            
                            map.setCenter(firstMarker.getPosition());
                            map.setZoom(12);
                            
                            google.maps.event.trigger(firstMarker, 'click');
                            
                        } else {
                            map.setCenter(place.geometry.location);
                        }
                    }

                    $scope.buildReturn = function (lat, lng, id, name, shortDescription, listImg, rating, ratingImg, ratingCount, rateAverage, roundedAverage, rateTotal, roundedTotal, link, listImgFall, totalNights) {

                        //console.log($scope.priceSlider);

                        if (rateAverage < $scope.priceSlider && $scope.resultsList.length < 20) {

                            // map markers and pan map to city
                            $scope.markersDisplay(lat, lng);
                            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                                return function () {
                                    infowindow.setContent("<div id=\"" + id + "\" class=\"markerDisplay typography\"><span class=\"markerTotal\">$" + roundedTotal + "</span> <span class=\"medium-grey\">|</span> <img src=\"" + ratingImg + "\" class=\"ratingImg\"></div>");
                                    infowindow.open(map, marker);
                                    $scope.highlightResult(id);
                                }
                            })(marker, i));
                            
                            google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
                                return function () {
                                    infowindow.setContent("<div id=\"" + id + "\" class=\"markerDisplay typography\"><span class=\"markerTotal\">$" + roundedTotal + "</span></div>");
                                    infowindow.open(map, marker);
                                }
                            })(marker, i));

                            // build navigation list
                            $scope.resultsList.push({
                                id: id,
                                name: name,
                                listImg: listImg,
                                listImgFall: listImgFall,
                                ratingImg: ratingImg,
                                ratingCount: ratingCount,
                                roundedAverage: roundedAverage,
                                roundedTotal: roundedTotal,
                                link: link,
                                markerId: marker,
                                totalNights: totalNights
                            });
                        }
                        
                        google.maps.event.trigger($scope.googleMap, 'resize');

                    }


                    $scope.buildCatReturn = function (city, lat, lng) {

                        map.setZoom(2);
                        $scope.markersDisplay(lat, lng);
                        google.maps.event.trigger($scope.googleMap, 'resize');

                        google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
                            return function () {
                                infowindow.setContent("<div id=\"" + city + "\" class=\"markerDisplay typography\"><span>" + city + "</span></div>");
                                infowindow.open(map, marker);
                            }
                        })(marker, i));

                        google.maps.event.addListener(marker, 'click', (function (marker, i) {
                            return function () {
                                $scope.specificLocation = city;
                                
                                /*
                                using just ean call for now
                                getting better results
                                */
                                
                                $scope.seekDeer();
                                
                                /*
                                we might have to remove the yelp call and just ean
                                yelp is not returning enough results and limits the return
                                by running a filter against ean, we dont need a 
                                romantic hotel in a romantic city
                                we might need to use tripadviosr api foer this
                                type of an idea instead of yelp
                                */
                                
                                /*
                                yelp.yelpRequest($scope, function (data) {
                                    eanYelp.eanYelpRequest($scope, data);
                                });
                                */
                            }
                        })(marker, i));

                    }

                });
            },
            link: function ($scope, $element, $attrs) {}
        };
    });