var myApp=angular.module('app.filters',[]);
	myApp.filter('notifications',function(){
		return function(input){
			if(input==='DoctorNote'){
				return 'Doctor Note';
			}else if(input==='DocumentReady'){
				return 'Document Ready';
			}else if(input==='NextAppointment'){
				return 'Next Appointment';
			}

		}



	});