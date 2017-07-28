define(['uiRouter'], function() {
	var wholeApp = angular.module('wholeMofule', ['ui.router'])
		.config(function($stateProvider, $urlRouterProvider) {
			$stateProvider.state('commonality.whole', {
				url: '/whole',
				templateUrl: 'component/wrap/mine/branch/orderform/whole/whole.html',
				css: 'component/wrap/mine/branch/orderform/whole/whole.css',
				controller: 'wholeCtr'
			});
		})
		.controller('wholeCtr',['$scope','$state','$http',function($scope,$state,$http){
			$scope.noData='还没有相关订单哦'
			$scope.noUrl='https://s10.mogucdn.com/p2/170222/upload_1ga8374ha4c1e315k293bce18d3b9_514x258.png';
		}])
});