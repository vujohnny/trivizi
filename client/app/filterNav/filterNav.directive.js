'use strict';

angular.module('triviziApp')
    .directive('filterNav', function () {
        return {
            templateUrl: 'app/filterNav/filterNav.html',
            restrict: 'EA',
            controller: function ($scope) {

                //var fooBar = $(".where-drop-down").find("#navLocationField")[0];
                //var fooBar = 'edgar';
                
                
                this.autoInput = [];
                
                this.setupInput = function () {
                    this.autoInput.push("Edgar");
                    console.log(this.autoInput);
                };


            },
            controllerAs : 'filterNavCtrl',
            link: function ($scope, $rootScope, $element, $attrs, filterNavCtrl) {
                                
                $('.disable-drop').click(function (event) {
                    event.stopPropagation();
                });

            }
        };
    });