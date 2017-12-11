//https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json
const dataToRenderToUI = [];

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';


function getYoutubeDataFromApi(searchTerm) {
	const query = {
		part: 'snippet',
		key: 'AIzaSyD17LB6B0n1xLXeZxqdrLipd82Z1Ld2y8U',
		q: `${searchTerm}`
	}
	$.getJSON(YOUTUBE_SEARCH_URL, query, (response) => {
		response.items.forEach((item) => {
			let obj = {
				title: item.snippet.title
			}

			dataToRenderToUI.push(obj)
		})
	});
}

//////////////////////////////////
const WIKI_SEARCH_URL = 'https://en.wikipedia.org/w/api.php';

function getDataFromWikiApi(searchTerm) {
	//$.getJSON(`https://en.wikipedia.org/w/api.php?action=query&titles=${searchTerm}&prop=revisions&rvprop=content&format=json&callback=?`, callback);
	$.ajax({
		url: 'https://en.wikipedia.org/w/api.php',
		data: {
			action: 'query',
			list: 'search',
			srsearch: searchTerm,
			format: 'json'
		},
		dataType: 'jsonp',
		success: (response) => {
			response.query.search.forEach((item) => {
				let obj = {
					title: item.title
				}

				dataToRenderToUI.push(obj)
			})

			renderUi()
		}
	});
}

function render() {
	dataToRenderToUI.forEach((item) => {
		return $('div').append(`<p>${item.title}</p>`)
	})
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
			getYoutubeDataFromApi(query);
			getDataFromWikiApi(query);
			// clear out the input
			$('.js-query').val("");
		}
	})
}

function init() {
	goButtonClicked();
}
$(init);
