define(['uiRouter'],function(){
	var siteApp = angular.module('siteModule',['ui.router'])
		.config(function($stateProvider,$urlRouterProvider){
			$stateProvider.state('site',{
				url:'/site',
				templateUrl:'component/wrap/mine/branch/site/site.html',
				css:'component/wrap/mine/branch/site/site.css',
				controller:'siteCtlr'
			});
		})
		.controller('siteCtlr',['$state','$scope','$http',function($state,$scope,$http){
			$scope.headTitle = '我的收货地址';
			$scope.headRight = '添加';
			$scope.goBack = function(){
				window.history.go(-1);
			};
			$scope.headRightClick = function(){
				window.history.go(1);
			};
			$scope.noData='您还没有任何收货地址哦～';
			$scope.noUrl='https://s10.mogucdn.com/p2/170222/upload_1ga8374ha4c1e315k293bce18d3b9_514x258.png';
		}])
});