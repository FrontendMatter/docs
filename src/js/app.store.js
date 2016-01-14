/* eslint no-undef:0 */
export default {
	config: {
		algolia: {
			appId: __APP__.algolia.appId,
			apiKey: __APP__.algolia.apiKey
		},
		packageStoreFirebaseRef: __APP__.packageStoreFirebaseRef
	},
	state: {
		components: null
	},
	helpers: {
		routeToPackage (packageId) {
			return { 
				name: 'package', 
				params: { 
					id: packageId
				}
			}
		},
		routeToComponent (packageId, componentId) {
			return {
				name: 'component',
				params: {
					id: packageId,
					componentId
				}
			}
		}
	}
}