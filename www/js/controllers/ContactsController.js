/**
* @ngdoc controller
* @scope
* @name MUHCApp.controller:ContactDoctorController
* @requires $scope
* @description Controller manages the logic for the contact page of the doctor, the user is directed here through
* the {@link MUHCApp.controller:HomeController HomeController} view.
*
**/
myApp.controller('ContactsController',['$scope','Doctors',function($scope,Doctors){   
    $scope.oncologists=Doctors.getOncologists();
    $scope.primaryPhysician=Doctors.getPrimaryPhysician();
    $scope.otherDoctors=Doctors.getOtherDoctors();
    console.log($scope.oncologists);
    $scope.goDoctorContact=function(doctor){
        if(doctor===undefined){

            myNavigator.pushPage('templates/contacts/individual-contact.html', {param:$scope.primaryPhysician},{ animation : 'slide' } );
        }else{
            myNavigator.pushPage('templates/contacts/individual-contact.html', {param:doctor},{ animation : 'slide' } );
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
myApp.controller('ContactIndividualDoctorController',['$scope','$q',function($scope,$q){
 
 var page = myNavigator.getCurrentPage();
 $scope.doctor=page.options.param;
 if($scope.doctor.PrimaryFlag===1){
    $scope.header='Primary Physician';
 }else if($scope.doctor.OncologistFlag===1){
     $scope.header='Oncologist';
 }else{
    $scope.header='Doctor';
 }
 $scope.goToConversation=function(doctor){
    param=doctor;
    function goToMessage(){
        var r=$q.defer();
        myNavigator.popPage({animation:'none'});
        r.resolve(true);
        return r.promise;
    }
    goToMessage().then(function(){
        menu.setMainPage('views/patientPortal.html',{param: doctor},{closedMenu:true});
    });
    
    
 };

}]);
