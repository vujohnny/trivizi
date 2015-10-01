'use strict';

angular.module('triviziApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('db', {
        url: '/db',
        templateUrl: 'app/db/db.html',
        controller: 'DBController',
        controllerAs: 'db'
      });
  });
