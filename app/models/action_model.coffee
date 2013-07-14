# turn data object from background.js into view data
module.exports = class ActionModel extends Backbone.Model

  initialize: () ->
    # get data from background page
    @backgroundPage = chrome.extension.getBackgroundPage()
    console.log @backgroundPage
    @backgroundPage.getData()
    @backgroundPage.addEventListener "dataReady", (e) => @updateData e.detail
    # @updateData data
    # @backgroundPage.on "dataReady", @updateData

  defaults:
    name: ""
    poster: ""

  updateData: (data) ->
    console.log "got data from background", data
    @set "name", data.user.name
    @set "poster", data.movie.poster