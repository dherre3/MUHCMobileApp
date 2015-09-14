var myApp=angular.module('app');
//Factory service made to transport the firebase link as a dependency
myApp.factory("Auth", ["$firebaseAuth",

function ($firebaseAuth) {
    var ref = new Firebase("https://luminous-heat-8715.firebaseio.com");
    return $firebaseAuth(ref);
}]);
myApp.run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});
myApp.service('UserNotifications',['UserDataMutable',function(UserDataMutable){
    this.notifications={};
    return{
        setUserNotifications:function(object){
            var keys=Object.keys(object);
            this.notifications=object;
            for (var i=0;i<keys.length;i++) {
                var temp=keys[i];
                this.notifications[keys[i]].unread=true;
            };
        },
         getUserNotifications:function(){
            return this.notifications;
        },
        setNotificationUnreadStatus:function(notification,status){
            this.notifications[notification].unread=status;

        },
        getNotificationUnreadStatus:function(notification){
            return this.notifications[notification].unread;
        },
        addNotification:function(notification){

        },
        deleteNotification:function(index){

        },
        getNotificationsNumber:function(){
            return this.NotificationNumber;
        },
        setNotificationsNumber:function(number){
            this.NotificationNumber=number;
        },
        getNotificationsObjectArray:function(){
            return this.NotificationsObjectArray;
        },
        setNotificationsObjectArray:function(object){
            this.NotificationsObjectArray=object;
        },
        updateNotificationsFromFirebase:function(){

        }


    };

}])

//This service will have the user preferences for language and sent sms feature. To be used in account settings.
myApp.service('UserPreferences', function(){
    return{
        setLanguage:function(lan){
            if(lan!=='EN'||lan!=='FR'){
                return;
            }else{
                this.Language=lan;
            }

        },
        setSMS:function(smsPreference){
            if(smsPreference==='Enable'){
                this.SMS=smsPreference;
            }else if(smsPreference==='Disable'){
                this.SMS=smsPreference;
            }
        },
        getLanguage:function(){
            return this.Language;

        },
        getSMS:function(){
            return this.SMS;
        },
        setUserPreferences:function(smsPreference, lan){
            if(smsPreference==='Enable'){
                this.SMS=smsPreference;
            }else if(smsPreference==='Disable'){
                this.SMS=smsPreference;
            }
            if(lan==='EN'||lan==='FR'){
                this.Language=lan;
                
            }else{
              return;
            }
            //console.log(this.SMS + this.Language);
        },
        getUserPreferences:function(){
            return {
                SMS: this.SMS,
                LAN: this.Language
            };
        }

    }



});




myApp.service('UpdateUI',['UserPreferences','UserDataMutable', 'UserAuthorizationInfo','$q','UserNotifications',function(UserPreferences,UserDataMutable,UserAuthorizationInfo,$q,UserNotifications){
    return{
        UpdateUserFields:function(){
            var r=$q.defer();
            var firebaseLink = new Firebase('https://luminous-heat-8715.firebaseio.com/users/' + UserAuthorizationInfo.UserName);
            firebaseLink.once('value',function(snapshot){
                    var values=snapshot.val();
                    UserDataMutable.setData(values.fields.FirstName,values.fields.LastName,values.fields.picture,values.fields.TelNum,values.fields.Email,values.NextAppointment.CheckIn,values.NextAppointment.Date,values.images,values.AppointmentsAndTasks,values.Notifications);
                    UserPreferences.setUserPreferences(values.UserPreferences.EnableSMS,values.UserPreferences.Language);
                    UserNotifications.setUserNotifications(values.Notifications);
                    var dataValues={
                        FirstName:values.fields.FirstName,
                        LastName:values.fields.LastName,
                        Picture:values.fields.picture,
                        Email:values.fields.Email,
                        TelNum:values.fields.TelNum,
                        NextAppointment:values.NextAppointment.Date,
                        CheckIn:values.NextAppointment.CheckIn,
                        Photos:values.images,
                        AppointmentsAndTasks:values.AppointmentsAndTasks,
                        EnableSMS:values.UserPreferences.EnableSMS,
                        Language:values.UserPreferences.Language,
                        Notifications:values.Notifications

                    };
                    r.resolve(dataValues);                   
                },function(error){r.reject(error)});
                return r.promise;
        }
    };
}]);

//This is our main object where we will define the user data and all the appropiate variables
myApp.service('UserDataMutable', ['UserPreferences','UserAuthorizationInfo','$q',function (UserPreferences, UserAuthorizationInfo,$q) {
    return {

        //This function obtains any field for the patient from firebase, type specifies the type of field, so update, check in, or image, or 
        //simply user fields, while the field is the actual name.
        getFirebaseField:function(type,field){
            var r=$q.defer();
            if(field===undefined&&type!==undefined){
                var firebaseLink = new Firebase('https://luminous-heat-8715.firebaseio.com/users/' + UserAuthorizationInfo.UserName +'/' +type);
                firebaseLink.once('value',function(snapshot){
                    console.log(snapshot.val());
                    r.resolve(snapshot.val());
                    
                },function(error){r.reject(error)});
                return r.promise;
            }else if(type!==undefined&&field!==undefined){
                var firebaseLink = new Firebase('https://luminous-heat-8715.firebaseio.com/users/' + UserAuthorizationInfo.UserName +'/' +type+'/'+field);
                firebaseLink.once('value',function(snapshot){
                    console.log(snapshot.val());
                    r.resolve(snapshot.val());
                    //return snapshot.val();
                },function(error){r.reject(error)});
                return r.promise;
            }else{
            r.reject('Not Good Enough');
            return r.promise;
            }
        },
        setFirebaseField:function(type,value,field){
        //Example: UserDataMutable.setFirebaseField('Update','LastName'); Here the field was undefined, so it will update Update:FistName, check firebase
        //for structure of database. 
        //UserDataMutable.setFirebaseField('fields','FirstName','Andrew'); Here it will go into fields and update the FirstName field to Andrew.
        //Notice how only allowed values will be updated. 
            if(value===undefined) return;
            if(field===undefined&&type!==undefined){
                var firebaseLink = new Firebase('https://luminous-heat-8715.firebaseio.com/users/' + UserAuthorizationInfo.UserName);
                if(type==='Update') firebaseLink.update({'Update':value});
                if(type==='NextAppointment') firebaseLink.update({'NextAppointment':value});
                if(type==='CheckIn') firebaseLink.update({'CheckIn':value});

            }else if(type!==undefined&&field!==undefined){
                var firebaseLink = new Firebase('https://luminous-heat-8715.firebaseio.com/users/' + UserAuthorizationInfo.UserName +'/' +type);
                if(field==='FirstName') firebaseLink.update({'FirstName':value});
                if(field==='LastName') firebaseLink.update({'LastName':value});
                if(field==='Email') firebaseLink.update({'Email':value});
                if(field==='TelNum') firebaseLink.update({'TelNum':value});
                if(field==='picture') firebaseLink.update({'picture':value});
                if(field==='Date') firebaseLink.update({'Date':value});
                if(field==='NextAppointment') firebaseLink.update({'NextAppointment':value});

            }
        },
        getAppointmentsAndTasks:function(){
            return this.AppointmentsAndTasks;
        },
        getUserNotifications:function(){
            return this.UserNotifications;
        },
        getPhotos:function(){
            return this.Photos;
        },
        getData: function () {
            return this.Data;
        },
        getCheckInField:function(){
            return this.CheckIn;
        },
        getNextAppointment:function(){
            return this.NextAppointment;
        },
        getFirstName: function () {
            return this.FirstName;
        },
        getLastName: function () {
            return this.LastName;
        },
        getEmail: function () {
            
            return this.Email;
        },
        getPictures: function () {
            return this.Pictures;
        },
        getTelNum: function () {
            return this.TelNum;
        },
        setData: function (firstName, lastName, pictures, telNum, email,checkin,nextappointment,images,appointmentsAndtasks,usernotifications) {
            var r=$q.defer();
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Pictures = pictures;
            this.Photos=images;
            this.TelNum = telNum;
            this.Email = email;
            this.checkIn = checkin;
            this.nextAppointment=nextappointment;
            this.AppointmentsAndTasks=appointmentsAndtasks;
            this.UserNotifications=usernotifications;
            r.resolve;
            return r.promise;
        },
        setPhotos:function(photos){
            this.Photos=photos;
        },
         setCheckInField:function(checkin){
            this.CheckIn=checkin;
        },
        setNextAppointment:function(nextappointment){
            this.NextAppointment=nextappointment;
        },
        setFirstName: function (firstName) {
            this.FirstName = firstName;
        },
        setLastName: function (lastName) {
            this.LastName = lastName;
        },
        setEmail: function (email) {
            this.Email = email;
        },
        setPictures: function (pictures) {
            this.Pictures = pictures;
        },
        setTelNum: function (telNum) {
            this.TelNum = telNum;
        },
        setAppointmentsAndTasks:function(object){
            this.AppointmentsAndTasks=object;
        },
        setUserNotifications:function(object){
            this.UserNotifications=object;
        }

    };
}]);
//Defines the authorization parameters for the user serssion
myApp.service('UserAuthorizationInfo', function () {


    return {
        setUserAuthData: function (username, token, userPathFirebase, authorize) {
            this.UserName = username;
            this.UserToken = token;
            this.authorization = authorize;
        },
        getUserAuthData: function () {
            return {
                UserName: this.UserName,
                Token: this.UserToken,
                AuthorizationData: this.authorization


            };

        }
    };
});