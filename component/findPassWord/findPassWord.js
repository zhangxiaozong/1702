define(['uiRouter'],function(){
	angular.module('findPassWordModule',['ui.router'])
		.config(function($stateProvider,$urlRouterProvider){
			$stateProvider
				.state('findPassWord',{
					url:'/findPassWord',
					templateUrl:'component/findPassWord/findPassWord.html',
					css:'component/findPassWord/findPassWord.css',
					controller:'fpwCtrl'
				})
		})
		.controller('fpwCtrl',['$scope','$state',function($scope,$state){
			$scope.headTitle = '找回密码';
			$scope.goBack = function(){
				$state.go('login');
			}
		}])
})