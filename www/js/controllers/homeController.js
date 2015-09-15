//
//  Created by David Herrera on 2015-05-04.
//  Copyright (c) 2015 David Herrera. All rights reserved.
//
/**
*@ngdoc controller
*@name MUHCApp.controller:HomeController
*@scope
*@requires $scope
*@requires $timeout
*@requires $filter
*@requires $cordovaNetwork
*@requires MUHCApp.services.Patient
*@requires MUHCApp.services.UpdateUI
*@requires MUHCApp.services.UserPlanWorkflow
*@element textarea
*@description
*Manages the logic of the home screen after log in, instatiates 
*/
var myApp = angular.module('MUHCApp');
myApp.controller('HomeController', ['$state','Appointments', '$scope','Patient','UpdateUI', '$timeout','$filter','$cordovaNetwork','UserPlanWorkflow','$rootScope', 'tmhDynamicLocale','$translate', '$translatePartialLoader', function ($state,Appointments, $scope, Patient,UpdateUI,$timeout,$filter,$cordovaNetwork,UserPlanWorkflow, $rootScope,tmhDynamicLocale, $translate, $translatePartialLoader) {
       /**
        * @ngdoc method
        * @name load
        * @methodOf MUHCApp.controller:HomeController
        * @callback MUHCApp.controller:HomeController.loadInfo
        * @description
        * Pull to refresh functionality, calls {@link MUHCApp.service:UpdateUI} service through the callback to update all the fields, then using 
        * the {@link MUHCApp.service:UpdateUI} callback it updates the scope of the HomeController. 
        *
        *
        */
        function homePageInit(){
        $scope.dateToday=new Date();
        var date;
        var nextAppointment=Appointments.getNextAppointment();
       
        if(nextAppointment.hasOwnProperty('Object')){
            $scope.noNextAppointment=false;
            $scope.NextAppointment=nextAppointment.Object;
            console.log($scope.NextAppointment);
            date=nextAppointment.Object.ScheduledStartTime;
            console.log(date);
            console.log($scope.dateToday);
            var dateDay=date.getDate();
            var dateMonth=date.getMonth();
            var dateYear=date.getFullYear();

            if(dateMonth==$scope.dateToday.getMonth()&&dateDay==$scope.dateToday.getDate()&&dateYear==$scope.dateToday.getFullYear()){
                console.log('asdas');
                $scope.nextAppointmentIsToday=true;
            }else{
                console.log('notToday');
                $scope.nextAppointmentIsToday=false;
            }
        }else{
            $scope.noNextAppointment=true;
        }
        $scope.FirstName = Patient.getFirstName();
        $scope.LastName = Patient.getLastName();
    }
        homePageInit();
        $scope.load = function($done) {
          
          $timeout(function() {
            loadInfo();
                $done();
          }, 1000);
        };

        function loadInfo(){
           var dataVal= UpdateUI.UpdateUserFields();
           dataVal.then(function(data){
                $timeout(function(){
                   homePageInit();

                });
        });
       }
//Sets all the variables in the view. 
    
}]);


/**
* @ngdoc controller
* @scope
* @name MUHCApp.controller:ContactDoctorController
* @requires $scope
* @description Controller manages the logic for the contact page of the doctor, the user is directed here through
* the {@link MUHCApp.controller:HomeController HomeController} view.
*
**/
myApp.controller('ContactDoctorsController',['$scope','Doctors',function($scope,Doctors){   
    $scope.oncologists=Doctors.getOncologists();
    $scope.primaryPhysician=Doctors.getPrimaryPhysician();
    $scope.otherDoctors=Doctors.getOtherDoctors();
    console.log($scope.otherDoctors);
    $scope.goDoctorContact=function(doctor){
        if(doctor===undefined){
            myNavigator.pushPage('page2.html', {param:$scope.primaryPhysician},{ animation : 'slide' } );
        }else{
            myNavigator.pushPage('page2.html', {param:doctor},{ animation : 'slide' } );
        }   
    };
}]);
/**
* @ngdoc controller
* @scope
* @name MUHCApp.controller:ContactDoctorController
* @requires $scope
* @description Controller manages the logic for the contact page of the doctor, the user is directed here through
* the {@link MUHCApp.controller:HomeController HomeController} view.
*
**/
myApp.controller('ContactIndividualDoctorController',['$scope',function($scope){
 
 var page = myNavigator.getCurrentPage();
 $scope.doctor=page.options.param;
 if($scope.doctor.PrimaryFlag===1){
    $scope.header='Primary Physician';
 }else if($scope.doctor.OncologistFlag===1){
     $scope.header='Oncologist';
 }else{
    $scope.header='Doctor';
 }

}]);