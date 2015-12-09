var myApp=angular.module('MUHCApp');
myApp.controller('SetNewPasswordController',['$scope','$timeout','RequestToServer','UserAuthorizationInfo','EncryptionService',function($scope,$timeout,RequestToServer,UserAuthorizationInfo,EncryptionService){
  //Enter code here!!
  $scope.alert={};
  console.log('Inside set new password');
  var ref=new Firebase('https://brilliant-inferno-7679.firebaseio.com/');
  $scope.submitSSN=function(ssn){
    if(ssn==''||typeof ssn=='undefined')
    {
      $scope.alert.type='danger';
      $scope.alert.content='Enter an SSN number';
    }else if(ssn.length<16){
      $scope.alert.type='danger';
      $scope.alert.content='Enter a valid SSN number';
    }else{
      var objectToSend={};
      RequestToServer.sendRequest('ResetPassword',ssn,ssn);
      $scope.loading=true;
      var path='Users/'+UserAuthorizationInfo.Username+'/'+RequestToServer.getIdentifier()+'/PasswordReset';
      ref.child(path).on('value',function(snapshot)
      {
        console.log(snapshot.val());
        var decryptObject=EncryptionService.decryptObject(snapshot.val(),ssn);
        if(decryptObject.type=='error')
        {
          $scope.alert.type="danger";
          $scope.alert.content="The SSN enter does not much our records, try again";
        }else{
          navigatorForms.pushPage('./templates/forms/security-questions.html',{Question:decryptObject.Question,Answer:decryptObject.Answer});
        }

      });
    }



  };



  }]);
