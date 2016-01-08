var Firebase    =require('firebase');
var utility=require('./utility.js');
var updateClient=require('./updateClient.js');
var updateServer=require('./updateServer.js');
var credentials=require('./credentials.js');
var sqlInterface=require('./sqlInterface.js');
var CryptoJS=require('crypto-js')
var api=require('./api.js');

//console.log(a);
//var requestTest={type:'pirlo',param:{david:'12121',andres:'andres'}};

//request(requestTest)
var ref=new Firebase(credentials.FIREBASE_URL);
ref.auth(credentials.FIREBASE_SECRET);
ref.child('requests').on('child_added',function(requestsFromFirebase){
  var requestObject=requestsFromFirebase.val();
  var requestKey=requestsFromFirebase.key();
  request(requestKey,requestObject);
});


function request(requestKey, requestObject)
{
  //Accepts a requestKey, and requestObject
  if(requestObject.Request=='ResetPassword'||requestObject.Request=='ChangePasswordReset')
  {
    console.log(requestObject);
    resetPasswordRequest(requestKey,requestObject);
  }else{
    sqlInterface.getUsersPassword(requestObject.UserID).then(function(key){
      console.log(key);
      console.log(requestObject.Request);
      requestObject.Request=utility.decryptObject(requestObject.Request,key);
      var encryptionKey=key;
      //console.log(encryptionKey);
      if(requestObject.Request=='') {
        console.log('Rejecting request');
        completeRequest(requestKey,{},'Invalid');
        return;
      }
      requestObject.Parameters=utility.decryptObject(requestObject.Parameters,key);
      if(requestObject.Request=='Login'||requestObject.Request=='Refresh')
      {
        updateClient.update(requestObject).then(function(objectToFirebase)
        {
          console.log(encryptionKey);
            uploadToFirebase(requestKey, encryptionKey,requestObject, objectToFirebase);

        }).catch(function(response){
            completeRequest(requestKey,requestObject,'Invalid');
        });
      }else
      {
        console.log(requestObject);
        updateServer.update(requestObject).then(function(response)
        {
            completeRequest(requestKey, requestObject);
        }).catch(function(response){
            completeRequest(requestKey,requestObject,'Invalid');
        });
      }
    }).catch(function(error){
      console.log(error);
      completeRequest(requestKey,{},'Invalid');
    });
  }
}
function uploadToFirebase(requestKey,encryptionKey,requestObject,object)
{
  console.log('I am about to go to into encrypting');
  //console.log(request);
  object=utility.encryptObject(object,encryptionKey);
  //console.log(object);
  var deviceId=requestObject.DeviceId;
  var UserID=requestObject.UserID;
  var userFieldsPath='Users/'+UserID+'/'+deviceId;
    console.log('I am about to write to firebase');
  ref.child(userFieldsPath).update(object, function(){
    console.log('I just finished writing to firebase');
    completeRequest(requestKey, requestObject);
    //logRequest(requestObject);
  });
}
function completeRequest(requestKey, requestObject, invalid)
{

  //Clear request
  ref.child('requests').child(requestKey).set(null);
  //Log Request
  if(invalid!==undefined)
  {
    api.logRequest(requestObject);
  }else{
    requestObject.reason='Error wrong arguments';
    api.logRequest(requestObject);
  }


}
function resetPasswordRequest(requestKey, requestObject)
{
  //console.log(requestObject.UserID);
  //console.log(requestKey);
    sqlInterface.getPatientFieldsForPasswordReset(requestObject.UserID).then(function(patient){
      //To reset password must check that SSN is correct
      if(requestObject.Request=='ResetPassword'){
        var unencrypted=utility.decryptObject(requestObject.Parameters,patient.SSN);
        console.log(unencrypted);
        if(typeof unencrypted.SSN!=='undefined'&&unencrypted.SSN!=='')
        {
          //If unencrypted SSN is correct, then it procceeds to obtain security questions
          sqlInterface.getSecurityQuestions(patient.PatientSerNum).then(function(questions)
          {
            console.log(questions);
            //Picks a random questions from a pool of 3 out of the 10 that were given as option
            var integer=Math.floor((3*Math.random()));
            questions[integer].type='success';
            var response={ResetPassword:questions[integer]};
            //Sends to firebase the question encrypted using the patient SSN and AES
            uploadToFirebase(requestKey,patient.SSN,requestObject,response);
          });
        }else{
          //If SSN is invalid rejects request! and sends error message to app.
          var response={};
          response.ResetPassword={};
          response.ResetPassword.type='error';
          var deviceId=requestObject.DeviceId;
          var UserID=requestObject.UserID;
          var userFieldsPath='Users/'+UserID+'/'+deviceId;
            console.log('I am about to write to firebase');
          ref.child(userFieldsPath).update(response, function(){
            console.log('I just finished writing to firebase');
            completeRequest(requestKey, requestObject);
            //logRequest(requestObject);
          });
        }
      }else{
        //The other request is for verifying the answer to the security question, and sending new password
        //It does this by sending password hashed with the answer as key.
        sqlInterface.getSecurityQuestions(patient.PatientSerNum).then(function(questions)
        {
          var flag=false;
          var newPassword='';
          //checks for encrypted password being valid for a given answer to a question
          //If right then it approves the request, updates user password by using SHA256
          //Then sends success message to the user.
          for (var i = 0; i < questions.length; i++) {
            var password={NewPassword:requestObject.Parameters.NewPassword};
            password=utility.decryptObject(password,questions[i].Answer);
            if(typeof password.NewPassword!=='undefined'&&password.NewPassword!==''){
              newPassword=CryptoJS.SHA256(password.NewPassword).toString();
              flag=true;
            }
          }
          //deletes the request
          if(!flag)
          {
            completeRequest(requestKey,{},'Invalid');
            console.log('Invalid flag');
          }else{
            //sets new password then sends message
            console.log(patient);
            sqlInterface.setNewPassword(newPassword,patient.PatientSerNum).then(function(){
              completeRequest(requestKey,requestObject);
            }).catch(function(response){
              console.log('Invalid setting password');
                //completeRequest(requestKey,{},'Invalid');
            });
          }
        });
      }
    }).catch(function(response){
      completeRequest(requestKey,{},'Invalid');
    });
}
