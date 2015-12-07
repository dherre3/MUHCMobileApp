var myApp=angular.module('MUHCApp');
myApp.service('Doctors',function($q,$filter,FileManagerService,$cordovaDevice){
    function copyDoctorObject(object)
    {
      var newObject={};
      for(key in object)
      {
        newObject[key]=object[key];
      }
      return newObject;
    }
    return{
        setUserContactsOnline:function(doctors)
        {
            var r=$q.defer();
            this.Doctors=[];
            this.Oncologists=[];
            this.OtherDoctors=[];
            this.PrimaryPhysician=[];
            var promises=[];
            if(typeof doctors!=='undefined'&&doctors){

                var doctorKeyArray=Object.keys(doctors);
                for (var i = 0; i < doctorKeyArray.length; i++) {
                  if(typeof doctors[doctorKeyArray[i]].ProfileImage!=='undefined' )
                  {
                    if(doctors[doctorKeyArray[i]].DocumentType=='pdf')
                    {
                      doctors[doctorKeyArray[i]].ProfileImage='data:application/pdf;base64,'+doctors[doctorKeyArray[i]].ProfileImage;
                    }else{
                      doctors[doctorKeyArray[i]].ProfileImage='data:image/'+doctors[doctorKeyArray[i]].DocumentType+';base64,'+doctors[doctorKeyArray[i]].ProfileImage;
                    }
                  }
                }
                var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
                if(app){
                  for (var i = 0; i < doctorKeyArray.length; i++) {
                    if(typeof doctors[doctorKeyArray[i]].ProfileImage!=='undefined' )
                    {
                      var platform=$cordovaDevice.getPlatform();
                      var targetPath='';
                      if(platform==='Android'){
                          targetPath = cordova.file.dataDirectory+'Doctors/doctor'+doctors[doctorKeyArray[i]].DoctorSerNum+"."+doctors[doctorKeyArray[i]].DocumentType;
                      }else if(platform==='iOS'){
                        targetPath = cordova.file.documentsDirectory+ 'Doctors/doctor'+doctors[doctorKeyArray[i]].DoctorSerNum+"."+doctors[doctorKeyArray[i]].DocumentType;
                      }
                      var url = doctors[doctorKeyArray[i]].ProfileImage;
                      var trustHosts = true
                      var options = {};
                      doctors[doctorKeyArray[i]].NameFileSystem='doctor'+doctors[doctorKeyArray[i]].DoctorSerNum+"."+doctors[doctorKeyArray[i]].DocumentType;
                      doctors[doctorKeyArray[i]].PathFileSystem=targetPath;
                      promises.push(FileManagerService.downloadFileIntoStorage(url, targetPath));
                    }
                  }
                }
                for (var i = 0; i < doctors.length; i++) {
                  var copyDoctor=copyDoctorObject(doctors[doctorKeyArray[i]]);
                    delete doctors[i].ProfileImage;
                   if(copyDoctor.PrimaryFlag=='1'){
                        this.PrimaryPhysician.push(copyDoctor);
                   }else if(copyDoctor.OncologistFlag=='1')
                   {
                        this.Oncologists.push(copyDoctor);
                   }else{
                     this.OtherDoctors.push(copyDoctor);
                   }
                   this.Doctors.push(copyDoctor);
                };
                this.Oncologists=$filter('orderBy')(this.Oncologists,'LastName',false);
                this.Doctors=$filter('orderBy')(this.Doctors,'LastName',false);
                this.OtherDoctors=$filter('orderBy')(this.OtherDoctors,'LastName',false);
                console.log(this.Doctors);
                $q.all(promises).then(function(){
                  r.resolve(doctors);
                });
            }else{
              r.resolve(true);
            }
            return r.promise;
        },
        setUserContactsOffline:function(doctors)
        {
            var r=$q.defer();
            this.Doctors=[];
            this.Oncologists=[];
            this.OtherDoctors=[];
            this.PrimaryPhysician=[];
            /*
            *Add code for offline extraction of doctors photos
            */
            var doctorKeyArray=Object.keys(doctors);
            if(typeof doctors!=='undefined'&&doctors){
              for (var i = 0; i < doctorKeyArray.length; i++) {
                var copyDoctor=copyDoctorObject(doctors[doctorKeyArray[i]]);
                  //delete doctors[i].ProfileImage;
                 if(copyDoctor.PrimaryFlag=='1'){
                      this.PrimaryPhysician.push(copyDoctor);
                 }else if(copyDoctor.OncologistFlag=='1')
                 {
                      this.Oncologists.push(copyDoctor);
                 }else{
                   this.OtherDoctors.push(copyDoctor);
                 }
                 this.Doctors.push(copyDoctor);
              };
              console.log(doctors);
              this.Oncologists=$filter('orderBy')(this.Oncologists,'LastName',false);
              this.Doctors=$filter('orderBy')(this.Doctors,'LastName',false);
              this.OtherDoctors=$filter('orderBy')(this.OtherDoctors,'LastName',false);
            }
            r.resolve(true);
            return r.promise;
        },
        isEmpty:function()
        {
          if(this.Doctors.length==0)
          {
            return true;
          }else{
            return false;
          }
        },
        getContacts:function(){
            return this.Doctors;
        },
        getPrimaryPhysician:function(){
            return this.PrimaryPhysician;
        },
        getOncologists:function(){
            return this.Oncologists;
        },
        getOtherDoctors:function(){
            return this.OtherDoctors;
        },
        getDoctorBySerNum:function(userSerNum){
            for (var i = 0; i < this.Doctors.length; i++) {
                if(this.Doctors[i].DoctorSerNum===userSerNum)
                {
                    console.log(this.Doctors[i]);
                    return this.Doctors[i];
                }
            };
        }

    }
});
