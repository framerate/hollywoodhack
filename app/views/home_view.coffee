View = require './view'
template = require './templates/home'

module.exports = class HomeView extends View
  id: 'home-view'
  template: template
  initialize: ->
    # get poster from rotten tomatoes (called on dom)
    chrome.tabs.getSelected null, (tab) ->
      port = chrome.tabs.connect tab.id
      port.postMessage {"hello": "world"}
      port.onMessage.addListener (response) ->
        console.error JSON.stringify(response)
        jQuery('#home-view').html("<img src='"+response.poster+"' />")


    @backgroundPage = chrome.extension.getBackgroundPage()
    # get data from background page
    @user = @backgroundPage.data.user
    console.log "got user from background", @user
    @updateData(@user) unless not @user

  updateData: (user) ->
    console.log user.name
    @$('body').append("Welcome "+user?.name)
    @render()

