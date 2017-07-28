define(['uiRouter'], function () {
    var searchpagedelApp = angular.module('searchpagedelModule', ['ui.router'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider.state('searchpage.searchpagedel', {
                url: '/searchpagedel',
                templateUrl: 'component/searchpage/searchpagedel/searchpagedel.html',
                css: 'component/searchpage/searchpagedel/searchpagedel.css',
                controller: 'searchpagedelCtlr',
            });
        })
        //搜索接口定义
        .service('searchData', function ($http) {
            var currentTime = new Date().getTime();
            this.getsearchData = function () {
                return $http.jsonp('http://list.mogujie.com/search?_version=61&q='+localStorage.getItem('title')+'&cKey=46&minPrice=&_mgjuuid=79079674-4cdb-40fb-afb8-3d1a18378001&ppath=&page=1&maxPrice=&sort=pop&userId=114nr9a&cpc_offset=&priceList=&_='+currentTime+'&callback=JSON_CALLBACK')
            }
        })
        .controller('searchpagedelCtlr', ['$scope', '$http', 'searchData','$state', function ($scope, $http,searchData,$state) {
        	//获取对应数据函数
            function initData(){
            	searchData.getsearchData().then(function (res) {
            		console.log(localStorage.getItem('title'))
                	$scope.arrsort=res.data.result.sortFilter;
                	$scope.arrproduct=res.data.result.wall.docs;
                	$scope.arrpriceFilter=res.data.result.priceFilter;
                	console.log(res);
            	})
            }
            initData();
            //价格筛选
            $scope.isPriceFliterShow = false;
            $scope.showPriceFilter = function() {
				if($scope.isPriceFliterShow === undefined) {
					$scope.isPriceFliterShow = true;
				} else {
					$scope.isPriceFliterShow = !$scope.isPriceFliterShow
				}
			}
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
            $scope.jump2product=function(item){
            	var productsList = [];
				productsList.push(item);
				localStorage.setItem('prodcutsList', JSON.stringify(productsList));
				$state.go('productDetail');
			}        
        }])
})