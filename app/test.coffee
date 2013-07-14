Parse.initialize "BstL12H3UWg80NUkm5zx4QnOM30KexqaQ3gPC7Ej", "wN5GgDLu9JpYtDXtLt4h5XQcdRKgH44RsrrhA6Vh"

TRObject = Parse.Object.extend "TRObject"
trObject = new TRObject
trObject.set "FBID", "FAKEBLOCK"
 
trObject.save null,
  success: (object) ->
  	console.log "[Parse] : Sent test payload."
  error: (object, error) ->
  	console.error "ERROR: " + error.description
