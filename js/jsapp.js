$(function() {
	$('.input-area').submit(function(event) {
		event.preventDefault();
		$('.poster-result-area').html('');
		$('.info-result-area').html('');
		var movie = $(this).find("input[name='movie']").val();
		$('.input-box').val('');
		getRequest(movie);
	});

	function getRequest(movie) {
		var parameters = {
			query: movie,
			api_key: '5d2e1d441f19e5a09a7196542b0d8c79'
			}
		var requestResults = $.ajax({
			url: 'https://api.themoviedb.org/3/search/movie?',
			data: parameters,
			dataType: 'jsonp',
			type: 'GET',
			})
		.done(function(requestResults) {
			console.log(requestResults);
			postersResults = requestResults.results[0].poster_path;
			yearResults = requestResults.results[0].release_date;
			console.log(postersResults);
			console.log(yearResults);
			$('.info-result-area').show();
			$('.poster-result-area').append('<img class=poster src=https://image.tmdb.org/t/p/original' + postersResults + ' alt=image />');
			$('.info-result-area').append('<p id="year">Year Of Release: ' + yearResults + '</p>');
			movieId = requestResults.results[0].id;
			var nextResults = $.ajax({
				url: 'https://api.themoviedb.org/3/movie/' + movieId + '?&api_key=5d2e1d441f19e5a09a7196542b0d8c79&append_to_response=credits',
				dataType: 'jsonp',
				type: 'GET',
				})
			.done(function(nextResults) {
				console.log(nextResults)
				directorResults = nextResults.credits.crew[1].name;
				writerResults = nextResults.credits.crew[2].name;
				starringResults = nextResults.credits.cast[1].name;
				console.log(directorResults);
				console.log(writerResults);
				console.log(starringResults);
				$('.info-result-area').append('<p id="director">Director: ' + directorResults + '</p>');
				$('.info-result-area').append('<p id="writer">Writer: ' + writerResults + '</p>');
				$('.info-result-area').append('<p id="starring">Starring: ' + starringResults + '</p>');
			})
			.fail(function() {
				$('.poster-result-area').append('<p>Got nothing</p>');
			})
		})
		.fail(function() {
			$('.poster-result-area').append('<p>Man, we ain\'t found shit!</p>');
		})	
	};
});