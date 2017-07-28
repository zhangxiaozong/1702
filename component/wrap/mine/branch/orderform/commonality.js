define(['uiRouter','obligat'],function(){
	var commonalityApp = angular.module('commonalityModule',['ui.router','obligatModule'])
		.config(function($stateProvider,$urlRouterProvider){
			$stateProvider.state('commonality',{
				url:'/commonality',
				templateUrl:'component/wrap/mine/branch/orderform/commonality.html',
				css:'component/wrap/mine/branch/orderform/commonality.css',
				controller:'commonalityCtlr'
			});
		})
		.controller('commonalityCtlr',['$scope','$state','$http',function($scope,$state,$http){
			var index = localStorage.getItem('commonalityIndex');
			var route = 'commonality.whole';
			switch(index){
				case '0':
					break;
				case '1':
					route = 'commonality.obligat'
					break;
				case '2':
					route = 'commonality.receiving'
					break;	
				case '3':
					route = 'commonality.evaluated'
					break;
				case '4':
					route = 'commonality.sale'
					break;
			}
			$state.go(route);
			$scope.updateSetting=index;
			$scope.headTitle = '订单列表';
			$scope.headRight = '添加';
			$scope.payment='待付款';
			$scope.delivery='待收货';
			$scope.appraise='待评价';
			$scope.after='待售后';
			$scope.goBack=function(){
				$state.go('wrap.mine');
			}
			$scope.headRight="<p><i class='iconfont icon-gouwuchekong'></i></p>";
			$scope.skip=function(index){
				$scope.updateSetting=index;
			}
			$scope.headRightClick=function(){
				$state.go('shopcar');
			}
			
		}])
})