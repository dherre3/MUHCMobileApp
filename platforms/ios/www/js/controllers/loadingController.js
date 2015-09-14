//
//  Created by David Herrera on 2015-05-04.
//  Copyright (c) 2015 David Herrera. All rights reserved.
//

angular.module('app').controller('loadingController', ['$rootScope','$state', '$scope','UpdateUI', 'UserAuthorizationInfo','UserPreferences', '$q', function ($rootScope,$state, $scope, UpdateUI, UserAuthorizationInfo, UserPreferences, $q) {

 
    var Pictures;
    var FirstName;
    var LastName;
    var Email;
    var TelNum;
    var variableCountToGoHome = 0;
    var flagCompleted = 0;
    var firebaseLink = new Firebase('https://luminous-heat-8715.firebaseio.com/users/' + UserAuthorizationInfo.UserName + '/fields');
    

    function mainLoadingFunction() {
        firebaseLink.on("value", function (snapshot) {
            var newPost = snapshot.val();
            snapshot.forEach(function (data) {
                firebaseUserInformation(data.key(), data.val());
            });
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
            $state.go('logIn.enter');
        });
    }

    mainLoadingFunction();

    
    var firebaseUserInformation = function (nameOfFirebaseField, stringFirebaseValueContent) {
        if (nameOfFirebaseField !== "logged") {
            if (nameOfFirebaseField === "picture") {
                Pictures = stringFirebaseValueContent;
                variableCountToGoHome++;
            } else if (nameOfFirebaseField === "FirstName") {
                FirstName = stringFirebaseValueContent;
                variableCountToGoHome++;
                console.log(FirstName);

            } else if (nameOfFirebaseField === "LastName") {
                LastName = stringFirebaseValueContent;
                variableCountToGoHome++;
                console.log(LastName);

            } else if (nameOfFirebaseField === "Email") {
                Email = stringFirebaseValueContent;
                variableCountToGoHome++;

            } else if (nameOfFirebaseField === "TelNum") {
                TelNum = stringFirebaseValueContent;
                variableCountToGoHome++;
            }
        }
        if (variableCountToGoHome === 5) {
            var updateUI=UpdateUI.UpdateUserFields();
            updateUI.then(function(data){
                if(Object.keys(data.Notifications).length!==0){
                    $rootScope.Notifications=Object.keys(data.Notifications).length;
                }
                UserPreferences.setUserPreferences(data.EnableSMS,data.Language);
                $state.go('Home');
            },function(error){
                console.log(error);
                $state.go('logIn.enter');
            });
            //flagCompleted=1;
            //return r;
        }


    };
    


    function writeErrorMessage(){
        $("#errorMessage").html("");
        $("#errorMessage").append("<h5 class='bg-danger'><strong>" + "Unable to Obtain Information from Server, redirecting to login page" + "</strong></h5>");
        //$('<div/>').text(text).appendTo($('#addMe'));
        $('#errorMessage')[0].scrollTop = $('#addMe')[0].scrollHeight;
    }

}]);

//Older non dynamic version, for testing purposes only
   /*var count = 0;
    var Waiting = function () {
        //$state.go('Home');
        setTimeout(function () {
            $scope.$apply(function () {
                //console.log(this.FirstName);
                if (this.FirstName) {
                    $state.go('Home');
                } else {
                    count++;
                    if (count < 1) {
                        Waiting();
                    } else {
                        console.log("Unable to Obtain Data");
                        $state.go('logIn');
                    }
                }

            });
        }, 3000);
    };

    Waiting();*/
    //$state.go('logIn');