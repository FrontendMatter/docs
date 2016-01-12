import Firebase from 'firebase'
import merge from 'mout/object/merge'
import { EventEmitter } from 'events'

/**
 * PackageDB Firebase Service.
 * @extends {EventEmitter}
 */
class PackageDb extends EventEmitter {

	/**
	 * Constructor
	 */
	constructor (ref) {
		super()

		/**
		 * Package components two-way relationship
		 */
		this.on('component.added', (componentName, data) => {
			for (let packageName in data.packages) {
				this.setPackageComponent(packageName, componentName, true)
			}
		})
		this.on('component.removed', (componentName, data) => {
			for (let packageName in data.packages) {
				this.setPackageComponent(packageName, componentName, null)
			}
		})
	}

	/**
	 * Set a Firebase reference
	 * @param {string} ref The Firebase URL.
	 */
	setRef (ref) {
		this.ref = new Firebase(ref)
	}

	/**
	 * Get a Firebase reference for a path
	 * @param  {string} path 	The path.
	 * @return {Firebase}		A Firebase reference.
	 */
	getRef (path) {
		return this.ref.child(path)
	}

	/**
	 * Get a Firebase query reference for fetching components.
	 * @param  {boolean} sync 	Use the sync index.
	 * @return {Firebase}		A Firebase reference.
	 */
	getComponentsRef (sync) {
		let ref = `components`
		if (sync) {
			ref = `sync/${ ref }`
		}
		return this.ref.child(ref)
	}

	/**
	 * Get a Firebase query reference for fetching a component.
	 * @param {string} name 	The component name.
	 * @param  {boolean} sync 	Use the sync index.
	 * @return {Firebase} 		A Firebase reference.
	 */
	getComponentRef (name, sync) {
		return this.getComponentsRef(sync).child(name)
	}

	/**
	 * Sets data to a Firebase path.
	 * @param {string} path 	The path to set.
	 * @param {?} data 			The value to set.
	 * @return {Promise} 		A Promise.
	 */
	set (path, data) {
		this.emit('serviceLoading')
		return new Promise((resolve, reject) => {
			this.getRef(path).set(data, (e) => {
				if (e) {
					reject(e)
					this.emit('serviceError', e)
					return
				}
				resolve()
				this.emit('serviceComplete')
			})
		})
	}

	/**
	 * Saves package data to Firebase.
	 * @param {string} name 	The package name.
	 * @param {?} data 			The data (null to remove the package).
	 * @return {Promise} 		A Promise.
	 */
	setPackage (name, data) {
		return this.set(`packages/${ name }`, data)
	}

	/**
	 * Removes a package from Firebase.
	 * @param  {string} name 	The package name.
	 * @return {Promise} 		A Promise.
	 */
	removePackage (name) {
		return this.setPackage(name, null)
	}

	/**
	 * Saves component data to Firebase.
	 * @param {string} name 	The component name.
	 * @param {?} data 			The data (null to remove the component).
	 * @param {boolean} sync 	Use the sync index.
	 * @return {Promise} 		A Promise.
	 */
	setComponent (name, data, sync) {
		let path = `components/${ name }`
		if (sync) {
			path = `sync/${ path }`
		}
		if (!data) {
			return this.getComponent(name).then(({ component }) => {
				return this.set(path, data).then(() => {
					this.emit('component.removed', name, component)
				})
			})
		}
		return this.set(path, data).then(() => {
			this.emit('component.added', name, data)
		})
	}

	/**
	 * Removes a component from Firebase.
	 * @param  {string} name 	The component name.
	 * @param {boolean} sync 	Use the sync index.
	 * @return {Promise} 		A Promise.
	 */
	removeComponent (name, sync) {
		return this.setComponent(name, null, sync)
	}

	/**
	 * Package components two-way relationship
	 * @param {string} packageName   	The package name.
	 * @param {string} componentName 	The component name.
	 * @param {boolean|null} data 		The data (boolean or null to remove)
	 */
	setPackageComponent (packageName, componentName, data) {
		return this.set(`packages/${ packageName }/components/${ componentName }`, data)
	}

	/**
	 * Format package Object
	 * @param  {Object} packageData The package Object.
	 * @return {Object}             The formatted package Object.
	 */
	packageFormatter (packageData) {
		const components = Object.keys(packageData.components || {}) || []
		packageData.components = components
		return packageData
	}

	/**
	 * Get packages from Firebase.
	 * @return {Promise} A Promise which resolves a packages Array.
	 */
	getPackages () {
		this.emit('serviceLoading')
		return new Promise((resolve, reject) => {
			this.getRef('packages').once('value', (snapshot) => {
				const packages = snapshot.val()
				const packagesArray = []
				for (let name in packages) {
					packagesArray.push(this.packageFormatter(packages[name]))
				}
				resolve(packagesArray)
				this.emit('serviceComplete')
			}, (e) => {
				reject(e)
				this.emit('serviceError', e)
			})
		})
	}

	/**
	 * Get a package from Firebase.
	 * @param {string} packageName 	The package name.
	 * @return {Promise} 			A Promise which resolves a package Object.
	 */
	getPackage (packageName) {
		this.emit('serviceLoading')
		return new Promise((resolve, reject) => {
			this.getRef(`packages/${ packageName }`).once('value', (snapshot) => {
				resolve(this.packageFormatter(snapshot.val()))
				this.emit('serviceComplete')
			}, (e) => {
				reject(e)
				this.emit('serviceError', e)
			})
		})
	}

	/**
	 * Get the components for a package from Firebase.
	 * @return {Promise} A Promise which resolves a components Array.
	 */
	getPackageComponents (packageName) {
		this.emit('serviceLoading')
		return new Promise((resolve, reject) => {
			const components = []
			Promise.all([
				this.syncPackageComponents(packageName),
				this.syncPackageComponents(packageName, true)
			])
			.then((indexes) => {
				indexes.forEach((index) => {
					index.forEach(({ merge }) => {
						const exists = components.find((c) => c.name === merge.name)
						if (!exists) {
							components.push(merge)
						}
					})
				})
				resolve(components)
				this.emit('serviceComplete')
			})
			.catch((e) => {
				reject(e)
				this.emit('serviceError', e)
			})
		})
	}

	/**
	 * Get a Firebase query reference for fetching a package components.
	 * @param  {string} packageName		The package name.
	 * @param  {boolean} sync 			Use the sync index.
	 * @return {Firebase} 				A Firebase reference.
	 */
	getPackageComponentsRef (packageName, sync) {
		return this.getComponentsRef(sync)
			.orderByChild(`packages/${ packageName }`)
			.startAt(true)
			.endAt(true)
	}

	/**
	 * Get package components indexes.
	 * @param  {string} packageName The Firebase reference.
	 * @param  {boolean} sync 		Use the sync index.
	 * @return {Promise} 			A Promise which resolves an Array of indexes for each package component.
	 */
	syncPackageComponents (packageName, sync) {
		return new Promise((resolve, reject) => {
			this.getPackageComponentsRef(packageName, sync).once('value', (snapshot) => {
				const components = snapshot.val()
				const componentsArray = components ? Object.keys(components) : []
				const syncPackageComponents = componentsArray.map((component) => this.syncComponentIndex(components[component], !sync))
				resolve(Promise.all(syncPackageComponents))
			}, (e) => {
				reject(e)
			})
		})
	}

	/**
	 * Get a component.
	 * @param {string} name 	The component name
	 * @return {Promise} 		A Promise which resolves a component Object.
	 */
	getComponent (name) {
		return this.syncComponent(name)
	}

	/**
	 * Get component indexes.
	 * @param  {Firebase} name 	The component name.
	 * @return {Promise} 		A Promise which resolves an Array of indexes.
	 */
	syncComponent (name) {
		this.emit('serviceLoading')
		return Promise.all([
			this.getComponentValue(name),
			this.getComponentValue(name, true)
		])
		.then((values) => {
			return Promise.all(
				values.map((component) => this.syncComponentIndex(component.data, !component.sync))
			)
		})
		.then((indexes) => {
			let componentData = null
			for (let i = 0; i <= indexes.length; i++) {
				if (!indexes[i]) {
					indexes.splice(i, 1)
				}
			}
			indexes.forEach((data) => {
				componentData = data
			})
			this.emit('serviceComplete')
			return componentData
		})
		.catch((e) => this.emit('serviceError', e))
	}

	/**
	 * Get a component data
	 * @param  {string} name The component name
	 * @param  {boolean} sync Use the 'sync' index
	 * @return {Promise}      A Promise which resolves an Object containing the
	 * component data and the 'sync' param value
	 */
	getComponentValue (name, sync) {
		return new Promise((resolve, reject) => {
			this.getComponentRef(name, sync).once('value', (snapshot) => {
				resolve({
					data: snapshot.val(),
					sync: sync
				})
				this.emit('serviceComplete')
			}, (e) => {
				reject(e)
				this.emit('serviceError', e)
			})
		})
	}

	/**
	 * Get the 'sync' or 'components' index for a component.
	 * @param  {Object} component 	The component.
	 * @param  {boolean} sync 		Enable to get the 'sync' index when the component
	 * Object comes from the 'components' index
	 * @return {Promise} 			A Promise which resolves the index Object.
	 */
	syncComponentIndex (component, sync) {
		this.emit('serviceLoading')
		return new Promise((resolve, reject) => {
			if (!component) {
				return resolve()
			}
			this.getComponentRef(component.name, sync).once('value', (snapshot) => {
				if (!snapshot.exists()) {
					this.emit('serviceComplete')
					if (sync) {
						return resolve({ 
							component, 
							sync: null,
							merge: component
						})
					}
					return resolve({ 
						component: null, 
						sync: component, 
						merge: component 
					})
				}
				let data = snapshot.val()
				this.emit('serviceComplete')
				if (sync) {
					return resolve({ 
						component, 
						sync: data, 
						merge: merge(data, component) 
					})
				}
				resolve({ 
					component: data, 
					sync: component, 
					merge: merge(component, data) 
				})
			}, (e) => {
				reject(e)
				this.emit('serviceError', e)
			})
		})
	}

	onPackageAdded (cb, error) {
		this.getRef('packages').on('child_added', (snapshot) => {
			cb(snapshot.val())
			this.emit('serviceComplete')
		}, (e) => {
			if (error) {
				error(e)
			}
			this.emit('serviceError', e)
		})
	}

	onPackageRemoved (cb, error) {
		this.getRef('packages').on('child_removed', (snapshot) => {
			cb(snapshot.key())
			this.emit('serviceComplete')
		}, (e) => {
			if (error) {
				error(e)
			}
			this.emit('serviceError', e)
		})
	}

	onPackageComponentAdded (packageName, cb, error) {
		this.getPackageComponentsRef(packageName).on('child_added', (snapshot) => {
			this.syncComponentIndex(snapshot.val(), true).then((index) => {
				cb(index)
			})
			.catch((e) => {
				if (error) {
					error(e)
				}
			})
		}, (e) => {
			if (error) {
				error(e)
			}
			this.emit('serviceError', e)
		})
		this.getPackageComponentsRef(packageName, true).on('child_added', (snapshot) => {
			this.syncComponentIndex(snapshot.val()).then((index) => {
				cb(index)
			})
			.catch((e) => {
				if (error) {
					error(e)
				}
			})
		}, (e) => {
			if (error) {
				error(e)
			}
			this.emit('serviceError', e)
		})
	}

	onPackageComponentRemoved (packageName, cb, error) {
		this.getPackageComponentsRef(packageName).on('child_removed', (snapshot) => {
			cb(snapshot.key())
			this.emit('serviceComplete')
		}, (e) => {
			if (error) {
				error(e)
			}
			this.emit('serviceError', e)
		})
	}
}

const store = new PackageDb()
export default store
module.exports = exports.default