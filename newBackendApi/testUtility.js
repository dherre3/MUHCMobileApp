var utility=require('./utility.js');
var sqlInterface=require('./sqlInterface.js');
var filesystem  =require('fs');
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

//Testing the sqlInterface that uses the queue
var a=utility.decryptObject({ DeviceId: '198-168-135-23',
  'Parameters:': { AppointmentSerNum: 'U2FsdGVkX18xkbT7+6efP4mRA5bE7riEsDc+r8uwnD8=' }});

var userID='ec00959e-7291-469b-87c8-1d302a676371';
console.log(__dirname);
var a=filesystem.readFileSync(__dirname + '/Documents/'+'image1.jpg','base64' );
console.log(a);
/*var a=['Patient','Messages'];
var queue=utility.Queue();
queue.enqueueArray(a);
sqlInterface.cascadeFunction('simplelogin:10',queue,{}).then(
  function(object){
    console.log(object);
  }
);*/
