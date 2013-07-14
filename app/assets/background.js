var successURL = 'https://www.facebook.com/connect/login_success.html';
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
                    return;
                }
            }
        });
    } else {
    }
}
chrome.tabs.onUpdated.addListener(onFacebookLogin);

// console.log("x",popup)
if (localStorage.accessToken) {
    console.log("fb api query...")
    var graphUrl = "https://graph.facebook.com/me?" + localStorage.accessToken 
    console.log(graphUrl);

    var script = document.createElement("script");
    script.src = graphUrl;
    document.head.appendChild(script);

    function useFaceBookData(user) {
        // console.log(user);
        this.user=user;
        // trigger event on this with user data
        // listen to this even in popup
     }
} else {
    console.log("no accessToken yet...")
}