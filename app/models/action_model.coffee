# turn data object from background.js into view data
module.exports = class ActionModel extends Backbone.Model

  initialize: () ->
    # get data from background page
    @backgroundPage = chrome.extension.getBackgroundPage()
    @user = @backgroundPage.data.user
    console.log "got user from background", @user
    setTimeout (=> @set "name", @user.name), 500