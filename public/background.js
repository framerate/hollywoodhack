var successURL = 'https://www.facebook.com/connect/login_success.html';
var data = {};
// localStorage.removeItem('accessToken');
function onFacebookLogin() {
    if (!localStorage.accessToken) {
        chrome.tabs.getAllInWindow(null, function(tabs) {
            for (var i = 0; i < tabs.length; i++) {
                if (tabs[i].url.indexOf(successURL) == 0) {
                    var params = tabs[i].url.split('#')[1];
                    access = params.split('&')[0]
                    console.log(access);
                    localStorage.accessToken = access;
                    chrome.tabs.onUpdated.removeListener(onFacebookLogin);
                    queryFacebook();
                    return;
                }
            }
        });
    } else {
    }
}
chrome.tabs.onUpdated.addListener(onFacebookLogin);

function queryFacebook () {
    if (localStorage.accessToken) {
        console.log("fb api query...")
        var graphUrl = "https://graph.facebook.com/me?" + localStorage.accessToken + "&callback=FacebookDataReady";
        console.log("querying:",graphUrl);

        var script = document.createElement("script");
        script.src = graphUrl;
        document.head.appendChild(script);

    } else {
        console.log("no accessToken yet...")
    }
}

queryFacebook();


function FacebookDataReady(user) {
    console.log("Got data from facebook", user);
    data.user=user;
 }


 function getPoster () {
    // get poster from contentscript
    // TODO - change to receive just movie name, and make rotten tomatoes call here
    chrome.tabs.getSelected (null, function (tab) {
        var port = chrome.tabs.connect(tab.id);
        port.postMessage({"hello": "world"});
        port.onMessage.addListener(function (response) {
            console.error(JSON.stringify(response));
            jQuery('#home-view').html("<img src='"+response.poster+"' />");
        });
    });

 }