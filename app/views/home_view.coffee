View = require './view'
template = require './templates/home'

module.exports = class HomeView extends View
  id: 'home-view'
  template: template

  initialize: ->
    @backgroundPage = chrome.extension.getBackgroundPage()
    # listen to backgroundpage event to call updateData
    # for now...
    @updateData()

  updateData: ->
    user = @backgroundPage.user
    console.log user
    @$('body').append("Welcome "+user.name)
    @render()

