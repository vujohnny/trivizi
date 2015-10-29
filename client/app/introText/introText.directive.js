'use strict';

angular.module('triviziApp')
    .directive('introText', function () {
        return {
            templateUrl: 'app/introText/introText.html',
            restrict: 'EA',
            link: function ($scope, $element, $attrs, ean) {
                $scope.introSubmit = function () {
                    console.log('seekdeer');
                    $("intro-text").remove();
                    $("full-text").show();
                    $scope.seekDeer();
                }
            }
        };
    });