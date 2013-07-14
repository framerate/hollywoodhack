console.log "loading from extension"

module.exports = class Popup extends View
	initialize: ->
		chrome.tabs.getSelected null, (tab) ->
			port = chrome.tabs.connect tab.id
			port.postMessage {"hello": "world"}
			port.onMessage.addListener (response) ->
				console.error JSON.stringify(response)
				jQuery('#home-view').html("<img src='"+response.poster+"' />")






