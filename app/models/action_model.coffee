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

  updateData: (data) ->
    console.log "got data from background", data
    @user = @backgroundPage.data.user
    @set "name", @user.name