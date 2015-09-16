var myApp=angular.module('MUHCApp');
myApp.controller('TreatmentPlanController',['$rootScope','$scope','UserPlanWorkflow',function($rootScope,$scope,UserPlanWorkflow){
	//This is not a highcharts object. It just looks a little like one!
  
  

}]);
myApp.controller('TreatmentPlanStagesController',['$rootScope','$scope','$timeout', 'UserPlanWorkflow',function($rootScope,$scope,$timeout, UserPlanWorkflow){
    //This is not a highcharts object. It just looks a little like one!
   
   $scope.closeAlert = function () {    
        $rootScope.showAlert=false;
    };
    $scope.treatment={
        choice:'All'
    }
    $scope.treatment.choice='All';
    $scope.stages=UserPlanWorkflow.getPlanWorkflow();



    $scope.$watch('treatment.choice',function(){
        if($scope.treatment.choice=='Past'){
            $scope.stages=UserPlanWorkflow.getPastStages();            
        }else if($scope.treatment.choice=='Next'){
            $scope.stages=[UserPlanWorkflow.getNextStage()];
            console.log($scope.stages);
        }else if($scope.treatment.choice=='Future'){
            $scope.stages=UserPlanWorkflow.getFutureStages();
        }else{
            $scope.stages=UserPlanWorkflow.getPlanWorkflow();
        }
    });
    $scope.getStyle=function($index){
        if($scope.stages[$index].Status==='Next'){
            return '#3399ff';
        }else if($scope.stages[$index].Status==='Past'){
            return '#5CE68A';
        }else{
            return '#ccc';
        }
    };
  

}]);
myApp.controller('TreatmentPlanStatusController',['$rootScope','$scope','UserPlanWorkflow',function($rootScope,$scope,UserPlanWorkflow){
$scope.estimatedTime='3 days';
    $scope.finishedTreatment=false;
    var appoint=UserPlanWorkflow.getPlanWorkflow();
    if(appoint){
        $scope.appointments=appoint;
        $scope.timeBetweenAppointments=UserPlanWorkflow.getTimeBetweenEvents('Day');
        $scope.today=new Date();
        $scope.currentStage=appoint[UserPlanWorkflow.CurrentTaskOrAppointmentIndex].Name;
        if(appoint[UserPlanWorkflow.CurrentTaskOrAppointmentIndex].Date>$scope.today){
            $scope.lastFinished=appoint[UserPlanWorkflow.CurrentTaskOrAppointmentIndex-1].Name;  
            $scope.dynamic=Math.floor(100*((UserPlanWorkflow.CurrentTaskOrAppointmentIndex)/appoint.length));
            $scope.message=UserPlanWorkflow.CurrentTaskOrAppointmentIndex+' out of '+appoint.length;
        }else{
        $scope.finishedTreatment=true;
        $scope.dynamic=100;
        $scope.message=appoint.length+' out of '+appoint.length;

      }
    }
    }]);