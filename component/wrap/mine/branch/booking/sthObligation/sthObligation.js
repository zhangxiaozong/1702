define(['uiRouter'],function(){
	var sthObligationApp =angular.module('sthObligationModule',['ui.router'])
		.config(function($stateProvider,$urlRouterProvider){
			$stateProvider.state('booking.sthObligation',{
				url:'/sthObligation',
				templateUrl:'component/wrap/mine/branch/booking/sthObligation/sthObligation.html',
				css:'component/wrap/mine/branch/booking/sthObligation/sthObligation.css',
				controller:'sthObligationCtr'
			});
		})
		.controller('sthObligationCtr',['$state','$scope','$http',function($state,$scope,$http){
		}])
})