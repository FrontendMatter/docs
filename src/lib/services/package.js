import Firebase from 'firebase'
import merge from 'mout/object/merge'

class PackageDb {
	constructor (ref) {
		this.ref = new Firebase(ref)
		this.packages = this.ref.child('packages')
		this.components = this.ref.child('components')
	}
	set (type, name, data) {
		return new Promise((resolve, reject) => {
			this[type].child(name).set(data, (e) => {
				if (e) {
					return reject(e)
				}
				resolve()
			})
		})
	}
	setPackage (name, data) {
		return this.set('packages', name, data)
	}
	removePackage (name) {
		return this.setPackage(name, null)
	}
	getComponent (name, cb, error) {
		this.components.child(name).once('value', (snapshot) => {
			this.onSyncComponent(snapshot.val(), cb, error, true)
		}, (e) => {
			if (error) {
				error(e)
			}
		})
	}
	setComponent (name, data) {
		return this.set('components', name, data)
	}
	removeComponent (name) {
		return this.setComponent(name, null)
	}
	onPackageAdded (cb, error) {
		this.packages.on('child_added', (snapshot) => {
			let name = snapshot.key()
			var packageData = snapshot.val()
			packageData.components = []
			this.onPackageComponentAdded(name, (data) => {
				packageData.components.push(data)
			})
			this.onPackageComponentRemoved(name, (name) => {
				packageData.components = packageData.components.filter((c) => {
					return c.name !== name
				})
			})
			cb(packageData)
		}, (e) => {
			if (error) {
				error(e)
			}
		})
	}
	onPackageRemoved (cb, error) {
		this.packages.on('child_removed', (snapshot) => {
			cb(snapshot.key())
		}, (e) => {
			if (error) {
				error(e)
			}
		})
	}
	onPackageNone (cb, error) {
		this.packages.once('value', (snapshot) => {
			if (!snapshot.exists()) {
				cb()
			}
		}, (e) => {
			if (error) {
				error(e)
			}
		})
	}
	onPackageComponentAdded (packageName, cb, error) {
		this.components.orderByChild(`packages/${ packageName }`).on('child_added', (snapshot) => {
			this.onSyncComponent(snapshot.val(), cb, error, true)
		}, (e) => {
			if (error) {
				error(e)
			}
		})
		this.ref.child('sync/components').orderByChild(`packages/${ packageName }`).on('child_added', (snapshot) => {
			this.onSyncComponent(snapshot.val(), cb, error)
		}, (e) => {
			if (error) {
				error(e)
			}
		})
	}
	onSyncComponent (component, cb, error, sync) {
		let path = `components/${ component.name }`
		if (sync) {
			path = `sync/${ path }`
		}
		this.ref.child(path).once('value', (snapshot) => {
			if (!snapshot.exists()) {
				return cb(component)
			}
			let data = snapshot.val()
			cb(merge(data, component))
		}, (e) => {
			if (error) {
				error(e)
			}
		})
	}
	onPackageComponentRemoved (packageName, cb, error) {
		this.components.orderByChild(`packages/${ packageName }`).on('child_removed', (snapshot) => {
			cb(snapshot.key())
		}, (e) => {
			if (error) {
				error(e)
			}
		})
	}
	onPackageComponentNone (packageName, cb, error) {
		this.components.once('value', (snapshot) => {
			if (!snapshot.exists()) {
				cb()
			}
		}, (e) => {
			if (error) {
				error(e)
			}
		})
	}
	offline () {
		Firebase.goOffline()
	}
}

export default PackageDb
module.exports = exports.default