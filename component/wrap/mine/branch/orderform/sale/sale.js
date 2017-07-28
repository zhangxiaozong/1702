define(['uiRouter'],function(){
	var saleApp = angular.module('saleModule',['ui.router'])
		.config(function($stateProvider,$urlRouterProvider){
			$stateProvider.state('commonality.sale',{
				url:'/sale',
				templateUrl:'component/wrap/mine/branch/orderform/sale/sale.html',
				css:'component/wrap/mine/branch/orderform/sale/sale.css',
				controller:'saleCtr'
			});
		})
		.controller('saleCtr',['$state','$scope','$http',function($state,$scope,$http){
			$scope.noData='还没有相关订单哦';
			$scope.noUrl='https://s10.mogucdn.com/p2/170222/upload_1ga8374ha4c1e315k293bce18d3b9_514x258.png';
		}])
})
