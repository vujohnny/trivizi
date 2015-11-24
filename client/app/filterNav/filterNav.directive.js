'use strict';

angular.module('triviziApp')
    .directive('filterNav', function() {
        return {
            templateUrl: 'app/filterNav/filterNav.html',
            restrict: 'EA',
            link: function($scope, $element, $attrs) {
                /*
                    for drawer slider down
                */
                $scope.menuDrawer = function() {
                    
                    //jquery
                    $('#filterNavContainer').slideToggle();
                    $(".drawerDown").toggleClass("menuOpen");
                    
                }
            }
        };
    });