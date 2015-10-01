angular.module('MUHCApp')
	.service('Notes',['$filter','RequestToServer', function($filter,RequestToServer){
		return{
			setNotes:function(notes){
				this.Notes=[];
				if(notes==null||typeof notes=='undefined'){
					return;
				}
				var notesKeys=Object.keys(notes);
				for (var i = 0; i < notesKeys.length; i++) {
					notes[notesKeys[i]].DateAdded=$filter('formatDate')(notes[notesKeys[i]].DateAdded);
					this.Notes.push(notes[notesKeys[i]]);
				};
				this.Notes=$filter('orderBy')(this.Notes,'DateAdded',true);
				console.log(this.Notes);

			},
			getNotes:function(){
				return this.Notes;
			},
			getNoteBySerNum:function(serNum){
				for (var i = 0; i < this.Notes.length; i++) {
					if(this.Notes[i].NoteSerNum==serNum){
						return this.Notes[i];
					}
				};

			},
			addNewNote:function(note){
				this.Notes.push(note);
				this.Notes=$filter('orderBy')(this.Notes,'DateAdded',true);
				objectToBackEnd={};
				objectToBackEnd.Title=note.Title;
				objectToBackEnd.Content=note.Content;
				objectToBackEnd.DateAdded=$filter('formatDateToFirebaseString')(note.DateAdded);
				RequestToServer.sendRequest('NewNote',objectToBackEnd);
				console.log(this.Notes);

			},
			editNote:function(newNote){
				console.log(newNote);
				for (var i = 0; i < this.Notes.length; i++) {
					if(this.Notes[i].NoteSerNum==newNote.NoteSerNum){
						this.Notes[i]=newNote;
						objectToBackEnd={};
						objectToBackEnd.Title=newNote.Title;
						objectToBackEnd.Content=newNote.Content;
						objectToBackEnd.NoteSerNum=newNote.NoteSerNum;
						objectToBackEnd.DateAdded=$filter('formatDateToFirebaseString')(newNote.DateAdded);
						RequestToServer.sendRequest('EditNote',objectToBackEnd);
						return;
					}
				};
			}


		};

	}]);