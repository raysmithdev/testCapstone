
//https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json


const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getYoutubeDataFromApi(searchTerm, callback) {
	
	const query = {
		part: 'snippet',
		key: 'AIzaSyD17LB6B0n1xLXeZxqdrLipd82Z1Ld2y8U',
		q: `${searchTerm}`

	}

	$.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderYoutubeResult(result) {
	return `
	<div class="result thumbnail">
	<a target="_blank" href=${'https://www.youtube.com/watch?v=' + 
	result.id.videoId}>
	Watch ${result.snippet.title}<br>
	<img src="${result.snippet.thumbnails.medium.url}">
	</a>
	</div>
	`;
}

function displayYoutubeSearchData(data) {

	const results = data.items.map((item, index) => renderYoutubeResult(item));
	$('.youtube-search-results').html(results);
}




//////////////////////////////////




const WIKI_SEARCH_URL = 'https://en.wikipedia.org/w/api.php';

function getDataFromWikiApi(searchTerm, callback) {

//$.getJSON(`https://en.wikipedia.org/w/api.php?action=query&titles=${searchTerm}&prop=revisions&rvprop=content&format=json&callback=?`, callback);

$.ajax({
	url: 'https://en.wikipedia.org/w/api.php',
	data: { action: 'query', list: 'search', srsearch: searchTerm, format: 'json' },
	dataType: 'jsonp',
	success: callback

});

}

function launderWikiResult(thisObject) {
	return `<div class="result wikilink">
	<a href="https://en.wikipedia.org/?curid=${thisObject.pageid}" target="_blank">${thisObject.title} | </a>
	</div>`
}



function displayWikiSearchData(data) {
	console.log(data);
  	//search is an array of objects
  	const results = data.query.search.map((item, index) => 
  		launderWikiResult(item));
  	$('.wiki-search-results').html(results);
  }





//listen for go button
function goButtonClicked() {	
	$('.js-search-form').on('submit', function(event) {
		event.preventDefault();
		const query = $('.js-query').val();
		console.log(query);
		if (query === null) {
			alert('Please choose a year!');
		} else {
			getYoutubeDataFromApi(query, displayYoutubeSearchData);
			getDataFromWikiApi(query, displayWikiSearchData);
			    // clear out the input
			    $('.js-query').val("");
			}    
		})
}



function init() {
	goButtonClicked();
}

$(init);



