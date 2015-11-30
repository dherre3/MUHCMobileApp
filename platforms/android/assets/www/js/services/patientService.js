var myApp=angular.module('MUHCApp');

myApp.service('Patient',['UserPreferences','$q','$cordovaFileTransfer','$cordovaDevice',function(UserPreferences,$q, $cordovaFileTransfer, $cordovaDevice){
    return{
        setUserFieldsOnline:function(patientFields,diagnosis){
            var r=$q.defer();
            console.log(patientFields);
            this.FirstName=patientFields.FirstName;
            this.LastName=patientFields.LastName;
            this.Alias=patientFields.Alias;
            this.TelNum=patientFields.TelNum;
            this.Email=patientFields.Email;
            this.Diagnosis=diagnosis;
            this.UserSerNum=patientFields.PatientSerNum;
            this.ProfileImage='data:image/'+patientFields.DocumentType+';base64,'+patientFields.ProfileImage;
            var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
            if(app){
                if(patientFields.ProfileImage)
                {
                  patientFields.ProfileImage='data:image/'+patientFields.DocumentType+';base64,'+patientFields.ProfileImage;
                  var platform=$cordovaDevice.getPlatform();
                  var targetPath='';
                  if(platform==='Android'){
                      targetPath = cordova.file.dataDirectory+'Patient/patient'+patientFields.PatientSerNum+"."+patientFields.DocumentType;
                  }else if(platform==='iOS'){
                    targetPath = cordova.file.documentsDirectory+ 'Patient/patient'+patientFields.PatientSerNum+"."+patientFields.DocumentType;
                  }
                  var url = patientFields.ProfileImage;
                  var trustHosts = true
                  var options = {};
                  this.NameFileSystem='patient'+patientFields.PatientSerNum+"."+patientFields.DocumentType;
                  this.PathFileSystem=targetPath;
                  $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function(data)
                  {
                    delete patientFields.ProfileImage;
                    r.resolve(patientFields);
                  });
                }else{
                  delete patientFields.ProfileImage;
                  r.resolve(patientFields);
                }
              }else{
                delete patientFields.ProfileImage;
                r.resolve(patientFields);
              }
            return r.promise;
        },
        setPatientFieldsOffline:function(patientFields,diagnosis)
        {
          var r=$q.defer();
          this.FirstName=patientFields.FirstName;
          this.LastName=patientFields.LastName;
          this.Alias=patientFields.Alias;
          this.TelNum=patientFields.TelNum;
          this.Email=patientFields.Email;
          this.Diagnosis=diagnosis;
          this.UserSerNum=patientFields.PatientSerNum;
          this.ProfileImage='data:image/'+patientFields.DocumentType+';base64,'+patientFields.ProfileImage;
          delete patientFields.ProfileImage;
          r.resolve(patientFields);
          return r.promise;
        },
        setDiagnosis:function(diagnosis){
            this.Diagnosis=diagnosis;
        },
        setFirstName:function(name){
            this.FirstName=name;
        },
        setLastName:function(name){
            this.LastName=name;
        },
        setAlias:function(name){
            this.Alias=name;
        },
        setTelNum:function(telephone){
            this.TelNum=telephone;
        },
        setEmail:function(email){
            this.Email=email;
        },
        getDiagnosis:function(){
            return this.Diagnosis;
        },
        getFirstName:function(){
            return this.FirstName;
        },
        getLastName:function(){
            return this.LastName;
        },
        getAlias:function(){
            return this.Alias;
        },
        getTelNum:function(){
            return this.TelNum;
        },
        getEmail:function(){
            return this.Email;
        },
        getUserSerNum:function(){
            return this.UserSerNum;
        },
        setProfileImage:function(img){
            this.ProfileImage='data:image/png;base64,'+img;
        },
        getProfileImage:function(){
            return this.ProfileImage;
        },
        getStatus:function(){
            return this.Status;
        }
    };
}]);
