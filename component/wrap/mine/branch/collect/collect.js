define(['uiRouter','treasure','mystore'],function(){
	var collectApp = angular.module('collectModule',['ui.router','treasureModule','mystoreModule'])
		.config(function($stateProvider,$urlRouterProvider){
			$stateProvider.state('collect',{
				url:'/collect',
				templateUrl:'component/wrap/mine/branch/collect/collect.html',
				css:'component/wrap/mine/branch/collect/collect.css',
				controller:'collectCtlr'
			});
		})
		.controller('collectCtlr',['$state','$scope','$http',function($state,$scope,$http){
			$scope.headTitle = '我的收藏';
			$scope.goBack=function(){
				$state.go('wrap.mine');
			};
			var index = localStorage.getItem('collectStore');
			var rout ='collect.treasure';
				switch(index){
				case '1':
					rout='collect.mystore'
					break;
				}
			$scope.collect=index;
//			$scope.collect=0;
			$scope.collec=function(index){
				$scope.collect=index;
			};
			$state.go(rout)
		}])
	})