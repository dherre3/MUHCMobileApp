var myApp=angular.module('app');
myApp.controller('TreatmentPlanController',function($scope){
	//This is not a highcharts object. It just looks a little like one!
   $scope.closeAlert = function () {
   
        $rootScope.showAlert=false;
    };
  $scope.max = 200;

  $scope.random = function() {
    var value = Math.floor((Math.random() * 100) + 1);
    var type;

    if (value < 25) {
      type = 'success';
    } else if (value < 50) {
      type = 'info';
    } else if (value < 75) {
      type = 'warning';
    } else {
      type = 'danger';
    }

    $scope.showWarning = (type === 'danger' || type === 'warning');

    $scope.dynamic = value;
    $scope.type = type;
  };
  $scope.random();

  $scope.randomStacked = function() {
    $scope.stacked = [];
    var types = ['success', 'info', 'warning', 'danger'];

    for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
        var index = Math.floor((Math.random() * 4));
        $scope.stacked.push({
          value: Math.floor((Math.random() * 30) + 1),
          type: types[index]
        });
    }
  };
  $scope.randomStacked();
  
	$scope.chartConfig = {
	        chart: {
	            type: 'column',
	            inverted:true

	        },
	        title: {
	            text: 'Treatment Planning'
	        },
	        xAxis: {
	            type: 'datetime',
	            dateTimeLabelFormats: { // don't display the dummy year

	                
	                month: '%e. %b',
	                year: '%b'
	            },
	            title: {
	                text: 'Date'
	            }
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: 'Total fruit consumption'
	            }
	        },
	        legend: {
	            reversed: true
	        },
	        plotOptions: {
	            series: {
	                stacking: 'normal'
	            }
	        },
	        series: [{
	            name: 'Jane',
	            data: [2]
	        }, {
	            name: 'End Of Treatment',
	            data: [1]
	        }, {
	            name: 'Ready for Treatment',
	            data: [3]
	        }, {
	            name: 'Ready for Physics QA',
	            data: [3]
	        }, {
	            name: 'Ready for Dose Calculation',
	            data: [3]
	        }, {
	            name: 'Ready for MD Contour',
	            data: [3]
	        },{
	            name: 'Ready for Contour',
	            data: [3]
	        }, {
	            name: 'Ct-Sim',
	            data: [3]
	        }, {
	            name: 'Consult Appointment',
	            data: [3]
	        }, 
	      ]
	    };








});