var myApp=angular.module('MUHCApp');
myApp.service('LocalStorage',['UserAuthorizationInfo', function(UserAuthorizationInfo){
	return {
		WriteToLocalStorage:function(section, data)
		{
			if(section=='All')
			{
				 window.localStorage.setItem(UserAuthorizationInfo.UserName, JSON.stringify(data));
			}else if(section=='Documents')
			{
				//Deal with it later
			}else{
				var storage=window.localStorage.getItem(UserAuthorizationInfo.UserName);
				storage=JSON.parse(storage);
				storage[section]=data;
				window.localStorage.setItem(UserAuthorizationInfo.UserName,JSON.stringify(storage));
			}

		},
		ReadLocalStorage:function(section)
		{
			if(section=='All')
			{
				 var storage=window.localStorage.getItem('UserAuthorizationInfo');
				 storage=JSON.parse(storage);
				 storage=window.localStorage.getItem(storage.UserName);
				 return JSON.parse(storage);

			}else if(section=='Documents')
			{
				//Deal with it later
			}else{
				var storage=window.localStorage.getItem(UserAuthorizationInfo.UserName);
				storage=JSON.parse(storage);
				return storage[section];
			}
		}



	};


}]);
