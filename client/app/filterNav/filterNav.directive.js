'use strict';

angular.module('triviziApp')
    .directive('filterNav', function () {
        return {
            templateUrl: 'app/filterNav/filterNav.html',
            restrict: 'EA',
            link: function ($scope, $rootScope, $element, $attrs, filterNavCtrl) {
                                
                $('.disable-drop').click(function (event) {
                    event.stopPropagation();
                });

            }
        };
    });