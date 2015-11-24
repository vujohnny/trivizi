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
                    $scope.specificLocation=null;
                    $scope.deleteMarkers();
                    $scope.category = category;
                    $scope.fullMap();
                    $scope.closeAllFilters();
                    
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
                        types: ['(regions)']
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
                   $('.switchSomewhere').empty().html('to');
                   // $('.destinationCategories div').removeClass('activeCategory');
                   // $('#destinationCategoryContainer').removeClass('shortCatContain');
                });


                $scope.inputFun = function() {
                    focus('#navIntroLocationField');
                    $('#navIntroLocationField').focus();
                    $('#navIntroLocationField').val('');
                }
                
                $scope.changeText = function (category) {
                    
                    console.log(category);
                    
                    // jquery
                    if(category == 'family') {
                        $('#ifFamily').html('friendly');
                    }
                    else {
                        $('#ifFamily').empty();
                    }
                    $('.switchSomewhere').empty().html('somewhere');
                    $('.destinationCategories div').removeClass('activeCategory');
                    $('.'+category+'').addClass('activeCategory');

                    $scope.specificLocation = null;
                    $scope.destinationIntroDetails = false;
                }
                $scope.emptyPlace = function () {
                    $scope.category = null;
                }

                $scope.category = $scope.typesOfPlaces[0].title;

                $scope.introSubmit = function () {

                    //jquery
                    // adding different class to google auto complete to style separately 
                    $('.pac-container').addClass('full-pac-container');

                    if (!$scope.category) {
                        $scope.seekDeer();
                    } else {
                        $scope.yelpHold($scope.category);
                        $scope.fullMap();
                    }

                }
            },
            link: function ($scope) {}
        };
    });