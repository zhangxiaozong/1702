define(['uiRouter','login','obligat','collect'],function(){
	var mineApp = angular.module('mineModule',['ui.router','loginModule','obligatModule','collectModule'])
		.config(function($stateProvider,$urlRouterProvider){
			$stateProvider.state('wrap.mine',{
				url:'/mine',
				templateUrl:'component/wrap/mine/mine.html',
				css:'component/wrap/mine/mine.css',
				controller:'mineCtlr',
			});
		})
		.controller('mineCtlr',['$scope','$state','$http',function($scope,$state,$http){
			var isLogin = localStorage.getItem('isLogin');
				if(!(isLogin=='true')){
					$state.go('login')
				}
				
			$scope.logout = function(){
				localStorage.setItem('isLogin','false');
				$state.go('login')
			}
			$scope.jump2commonality = function(index){
				localStorage.setItem('commonalityIndex',index);
				$state.go('commonality');
			}
			$scope.store =function(index){
				localStorage.setItem('collectStore',index);
				$state.go('collect');
			}
		}])
});
