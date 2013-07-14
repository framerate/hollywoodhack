View = require './view'
template = require './templates/home'

module.exports = class HomeView extends View
  id: 'home-view'
  template: template
  afterRender: ->
    # if we have facebook accessToken, then we're ready to go, otherwise, connect!
    @backgroundPage = chrome.extension.getBackgroundPage()
    if @backgroundPage.localStorage.getItem("accessToken")
      console.log "We have access to facebook"
      @$('#action-sub-view').css('display', 'block')
    else
      console.log "we need to connect to facebook"
      @$('#facebook-connect').css('display', 'block')

    # # get data from background page
    # @user = @backgroundPage.data.user
    # console.log "got user from background", @user
    # @updateData(@user) unless not @user

  updateData: (user) ->
    console.log user.name
    @$('body').append("Welcome "+user?.name)
    @render()

