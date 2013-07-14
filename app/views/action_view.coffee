# subview that holds all the action area including:
# - movie poster
# - friend's ratings
# - rate buttons

View = require './view'
template = require './templates/action_template'

module.exports = class ActionView extends View
  id: 'action-view'
  template: template
  initialize: (@options = {}) ->
    console.log 'action sub view loaded', @options
    @render()