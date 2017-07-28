define(['uiRouter'],function(){
	angular.module('chooseCountryModule',['ui.router'])
		.config(function($stateProvider,$urlRouterProvider){
			$stateProvider
				.state('chooseCountry',{
					url:'/chooseCountry',
					templateUrl:'component/chooseCountry/chooseCountry.html',
					css:'component/chooseCountry/chooseCountry.css',
					controller:'ccCtrl'
				})
		})
		.factory('countryInfo',function(){
			var json = {};
			var country = {};
			json.setCountry= function(coun){
				country = coun;
			};
			json.getCountry = function(){
				return country;
			}
			return json;
		})
		.controller('ccCtrl',['$scope','$http','$state','countryInfo',function($scope,$http,$state,countryInfo){
			$scope.headTitle = '选择国家和地区';
			$scope.headRight = '<i class="iconfont icon-gouwuchekong" style="font-size:0.65rem;color:#cccccc;margin-right:0.6rem;"></i>';
			$scope.headRightClick = function(){
				$state.go('shopcar');
			}
			$scope.goBack =function (){
				history.go(-1);
			}
			$http.get('json/countryCodes.json').then(function(res){
				$scope.countries = res.data;
			})
			$scope.getCode = function(country){
				countryInfo.setCountry(country);
				history.go(-1);
			};
			
		}])
	;
});