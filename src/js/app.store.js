/* eslint no-undef:0 */
function routeToPackage (routeName, packageName, version = 'latest') {
	return {
		name: routeName,
		params: {
			packageName,
			version
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
		pkg: null,
		components: null,
		page: {
			appTitle: 'ThemeKit Documentation',
			title: null
		}
	},
	helpers: {
		routeToPackage (packageName, version) {
			return routeToPackage('package', packageName, version)
		},
		routeToComponent (packageName, version = 'latest', componentName) {
			return {
				name: 'component',
				params: {
					packageName,
					componentName,
					version
				}
			}
		},
		routeToPage (packageName, version = 'latest', pageId) {
			return {
				name: 'page',
				params: {
					packageName,
					version,
					pageId
				}
			}
		},
		routeToPackages () {
			return {
				name: 'packages'
			}
		},
		routeToPackageComponents (packageName, version) {
			return routeToPackage('package.components', packageName, version)
		},
		routeToPackagePages (packageName, version) {
			return routeToPackage('package.pages', packageName, version)
		}
	}
}