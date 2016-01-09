import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

var router = new VueRouter({
	linkActiveClass: 'active'
})

router.map({
	'components': {
		name: 'components',
		component: {
			template: '<router-view></router-view>'
		},
		subRoutes: {
			'/:id': {
				name: 'component',
				component: function (resolve) {
					require(['../views/docs/component'], resolve)
				}
			}
		}
	}
})

router.beforeEach(function () {
	window.scrollTo(0, 0)
})

router.redirect({
	'*': '/components/sidebar'
})

export default router