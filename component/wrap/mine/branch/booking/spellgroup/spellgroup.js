define(['uiRouter'],function(){
	var spellgroupApp =angular.module('spellgroupModule',['ui.router'])
		.config(function($stateProvider,$urlRouterProvider){
			$stateProvider.state('booking.spellgroup',{
				url:'/spellgroup',
				templateUrl:'component/wrap/mine/branch/booking/spellgroup/spellgroup.html',
				css:'component/wrap/mine/branch/booking/spellgroup/spellgroup.css',
				controller:'spellgroupCtr'
			});
		})
		.controller('spellgroupCtr',['$state','$scope','$http',function(){
			
		}])
})