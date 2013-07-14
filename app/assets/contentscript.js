

// chrome.extension.onRequest.addListener(
//   function(request, sender, sendResponse) {
//     sendResponse({counter: request.counter+1});
//   });


$(document).ready(function(){

  chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
      var desc = $('meta[name=omni_page]').attr('content');
      desc = desc.split(' - ')[1];
      urlDesc = encodeURI(desc);
      $.getJSON('http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=snxd2wjz2z9n9vvrhpyv6mgn&q='+desc, function(data) {
        var poster = $('<img />').attr('src', data.movies[0].posters.detailed);
        port.postMessage({"poster":  data.movies[0].posters.detailed});
        // $('body').prepend(poster);
      });
    });
  });
  
  // var port = chrome.runtime.connect();
});