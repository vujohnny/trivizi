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

                //jquery
                $scope.changeText = function (category) {
                    //$('.placeHolderLocation').remove();
                    $('.cityPlaceHolder').hide();
                    $('.switchSomewhere').empty().html('somewhere');
                    $('.categoryPlaceHolder').show().empty().append($scope.category);
                    $scope.destinationIntroDetails = false;
                }
                $scope.emptyPlace = function () {
                    $('.placeHolderLocation').remove();
                }
            },
            link: function ($scope, $element, $attrs) {}
        };
    });