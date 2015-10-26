'use strict';

angular.module('triviziApp')
  .directive('introText', function () {
    return {
      templateUrl: 'app/introText/introText.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });