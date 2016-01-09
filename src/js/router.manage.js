import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

var router = new VueRouter({
	linkActiveClass: 'active'
})

router.map({
	'/packages': {
		name: 'packages',
		component: function (resolve) {
			require(['../views/manage/packages/index'], resolve)
		}
	},
	'/packages/:id': {
		component: function (resolve) {
			require(['../views/manage/packages/package'], resolve)
		},
		subRoutes: {
			'/': {
				name: 'package',
				component: function (resolve) {
					require(['../views/manage/packages/view'], resolve)
				}
			},
			'/components/create': {
				name: 'package.create.component',
				component: function (resolve) {
					require(['../views/manage/components/edit'], resolve)
				}
			},
			'/components/edit/:componentId': {
				name: 'package.edit.component',
				component: function (resolve) {
					require(['../views/manage/components/edit'], resolve)
				}
			}
		}
	}
})

router.beforeEach(function () {
	window.scrollTo(0, 0)
})

router.redirect({
	'*': '/packages'
})

export default router