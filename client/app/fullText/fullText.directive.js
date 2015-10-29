'use strict';

angular.module('triviziApp')
    .directive('fullText', function () {
        return {
            templateUrl: 'app/fullText/fullText.html',
            restrict: 'EA',
            link: function ($scope, $element, $attrs) {
                $scope.fullScreenList = function () {

                    if ($('#sideContain').hasClass('col-sm-6') == true) {
                        $('#fullList').removeClass('fullListPush');
                        $('#fullList').addClass('fullListPull');
                        
                        $('#sideContain').removeClass('col-sm-6');
                        $('#sideContain').addClass('col-sm-12');

                        $('.results .hotel-item').removeClass('col-sm-6');
                        $('.results .hotel-item').addClass('col-sm-3');
                        $('#googleMap, navbar').css('visibility', 'hidden');
                    } else {
                        $('#fullList').removeClass('fullListPull');
                        $('#fullList').addClass('fullListPush');
                        
                        $('#sideContain').addClass('col-sm-6');
                        $('#sideContain').removeClass('col-sm-12');

                        $('.results .hotel-item').addClass('col-sm-6');
                        $('.results .hotel-item').removeClass('col-sm-3');
                        $('#googleMap, navbar').css('visibility', 'visible');
                    }

                }
            }
        };
    });