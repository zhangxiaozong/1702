define(['uiRouter', 'swiper'], function() {
	angular.module('oneGroupModule', [])
		.config(function($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('oneGroup', {
					url: '/oneGroup',
					templateUrl: 'component/oneGroup/oneGroup.html',
					css: 'component/oneGroup/oneGroup.css',
					controller: 'oneGroupCtrl'
				})
		})
		.service('getoneGroupData', function($http) {
			this.getHeadeList = function() {
				return $http.jsonp('http://mce.mogucdn.com/jsonp/multiget/3?pids=51233%2C56675&callback=JSON_CALLBACK');
			},
			this.getInfoListData = function  () {
				return $http.get('json/booking.json');
			}

		})
		.service('swiper', ['$timeout', function($timeout) {
			this.swiper = function() {
				$timeout(function() {
					var mySwiper = new Swiper('.swiper-container', {
						autoplay: 1000,
						observer: true,
						observeParents: true,
						loop: true,
						// 如果需要分页器
						pagination: '.swiper-pagination',
					})
				}, 100)
			}
		}])
		.controller('oneGroupCtrl', ['$scope', '$state', '$http', 'swiper', 'getoneGroupData', function($scope, $state, $http, swiper, getoneGroupData) {
			//		$scope.name = '正在搭建中......';
			getoneGroupData.getHeadeList().then(function(res) {
				swiper.swiper();
				$scope.navList = res.data.data[51233].list;
			})
			getoneGroupData.getInfoListData().then(function  (res) {
				$scope.infoList = res.data.data.list;
			})
		}])
})