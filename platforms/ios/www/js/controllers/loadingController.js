//
//  Created by David Herrera on 2015-05-04.
//  Copyright (c) 2015 David Herrera. All rights reserved.
//
angular.module('MUHCApp').controller('LoadingController', ['$rootScope','$state', '$scope','UpdateUI', 'UserAuthorizationInfo','UserPreferences', '$q','Patient', 'Messages', function ($rootScope,$state, $scope, UpdateUI, UserAuthorizationInfo, UserPreferences, $q, Patient, Messages) {
		console.log('Im doing it');
		modal.show();
	    var updateUI=UpdateUI.UpdateSection('All');
	    updateUI.then(function(){
	    	$rootScope.refresh=true;
					$state.go('Home');
        	modal.hide();

	    });
	    setTimeout(function() {
	    	if(typeof Patient.getFirstName()=='undefined'){
	    		$state.go('logOut');
	    	}
	    }, 15000);

}]);
