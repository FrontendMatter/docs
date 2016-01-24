import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

var router = new VueRouter({
	linkActiveClass: 'active'
})

router.map({
	'/': {
		name: 'packages',
		component: function (resolve) {
			require(['../views/packages/index'], resolve)
		}
	},
	'/package/:id': {
		name: 'package',
		component: function (resolve) {
			require(['../views/package/package'], resolve)
		}
	},
	'/package/:id/components/:componentId': {
		name: 'component',
		component: function (resolve) {
			require(['../views/package/component'], resolve)
		}
	},
	'/package/:id/pages/:slug/:pageId': {
		name: 'page',
		component: function (resolve) {
			require(['../views/package/page'], resolve)
		}
	}
})

router.beforeEach(function () {
	window.scrollTo(0, 0)
})

router.redirect({
	'*': '/'
})

export default router