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
			require(['../views/public/packages'], resolve)
		}
	},
	'/package/:id': {
		name: 'package',
		component: function (resolve) {
			require(['../views/public/package'], resolve)
		},
		subRoutes: {
			'/components/:componentId': {
				name: 'component',
				component: function (resolve) {
					require(['../views/public/component'], resolve)
				}
			}
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