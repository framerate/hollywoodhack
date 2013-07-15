var successURL = 'https://www.facebook.com/connect/login_success.html';
var data = {};
var friendIdArray;
// localStorage.removeItem('accessToken');
function onFacebookLogin() {
    if (!localStorage.accessToken) {
        chrome.tabs.getAllInWindow(null, function(tabs) {
            for (var i = 0; i < tabs.length; i++) {
                if (tabs[i].url.indexOf(successURL) == 0) {
                    var params = tabs[i].url.split('#')[1];
                    access = params.split('&')[0]
                    console.log('[Background] : ' + access);
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


// request for data, fires off api calls
function getData () {
    queryFacebook();
    queryFacebookFriends();
    getMovieData();
}

// wait until you have all the pieces of data (user, movie, friends) before sneding back
function sendData () {
    if(data.user && data.movie && data.friends) {
        console.log ("[Background] : Data ready", data);
        dataReady = document.createEvent('CustomEvent');
        dataReady.initCustomEvent('dataReady', true, true, data);
        window.dispatchEvent(dataReady);
        data = {};
    } else {
        console.log ("[Background] : Data not quite ready", data);
    }
}


function queryFacebookFriends () {

    if (localStorage.accessToken) {
        console.log("[Background] : fb api query...")
        var graphUrl = "https://graph.facebook.com/me/friends?" + localStorage.accessToken + "&callback=FacebookFriendDataReady";
        console.log("[Background] : querying friends:",graphUrl);

        var script = document.createElement("script");
        script.src = graphUrl;
        document.head.appendChild(script);

    } else {
        console.log("[Background] : no accessToken yet...");
    }
}

function FacebookFriendDataReady(friends) {
    console.log("[Background] : Got friend data from facebook", friends);
    data.friends=friends
    friendIdArray = [];
    for (var i = 0; i < friends.data.length; ++i)
    {
        console.log(friends.data[i].id);
        friendIdArray.push(friends.data[i].id);
    }
    console.log('[Background] : friendIdArray is done!');
    var banana = data;
    setTimeout(function(){
        //console.log("Data: ----> ",banana);
        getFriendsForMovie(banana.movie.movieId, friendIdArray);
    }, 1000);
    
    sendData();
 }

 function queryFacebook () {
    if (localStorage.accessToken) {
        console.log("[Background] : fb api query...")
        var graphUrl = "https://graph.facebook.com/me?" + localStorage.accessToken + "&callback=FacebookDataReady";
        console.log("[Background] : querying:",graphUrl);

        var script = document.createElement("script");
        script.src = graphUrl;
        document.head.appendChild(script);

    } else {
        console.log("[Background] : no accessToken yet...");
    }
}

function FacebookDataReady(user) {
    console.log("[Background] : Got data from facebook", user);
    data.user=user;
    sendData();
 }

Parse.initialize("BstL12H3UWg80NUkm5zx4QnOM30KexqaQ3gPC7Ej", "wN5GgDLu9JpYtDXtLt4h5XQcdRKgH44RsrrhA6Vh");
var Users = Parse.Object.extend("myusers");

function getFriendsForMovie(movieId, myFriendsFbIds) {
    var one = new Parse.Query(Users);
    one.equalTo('movieIdYes', movieId);
    two = new Parse.Query(Users);
    two.equalTo('movieIdNo', movieId);
    main = Parse.Query.or(one, two);
    main.containedIn("fbid", myFriendsFbIds);
    main.find({
        success: function(results) {
            console.log("friends of mine for movie " + movieId,results);
        },
        error: function(e) {
            console.log("error " , e);
        }
    });

}


 function getMovieData () {
    // get poster from contentscript
    // TODO - change to receive just movie name, and make rotten tomatoes call here
    chrome.tabs.getSelected (null, function (tab) {
        var port = chrome.tabs.connect(tab.id);
        port.postMessage({"hello": "world"});
        port.onMessage.addListener(function (response) {
            data.movie = response;
            sendData();
        });
    });

 }