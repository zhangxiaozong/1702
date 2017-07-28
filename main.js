require.config({
	paths: {
		'app': 'js/app',
		'angular': 'js/libs/angular-1.4.6.min',
		'uiRouter': 'js/libs/angular-ui-router-0.4.2.min',
		'angularCSS': 'js/libs/angular-css1.0.8',
		'swiper': 'js/libs/swiper.min',
		'home': 'component/wrap/home/home',
		'category': 'component/wrap/category/category',
		'mine': 'component/wrap/mine/mine',
		'shopcar': 'component/shopcar/shopcar',
		'wrap':'component/wrap/wrap',
		'login':'component/login/login',
		'searchpage':'component/searchpage/searchpage',
		'iconfont':'js/libs/iconfont',
		'site':'component/wrap/mine/branch/site/site',
		'jquery':'js/libs/jquery-2.2.4.min',
		'register':'component/register/register',
		'addsite':'component/wrap/mine/branch/site/addsite/addsite',
		'chooseCountry':'component/chooseCountry/chooseCountry',
		'findPassWord':'component/findPassWord/findPassWord',
		'loginWithoutPassword':'component/loginWithoutPassword/loginWithoutPassword',
		'obligat':'component/wrap/mine/branch/orderform/obligat/obligat',
		'commonality':'component/wrap/mine/branch/orderform/commonality',
		'whole':'component/wrap/mine/branch/orderform/whole/whole',
		'evaluated':'component/wrap/mine/branch/orderform/evaluated/evaluated',
		'sale':'component/wrap/mine/branch/orderform/sale/sale',
		'receiving':'component/wrap/mine/branch/orderform/receiving/receiving',
		'booking':'component/wrap/mine/branch/booking/booking',
		'total':'component/wrap/mine/branch/booking/total/total',
		'sthObligation':'component/wrap/mine/branch/booking/sthObligation/sthObligation',
		'spelling':'component/wrap/mine/branch/booking/spelling/spelling',
		'spellgroup':'component/wrap/mine/branch/booking/spellgroup/spellgroup',
		'spellfailure':'component/wrap/mine/branch/booking/spellfailure/spellfailure',
		'collect':'component/wrap/mine/branch/collect/collect',
		'treasure':'component/wrap/mine/branch/collect/treasure/treasure',
		'speColumn':'component/speColumn/speColumn',
		'productDetail':'component/productDetail/productDetail',
		'searchpagedel': 'component/searchpage/searchpagedel/searchpagedel',
		'daPaiManJian':'component/daPaiManJian/daPaiManJian',
		'newProduct':'component/newProduct/newProduct',
		'oneGroup':'component/oneGroup/oneGroup',
		'productDetail':'component/productDetail/productDetail',
		'mystore':'component/wrap/mine/branch/collect/mystore/mystore',
		'clear':'component/shopcar/clear/clear',
		'lazyload':'js/libs/me-lazyload'
	},
	shim: {
		'uiRouter': {
			deps: ['angular']
		},
		'angularCSS':{
			deps:['uiRouter']
		},
		'home': {
			deps: ['angularCSS']
		},
		'category': {
			deps: ['home']
		},
		'mine': {
			deps: ['category']
		},
		'shopcar': {
			deps: ['uiRouter']
		},
		'wrap':{
			deps:['uiRouter']
		},
		'login':{
			deps:['uiRouter']
		},
		'searchpage':{
			deps:['uiRouter']
		},
		'searchpagedel':{
			deps:['uiRouter']
		},
		'app': {
			deps: ['uiRouter']
		},
		'site':{
			deps:['uiRouter']
		},
		'addsite':{
			deps:['uiRouter']
		},
		'obligat':{
			deps:['uiRouter']
		},
		'commonality':{
			deps:['uiRouter']
		},
		'whole':{
			deps:['uiRouter']
		},
		'evaluated':{
			deps:['uiRouter']
		},
		'sale':{
			deps:['uiRouter']
		},
		'receiving':{
			deps:['uiRouter']
		},
		'booking':{
			deps:['uiRouter']
		},
		'collect':{
			deps:['uiRouter']
		},
		'treasure':{
			deps:['uiRouter']
		},
		'mystore':{
			deps:['uiRouter']
		},
		'clear':{
			deps:['uiRouter']
		}
	}

});

require(['app'],function(){
		angular.bootstrap(document, ['myModule']);
})