console.log ">>>>>>>>>>> doing parse"
Parse.initialize "BstL12H3UWg80NUkm5zx4QnOM30KexqaQ3gPC7Ej", "wN5GgDLu9JpYtDXtLt4h5XQcdRKgH44RsrrhA6Vh"




Users = Parse.Object.extend "myusers"
users = new Users();
usersQuery = new Parse.Query(Users);

saveUser = (user) ->
  return if not user.name
  users.set 'username', user.name
  users.set 'movieId', user.movieId if user.movieId
  users.set 'rating', user.rating if user.rating?
  users.save 
    success: (object) ->
      console.log "[Parse] : Sent test payload."
    
    ,error: (object, error) ->
      console.error "ERROR: " + error.description




getFriendsForMovie = (movieId = 0, myFriendsFbIds = []) ->
  usersQuery.containedIn "username", myFriendsFbIds
  usersQuery.equalTo('movieId', movieId)
  usersQuery.find
    success: (results) -> console.log "results",results
    error: (e) -> console.log "error",e

# saveUser {name: 'aaa'}
saveUser {name: 'complete', movieId: 222, rating: false}

getFriendsForMovie 111, ['aaa']
