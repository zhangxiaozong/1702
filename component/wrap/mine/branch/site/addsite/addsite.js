define(['uiRouter'],function(){
	var addsiteApp = angular.module('addsiteModule',['ui.router'])
		.config(function($stateProvider,$urlRouterProvider){
			$stateProvider.state('addsite',{
				url:'/addsite',
				templateUrl:'component/wrap/mine/branch/site/addsite/addsite.html',
				css:'component/wrap/mine/branch/site/addsite/addsite.css',
				controller:'addsiteCtlr'
			});
		})
		.controller('addsiteCtlr',['$state','$scope','$http',function($state,$scope,$http){
			$scope.citieName = '请选择';
			$scope.townName = '请选择';
			$scope.areaName ='请选择';
			$scope.headTitle = '添加收货地址';
			$scope.headRight = '保存';
			$scope.goBack = function(){
				window.history.go(-1);
			};
			$scope.headRightClick=function(){
				window.history.go(-1);
			}
			//城市数据
			$http.get('json/chinaCities.json').then(function(res){
				//省数据
				$scope.cities=res.data.china
				
			})
			$scope.citie=function(polis){
				angular.forEach($scope.cities,function(data){
					if(polis==data.name){  
						if(data.sub[0].sub){//三层数据  true
							$scope.urban=data.sub;//市数据
						$scope.townName=data.sub[1].name;//市默认选中
						angular.forEach($scope.urban,function(data1){
								if(data.sub[1].name==data1.name){
									$scope.region=data1.sub;
									$scope.areaName=data1.sub[1].name;//区默认选中
								}
							})
						}else{ //二层数据  false
							var arr =[];
							arr.push({name:polis})
							$scope.urban= arr;  //市数据
							$scope.townName=arr[0].name;
							angular.forEach($scope.cities,function(data){
								if(arr[0].name==data.name){
									$scope.region=data.sub;
									$scope.areaName=data.sub[1].name;
								}
							})
							
						}
					}
				})
			}
		}])
});