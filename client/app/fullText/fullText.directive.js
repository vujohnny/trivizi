'use strict';

angular.module('triviziApp')
  .directive('fullText', function () {
    return {
      templateUrl: 'app/fullText/fullText.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });