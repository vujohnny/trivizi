'use strict';

angular.module('triviziApp')
    .service('yelp', function($http) {
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
            yelpRequest: function($scope, callback) {
                // See http://www.yelp.com/developers/documentation/v2/search_api 
                var httpMethod = 'GET';
                var url = 'http://api.yelp.com/v2/search?callback=JSON_CALLBACK';
                var options = {
                    encodeSignature: false
                }
                var params = {
                    callback: 'angular.callbacks._0',
                    location: $scope.specificLocation,
                    oauth_consumer_key: 'It7SzzcpMmTfsU7bxbZiPw', //Consumer Key
                    oauth_token: 'E2_s5173SJ-RmPScZzJLSNE0AWJ4JenK', //Token
                    oauth_timestamp: new Date().getTime(),
                    oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                    oauth_signature_method: "HMAC-SHA1",
                    term: $scope.category + " hotels"
                };
                var consumerSecret = 'hx3mjwkagLri20JlyU_cFsLfrzs'; //Consumer Secret
                var tokenSecret = 'QNdFlqR89D3PdzBKVrGj4p9_Ucg'; //Token Secret
                var signature = oauthSignature.generate(httpMethod, url, params, consumerSecret, tokenSecret, options);
                params['oauth_signature'] = signature;

                $http.jsonp(url, {
                    params: params
                }).success(function(response) {
                    //success callback
                    //console.log(response.businesses);
                    $scope.respondProvider = "yelp";
                    $scope.yelpResults = [];
                    angular.forEach(response.businesses, function(k, v) {

                        var lat = k.location.coordinate.latitude,
                            lng = k.location.coordinate.longitude,
                            id = k.id,
                            name = k.name.replace("&amp;", "&"),
                            shortDescription = k.snippet_text,
                            listImg = k.image_url,
                            listImgFall = k.snippet_image_url,
                            rating = k.rating,
                            ratingImg = k.rating_img_url,
                            ratingCount = k.review_count,
                            link = k.url.replace(/&amp;/g, '&'),
                            postalCode = k.location.postal_code ;
        

                        $scope.yelpResults.push({
                            propertyName: name,
                            id: id,
                            image: listImg,
                            imageFall: listImgFall,
                            rating: rating,
                            ratingImg: ratingImg,
                            ratingCount: ratingCount,
                            link: link,
                            postalCode: postalCode
                        });

                    }); // end each loop

                    callback($scope.yelpResults);
                })
                    .error(function(response, status) {
                        //error callback
                        console.log(response, status);
                    }); // end promise for http request

            }
        }


    });