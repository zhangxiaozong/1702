define(['uiRouter','chooseCountry'],function(){
	angular.module('registerModule',['ui.router','chooseCountryModule'])
		.config(function($stateProvider,$urlRouterProvider){
			$stateProvider
				.state('register',{
					url:'/register',
					templateUrl:'component/register/register.html',
					css:'component/register/register.css',
					controller:'registerCtrl'
				})
		})
		.controller('registerCtrl',['$scope','$state','countryInfo',function($scope,$state,countryInfo){
			$scope.headTitle = '进入精品集';
			$scope.headRight = ' ';
			var country = countryInfo.getCountry();
			$scope.countryName=country.cname ? country.cname : '中国' ;
			$scope.contryCode = country.areacode ? country.areacode : '86';
			$scope.goBack = function(){
				$state.go('login');
			}
//			$scope.register =function(){
//				if(!(/^1[34578]\d{9}$/.test($scope.phonenumber)){
//					alert('手机号填写错误')   
//				} else {
//					$state.go()
//				}
//			}
		}])
});