'use strict';
angular.module('triviziApp')
    .directive('destination', function() {
        return {
            templateUrl: 'app/filters/destination/destination.html',
            restrict: 'EA',
            link: function($scope, $element, $attrs) {
                $scope.typesOfPlaces = ['Romantic', 'Tropical', 'Party', 'Pets Ok', 'Family'];
                
                $scope.emptyPlace = function() {
                	$('.placeHolderLocation').remove(); //<-- need to remove this function once categories are working
                }
            }
        };
    });