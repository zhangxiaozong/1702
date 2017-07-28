define(['uiRouter'], function() {
	var treasureApp = angular.module('mystoreModule', ['ui.router'])
		.config(function($stateProvider, $urlRouterProvider) {
			$stateProvider.state('collect.mystore', {
				url: '/mystore',
				templateUrl: 'component/wrap/mine/branch/collect/mystore/mystore.html',
				css: ['component/wrap/mine/branch/collect/mystore/mystore.css','component/wrap/mine/branch/collect/collect.css'],
				controller: 'mystoreCtr'
			});
		})
		.controller('mystoreCtr', ['$scope', '$state', '$http', function($scope, $state, $http) {
			$scope.noData='你还没有收藏任何店铺';
			$scope.noUrl='https://s10.mogucdn.com/p2/161118/upload_8djbjd0daffce09e0h7e5g564bcbi_479x238.jpg';
		}])
});