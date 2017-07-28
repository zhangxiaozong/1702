define(['uiRouter','clear'],function(){
	angular.module('shopcarModule',['ui.router','clearModule'])
		.config(function($stateProvider,$urlRouterProvider){
			$stateProvider
				.state('shopcar',{
					url:'/shopcar',
					templateUrl:'component/shopcar/shopcar.html',
					css:'component/shopcar/shopcar.css',
					controller:'shopcarCtrl'
				});
		})
		.controller('shopcarCtrl',['$scope','$state',function($scope,$state){
			var isLogin = localStorage.getItem('isLogin');
			if(!(isLogin == 'true')){
				$state.go('login');
			}
			$scope.arrgoodslist = JSON.parse(localStorage.getItem('shopcarProducts'));
			//购物车是否有商品
			if(!$scope.arrgoodslist ||$scope.arrgoodslist.length==0 ){
				$scope.none=true;
				$scope.arrgoodslist = [];
			}else{
				$scope.none=false;
			}
			//商品初始化
			var money = 0;
			$scope.choose=[];
			$scope.all=true;
			$scope.allnum=0;
			$scope.allprice=0.00;
			for(var i=0;i<$scope.arrgoodslist.length;i++){
				$scope.choose[i]=true;
			}
			//单个商品选择
			$scope.change=function($index){
				var num=0;
				if($scope.choose[$index]==true){
					$scope.allnum++;
					money += Number($scope.arrgoodslist[$index].price)
						*Number($scope.arrgoodslist[$index].num);
				}else{
					$scope.allnum--;
					money -= Number($scope.arrgoodslist[$index].price)
						*Number($scope.arrgoodslist[$index].num);
				}
				$scope.choose[$index]=!$scope.choose[$index];
				$scope.allprice=money.toFixed(2);
				for(var i=0;i<$scope.arrgoodslist.length;i++){
					if($scope.choose[i]==false){
						num++;
						if(num==$scope.arrgoodslist.length){
							$scope.all=false;
						}
					}else{
						$scope.all=true;
						money += 0;
					}
				}
			}
			//全选
			$scope.chooseAll=function(){
				$scope.all=!$scope.all;
				for(var i=0;i<$scope.arrgoodslist.length;i++){
					if(!$scope.all){
						money += Number($scope.arrgoodslist[i].price)
						*Number($scope.arrgoodslist[i].num);
						$scope.choose[i]=false;
						$scope.allnum=$scope.arrgoodslist.length;
					} else {
						$scope.choose[i]=true;
						$scope.allnum=0;
						money=0;
					}
				}
				$scope.allprice=money.toFixed(2);
			}		
			//编辑
			$scope.name='编辑';
			$scope.show=true;
			$scope.edit=function(){
				if($scope.show==true){
					$scope.name='完成';
				}else{
					$scope.name='编辑';
				}
				$scope.show=!$scope.show;
			}
			$scope.goback=function(){
				window.history.go(-1);
			}
			//增减数量
			$scope.goodsub=function(j){
				if($scope.arrgoodslist[j].num>1){
					$scope.arrgoodslist[j].num--;
				}else{
					$scope.arrgoodslist[j].num=1;
				}
				var arr=[];
				localStorage.m=arr;
				arr.push(1);
				localStorage.m=arr;
				localStorage.setItem('shopcarProducts',JSON.stringify($scope.arrgoodslist));
			}
			$scope.goodadd=function(j){
				$scope.arrgoodslist[j].num++;
				localStorage.setItem('shopcarProducts',JSON.stringify($scope.arrgoodslist));
			}
			//删除商品
			$scope.remove=function(){
				for(var i=0;i<$scope.arrgoodslist.length;i++){
					if($scope.choose[i]==false){
						$scope.arrgoodslist.splice(i,1);
						$scope.choose[i]=true;
					}
				}
				localStorage.setItem('shopcarProducts',JSON.stringify($scope.arrgoodslist));
			}
			//商品详情跳转
			$scope.toproducts=function(item){
				var productsList = [];
				productsList.push(item);
				localStorage.setItem('prodcutsList', JSON.stringify(productsList));
				$state.go('productDetail');
			}
			//结算
			$scope.clear=function(){
//				$state.go('clear');
			}
			//收藏商品
			$scope.collect=function(){
				
				var collectionProducts=JSON.parse(localStorage.getItem('collectionProducts'));
				console.log(collectionProducts);
				for(var j=0;j<$scope.arrgoodslist.length;j++){
					if($scope.choose[j]==false){
						if(!collectionProducts){
							collectionProducts=[];
						}
						var hasProduct =
						isHasProduct(collectionProducts,$scope.arrgoodslist[j]);
						if(!hasProduct || hasProduct == 0){
							collectionProducts.unshift($scope.arrgoodslist[j]);
						}
						localStorage.setItem('collectionProducts'
						,JSON.stringify(collectionProducts));
					}
				}
				
			}
			//判断是是否商品相同的方法
			function isHasProduct(arr,obj){
				for(var i = 0; i< arr.length; i++){
					if(arr[i].tradeItemId === obj.tradeItemId){
						return arr[i];
					} 
				}
					return false;
			}
			
			
			
			
		}])
		
});
