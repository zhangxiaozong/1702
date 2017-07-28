define(['uiRouter', 'productDetail', 'jquery'], function() {
	angular.module('speColumnModule', ['ui.router', 'productDetailModule'])
		.config(function($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('speColumn', {
					url: '/speColumn',
					templateUrl: 'component/speColumn/speColumn.html',
					css: 'component/speColumn/speColumn.css',
					controller: 'speColumnCtrl'
				})
		})
		.factory('columnData', ['$http', function($http) {
			var baseUrl = 'http://list.mogujie.com/search?_version=61&ad=2&f=baidusem_z8iw0di5yq';
			var _mguuid = '_mgjuuid=98aaf9e0-1d52-435f-baf9-9432b703de2c';
			var ptp = 'ptp=m1._mf1_1239_3682.0.0.ewrKV9';
			var other = 'width=330& height=440&userId=&cKey=16';
			var callBack = 'callback=JSON_CALLBACK';
			var info = {};
			info.getApi = function(link, sort, page, minPrice, maxPrice) {
				var qurrys = link.split('/');
				var infos = qurrys[qurrys.length - 1].split('&');
				var action = 'action=' + infos[0].split('?')[0];
				var fcid = infos[0].split('?')[1];
				var title = infos[1];
				var acm = infos[2];
				var time = '_=' + new Date().getTime();
				var sort = sort ? 'sort=' + sort : 'sort=pop';
				var page = page ? 'page=' + page : 'page =1';
				var api
				if(minPrice && maxPrice) {
					var priceFilter = 'cpc_offset=0&offset=&minPrice=' + minPrice + '&maxPrice=' + maxPrice;
					var apiInfos = [baseUrl, _mguuid, ptp, other, action, fcid, title, acm, sort, page, priceFilter, time, callBack]
					api = apiInfos.join('&');
				} else {
					var apiInfos = [baseUrl, _mguuid, ptp, other, action, fcid, title, acm, sort, page, time, callBack]
					api = apiInfos.join('&');
				}
				return api;
			}
			return info;
		}])
		.controller('speColumnCtrl', ['$scope', '$state', '$http', 'columnData', function($scope, $state, $http, columnData) {
			initData();
			//初始化头部信息
			$scope.headRight = '<i class="iconfont icon-gouwuchekong" style="font-size:0.65rem;color:#cccccc;margin-right:0.6rem;"></i>';
			$scope.goBack = function() {
				if($scope.columnInfoList.length == 1) {
					history.go(-1);
				} else {
					$scope.columnInfoList.shift();
					localStorage.setItem('columnInfoList', JSON.stringify($scope.columnInfoList));
					initData();
				}
			}
			$scope.headRightClick = function() {
				$state.go('shopcar');
			}
			//			初始化页面数据信息
			initData();
			//			显示价格过滤器
			$scope.showPriceFilter = function() {
				if($scope.isPriceFliterShow === undefined) {
					$scope.isPriceFliterShow = true;
				} else {
					$scope.isPriceFliterShow = !$scope.isPriceFliterShow
				}
			}
			//			初始化api信息及数据
			function initData() {
				$('#speColumn #up .back2top').addClass('hide');
				$scope.columnInfoList = JSON.parse(localStorage.getItem('columnInfoList'));
				$scope.minPrice = 0;
				$scope.maxPrice = 0;
				$scope.columnInfo = $scope.columnInfoList [0];
				$scope.headTitle = $scope.columnInfo.title;
				$scope.columnLink = $scope.columnInfo.link;
				$scope.sort = $scope.sort ? $scope.sort : 'pop';
				$scope.page = $scope.page ? $scope.page : 1;
				var api = columnData.getApi($scope.columnLink, $scope.sort, $scope.page, $scope.minPrice, $scope.maxPrice);
				$http.jsonp(api).then(function(res) {
					if(res) {
						var result = res.data.result;
						if($scope.page > 1) {
							$scope.wall = $scope.wall.concat(result.wall.docs);
						} else {
							$scope.wall = result.wall.docs;
							$scope.hotCates = result.hotCates;
							$scope.sortFilter = result.sortFilter;
							$scope.priceFilter = result.priceFilter;
						}
					} else {
						if($scope.page > 1) {
							$scope.page--;
						}
						return;
					}
				});
			}
			$scope.sortMethod = function(sort) {
				$scope.sort = sort;
				$scope.page = 1;
				initData();
			}
			//			添加价格过滤，重新获取数据
			$scope.getPriceArea = function(min, max) {
				if(!(min & max)) {
					$scope.minPrice = $scope.min;
					$scope.maxPrice = $scope.max;
				} else {
					$scope.minPrice = min;
					$scope.maxPrice = max;
				}
				$scope.page = 1;
				$scope.isPriceFliterShow = false;
				initData();
			}

			//			更新页面信息
			$scope.jump2column = function(info) {
				$scope.sort = 'pop';
				$scope.page = 1;
				$scope.minPrice = 0;
				$scope.maxPrice = 0;
				$scope.columnInfoList.unshift(info);
				localStorage.setItem('columnInfoList', JSON.stringify($scope.columnInfoList));
				initData();
			}

			function getNextPageData() {
				$scope.page += 1;
				$scope.increatPage = 0;
				initData();
			}


			$scope.jump2product = function(info) {
				if(info.tradeItemId){
					var productsList = [];
					productsList.push(info);
					localStorage.setItem('prodcutsList', JSON.stringify(productsList));
					$state.go('productDetail');
				}
			}
			//			下拉分页加载数据事件
			$('#speColumn').on('scroll', lazyLoad);
			//			分页加载
			function lazyLoad() {
				if($('#speColumn').scrollTop() >100){
					$('#speColumn #up .back2top').removeClass('hide');
				} else {
					$('#speColumn #up .back2top').addClass('hide');
				}
				if($('#speColumn').scrollTop() > $('#speColumn .head').height() +
					$('#speColumn .products').height() -
					$('#speColumn .head .price-filter').height() -
					$('#speColumn').height() * 1.5) {
					getNextPageData();
					$('#speColumn').off('scroll');
					setTimeout(function() {
						$('#speColumn').on('scroll', lazyLoad)
					}, 500);
				}
			}
			$scope.back2top = function(){
				$('#speColumn').scrollTop(0);
			}
		}]);
});