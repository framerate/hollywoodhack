Parse.initialize "BstL12H3UWg80NUkm5zx4QnOM30KexqaQ3gPC7Ej", "wN5GgDLu9JpYtDXtLt4h5XQcdRKgH44RsrrhA6Vh"
TestObject = Parse.Object.extend "TestObject"
testObject = new TestObject
testObject.save foo: "bar",
  success: (object) ->
  	console.log "yay it worked"