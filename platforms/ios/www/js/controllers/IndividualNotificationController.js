var myApp=angular.module('app');
myApp.controller('IndividualNotificationController',['$scope','UserNotifications',function($scope,UserNotifications){
 console.log($scope.valueData);
 var current=UserNotifications.getUserNotifications();
 var page = myNavigator.getCurrentPage();
 var parameters=page.options.param;
 $scope.header=parameters;
 $scope.$watch('header',function(){
 	$scope.valueData=page.options.param;
 	$scope.notification=current[parameters];
 	 console.log(page);

 });
 var page = myNavigator.getCurrentPage();
    console.log(page.options.param);
    console.log("adas");



}]);