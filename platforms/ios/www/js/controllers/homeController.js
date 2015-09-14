//
//  Created by David Herrera on 2015-05-04.
//  Copyright (c) 2015 David Herrera. All rights reserved.
//

var myApp = angular.module('app');
myApp.controller('homeController', ['$scope', 'UserDataMutable','UpdateUI', '$timeout', function ($scope, UserDataMutable,UpdateUI,$timeout) {
    
    var updatedField=null;
        function loadInfo(){

           var dataVal= UpdateUI.UpdateUserFields();
           dataVal.then(function(data){
                setTimeout(function(){
                    $scope.$apply(function(){
                        $scope.FirstName = UserDataMutable.getFirstName();
                        $scope.LastName = UserDataMutable.getLastName();
                        $scope.TelNum = UserDataMutable.getTelNum();
                        $scope.Email = UserDataMutable.getEmail();
                        $scope.picture = UserDataMutable.getPictures();
                    });
                },10)}, function(error){console.log(error);});

        };


         $scope.load = function($done) {
          $timeout(function() {
            loadInfo();
                $done();
                
          }, 1000);
        };

    $scope.FirstName = UserDataMutable.getFirstName();
    $scope.LastName = UserDataMutable.getLastName();
    $scope.TelNum = UserDataMutable.getTelNum();
    $scope.Email = UserDataMutable.getEmail();
    $scope.picture = UserDataMutable.getPictures();






}]);