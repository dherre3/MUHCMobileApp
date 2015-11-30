var myApp=angular.module('MUHCApp');
myApp.service('Documents',['UserPreferences','$cordovaFileTransfer','$cordovaFile', '$cordovaDevice','$cordovaNetwork', 'UserAuthorizationInfo','$q','$rootScope', '$filter',function(UserPreferences,$cordovaFileTransfer,$cordovaFile,$cordovaDevice,$cordovaNetwork,UserAuthorizationInfo,$q,$rootScope,$filter){
	photos=[];
	return{
		setDocumentsOnline:function(documents, mode){
			var r=$q.defer();
			console.log(documents);
			this.Photos=[];
			if(!documents) return;
				var keysDocuments=Object.keys(documents);
				var promises=[];
				for (var i = 0; i < keysDocuments.length; i++) {
					if(documents[keysDocuments[i]].DocumentType=='pdf')
					{
						documents[keysDocuments[i]].Content='data:application/pdf;base64,'+documents[keysDocuments[i]].Content;
					}else{
						documents[keysDocuments[i]].Content='data:image/'+documents[keysDocuments[i]].DocumentType+';base64,'+documents[keysDocuments[i]].Content;
					}
					//documents[keysDocuments[i]].Content='data:image/png;base64,'+documents[keysDocuments[i]].Content;
				/*	var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
	        if(app){
							var platform=$cordovaDevice.getPlatform();
							var targetPath='';
							if(platform==='Android'){
						    	targetPath = cordova.file.dataDirectory+'Documents/docMUHC'+documents[keysDocuments[i]].DocumentSerNum+"."+documents[keysDocuments[i]].DocumentType;
							}else if(platform==='iOS'){
								targetPath = cordova.file.documentsDirectory+ 'Documents/docMUHC'+documents[keysDocuments[i]].DocumentSerNum+"."+documents[keysDocuments[i]].DocumentType;
							}
							var url = documents[keysDocuments[i]].Content;
						    var trustHosts = true
						    var options = {};
						    documents[keysDocuments[i]].NameFileSystem='docMUHC'+documents[keysDocuments[i]].DocumentSerNum+"."+documents[keysDocuments[i]].DocumentType;
						    documents[keysDocuments[i]].PathFileSystem=targetPath;
								promises.push($cordovaFileTransfer.download(url, targetPath, options, trustHosts));
					}*/
					var imageToPhotoObject={};
					imageToPhotoObject.AliasName_EN=documents[keysDocuments[i]].AliasName_EN;
					imageToPhotoObject.AliasName_FR=documents[keysDocuments[i]].AliasName_FR;
					imageToPhotoObject.DateAdded=$filter('formatDate')(documents[keysDocuments[i]].DateAdded);
					imageToPhotoObject.AliasDescription_EN=documents[keysDocuments[i]].AliasDescription_EN;
					imageToPhotoObject.AliasDescription_FR=documents[keysDocuments[i]].AliasDescription_FR;
					imageToPhotoObject.DocumentSerNum=documents[keysDocuments[i]].DocumentSerNum;
					imageToPhotoObject.PathFileSystem=documents[keysDocuments[i]].PathFileSystem;
					imageToPhotoObject.NameFileSystem=documents[keysDocuments[i]].NameFileSystem;
					imageToPhotoObject.DocumentType=documents[keysDocuments[i]].DocumentType;
					imageToPhotoObject.Content=documents[keysDocuments[i]].Content;
					delete documents[keysDocuments[i]].Content;
          delete documents[keysDocuments[i]].PathLocation;
					this.Photos.push(imageToPhotoObject);
				};
				$q.all(promises).then(function(results){
					console.log(results);
					JSON.stringify(results);
					r.resolve(documents);
				});
				return r.promise;
			console.log(this.Photos);

		},
		setDocumentsOffline:function(documents)
		{
			var r=$q.defer();
			console.log(documents);
			this.Photos=[];
			console.log('Offline in Documents');
			/*var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
      if(app){
				var dataUserString=window.localStorage.getItem(UserAuthorizationInfo.UserName);
				var dataUserObject=JSON.parse(dataUserString);
				var images=dataUserObject.Documents;
				console.log(images);
				var promises=[];
				for (var i = 0; i < images.length; i++) {
					if(image.PathFileSystem)
					{
						promises.push($cordovaFile.readAsDataURL(images[keysImages[i]].PathFileSystem, images[keysImages[i]].NameFileSystem));
					}
				}
				 $q.all(promises).then(function(result){
					 console.log(result);
				 });
			 }else{


			 }*/
			  r.resolve(true);
			 return r.promise;
		},
		// success
	/*	if(images[keysImages[i]].DocumentType=='pdf')
		{
			images[keysImages[i]].Content='data:application/pdf;base64,'+success;
		}else{
			images[keysImages[i]].Content='data:image/'+images[keysImages[i]].DocumentType+';base64,'+success;
		}
		photos.push(images[keysImages[i]]);
		console.log(success);
}, function (error) {
		console.log(error);
		this.Photos=photos;
});*/
		getDocuments:function(){
			return this.Photos;
		},
		getDocumentBySerNum:function(serNum)
		{
			for (var i = 0; i < this.Photos.length; i++) {
				if(this.Photos[i].DocumentSerNum==serNum){
					return this.Photos[i];
				}
			};
		},
		downloadDocument:function(document)
		{

		}

	};


}]);
