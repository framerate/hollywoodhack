View = require './view'
ActionView = require './action_view'
ActionModel = require '../models/action_model'
template = require './templates/home'

module.exports = class HomeView extends View
  id: 'home-view'
  template: template
  afterRender: ->
    # if we have facebook accessToken, then we're ready to go, otherwise, connect!
    @backgroundPage = chrome.extension.getBackgroundPage()
    if @backgroundPage.localStorage.getItem("accessToken")
      console.log "We have access to facebook"
      # show action sub view area
      @$('#action-sub-view').css('display', 'block')
      # render action sub view into home view
      @$('#action-sub-view').append new ActionView({model:(new ActionModel())}).el

    else
      console.log "we need to connect to facebook"
      @$('#facebook-connect').css('display', 'block')
