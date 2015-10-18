'use strict';

angular.module('triviziApp')
  .directive('introText', function () {
    return {
      templateUrl: 'components/intro-text/intro-text.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
