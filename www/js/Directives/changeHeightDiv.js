angular.module('MUHCApp').directive('heightChange', function() {
  return function(scope, element, attrs) {
    var start=document.documentElement.clientHeight-80;
    console.log(start);
  	element.css('height', start +'px');
    scope.$watch(attrs.heightChange, function(newValue, oldValue) {
    	var change=newValue;
    	var changeHeight=element[0].offsetHeight+change;
    	changeHeight=changeHeight+'';
 
    	if(newValue){
    		element.css('height',newValue+'px');
    	}
    	
    });
  };
});


 $scope.searchMaskSet=function(){
      $rootScope.searchingMask=true;
     }
     $scope.refreshMask=function(val){
        if(val!==undefined){
          if(val.length>0){
            $rootScope.searchingMask=true;
          }else if(val.length==0){
            $rootScope.searchingMask=false;
          }
      }


     };