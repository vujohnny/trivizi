'use strict';

angular.module('triviziApp')
  .directive('footer', function () {
    return {
      templateUrl: 'app/footer/footer.html',
      restrict: 'E',
      link: function (scope, element) {
        element.addClass('footer');
      }
    };
  });
