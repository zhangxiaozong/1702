define(['uiRouter'],function(){
	var receivingApp = angular.module('receivingModule',['ui.router'])
		.config(function($stateProvider,$urlRouterProvider){
			$stateProvider.state('commonality.receiving',{
				url:'/receiving',
				templateUrl:'component/wrap/mine/branch/orderform/receiving/receiving.html',
				css:'component/wrap/mine/branch/orderform/receiving/receiving.css',
				controller:'receivingCtr'
			});
		})
		.controller('receivingCtr',['$state','$scope','$http',function($state,$scope,$http){
			$scope.noData='还没有相关订单哦';
			$scope.noUrl='https://s10.mogucdn.com/p2/170222/upload_1ga8374ha4c1e315k293bce18d3b9_514x258.png';
		}])
})
