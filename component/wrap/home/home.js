define(['uiRouter', 'swiper', 'jquery','daPaiManJian','newProduct','oneGroup'], function() {
	var homeApp = angular.module('homeModule', ['ui.router','daPaiManJianModule','newProductModule','oneGroupModule'])
		.config(function($stateProvider, $urlRouterProvider) {
			$stateProvider.state('wrap.home', {
				url: '/home',
				templateUrl: 'component/wrap/home/home.html',
				controller: 'homeCtrl',
				css: 'component/wrap/home/home.css'
			});
		})
		.service('getData', function($http) {
			//轮播图以及大牌满减
			this.getAllData = function() {
					return $http.jsonp('http://mce.mogucdn.com/jsonp/multiget/3?pids=51822%2C51827%2C41119%2C51833%2C51836%2C4604&callback=JSON_CALLBACK')
				},
				//秒杀倒计时
				this.getTime = function() {
					return $http.jsonp('http://mce.mogucdn.com/jsonp/multiget/3?pids=51822%2C51827%2C41119%2C51833%2C51836%2C4604&callback=JSON_CALLBACK')
				},
				//超实惠-促销直达
				this.getCuxiao = function() {
					return $http.jsonp('http://mce.mogucdn.com/jsonp/multiget/3?pids=51822%2C51827%2C41119%2C51833%2C51836%2C4604&callback=JSON_CALLBACK')
				},
				//热门市场
				this.getHotMarket = function() {
					return $http.jsonp('http://mce.mogucdn.com/jsonp/multiget/3?pids=51822%2C51827%2C41119%2C51833%2C51836%2C4604&callback=JSON_CALLBACK')
				},
				this.getCaiNiXiHuan = function  () {
					return $http.jsonp('http://list.mogujie.com/wall/s?q=%E9%9E%8B%E5%AD%90&acm=3.mce.1_10_.37705.28553.qtIkXqo2kaNSe.p_0_615187923-mid_37705-lc_201&ptp=m1.fKiTO.0.0.DMRauh&callback=JSON_CALLBACK')
				},
				//猜你喜欢
				this.getCaiNiXiHuan = function(page) {
					return $http.jsonp('https://list.mogujie.com/search?cKey=h5-shopping&fcid=&pid=9750&searchTag=&sort=pop&page=' + page + '&_version=61&_=1498814598150&callback=JSON_CALLBACK')
				},
				//搜索框默认
				this.getMorenKuang = function() {
					return $http.jsonp('http://list.mogujie.com/module/mget?code=sketch%2ChotWord&callback=JSON_CALLBACK')
				}
		})
		.service('swiper', ['$timeout', function($timeout) {
			this.swiper = function() {
				$timeout(function() {
					var mySwiper = new Swiper('.swiper-container', {
						autoplay: 1500,
						observer: true,
						observeParents: true,
						loop: true,
						// 如果需要分页器
						pagination: '.swiper-pagination',
					})
				}, 100)
			}
		}])
		.controller('homeCtrl', ['$scope', '$http', 'getData', 'swiper', '$interval', '$state', function($scope, $http, getData, swiper, $interval, $state) 
		{
			var page = 1;
			getData.getAllData().then(function(res) {
				$scope.swiperList = res.data.data[51822].list;
				$scope.dapaiList = res.data.data[51827].list;
				swiper.swiper();
			})
			getData.getTime().then(function(res) {
				$scope.seckill = res.data.data[41119].list;
				$scope.time = $scope.seckill[0].time;
				$interval(function() {
					$scope.time--;
					$scope.minutes = parseInt($scope.time / 60 % 60);
					$scope.hours = parseInt($scope.time / 60 / 60 % 24);
					$scope.seconds = parseInt($scope.time % 60);
					if($scope.seconds < 10) {
						$scope.seconds = '0' + $scope.seconds;
					};
					if($scope.minutes < 10) {
						$scope.minutes = "0" + $scope.minutes;
					};
					if($scope.hours < 10) {
						$scope.hours = '0' + $scope.hours;
					};
				}, 1000)

				$scope.goods = res.data.data[41119].list[0].list;
			})
			getData.getCuxiao().then(function(res) {
				$scope.cuxiao = res.data.data[51833].list;
				for(var i = 0; i < $scope.cuxiao.length; i++) {
					$scope.cuxiao1 = $scope.cuxiao[0];
					$scope.cuxiao2 = $scope.cuxiao[1];
					$scope.cuxiao3 = $scope.cuxiao[2];
				}
			})
			getData.getHotMarket().then(function(res) {
				$scope.hotMarket = res.data.data[51836].list;
			})
			//猜你喜欢
			getData.getCaiNiXiHuan().then(function(res) {
//				console.log(res);
				$scope.caiNiXihuanTitle = res.data.result.wall.title;
				$scope.caiNiXihuan = res.data.result.wall.docs;
			})
			
			$(function() {
				$(".home-wrap").on('scroll', function() {
//					console.log($('.home-wrap').scrollTop());
					if($(this).scrollTop() >= $('#search').height()+$('.swiper-container').height() + $('.home-dapai').height()+
					$('.home-seckill').height()+$('.home-sales').height()+$('.hot-market').height()+$('.guessYouLove-row').height() -$('.home-wrap').height() ) {
						getNextPage();
					}
				})

			});

			function getNextPage() {
				page++;
				getData.getCaiNiXiHuan(page).then(function(res) {
					if(res) {
						var arr = res.data.result.wall.docs;
						if(!$scope.caiNiXihuan){
							$scope.caiNiXihuan = [];
						}
						$scope.caiNiXihuan = $scope.caiNiXihuan.concat(arr);
					}else{
						page--;
					}
				})
			}
			//路由跳转
			$scope.chooseModel = function  (title) {
//				console.log(title)
				if(title == '大牌满减'){
					$state.go('daPaiManJian');
				}
				else if(title == '新品首发'){
					$state.go('newProduct');
				}
				else if(title == '1元拼团'){
					$state.go('oneGroup');
				}
			}
			
			$scope.jump2column = function  (info) {
				var columnInfoList = [];
				columnInfoList.push(info);
				localStorage.setItem('columnInfoList',JSON.stringify(columnInfoList));
				$state.go('speColumn');
			}
			$scope.jump2Product = function  (info) {
				var productInfoList = [];
				productInfoList.push(info);
				localStorage.setItem('prodcutsList',JSON.stringify(productInfoList));
				$state.go('productDetail');
			}
		}])
});