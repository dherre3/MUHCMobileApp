var utility=require('./utility.js');
var sqlInterface=require('./sqlInterface.js');
var filesystem  =require('fs');
var Firebase =require('firebase');
var sqlInterface=require('./sqlInterface.js');
var CryptoJS=require('crypto-js');

function sayHelloWorld()
{
  console.log('Hello World');
}
//Testing queue object

/*var queue=utility.Queue();

queue.enqueueArray(a);

while(!queue.isEmpty())
{
  var b=queue.dequeue();
  console.log(b);
}*/
sqlInterface.getUsersPassword('ec00959e-7291-469b-87c8-1d302a676371').then(function(pass){
  console.log(pass);
  var a=CryptoJS.AES.encrypt('David',pass).toString();
  var b=CryptoJS.AES.decrypt(a,pass).toString(CryptoJS.enc.Utf8);
  console.log(b);

});
