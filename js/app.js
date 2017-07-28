define(['uiRouter', 'angularCSS', 'mine', 'wrap','login', 'home','category','searchpage', 'evaluated',
'shopcar','site','addsite','obligat','commonality','whole','sale','receiving','booking','lazyload'], function() {
	var app = angular.module('myModule', ['ui.router', 'angularCSS', 'bookingModule',
	'loginModule', 'categoryModule', 'addsiteModule','shopcarModule', 'saleModule',
	'mineModule', 'wrapModule','searchpageModule', 'wholeMofule','evaluatedModule',
	'homeModule','siteModule','obligatModule','commonalityModule','receivingModule','me-lazyload'])
		.config(function($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise('/wrap');
		})
		.directive('search', function() {
			return {
				restrict: 'E',
				replace: true,
				templateUrl: 'component/search/search.html',
			};
		})
		.directive('centerComplete',function(){
			return {
				restrict: 'E',
				replace: true,
				templateUrl: 'component/commonality/commonality.html',
			};
		})
		.directive('herdLocation', function() {
			return {
				restrict: 'E',
				replace: true,
				templateUrl: 'component/noData/nodata.html',
			};
		})
		.directive('backHead', function() {
			return {
				restrict: 'E',
				templateUrl: 'component/head/head.html',
				replace: true,
			}
		})
		.filter('trust2Html', ['$sce', function($sce) {
			return function(val) {
				return $sce.trustAsHtml(val);
			};
		}])
});
