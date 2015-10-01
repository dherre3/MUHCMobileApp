var myApp=angular.module('MUHCApp')
/*
*@ngdocs controller
*@name MUHCApp.controller:NotesController
*@requires Notes
*@requires UserPreferences
*@description Sets up the notes for the user.
*/
myApp.controller('NotesController',['Notes','UserPreferences','$scope', function(Notes, UserPreferences,$scope){
	initNotes();


	/*
	*@ngdocs method
	*@name MUHCApp.NotesController.initNotes
	*@param { } null
	*@description Sets up all the variables for the scope
	*/
	function initNotes(){
		//Retrive notes from service
		$scope.Notes=Notes.getNotes();
		//Retrieve Language
		var language=UserPreferences.getLanguage();
		for (var i = 0; i < $scope.Notes.length; i++) {
			//Update fields in notes to show appropiately
			if(language=='EN'){
				$scope.Notes[i].Content=$scope.Notes[i].Content_EN;
				$scope.Notes[i].Title=$scope.Notes[i].Title_EN;
			}else{
				$scope.Notes[i].Content=$scope.Notes[i].Content_FR;
				$scope.Notes[i].Title=$scope.Notes[i].Title_FR;
			}
			
		};
	}

	//Go to specific page for note

	/*
	*@ngdocs method
	*@name MUHCApp.NotesController.goToNote
	*@param {note } Object Object that contains the note to pass to the single-note page
	*@description Goes to the individual note
	*/
	$scope.goToNote=function(note){
		myNavigator.pushPage('templates/notes/single-note.html',{param:note});
	}


}]);

myApp.controller('SingleNoteController',['Notes', '$scope','UserPreferences', function(Notes,$scope,UserPreferences){
	initSingleNote();
	

	/*
	*@ngdocs method
	*@name MUHCApp.NotesController.initSingleNote
	*@param { } null
	*@description Sets up all the variables for the scope
	*/
	function initSingleNote(){
		//Get the parameter from the navigator
		var page=myNavigator.getCurrentPage();
		var param=page.options.param;
		console.log(param);
		//Set the note fields
		$scope.Note=param;
		//Pick the appropiate language for the note
		var language=UserPreferences.getLanguage();
		if(language=='EN'){
			$scope.Note.Content=$scope.Note.Content_EN;
			$scope.Note.Title=$scope.Note.Title_EN;
		}else{
			$scope.Note.Content=$scope.Note.Content_FR;
			$scope.Note.Title=$scope.Note.Title_FR;
		}
		
	}
	
}]);