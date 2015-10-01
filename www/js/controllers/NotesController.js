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

myApp.controller('SingleNoteController',['Notes', '$scope', function(Notes,$scope){
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
		
	}
	
}]);

myApp.controller('EditNoteController',['Notes', '$scope','UserPreferences', '$q',function(Notes,$scope,UserPreferences,$q){
	var parameter=myNavigator.getCurrentPage().options.param;
	console.log(parameter);
	if(parameter.Type=='create'){
		$scope.Type='Create';
		$scope.fieldsFilled=false;
		$scope.NoteTitle='';
		$scope.NoteContent='';
		$scope.$watchGroup(['NoteTitle','NoteContent'],function(){
			if($scope.NoteTitle==''||$scope.NoteContent==''){
				$scope.fieldsFilled=false;
			}else{
				$scope.fieldsFilled=true;
			}
		});
		
	}else{
		$scope.Type='Edit';
		$scope.note=parameter.Note;
		console.log(parameter.Note);
		$scope.fieldsFilled=true;
		$scope.NoteTitle=$scope.note.Title;
		$scope.NoteContent=$scope.note.Content;
		$scope.$watchGroup(['NoteTitle','NoteContent'],function(){
			if($scope.NoteTitle==''||$scope.NoteContent==''){
				$scope.fieldsFilled=false;
			}else{
				$scope.fieldsFilled=true;
			}
		});

	}

	$scope.editNote=function(){
		if(parameter.Type=='create'){
			objectToAdd={};
			objectToAdd.Title=$scope.NoteTitle;
			objectToAdd.Content=$scope.NoteContent;
			objectToAdd.DateAdded=new Date();
			Notes.addNewNote(objectToAdd);
			$scope.fieldsFilled=true;
			myNavigator.popPage();
		}else{
			console.log('swag');
			console.log($scope.note);
			$scope.note.Title=$scope.NoteTitle;
			$scope.note.Content=$scope.NoteContent;
			Notes.editNote($scope.note);
			myNavigator.popPage();
		}
	}
	
	
}]);
