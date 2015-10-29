'use strict';

angular.module('triviziApp')
    .directive('introText', function () {
        return {
            templateUrl: 'app/introText/introText.html',
            restrict: 'EA',
            controller: function ($scope, $element, $attrs, ean) {

                var options = {
                        types: ['geocode']
                    },
                    navIntroInput = document.getElementById('navIntroLocationField'),
                    navIntroAutocomplete = new google.maps.places.Autocomplete(navIntroInput, options);

                $scope.navIntroLocationChanged = google.maps.event.addListener(navIntroAutocomplete, 'place_changed', function (e) {
                    $scope.destination = navIntroAutocomplete.getPlace();
                    $scope.specificLocation = $scope.destination.formatted_address;
                    $scope.seekDeer($scope.destination.formatted_address);
                    console.log('intro ran');
                });

            },
            link: function ($scope, $element, $attrs, ean) {

                $scope.introSubmit = function () {
                    //$("intro-text").remove();
                    //$("#mainView").append("<full-text></full-text>");
                    $scope.seekDeer();
                }
            }
        };
    });