define(['uiRouter'],function(){
	var spellfailureApp =angular.module('spellfailureModule',['ui.router'])
		.config(function($stateProvider,$urlRouterProvider){
			$stateProvider.state('booking.spellfailure',{
				url:'/spellfailure',
				templateUrl:'component/wrap/mine/branch/booking/spellfailure/spellfailure.html',
				css:'component/wrap/mine/branch/booking/spellfailure/spellfailure.css',
				controller:'spellfailureCtr'
			});
		})
		.controller('spellfailureCtr',['$state','$scope','$http',function(){
			
		}])
})