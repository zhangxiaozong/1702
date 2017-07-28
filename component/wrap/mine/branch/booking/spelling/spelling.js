define(['uiRouter'],function(){
	var spellingApp =angular.module('spellingModule',['ui.router'])
		.config(function($stateProvider,$urlRouterProvider){
			$stateProvider.state('booking.spelling',{
				url:'/spelling',
				templateUrl:'component/wrap/mine/branch/booking/spelling/spelling.html',
				css:'component/wrap/mine/branch/booking/spelling/spelling.css',
				controller:'spellingCtr'
			});
		})
		.controller('spellingCtr',['$state','$scope','$http',function(){
			
		}])
})
