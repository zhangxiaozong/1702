define(['uiRouter'],function(){
	var obligatApp = angular.module('obligatModule',['ui.router'])
		.config(function($stateProvider,$urlRouterProvider){
			$stateProvider.state('commonality.obligat',{
				url:'/obligat',
				templateUrl:'component/wrap/mine/branch/orderform/obligat/obligat.html',
				css:'component/wrap/mine/branch/orderform/obligat/obligat.css',
				controller:'obligatCtlr'
			});
		})
		.controller('obligatCtlr',['$scope','$state','$http',function($scope,$state,$http){
			$scope.noData='还没有相关订单哦';
			$scope.noUrl='https://s10.mogucdn.com/p2/170222/upload_1ga8374ha4c1e315k293bce18d3b9_514x258.png';
		}])
});
