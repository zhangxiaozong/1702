define(['uiRouter','chooseCountry'],function(){
	angular.module('lwpModule',['ui.router','chooseCountryModule'])
		.config(function($stateProvider,$urlRouterProvider){
			$stateProvider
				.state('loginWithoutPassword',{
					url:'/loginWithoutPassword',
					templateUrl:'component/loginWithoutPassword/loginWithoutPassword.html',
					css:'component/register/register.css',
					controller:'lwpCtrl'
				})
		})
		.controller('lwpCtrl',['$scope','$state','countryInfo',function($scope,$state,countryInfo){
			$scope.headTitle = '免密登录';
			$scope.headRight = '<i class="iconfont icon-gouwuchekong" style="font-size:0.65rem;color:#cccccc;margin-right:0.6rem;"></i>';
			var country = countryInfo.getCountry();
			$scope.countryName=country.cname ? country.cname : '中国' ;
			$scope.contryCode = country.areacode ? country.areacode : '86';
			$scope.goBack = function(){
				$state.go('login');
			}
			$scope.headRightClick = function(){
				$state.go('shopcar');
			}
		}])
});