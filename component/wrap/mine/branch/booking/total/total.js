define(['uiRouter'],function(){
	var totalApp = angular.module('totalModule',['ui.router'])
	 	.config(function($stateProvider,$urlRouterProvider){
	 		$stateProvider.state('booking.total',{
	 			url:'/total',
	 			templateUrl:'component/wrap/mine/branch/booking/total/total.html',
	 			css:'component/wrap/mine/branch/booking/total/total.css',
	 			controller:'totalCtr'
	 		});
	 	})
	 
	 	.controller('totalCtr',['$state','$scope','$http',function($state,$scope,$http){
			$scope.noData='您还没有参与过任何拼团，快去参团吧～'; 
			$scope.noUrl='https://s10.mogucdn.com/p2/170222/upload_1ga8374ha4c1e315k293bce18d3b9_514x258.png';
			$http.get('json/booking.json').then(function(res){				
				$scope.data=res.data.data.list;				
			})
				
	 	}])
})