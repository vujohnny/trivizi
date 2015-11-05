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
                    
                    //jquery
                    $scope.destinationIntroDetails = false;
                    $scope.emptyPlace();
                    $('.cityPlaceHolder').show();
                    $('.categoryPlaceHolder').hide();
                    $('.switchSomewhere').empty().html('to');
                });

            },
            link: function($scope, $element, $attrs, ean) {
                $scope.introText = true;
                $scope.introSubmit = function() {
                    $scope.seekDeer();
                }
            }
        };
    });