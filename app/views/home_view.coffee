View = require './view'
template = require './templates/home'

module.exports = class HomeView extends View
  id: 'home-view'
  template: template

  initialize: ->
  	chrome.tabs.getSelected null, (tab) ->
  		port = chrome.tabs.connect tab.id
  		port.postMessage {"hello": "world"}
  		port.onMessage.addListener (response) ->
  			console.error JSON.stringify(response)
  			jQuery('#home-view').html("<img src='"+response.poster+"' />")
