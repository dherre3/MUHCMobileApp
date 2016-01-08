var Firebase=require('firebase');
var credentials=require('./credentials.js');

 var ref=new Firebase(credentials.FIREBASE_URL+'/requests');
 ref.auth(credentials.FIREBASE_SECRET);
 ref.set(null);
