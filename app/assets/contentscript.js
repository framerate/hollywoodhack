$(document).ready(function(){
	var desc = $('meta[name=omni_page').attr('content');
	desc = desc.split(' - ')[1];
	urlDesc = encodeURI(desc);
	$.getJSON('http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=snxd2wjz2z9n9vvrhpyv6mgn&q='+desc, function(data) {
		var poster = $('<img />').attr('src', data.movies[0].posters.thumbnail)
		$('body').prepend(poster);
	});
});