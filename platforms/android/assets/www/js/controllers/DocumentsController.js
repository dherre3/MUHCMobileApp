var myApp = angular.module('MUHCApp');
myApp.controller('DocumentsController', ['Patient', 'Documents', 'UpdateUI', '$scope', '$timeout', 'UserPreferences', 'RequestToServer', '$cordovaFile','UserAuthorizationInfo','$q',function(Patient, Documents, UpdateUI, $scope, $timeout, UserPreferences, RequestToServer,$cordovaFile,UserAuthorizationInfo,$q) {
  documentsInit();
  var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
    if(app){
    var dataUserString=window.localStorage.getItem(UserAuthorizationInfo.UserName);
    var dataUserObject=JSON.parse(dataUserString);
    var images=dataUserObject.Documents;
    console.log(images);
    var promises=[];
    for (var i = 0; i < images.length; i++) {
      if(images[i].PathFileSystem)
      {
        console.log(images[i].PathFileSystem);
        console.log(images[i].NameFileSystem);
        $cordovaFile.readAsDataURL(images[i].PathFileSystem, images[i].NameFileSystem).then(function(sucess)
      {
        console.log(sucess);
      },function(error)
    {
      console.log(error);
    });

      }
    }
     /*$q.all(promises).then(function(result1,result2){
       console.log(result1);
       console.log(result2);
     });*/
   }
  function documentsInit() {
    $scope.documents = Documents.getDocuments();
    if($scope.documents.length==0){
      $scope.noDocuments=true;
    }
    if (UserPreferences.getLanguage() == 'EN') {
      for (var i = 0; i < $scope.documents.length; i++) {
        $scope.documents[i].Name = $scope.documents[i].AliasName_EN;
        $scope.documents[i].Description = $scope.documents[i].AliasDescription_EN;
      }
    } else {
      for (var i = 0; i < $scope.documents.length; i++) {
        $scope.documents[i].Name = $scope.documents[i].AliasName_FR;
        $scope.documents[i].Description = $scope.documents[i].AliasDescription_FR;
      }
    }
  }

  function loadDocuments() {
    var UserData = UpdateUI.UpdateSection('Documents');
    UserData.then(function() {
      documentsInit();
    });
  };


  $scope.refreshDocuments = function($done) {
    RequestToServer.sendRequest('Refresh', 'Documents')
    $timeout(function() {
      loadDocuments();
      $done();
    }, 2000);
  };
}]);

myApp.controller('SingleDocumentController', ['Documents', '$timeout', '$scope', '$cordovaEmailComposer',function(Documents, $timeout, $scope,$cordovaEmailComposer) {
  console.log('Simgle Document Controller');
  var page = myNavigator.getCurrentPage();
  var image = page.options.param;
  console.log(image);
  $scope.documentObject = image;
  $scope.shareViaEmail=function()
  {
    var app = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
    if (app) {
      $cordovaEmailComposer.isAvailable().then(function() {
        var attachment='base64:'+'attachment.'+image.DocumentType+'//'+image.Content.substring(image.Content.indexOf(',')+1,image.Content.length);
        var email = {
          to: '',
          cc: '',
          bcc: [],
          attachments: [
            attachment
          ],
          subject: 'MUHC Document',
          body: '',
          isHtml: true
        };
       $cordovaEmailComposer.open(email).then(null, function () {
         console.log('User canceled emal');
       });
  }, function () {
    console.log('Function is not available');
  });
    } else {
      window.open(image.Content);
    }

  }
  $scope.openDocument = function() {
      var app = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
      if (app) {
        var ref = cordova.InAppBrowser.open(image.Content, '_blank', 'EnableViewPortScale=yes');
      } else {
        window.open(image.Content);
      }
    }
    /*var gesturableImg = new ImgTouchCanvas({
            canvas: document.getElementById('mycanvas2'),
            path: "./img/D-RC_ODC_16June2015_en_FNL.png"
        });*/
}]);
