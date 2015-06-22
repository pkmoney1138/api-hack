$(function() {
	$('.input-area').submit(function(event) {
		event.preventDefault();
		//clear results area
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
		//first ajax request to get poster info and movie id #
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
			$('.info-result-area').append('<p id="year">Release Date: ' + yearResults + '</p>');
			movieId = requestResults.results[0].id;
			//second ajax request to get credit info, that only comes with movie id# search
			var nextResults = $.ajax({
				url: 'https://api.themoviedb.org/3/movie/' + movieId + '?&api_key=5d2e1d441f19e5a09a7196542b0d8c79&append_to_response=credits',
				dataType: 'jsonp',
				type: 'GET',
				})
			.done(function(nextResults) {
				console.log(nextResults)
				//crew info shifts in data so paring crew names with crew job
				firstCrewTitle = nextResults.credits.crew[1].job;
				secondCrewTitle = nextResults.credits.crew[2].job;
				firstCrewResult = nextResults.credits.crew[1].name;
				secondCrewResult = nextResults.credits.crew[2].name;
				starringResults = nextResults.credits.cast[1].name;
				console.log(firstCrewResult);
				console.log(secondCrewResult);
				console.log(starringResults);
				$('.info-result-area').append('<p id="first-crew">' + firstCrewTitle + ': ' + firstCrewResult + '</p>');
				$('.info-result-area').append('<p id="second-crew">' + secondCrewTitle + ': ' + secondCrewResult + '</p>');
				$('.info-result-area').append('<p id="starring">Starring: ' + starringResults + '</p>');
			})
			.fail(function() {
				$('.poster-result-area').append('<p>Got nothing</p>');
			})
		})
		.fail(function() {
			$('.poster-result-area').append('<p>Man, we ain\'t found nothing!</p>');
		})	
	};
});