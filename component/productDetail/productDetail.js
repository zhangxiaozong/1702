define(['uiRouter', 'jquery','lazyload'], function() {
	angular.module('productDetailModule', ['ui.router','me-lazyload'])
		.config(function($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('productDetail', {
					url: '/productDetail',
					templateUrl: 'component/productDetail/productDetail.html',
					css: 'component/productDetail/productDetail.css',
					controller: 'pdCtrl'
				})
		})
		.factory('api', function() {
			return {
				getProductApi: function(tradeItemId) {
					return 'http://m.mogujie.com/jsonp/detail.api/v1?iid=' + tradeItemId + '&template=1-2-detail_normal-1.0.0&callback=JSON_CALLBACK&_=' + new Date().getTime();
				},
				getSimilarityApi: function(link) {
					var baseUrl = 'http://list.mogujie.com/search?_version=61&cKey=h5-similarity';
					var staticData = "&channel=H5&_mgjuuid=98aaf9e0-1d52-435f-baf9-9432b703de2c&sort=pop&page=1&userId=&cpc_offset=0&offset=&_=" + new Date().getTime();
					var callback = '&callback=JSON_CALLBACK';
					var other = "&" + link.split('?')[1];
					return baseUrl + staticData + other + callback;
				},
				getShopActivityApi: function(userInfo) {
					var baseUrl = 'http://promotion.mogujie.com/jsonp/getValidShopProList/1?';
					var data = 'sellerId=' + userInfo.sellerId + '&shopId=' + userInfo.shopId;
					var other = '&marketType=market_mogujie&callback=JSON_CALLBACK&_' + new Date().getTime();
					var api = baseUrl + data + other;
					return api;
				}
			}
		})
		.controller('pdCtrl', ['$scope', '$http', 'api', '$state','$timeout', function($scope, $http, api, $state,$timeout) {
			initData();
			//			头部信息初始化

			$scope.goBack = function() {
				if($scope.productsList.length != 1) {
					$scope.productsList.shift();
					localStorage.setItem('prodcutsList', JSON.stringify($scope.productsList));
					initData();
				} else {
					history.go(-1);
				}
			}

			function initData() {
				$scope.ishide = true;
				$scope.navIsShow = false;
				$scope.isCoverShow = false;
				$scope.navSlowShow = false;
				$scope.isExplainClose = false;
				$scope.isCzClose=false;
				$scope.descNavIndex = 0;
				$scope.number = 1;
				$scope.productsList = JSON.parse(localStorage.getItem('prodcutsList'))
				$scope.productInfo = $scope.productsList[0];
				$scope.similarityProducts = [];
				//				产品数据
				$http.jsonp(api.getProductApi($scope.productInfo.tradeItemId))
					.then(function(res) {
						
						var productInfoList = res.data.data;
						//						一级数据
						$scope.collcationSet = productInfoList.collcationSet;
						$scope.topImages = productInfoList.topImages;
						$scope.detailInfo = productInfoList.detailInfo;
						$scope.itemInfo = productInfoList.itemInfo;
						$scope.itemParams = productInfoList.itemParams;
						$scope.itemServices = productInfoList.itemServices;
						$scope.normalPrice = productInfoList.normalPrice;
						$scope.normalShareInfo = productInfoList.normalShareInfo;
						$scope.rateInfo = productInfoList.rateInfo;
						$scope.shopInfo = productInfoList.shopInfo;
						$scope.skuInfo = productInfoList.skuInfo;
						$scope.userInfo = productInfoList.userInfo;
						//						二级数据
						$scope.topImagesIndex = 1;
						$scope.headTitle = $scope.itemInfo.title;
						$scope.shopLevel = (function() {
							var arr = [];
							for(var i = 0; i < $scope.shopInfo.level; i++) {
								arr.push(i);
							}
							return arr;
						})();
						$scope.initSku = {
							img:$scope.topImages["0"],
							currency:'￥',
							nowprice:$scope.skuInfo.defaultPrice.substr(1),
							stock:$scope.skuInfo.totalStock,
						}
						$scope.sku = $scope.initSku;
						$scope.skuColor = $scope.skuInfo.styleKey;
						$scope.skuSize = $scope.skuInfo.sizeKey;
						//				店铺活动信息
						$http.jsonp(api.getShopActivityApi($scope.userInfo))
							.then(function(res) {
								$scope.shopAcitivityInfos = res.data.data.list;
							})

					})

				//					类似产品
				if($scope.productInfo.similarityUrl) {
					$http.jsonp(api.getSimilarityApi($scope.productInfo.similarityUrl))
						.then(function(res) {
							$scope.similarityProducts = res.data.result.wall.docs;
							var num = parseInt($scope.similarityProducts.length / 3);
							$scope.similarityProducts.length = num * 3;
						})
				} else {
					$scope.similarityProducts.length = 0;
				}

			}
//			更换产品
			$scope.jump2product = function(product) {
				$scope.productsList.unshift(product);
				localStorage.setItem('prodcutsList', JSON.stringify($scope.productsList));
				initData();
				$scope.back2top();
			}
//			回到顶端
			$scope.back2top = function() {
				$('#products-detail').scrollTop(0);
			}
//			添加到购物车
			$scope.add2shopcar = function(productInfo){
					isLogined();
					productInfo.size = $scope.skuSize;
					productInfo.color = $scope.skuColor;
				if($scope.skuColor == $scope.skuInfo.styleKey || $scope.skuSize === $scope.skuInfo.sizeKey){
					alert('请选择颜色和尺码');
					return false;
				} else{
					var shopcarProducts = JSON.parse(localStorage.getItem('shopcarProducts'));
				if(!shopcarProducts){
					shopcarProducts = [];
				}
				var hasProduct = isHasProduct(shopcarProducts,productInfo,true);
				if(hasProduct){
					hasProduct.num += $scope.number;
					$scope.number = 1;
				} else {
					productInfo.num = $scope.number;
					$scope.number = 1;
					shopcarProducts.unshift(productInfo);
				}
				
				localStorage.setItem('shopcarProducts',JSON.stringify(shopcarProducts));
				return true;
				}
			}
//			收藏产品
			$scope.collectProduct = function(productInfo){
					isLogined();
					productInfo.size = $scope.skuSize;
					productInfo.color = $scope.skuColor;
				var collectionProducts = JSON.parse(localStorage.getItem('collectionProducts'));
				if(!collectionProducts){
					collectionProducts = [];
				}
				var hasProduct = isHasProduct(collectionProducts,productInfo,false);
				if(!hasProduct){
					collectionProducts.unshift(productInfo);
				}
				localStorage.setItem('collectionProducts',JSON.stringify(collectionProducts));
			}
//			立即购买
			$scope.order = function(productInfo){
				if($scope.add2shopcar(productInfo)){
					$state.go('shopcar');
				}
			}
//			滚动事件
			$('#products-detail').on('scroll',function(){
				if($('#products-detail #product-desc-graphic').offset().top-$('#products-detail .product-desc-nav').height()<=0) {
					$('#products-detail .product-desc-nav').addClass('fixed');
				} else {
					$('#products-detail .product-desc-nav').removeClass('fixed');
				}
				if($('#products-detail').scrollTop()>$('#products-detail').height()){
					$scope.ishide = false;
					$scope.$apply();
				} else {
					$scope.ishide = true;
					$scope.$apply();
				}
			});
//			快捷导航
			$scope.quickNav =function(){
				$scope.navIsShow = !$scope.navIsShow;
				$scope.isCoverShow = !$scope.isCoverShow;
				if($scope.navSlowShow){
					$scope.navSlowShow = false;
				} else {
					$timeout(function(){
						$scope.navSlowShow = true;
					},10);
				}
			}
//			判断是否为同一个产品	
			function isHasProduct(arr,obj,isBuy){
				for(var i = 0; i< arr.length; i++){
					if(isBuy){
						if(arr[i].tradeItemId === obj.tradeItemId && arr[i].color === obj.color 
						&& arr[i].size == obj.size){
							return arr[i];
						} 
					} else {
						if(arr[i].tradeItemId === obj.tradeItemId){
							return arr[i];
						}
					}
					
				}
				return false;
			}
			function isLogined(){
				var isLogined = localStorage.getItem('isLogin');
					if(!(isLogined=='true')){
						alert('请先登录！')
						$state.go('login');
						return;
					}
			}
			$scope.descNavPosition = function(index){
				$scope.descNavIndex = index;
				var position = '';
				switch(index){
					case 0:
					position = '#products-detail #product-desc-graphic';
					break;
					case 1:
					position = '#products-detail #product-parameter';
					break;
					case 2:
					position = '#products-detail  #product-hot-sale';
					break;
				}
				var scrollTop = $(position).offset().top -$('#products-detail .head').offset().top;
				$('#products-detail').scrollTop(scrollTop);
			}
			
			$scope.closeExplainDesc =function(){
				$scope.isCoverShow = !$scope.isCoverShow;
				$scope.isExplainClose = !$scope.isExplainClose;
				if($scope.isExplainClose){

					var height = $('#products-detail .products-footer .service-explain-desc').height();
					$('#products-detail .products-footer .service-explain-desc').css({
						'bottom':-height+"px",
						'display':'block'
					});
					$('#products-detail .products-footer .service-explain-desc').animate({
						'bottom':'0'
					},500);
				} else{
					$('#products-detail .products-footer .service-explain-desc').css({
						'bottom':-height+"px",
						'display':'none'
					});
				}
				
			}
			 $scope.makeSureSku = function(type,value){
				if(type === '颜色'){
					if(value === $scope.skuColor){
						$scope.skuColor = $scope.skuInfo.styleKey;
					} else {
						$scope.skuColor = value;
					}
				} else if(type = '尺码'){
					if(value === $scope.skuSize){
						$scope.skuSize = $scope.skuInfo.sizeKey;
					} else {
						$scope.skuSize = value;
					}
				}
				var skus = $scope.skuInfo.skus;
				var sku;
				if(skus){
					for(var i = 0; i < skus.length ; i ++){
						if(skus[i].size === $scope.skuSize && skus[i].style ===$scope.skuColor){
							sku = skus[i];
							if(typeof sku.nowprice == 'number'){
								var priceArr = (sku.nowprice+'').split('');
								priceArr.splice(priceArr.length-2,0,'.');
								sku.nowprice = priceArr.join('');
							}
						}
					}
				}
				if(sku){
					$scope.sku = sku;
				} else {
					$scope.sku = $scope.initSku;
				}
			}
			 
			 $scope.addNum = function(num){
			 	$scope.number += num;
			 	if($scope.number <= 0 ){
			 		$scope.number = 1;
			 	}
			 }
			 
			 $scope.czToggle = function(){
			 	$scope.isCoverShow = !$scope.isCoverShow;
				$scope.isCzClose = !$scope.isCzClose;
				if($scope.isCzClose){
					var height = $('#products-detail .products-footer .color-size-detail').height();
					$('#products-detail .products-footer .color-size-detail').css({
						'bottom':-height+"px",
						'display':'block'
					});
					$('#products-detail .products-footer .color-size-detail').animate({
						'bottom':'0'
					},500);
				} else{
					$('#products-detail .products-footer .color-size-detail').css({
						'bottom':-height+"px",
						'display':'none'
					});
				}
			 }
			 
			 $scope.back2home = function(){
			 	$state.go('wrap');
			 	localStorage.setItem('tabIndex',0);
			 }
			
		}])

});