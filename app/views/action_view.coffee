# subview that holds all the action area including:
# - movie poster
# - friend's ratings
# - rate buttons

View = require './view'
Parse = require '../test'
template = require './templates/action_template'

module.exports = class ActionView extends View
  id: 'action-view'
  template: template
  events: 
    "click #thumbsUp":  "thumbsUpClick"
    "click #thumbsDown":  "thumbsDownClick"

  initialize: (@options = {}) ->
    console.log 'action sub view loaded', @options
    @listenTo(@model, "change", @render)
    setTimeout (@thumbsUpClick), 1000
    @render()

  getRenderData: ->
    @model.attributes

  afterRender: ->
    if @model.get 'name'
      @$('#loading').hide()
      @$('#content').show()

  thumbsUpClick: =>
    console.log 'thumbs up'
    @saveRating
      name: @model.get "name"
      fbid: @model.get "fbid"
      movieIdYes: @model.get "movieId"

  thumbsDownClick: =>
    console.log 'thumbs down'
    @saveRating
      name: @model.get "name"
      fbid: @model.get "fbid"
      movieIdNo: @model.get "movieId"


  saveRating: (data) ->
    console.log "saving click data", data
    console.log "Parse", Parse
    Parse.saveUser data
