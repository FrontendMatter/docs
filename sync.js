var componentImporter = require('./lib/component-importer')
var Promise = require('es6-promise').Promise
var store = require('./lib/store')
var config = require('config')
store.setRef(config.get('storeFirebaseRef'))

var packageName = process.argv[2] || 'themekit-vue'
var packageContent = require(packageName)

var forOwn = require('mout/object/forOwn')
var queue = []
var sync = true

forOwn(packageContent, function (data, key) {
	var component = componentImporter(key, packageContent)
	component.packageId = packageName
	queue.push(store.setComponent(component.name, component, sync))
})

Promise.all(queue).then(function() {
	console.log('saved to firebase: ' + store.getComponentsRef(sync))
	process.exit(1)
})
.catch(function (e) {
	console.log(e)
	process.exit(1)
})