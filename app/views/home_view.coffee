View = require './view'
template = require './templates/home'

module.exports = class HomeView extends View
  id: 'home-view'
  template: template

  initialize: =>
    # get poster from rotten tomatoes (called on dom)
  	chrome.tabs.getSelected null, (tab) ->
  		port = chrome.tabs.connect tab.id
  		port.postMessage {"hello": "world"}
  		port.onMessage.addListener (response) ->
  			console.error JSON.stringify(response)
  			jQuery('#home-view').html("<img src='"+response.poster+"' />")


    @backgroundPage = chrome.extension.getBackgroundPage()
    # listen to backgroundpage event to call updateData
    # for now...
    @updateData()

  updateData: ->
    user = @backgroundPage.user
    console.log user
    @$('body').append("Welcome "+user?.name)
    @render()

