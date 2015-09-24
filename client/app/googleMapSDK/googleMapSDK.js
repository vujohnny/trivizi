'use strict';

angular.module('triviziApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('googleMapSDK', {
        url: '/googleMapSDK',
        templateUrl: 'app/googleMapSDK/googleMapSDK.html',
        controller: 'GoogleMapSDKCtrl'
      });
  });
