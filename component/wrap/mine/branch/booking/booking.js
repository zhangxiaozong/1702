define(['uiRouter','total','sthObligation','spelling','spellgroup','spellfailure'],function(){
	var bookingApp = angular.module('bookingModule',['ui.router','totalModule','sthObligationModule','spellingModule','spellgroupModule','spellfailureModule'])
		.config(function($stateProvider,$urlRouterProvider){
			$stateProvider.state('booking',{
				url:'/booking',
				templateUrl:'component/wrap/mine/branch/booking/booking.html',
				css:'component/wrap/mine/branch/booking/booking.css',
				controller:'bookingCtr'
			});
		})
		.controller('bookingCtr',['$state','$scope','$http',function($state,$scope,$http){
			$scope.headTitle = '我的拼团';
			$scope.headRight="<a href='http://127.0.0.1:8020/jinpinji(1)/index.html?__hbt=1499052339195#/shopcar'><i class='iconfont icon-gouwuchekong'></i></a>";
			$scope.boking=0;
			$scope.noData='您还没有参与过任何拼团，快去参团吧～';
			$scope.noUrl='https://s10.mogucdn.com/p2/170222/upload_1ga8374ha4c1e315k293bce18d3b9_514x258.png';
			$scope.book=function(index){
				$scope.boking=index;
			};
			$scope.goBack=function(){
				$state.go('wrap.mine');
			};
			$state.go('booking.total')
		}])
})
