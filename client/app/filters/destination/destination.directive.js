'use strict';
angular.module('triviziApp')
    .directive('destination', function () {
        return {
            templateUrl: 'app/filters/destination/destination.html',
            restrict: 'EA',
            controller: function ($scope, $http, $element, $attrs, ean, yelp) {
                
                $scope.typesOfPlaces = ['romantic', 'tropical', 'sexy', 'cultural', 'family'];

                var tropicalList = [];
                var sexyList = [];
                var culturalList = [];
                var familyList = [];

                $scope.yelpHold = function (category) {
                    $scope.deleteMarkers();
                    $scope.category = category;
                    $http.get('/app/filters/destination/categoryData/' + category + '.json')
                        .then(function (location) {
                            var currentCategoryList = location.data;
                            angular.forEach(currentCategoryList, function (k, v) {
                                $scope.buildCatReturn(k.city, k.lat, k.lng);
                            });

                        });
                }
                
                // intro text auto complete and submit
                var options = {
                        types: ['geocode']
                    },
                    navIntroInput = document.getElementById('navIntroLocationField'),
                    navIntroAutocomplete = new google.maps.places.Autocomplete(navIntroInput, options);

                $scope.navIntroLocationChanged = google.maps.event.addListener(navIntroAutocomplete, 'place_changed', function(e) {
                    $scope.destination = navIntroAutocomplete.getPlace();
                    $scope.category = undefined;
                    $scope.specificLocation = $scope.destination.formatted_address;
                    $scope.seekDeer($scope.destination.formatted_address);
                    
                    //jquery
                    $scope.destinationIntroDetails = false;
                    $scope.emptyPlace();
                    $('.cityPlaceHolder').show();
                    $('.categoryPlaceHolder').hide();
                    $('.switchSomewhere').empty().html('to');
                });

                //jquery
                $scope.changeText = function (category) {
                    $('.placeHolderLocation').remove();
                    $('.cityPlaceHolder').hide();
                    $('.switchSomewhere').empty().html('somewhere');
                    $('.categoryPlaceHolder').show().empty().append($scope.category);
                    $scope.destinationIntroDetails = false;
                }
                $scope.emptyPlace = function () {
                    $('.placeHolderLocation').remove();
                }
                
                $scope.introText = true;
                $scope.category = $scope.typesOfPlaces[0];
                //console.log($scope.typesOfPlaces[0]);
                
                $scope.introSubmit = function() {
                    
                    if(!$scope.category) {
                        $scope.seekDeer();
                    }
                    else {
                        $scope.yelpHold($scope.category);
                    }                    
                    
                }
            },
            link: function ($scope) {}
        };
    });