define(['uiRouter'], function() {
	var treasureApp = angular.module('treasureModule', ['ui.router'])
		.config(function($stateProvider, $urlRouterProvider) {
			$stateProvider.state('collect.treasure', {
				url: '/treasure',
				templateUrl: 'component/wrap/mine/branch/collect/treasure/treasure.html',
				css: ['component/wrap/mine/branch/collect/treasure/treasure.css','component/wrap/mine/branch/collect/collect.css'],
				controller: 'treasureCtr'
			});
		})
		.controller('treasureCtr', ['$scope', '$state', '$http', function($scope, $state, $http) {
			//localStorage.clear();清除数据
			var collectionProducts=JSON.parse(localStorage.getItem('collectionProducts'));
			if(collectionProducts){
				$scope.show=false;
				$scope.hide=true;
				angular.forEach(collectionProducts,function(data){
					if(data.tradeItemId){
						$scope.collection=collectionProducts;
					}
				})
			}else{
				$scope.show=true;
				$scope.hide=false;
				$scope.noData='你还没有收藏任何商品';
				$scope.noUrl='https://s10.mogucdn.com/p2/161118/upload_8djbjd0daffce09e0h7e5g564bcbi_479x238.jpg';
			}
			$scope.treasur=function(enshrine){
				var treasu=[];
				treasu.push(enshrine);
				localStorage.setItem('prodcutsList', JSON.stringify(treasu));
				$state.go('productDetail')
			}			
		}])
});