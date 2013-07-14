

// chrome.extension.onRequest.addListener(
//   function(request, sender, sendResponse) {
//     sendResponse({counter: request.counter+1});
//   });

// TODO - move out the rottentomatoes call and poster part, this should just send the `desc` to background
// background will handle making the api calls

$(document).ready(function(){

  chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
      var desc = $('meta[name=omni_page]').attr('content');
      desc = desc.split(' - ')[1];
      urlDesc = encodeURI(desc);
      $.getJSON('http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=snxd2wjz2z9n9vvrhpyv6mgn&q='+desc, function(data) {
        var poster = $('<img />').attr('src', data.movies[0].posters.detailed);
        port.postMessage({"poster":  data.movies[0].posters.detailed, "movieId": data.movies[0].id});
        // $('body').prepend(poster);
      });
    });
  });
  
  // var port = chrome.runtime.connect();
});