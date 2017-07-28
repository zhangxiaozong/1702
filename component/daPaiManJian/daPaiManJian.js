define(['uiRouter','swiper','jquery'],function  () {
	angular.module('daPaiManJianModule',[])
	.config(function  ($stateProvider,$urlRouterProvider) {
		$stateProvider
			.state('daPaiManJian',{
				url:'/daPaiManJian',
				templateUrl:'component/daPaiManJian/daPaiManJian.html',
				css:'component/daPaiManJian/daPaiManJian.css',
				controller:'daPaiManJianCtrl'
			})
	})
	.service('getAllData',function  ($http) {
		this.getBannerData = function  () {
			return $http.jsonp('http://mce.mogucdn.com/jsonp/multiget/3?pids=15711%2C41510&callback=JSON_CALLBACK')
		},
		this.getHotHandschop = function  () {
			return $http.jsonp('http://tuan.mogujie.com/tuanBrand/indexNew?channel=&callback=JSON_CALLBACK')
		},
		this.getDataList= function  () {
			return $http.jsonp('http://tuan.mogujie.com/tuanItem?bizKey=eventwall&day=0&page=1&pageSize=30&tCatIds=562&callback=JSON_CALLBACK')
		},
		this.getejinRijingXuan = function  (page) {
			return $http.jsonp('http://list.mogujie.com/search?cKey=app-tuan-v2&algoKey=app_tuan_book_pop&fcid=10062525&pid=&searchTag=&sort=pop&page='+page+'&ratio=3%3A4&_version=61&cpc_offset=0&_=1499074538882&callback=JSON_CALLBACK')
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
		.service('swiper2', ['$timeout', function($timeout) {
			this.swiper2 = function() {
				$timeout(function() {
					var mySwiper = new Swiper('.brandGoods_box_list', {
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
	
	.controller('daPaiManJianCtrl',['$scope','$state','$http','swiper','getAllData','swiper2',function  ($scope,$state,$http,swiper,getAllData,swiper2) {
			var page = 1;
			getAllData.getBannerData().then(function  (res) {
//			console.log(res);	
			$scope.swiperList = res.data.data[15711].list;
			swiper.swiper();
			$scope.banner = res.data.data[41510].list;
		});
		$scope.brandLogoArr = [];	
		getAllData.getHotHandschop().then(function  (res) {
//			console.log(res);	
			$scope.brandLogo =  res.data.result.handschop.brand;
			$scope.brandLogoArr.push($scope.brandLogo.slice(0,8));
			$scope.first = res.data.result.handschop.brand[0];
			$scope.brandLogo1 = res.data.result.handschop.list;
			$scope.first1 = res.data.result.handschop.list[0];
			$scope.brandLogo2 = res.data.result.handschop.star;
			$scope.first2 = res.data.result.handschop.star[0];
//			console.log($scope.first2);
		});
			$scope.arr1 = [];
			$scope.arr2 = [];
			$scope.arr3 = [];
			$scope.arr4 = [];
			$scope.arr5 = [];
		getAllData.getDataList().then(function  (res) {
//			console.log(res);
			$scope.brandGoods = res.data.result.eventwall.list;
			$scope.arr1.push($scope.brandGoods.slice(0,6));
			$scope.arr2.push($scope.brandGoods.slice(6,12));
			$scope.arr3.push($scope.brandGoods.slice(12,18));
			$scope.arr4.push($scope.brandGoods.slice(18,24));
			$scope.arr5.push($scope.brandGoods.slice(24));
			swiper2.swiper2();
		})
		getAllData.getejinRijingXuan().then(function  (res) {
			$scope.todayChoose = res.data.result.wall.docs;
			
		})

		function getNextPage() {
				page++;
				getAllData.getejinRijingXuan(page).then(function(res) {
					if(res) {
						var arr = res.data.result.wall.docs;
						$scope.todayChoose = $scope.todayChoose.concat(arr);
					}else{
						page--;
					}
				})
			}
		

		$scope.jump2tuanList = function  (info) {
			console.log(info)
			var tuanInfoList = [];
			tuanInfoList.push(info);
			localStorage.setItem('prodcutsList',JSON.stringify(tuanInfoList));
			$state.go('productDetail');
		}

	}])
})