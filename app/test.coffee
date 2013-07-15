Parse.initialize "BstL12H3UWg80NUkm5zx4QnOM30KexqaQ3gPC7Ej", "wN5GgDLu9JpYtDXtLt4h5XQcdRKgH44RsrrhA6Vh"

Users = Parse.Object.extend "myusers"

module.exports = 

  saveUser: (user) ->
    return if not user.name
    # update if already exists
    usersQuery = new Parse.Query(Users);
    usersQuery.equalTo 'username', user.name
    usersQuery.find
      success: (results) ->
        if results.length
          # update
          console.log "updating user", results
          results[0].set 'username', user.name
          results[0].set 'fbid', user.fbid
          # results[0].set 'movieIdYes', null
          # results[0].set 'movieIdNo', null
          results[0].addUnique 'movieIdYes', user.movieIdYes if user.movieIdYes
          results[0].addUnique 'movieIdNo', user.movieIdNo if user.movieIdNo
          results[0].save 
            success: (object) ->
              console.log "[Parse] : Sent test payload."
            
            ,error: (object, error) ->
              console.error "ERROR: " + error.description
        else
          console.log "saving new user"
          users = new Users();
          users.set 'username', user.name
          users.set 'fbid', user.fbid or null
          users.add 'movieIdYes', user.movieIdYes or null
          users.add 'movieIdNo', user.movieIdNo or null
          users.save 
            success: (object) ->
              console.log "[Parse] : Sent test payload."
            
            ,error: (object, error) ->
              console.error "ERROR: " + error.description
          
      error: (e) -> console.log "error", e



  getFriendsForMovie: (movieId = 0, myFriendsFbIds = []) ->
    one = new Parse.Query(Users);
    one.equalTo('movieIdYes', movieId)
    two = new Parse.Query(Users);
    two.equalTo('movieIdNo', movieId)
    main = Parse.Query.or(one, two);
    main.containedIn "username", myFriendsFbIds
    main.find
      success: (results) -> console.log "friends of mine for movie", movieId,results
      error: (e) -> console.log "error",e

  # me = "x"

  # saveUser {name: me, movieIdYes: 111, movieIdNo:null}

  # getFriendsForMovie 111, ['Jeff','Jeff S', 'x']
