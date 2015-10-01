angular.module('MUHCApp')
	.service('Notes',['$filter', function($filter){
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

			}


		};

	}]);