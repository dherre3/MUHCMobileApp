var exports=module.exports={};
var api=require('./api.js');
var credentials=require('./credentials.js');
var Q=require('q');


exports.update=function(requestObject)
{
  var r=Q.defer();
  var type=requestObject.Request;
  var UserId=requestObject.UserID;
  var parameters=requestObject.Parameters;
  var objectToFirebase={};
  if(type=='Login')
  {
    api.login(UserId).then(function(objectToFirebase){
      r.resolve(objectToFirebase);
    }).catch(function(response)
    {
      r.reject(response);
    });
  }else if(type=='Refresh')
  {

    api.refresh(UserId, parameters).then(function(objectToFirebase)
    {
      r.resolve(objectToFirebase);
    }).catch(function(response)
    {
      r.reject(reponse);
    });
  }else{
    r.reject('Invalid');
  }
  return r.promise;
};
