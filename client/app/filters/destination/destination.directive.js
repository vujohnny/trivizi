'use strict';
angular.module('triviziApp')
    .directive('destination', function () {
        return {
            templateUrl: 'app/filters/destination/destination.html',
            restrict: 'EA',
            controller: function ($scope, $http, $element, $attrs, ean, yelp) {

                $scope.typesOfPlaces = [{
                    title: 'romantic',
                    icon: 'heart'
                }, {
                    title: 'tropical',
                    icon: 'sun-o'
                }, {
                    title: 'sexy',
                    icon: 'glass'
                }, {
                    title: 'cultural',
                    icon: 'graduation-cap'
                }, {
                    title: 'family',
                    icon: 'users'
                }];

                var tropicalList = [];
                var sexyList = [];
                var culturalList = [];
                var familyList = [];

                $scope.yelpHold = function (category) {
                    $scope.deleteMarkers();
                    $scope.category = category;
                    $http.get('/api/category/')
                        .then(function (location) {
                            var currentCategoryList = location.data.filter(function (eq) {
                                return eq.category === category;
                            });
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

                $scope.navIntroLocationChanged = google.maps.event.addListener(navIntroAutocomplete, 'place_changed', function (e) {
                    $scope.destination = navIntroAutocomplete.getPlace();
                    $scope.category = null;
                    $scope.specificLocation = $scope.destination.formatted_address;
                    $scope.seekDeer($scope.destination.formatted_address);
                    $scope.destinationIntroDetails = false;
                    $scope.emptyPlace();

                            // jquery
//                            $('.switchSomewhere').empty().html('to');
//                            $('.destinationCategories div').removeClass('activeCategory');
//                            $('#destinationCategoryContainer').removeClass('shortCatContain');
                });


                $scope.inputFun = function() {
                    console.log('edgar');
                    focus('#navIntroLocationField');
                    $('#navIntroLocationField').focus();
                    $('#navIntroLocationField').val('');
                }
                
                $scope.changeText = function (category) {
                    
                    console.log(category);
                    
                            // jquery
                            $('.switchSomewhere').empty().html('somewhere');
                            $('.destinationCategories div').removeClass('activeCategory');
                            $('.'+category+'').addClass('activeCategory');

                    $scope.specificLocation = null;
                    $scope.destinationIntroDetails = false;
                }
                $scope.emptyPlace = function () {
                    $scope.category = null;
                }

                $scope.introText = true;
                $scope.category = $scope.typesOfPlaces[0].title;

                $scope.introSubmit = function () {

                    //jquery
                    $('.pac-container').addClass('full-pac-container');

                    if (!$scope.category) {
                        $scope.seekDeer();
                    } else {
                        $scope.yelpHold($scope.category);
                    }

                }
            },
            link: function ($scope) {}
        };
    });