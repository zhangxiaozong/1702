define(['uiRouter','searchpagedel'],function(){
	angular.module('searchpageModule',['ui.router','searchpagedelModule'])
		.config(function($stateProvider,$urlRouterProvider){
			$stateProvider
				.state('searchpage',{
					url:'/searchpage',
					templateUrl:'component/searchpage/searchpage.html',
					css:'component/searchpage/searchpage.css',
					controller:'searchpagectrl'
				});
		})
		.controller('searchpagectrl',['$state','$scope', '$http', function ($state,$scope, $http){
			$scope.goback=function(){
				window.history.go(-1);
			}
			$scope.isactive=true;
			$scope.goodsHistory = JSON.parse(localStorage.getItem('goods'));
			console.log($scope.goodsHistory);
			$scope.srearch=function(){
				$scope.isactive=false;
				if(localStorage.getItem('goods')){
					var arr2 = JSON.parse(localStorage.getItem('goods'))
					arr2.push($scope.value);
					localStorage.setItem('goods',JSON.stringify(arr2))
				}else{
					var arr = [];
					arr.push($scope.value);
					localStorage.setItem('goods',JSON.stringify(arr))
				}
				$scope.goodsHistory = JSON.parse(localStorage.getItem('goods'));
				console.log($scope.goodsHistory);
				$state.go('searchpage.searchpagedel');
				localStorage.setItem('title',$scope.value);
			}
			$scope.remove=function(){
				 localStorage.clear();
				 $scope.goodsHistory = JSON.parse(localStorage.getItem('goods'));
				 $scope.isactive=true;
			}
			$scope.val=function(item){
				$scope.value=item;
			}
			
		}])
});