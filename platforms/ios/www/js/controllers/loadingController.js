//
//  Created by David Herrera on 2015-05-04.
//  Copyright (c) 2015 David Herrera. All rights reserved.
//
angular.module('MUHCApp').controller('LoadingController', ['$rootScope','$state', '$scope','UpdateUI', 'UserAuthorizationInfo','UserPreferences', '$q','Patient', function ($rootScope,$state, $scope, UpdateUI, UserAuthorizationInfo, UserPreferences, $q, Patient) {
		console.log('Im doing it');
		modal.show();
	    var updateUI=UpdateUI.UpdateUserFields();
	    updateUI.then(function(){
	    	$rootScope.refresh=true;
        	modal.hide();
	        $state.go('Home');

	    });
	    /*setTimeout(function() {
	    	if(typeof Patient.getFirstName()==='undefined'){
	    		$state.go('logOut');
	    	}
	    }, 12000);*/

}]);
