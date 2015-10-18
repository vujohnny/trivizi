'use strict';

angular.module('triviziApp')
  .directive('googleMap', function () {
    return {
      templateUrl: 'components/google-map/google-map.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
