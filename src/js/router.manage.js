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
	'/packages/create': {
		name: 'package.create',
		component: function (resolve) {
			require(['../views/manage/package/package'], resolve)
		}
	},
	'/packages/edit/:id': {
		name: 'package.edit',
		component: function (resolve) {
			require(['../views/manage/package/package'], resolve)
		}
	},
	'/packages/:id': {
		name: 'package.components',
		component: function (resolve) {
			require(['../views/manage/package/components'], resolve)
		}
	},
	'/packages/:id/components/create': {
		name: 'package.create.component',
		component: function (resolve) {
			require(['../views/manage/package/component'], resolve)
		}
	},
	'/packages/:id/components/edit/:componentId': {
		name: 'package.edit.component',
		component: function (resolve) {
			require(['../views/manage/package/component'], resolve)
		}
	},
	'/packages/:id/pages': {
		name: 'package.pages',
		component: function (resolve) {
			require(['../views/manage/package/pages'], resolve)
		}
	},
	'/packages/:id/pages/create': {
		name: 'package.create.page',
		component: function (resolve) {
			require(['../views/manage/package/page'], resolve)
		}
	},
	'/packages/:id/pages/edit/:pageId': {
		name: 'package.edit.page',
		component: function (resolve) {
			require(['../views/manage/package/page'], resolve)
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