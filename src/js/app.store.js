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
		storeFirebaseRef: __APP__.storeFirebaseRef
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
		routeToEditComponent (packageId, componentId) {
			return {
				name: 'package.edit.component',
				params: {
					id: packageId,
					componentId
				}
			}
		},
		routeToPackages () {
			return {
				name: 'packages'
			}
		},
		routeToCreatePackage () {
			return {
				name: 'package.create'
			}
		},
		routeToEditPackage (packageId) {
			return routeToPackage('package.edit', packageId)
		},
		routeToPackageComponents (packageId) {
			return routeToPackage('package.components', packageId)
		},
		routeToPackagePages (packageId) {
			return routeToPackage('package.pages', packageId)
		},
		routeToCreateComponent (packageId) {
			return routeToPackage('package.create.component', packageId)
		},
		routeToCreatePage (packageId) {
			return routeToPackage('package.create.page', packageId)
		},
		routeToEditPage (packageId, pageId) {
			return {
				name: 'package.edit.page',
				params: {
					id: packageId,
					pageId
				}
			}
		}
	}
}