/* eslint no-undef:0 */
function routeToPackage (routeName, packageId) {
	return {
		name: routeName,
		params: {
			id: packageId
		}
	}
}
export default {
	config: {
		algolia: {
			appId: __APP__.algolia.appId,
			apiKey: __APP__.algolia.apiKey
		},
		storeFirebaseRef: __APP__.storeFirebaseRef,
		marked: {
			highlight: function (code) {
				return require('highlight.js').highlightAuto(code).value
			}
		}
	},
	state: {
		components: null
	},
	helpers: {
		routeToPackage (packageId) {
			return routeToPackage('package', packageId)
		},
		routeToComponent (packageId, componentId) {
			return {
				name: 'component',
				params: {
					id: packageId,
					componentId
				}
			}
		},
		routeToPage (packageId, slug, pageId) {
			return {
				name: 'page',
				params: {
					id: packageId,
					slug,
					pageId
				}
			}
		},
		routeToPackages () {
			return {
				name: 'packages'
			}
		},
		routeToPackageComponents (packageId) {
			return routeToPackage('package.components', packageId)
		},
		routeToPackagePages (packageId) {
			return routeToPackage('package.pages', packageId)
		}
	}
}