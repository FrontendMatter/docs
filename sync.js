var componentFormatter = require('./lib/component-formatter')
var Promise = require('es6-promise').Promise
var store = require('./lib/services/package')

var packageName = process.argv[2] || 'themekit-vue'
var packageContent = require(packageName)

var forOwn = require('mout/object/forOwn')
var queue = []
var sync = true

forOwn(packageContent, function (data, key) {
	var component = componentFormatter(key, packageContent)
	component.packages = {}
	component.packages[packageName] = true
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