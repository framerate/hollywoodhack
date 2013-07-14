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
    fbid: ""
    friends: ""
    movieId: ""

  updateData: (data) ->
    console.log "got data from background", data
    @set "name", data.user.name
    @set "poster", data.movie.poster
    @set "fbid", data.user.id # test this
    @set "friends", data.friends.data
    console.log "[action_model] : friends: " + data.friends.data
    @set "movieId", data.movie.movieId
