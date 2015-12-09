/*
*Code by David Herrera May 20, 2015
*Github: dherre3
*Email:davidfherrerar@gmail.com
*/
var myApp=angular.module('MUHCApp')

    /**
*@ngdoc controller
*@name MUHCApp.controller:LoginController
*@scope
*@requires $scope
*@requires MUHCApp.services:UserAuthorizationInfo
*@requires $state
*@description
*Uses Firebase authWithPassword method. The authWithPassword() inputs promise response
    *if error is defined, i.e authentication fails, it clears fields displays error for user via displayChatMessage() method, if authenticated
    *takes credentials and places them in the UserAuthorizationInfo service, it also sends the login request to Firebase,
    *and finally it redirects the app to the loading screen.
*/
  var myDataRef = new Firebase('https://brilliant-inferno-7679.firebaseio.com');
    myApp.controller('LoginController', ['$scope', '$rootScope', '$state', 'UserAuthorizationInfo', 'RequestToServer', 'Patient', function ($scope, $rootScope, $state, UserAuthorizationInfo,RequestToServer,UserPreferences, Patient) {
    //$scope.platformBoolean=(ons.platform.isAndroid()&&ons.platform.isIOS());
    var authInfo=window.localStorage.getItem('UserAuthorizationInfo');
    /*if(authInfo){
        var authInfoObject=JSON.parse(authInfo);
        console.log(authInfoObject);
        UserAuthorizationInfo.setUserAuthData(authInfoObject.UserName, authInfoObject.Password, authInfoObject.Expires);
        RequestToServer.setIdentifier().then(function(uuid)
        {
          console.log(uuid);
          RequestToServer.sendRequest('Login');
          $state.go('loading');
        });

    }*/
    //Creating reference to firebase link
    $scope.submit = function (email,password) {
      console.log(email);
      console.log(password);
        $scope.password='12345';
        $scope.email='muhc.app.mobile@gmail.com';
        //signin('muhc.app.mobile@gmail.com', '12345');
        signin(email, password);

    };

    function signin(email, password){

        var username = email;
        var password = password;
        myDataRef.authWithPassword({
            email: username,
            password: password
        }, authHandler);
    }
    function authHandler(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
        } else {
            var temporary=authData.password.isTemporaryPassword;
            console.log(temporary);
            UserAuthorizationInfo.setUserAuthData(authData.uid, CryptoJS.SHA256($scope.password).toString(), authData.expires);
            if(temporary){
              RequestToServer.setIdentifier().then(function(uuid)
              {
                navigatorForms.pushPage('templates/forms/set-new-password.html');
              });
            }else{

              userId = authData.uid;
              //Obtaining fields links for patient's firebase
              var patientLoginRequest='request/'+userId;
              var patientDataFields='Users/'+userId;
              //Updating Patients references to signal backend to upload data
              myDataRef.child(patientLoginRequest).update({LogIn:true});
              //Setting The User Object for global Application Use
              authenticationToLocalStorage={};
              authenticationToLocalStorage={
                      UserName:authData.uid,
                      Password: CryptoJS.SHA256($scope.password).toString(),
                      Expires:authData.expires,
                      Email:$scope.email
              }
              $rootScope.refresh=true;
              window.localStorage.setItem('UserAuthorizationInfo', JSON.stringify(authenticationToLocalStorage));
              window.localStorage.setItem('pass', CryptoJS.SHA256($scope.password).toString());
              console.log(UserAuthorizationInfo.getUserAuthData());
              console.log("Authenticated successfully with payload:", authData);
              RequestToServer.setIdentifier().then(function(uuid)
              {
                RequestToServer.sendRequest('Login',userId);
                $state.go('loading');
              });
            }

        }
    }



}]);
