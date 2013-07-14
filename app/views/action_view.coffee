# subview that holds all the action area including:
# - movie poster
# - friend's ratings
# - rate buttons

View = require './view'
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

    @render()

  getRenderData: ->
    @model.attributes

  afterRender: ->
    if @model.get 'name'
      @$('#loading').hide()
      @$('#content').show()

  thumbsUpClick: ->
    console.error 'thumbs up'

  thumbsDownClick: ->
    console.error 'thumbs down'