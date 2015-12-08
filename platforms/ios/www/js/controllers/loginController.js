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
    myApp.controller('LoginController', ['$scope', '$rootScope', '$state', 'UserAuthorizationInfo', 'RequestToServer', 'Patient', function ($scope, $rootScope, $state, UserAuthorizationInfo,RequestToServer,UserPreferences, Patient) {
    $scope.platformBoolean=(ons.platform.isAndroid()&&ons.platform.isIOS());
    console.log(CryptoJS.SHA256('12345').toString());
    var authInfo=window.localStorage.getItem('UserAuthorizationInfo');
    if(authInfo){
        var authInfoObject=JSON.parse(authInfo);
        console.log(authInfoObject);
        UserAuthorizationInfo.setUserAuthData(authInfoObject.UserName, authInfoObject.Password, authInfoObject.Expires);
        RequestToServer.setIdentifier().then(function(uuid)
        {
          console.log(uuid);
          RequestToServer.sendRequest('Login');
          $state.go('loading');
        });

    }
    $scope.signup={};

    //Creating reference to firebase link
    $scope.submit = function () {
        $scope.signup.password='12345';
        $scope.signup.email='muhc.app.mobile@gmail.com';
        signin('muhc.app.mobile@gmail.com', '12345');

    };

    function signin(email, password){
        var myDataRef = new Firebase('https://brilliant-inferno-7679.firebaseio.com');
        var username = email;
        var password = password;

       // window.localStorage.setItem('pass', password);
       // console.log(window.localStorage.getItem('pass'));
        /**
        *@ngdoc method
        *@name authHandler
        *@methodOf MUHCApp.controller:LoginController
        *@param {Error} Returns error from Firebase if unable to authenticate.
        *@param {Object} Contains authentication data.
        *@description  Is the authWithPassword() method callback, the authWithPassword() inputs promise response
        *if error is defined, i.e authentication fails, it clears fields displays error for user via displayChatMessage() method, if authenticated
        *takes credentials and places them in the UserAuthorizationInfo service, it also sends the login request to Firebase,
        *and finally it redirects the app to the loading screen.
        */
        function authHandler(error, authData) {
            if (error) {
                displayChatMessage(error);
                clearText();
                console.log("Login Failed!", error);
            } else {
                RequestToServer.setIdentifier().then(function(uuid)
                {
                  RequestToServer.sendRequest('Login',userId);
                  $state.go('loading');
                });
                userId = authData.uid;
                //Obtaining fields links for patient's firebase
                var patientLoginRequest='request/'+userId;
                var patientDataFields='Users/'+userId;
                //Updating Patients references to signal backend to upload data
                myDataRef.child(patientLoginRequest).update({LogIn:true});
                UserAuthorizationInfo.setUserAuthData(authData.uid, CryptoJS.SHA256($scope.signup.password).toString(), authData.expires);
                //Setting The User Object for global Application Use
                authenticationToLocalStorage={};
                authenticationToLocalStorage={
                        UserName:authData.uid,
                        Password: CryptoJS.SHA256($scope.signup.password).toString(),
                        Expires:authData.expires,
                        Email:$scope.signup.email
                }
                $rootScope.refresh=true;
                window.localStorage.setItem('UserAuthorizationInfo', JSON.stringify(authenticationToLocalStorage));
                window.localStorage.setItem('pass', CryptoJS.SHA256($scope.signup.password).toString());
                console.log(UserAuthorizationInfo.getUserAuthData());
                console.log("Authenticated successfully with payload:", authData);
            }
        }
        myDataRef.authWithPassword({
            email: username,
            password: password
        }, authHandler);


    }


}]);
