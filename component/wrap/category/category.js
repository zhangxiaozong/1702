define(['uiRouter','jquery','speColumn','lazyload'], function() {
	var categoryApp = angular.module('categoryModule', ['ui.router','speColumnModule','me-lazyload'])
		.config(function($stateProvider, $urlRouterProvider) {
			$stateProvider.state('wrap.category', {
				url: '/category',
				templateUrl: 'component/wrap/category/category.html',
				css: 'component/wrap/category/category.css',
				controller: 'categoryCtrl'
			});
		})
		.service('productsData', function($http) {
				//左侧菜单
			this.getMultiget = function() {
					return $http.jsonp('http://mce.mogucdn.com/jsonp/multiget/3?pids=41789%2C4604&callback=JSON_CALLBACK')
				},
				//右上分类
				this.getMakeup = function(maitKey) {
					var currentTime = new Date().getTime();
					return $http.jsonp('http://mce.mogujie.com/jsonp/makeup/3?pid=' + maitKey + '&_=' + currentTime + '&callback=JSON_CALLBACK')
				},
				//右下产品列表
				this.getProductsList = function(json) {
					var currentTime = new Date().getTime();
					return $http.jsonp('https://list.mogujie.com/search?cKey=h5-cube&fcid=' + json.miniWallkey + '&page=' + json.page + '&_version=1&pid=&q=&cpc_offset=0&sort=' + json.sort + '&_=' + currentTime + '&callback=JSON_CALLBACK')
				},
				//搜索框默认推荐
				this.getMget = function() {
					var currentTime = new Date().getTime();
					return $http.jsonp('http://list.mogujie.com/module/mget?code=sketch%2ChotWord&callback=JSON_CALLBACK&_=' + currentTime)
				}
		})
		.controller('categoryCtrl', ['$scope', '$http', 'productsData', '$state',function($scope, $http, productsData,$state) {
			var page = 1;
			//获取左侧产品分类菜单
			productsData.getMultiget().then(function(res) {
				$scope.categoryList = res.data.data[41789].list;
				$scope.categoryLeftIndex = 0;
				$scope.sortMethodIndex = 0;
				$scope.categoryLeftChoose(0);
			})
			//点击左侧分类给出右上数据
			$scope.categoryLeftChoose = function(index) {
				$scope.sortProductsArray = [];
				$scope.categoryLeftIndex = index || index ==0 ? index : $scope.categoryLeftIndex;
				var categoryItem = $scope.categoryList[$scope.categoryLeftIndex];
				productsData.getMakeup(categoryItem.maitKey).then(function(res) {
				$scope.categoryRight = res.data.data.categoryNavigation.list;
				});
				$scope.sortMethodIndex = 0;
				$scope.getSortMethod();
			}
			//点击排序方式给出右下数据
			$scope.getSortMethod = function(index, page) {
				if($scope.sortMethodIndex !== index){
					$scope.sortProductsArray = [];
				}
				$scope.sortMethodIndex = index || index == 0? index : $scope.sortMethodIndex;
				var page = page ? page : 1;
				var categoryItem = $scope.categoryList[$scope.categoryLeftIndex];
				var sort = $scope.sortMethodIndex == 2 ? 'new' : ($scope.sortMethodIndex == 1 ? 'sell' : 'pop');
				var categoryItem = $scope.categoryList[$scope.categoryLeftIndex];
				var json = {
					miniWallkey: categoryItem.miniWallkey,
					page: page,
					sort: sort
				}
				//右下产品数据
				productsData.getProductsList(json).then(function(res) {
					if(res){
						var arr = $scope.sortProductsArray ? $scope.sortProductsArray : [];
						$scope.sortProductsArray = arr.concat(res.data.result.wall.docs);
					} else {
						page --;
					}
				})
			}
			//搜索框默认产品
			productsData.getMget().then(function(res) {
				$scope.sketch = res.data.data.sketch.data.frontword;
			})			
			$(function(){
				$('.main-right').on('scroll',function(){
					if($('.main-right').scrollTop() >= $('.main-right-hot').height()){
						$('#nav-wall').addClass('fixed').removeClass('follow');
						if($('.main-right').scrollTop() >=$('.main-right-hot').height() + $('.products').height()-$('.main-right').height() ){
							getNextPageData();
						}
					} else {
						$('#nav-wall').removeClass('fixed').addClass('follow');
					}
				});
			});
		function getNextPageData(){
			page ++;
			$scope.getSortMethod($scope.sortMethodIndex,page)
		}
		$scope.jump2column = function(columnInfo){
			var columnInfoList = [];
			columnInfoList.push(columnInfo)
			localStorage.setItem('columnInfoList',JSON.stringify(columnInfoList));
			$state.go('speColumn');
		}
		$scope.jump2product = function(info){
			if(info.tradeItemId){
					var productsList = [];
					productsList.push(info);
					localStorage.setItem('prodcutsList', JSON.stringify(productsList));
					$state.go('productDetail');
				}
		}
		
		
		}]);
		
});