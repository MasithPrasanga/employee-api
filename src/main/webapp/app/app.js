var  employeeApp = angular.module('employeeApp',['ngRoute'])

employeeApp.config(['$routeProvider',function($routeProvider){
	
	$routeProvider
		.when('/home',{
			templateUrl:'views/home.html'
		})
		.when('/employeeapi',{
			templateUrl:'views/employee.html',
			controller:'employeeController'
		})
		.otherwise({
			redirectTo:'/home'
		});
	
}])

employeeApp.controller("employeeController",['$scope','$http',function($scope,$http){
	
	$scope.employees;
	var prefixUrl = "http://localhost:8080/employee-api/api/v1/";
	
	$scope.addEmployee = function(newEmployee){
		
		var method = "";
		
		if(newEmployee.id > 0){
			method = 'PUT';
		}else{
			method = 'POST';
		}
		
		$http({
			  method: method,
			  url: prefixUrl+'employee',
			  data:newEmployee
		}).then(
				function successCallback(response) {
					getAllEmployees();
				}, function errorCallback(response) {
				}
		);
		
		$scope.newEmployee = null;

	}
	
	$scope.editEmployee = function(employee){
		$scope.newEmployee = employee;
	}
	
	
	$scope.deleteEmployee = function(employee){
		$http({
			  method: 'DELETE',
			  url: prefixUrl+'employee/'+employee.id
		}).then(
				function successCallback(response) {
					getAllEmployees();
				}, function errorCallback(response) {
				}
		);
	}
	
	getAllEmployees();
	function getAllEmployees(){
		
		$http.get(prefixUrl+'employee').then(function(data){
			$scope.employees = data.data;
			console.log($scope.employees);
		});	
		
		
	}
	
}])
