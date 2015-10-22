'use strict';

angular.module('triviziApp')
    .directive('filterNav', function () {
        return {
            templateUrl: 'app/filterNav/filterNav.html',
            restrict: 'EA',
            controller: function ($scope, $element) {
            },
            link: function ($scope, $element, $attrs, ean) {
                
                //$scope.navInput = document.getElementById('navLocationField');
                //console.log($scope.awesomeVariable);

                $('.disable-drop').click(function (event) {
                    event.stopPropagation();
                });

            }
        };
    });