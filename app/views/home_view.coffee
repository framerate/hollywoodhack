View = require './view'
template = require './templates/home'

module.exports = class HomeView extends View
  id: 'home-view'
  template: template

  initialize: ->
    if localStorage.accessToken
        graphUrl = "https://graph.facebook.com/me?" + localStorage.accessToken + "&callback=displayUser";
        alert(graphUrl);
    
        script = document.createElement("script");
        script.src = graphUrl;
        document.body.appendChild(script);
    
        displayUser (user) ->
            alert(user);
    else 
      alert("no localStorage.accessToken found")

