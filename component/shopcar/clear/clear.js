define(['uiRouter'],function(){
	angular.module('clearModule',['ui.router'])
		.config(function($stateProvider,$urlRouterProvider){
			$stateProvider
				.state('clear',{
					url:'/clear',
					templateUrl:'component/shopcar/clear/clear.html',
					css:'component/shopcar/clear/clear.css',
					controller:'clearCtrl'
				});
		})
})