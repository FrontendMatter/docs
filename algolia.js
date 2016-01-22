var algoliasearch = require('algoliasearch')
var config = require('config')
var client = algoliasearch(config.get('algolia.appId'), config.get('algolia.writeApiKey'))
var index = client.initIndex('components')
var moment = require('moment')

var store = require('./lib/store')
store.setRef(config.get('storeFirebaseRef'))

function now () {
	return moment().format('MM/DD/YYYY HH:mm:ss')
}

function updateComponent (componentIndex) {
	var component = componentIndex.merge
	component.objectID = component.name
	index.saveObject(component, function (err, content) {
		if (err) {
			throw err
		}
		console.log(now() + ' [' + component.name + '] Firebase<>Algolia object updated.')
	})
}

store.onComponentAdded(updateComponent)
store.onComponentChanged(updateComponent)

store.onComponentRemoved(function (objectID) {
	index.deleteObject(objectID, function (err, content) {
		if (err) {
			throw err
		}
		console.log(now() + ' [' + objectID + '] Firebase<>Algolia object deleted.')
	})
})