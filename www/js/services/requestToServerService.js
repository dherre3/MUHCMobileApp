var myApp=angular.module('MUHCApp');
/**
*
*
*
**/
myApp.service('RequestToServer',function(UserAuthorizationInfo, EncryptionService){
    return{
        sendRequest:function(typeOfRequest,content){
            var Ref=new Firebase('https://luminous-heat-8715.firebaseio.com/requests');
            var userID=UserAuthorizationInfo.UserName;
            var encryptedRequestType=EncryptionService.encryptData(typeOfRequest);

            content= EncryptionService.encryptData(content);
            if(typeOfRequest=='Login'||typeOfRequest=='Refresh'||typeOfRequest=='Logout')
            {
              Ref.push({ 'Request' : encryptedRequestType, 'UserID': userID })
            }
            else 
            {
              Ref.push({'Request': encryptedRequestType, 'UserID':userID, 'Content':content});
            }
        }
    };



});