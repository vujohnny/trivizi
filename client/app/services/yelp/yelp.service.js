'use strict';

angular.module('triviziApp')
  .service('yelp', function ($http) {
    /*
        * yelp request $http call
        * $http() returns a $promise that we can add handlers with .then()
        * https://github.com/bettiolo/oauth-signature-js
    */ 
    function randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    }
    return {
    	yelpRequest:function ($scope){
            // See http://www.yelp.com/developers/documentation/v2/search_api 
          var httpMethod = 'GET';
          var url='http://api.yelp.com/v2/search';
          var options={encodeSignature: false}
          var params= { 
              callback: 'angular.callbacks._0',
              location: 'Sacramento',
              oauth_consumer_key: 'It7SzzcpMmTfsU7bxbZiPw', //Consumer Key
              oauth_token: 'E2_s5173SJ-RmPScZzJLSNE0AWJ4JenK', //Token
              oauth_timestamp : new Date().getTime(),
              oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
              oauth_signature_method: "HMAC-SHA1",
              term: 'romantic'
          };
          var consumerSecret = 'hx3mjwkagLri20JlyU_cFsLfrzs'; //Consumer Secret
          var tokenSecret = 'QNdFlqR89D3PdzBKVrGj4p9_Ucg'; //Token Secret
          var signature = oauthSignature.generate(httpMethod, url, params, consumerSecret, tokenSecret, options);
          params['oauth_signature'] = signature;

          $http.jsonp(url, {params: params}).then(function(response){
             console.log(response.data.businesses);
             $scope.deleteMarkers();
             $scope.resultsList = [];
             angular.forEach(response.data.businesses, function (k, v) {
                var lat         = k.location.coordinate.latitude, 
                    lng         = k.location.coordinate.longitude,
                    id          = k.id,
                    name        = k.name.replace("&amp;","&"), 
                    shortDescription  = k.snippet_text, 
                    listImg       = k.image_url,
                    listImgFall   = k.snippet_image_url,
                    rating        = k.rating, 
                    ratingImg     = k.rating_img_url,
                    ratingCount   = k.review_count,
                            rateAverage 		= '100',
                            roundedAverage 		= '200',
                            rateTotal 			= '300',
                            roundedTotal 		= '400',
                            totalNights 		= '5',
                    link          = k.url.replace(/&amp;/g, '&');
              
                  $scope.buildReturn(lat, lng, id, name, shortDescription, listImg, rating, ratingImg, ratingCount, rateAverage, roundedAverage, rateTotal, roundedTotal, link, listImgFall, totalNights);

                    }); // end each loop
              $scope.panMap($scope.resultsList[0].id, $scope.resultsList[0].markerId);
          });// end promise for http request
        }
        
    }
    
    
  });