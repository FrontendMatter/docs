import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

var router = new VueRouter({
	linkActiveClass: 'active'
})

router.map({
	'/fluid-one-sidebar': {
		name: 'fluid-one-sidebar',
		component: function (resolve) {
			require(['../app/views/layouts/sidebar-size-2'], resolve)
		}
	},
	'/no-sidebar': {
		name: 'no-sidebar',
		component: function (resolve) {
			require(['../app/views/layouts/no-sidebar'], resolve)
		}
	},
	'/fluid-two-sidebars': {
		name: 'fluid-two-sidebars',
		component: function (resolve) {
			require(['../app/views/layouts/fluid-two-sidebars'], resolve)
		}
	},
	'/fluid-three-sidebars': {
		name: 'fluid-three-sidebars',
		component: function (resolve) {
			require(['../app/views/layouts/fluid-three-sidebars'], resolve)
		}
	},
	'/sidebar-mini': {
		name: 'sidebar-mini',
		component: function (resolve) {
			require(['../app/views/layouts/sidebar-mini'], resolve)
		}
	},
	'/sidebar-mini-reveal': {
		name: 'sidebar-mini-reveal',
		component: function (resolve) {
			require(['../app/views/layouts/sidebar-mini-reveal'], resolve)
		}
	},
	'/sidebar-size-2': {
		name: 'sidebar-size-2',
		component: function (resolve) {
			require(['../app/views/layouts/sidebar-size-2'], resolve)
		}
	},
	'/sidebar-size-3': {
		name: 'sidebar-size-3',
		component: function (resolve) {
			require(['../app/views/layouts/sidebar-size-3'], resolve)
		}
	},
	'/sidebar-percentage': {
		name: 'sidebar-percentage',
		component: function (resolve) {
			require(['../app/views/layouts/sidebar-size-3'], resolve)
		}
	}
})

router.beforeEach(function () {
	window.scrollTo(0, 0)
})

router.redirect({
	'*': '/fluid-one-sidebar'
})

export default router