'use strict';

angular.module('triviziApp')
    .directive('introText', function() {
        return {
            templateUrl: 'app/introText/introText.html',
            restrict: 'EA',
            controller: function($scope, $element, $attrs, ean) {

                var options = {
                        types: ['geocode']
                    },
                    navIntroInput = document.getElementById('navIntroLocationField'),
                    navIntroAutocomplete = new google.maps.places.Autocomplete(navIntroInput, options);

                $scope.navIntroLocationChanged = google.maps.event.addListener(navIntroAutocomplete, 'place_changed', function(e) {
                    $scope.destination = navIntroAutocomplete.getPlace();
                    $scope.specificLocation = $scope.destination.formatted_address;
                    $scope.seekDeer($scope.destination.formatted_address);
                    $scope.destinationIntroDetails = false;
                });

            },
            link: function($scope, $element, $attrs, ean) {

                $("full-text").css('visibility', 'hidden');

                $scope.introSubmit = function() {
                    $("intro-text").hide();
                    $("full-text").css('visibility', 'visible');
                    $scope.seekDeer();
                }
            }
        };
    });