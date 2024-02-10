$(document).ready(function () {
    checkAmenities();
    checkApiStatus();
    fetchPlacesApi();

    // Listen for changes on each input checkbox tag
    $('.chkbx_amenity').on('change', function () {
	const locationList = {};

	// Loop through all checked checkboxes
	$('.chkbx_amenity:checked').each(function () {
	    const locationId = $(this).attr('data-id');
	    const locationType = $(this).attr('data-type');

	    // Store the State or City ID in a variable (dictionary or list)
	    if (!(locationType in locationList)) {
		locationList[locationType] = [];
	    }
	    locationList[locationType].push(locationId);
	});

	// Update the h4 tag inside the div Locations with the list of States or Cities checked
	const locationNames = Object.keys(locationList);
	$('.locations h4').text(locationNames.sort().join(', '));
    });

    // Listen for click event on button tag
    $('button').on('click', function () {
	const amenitiesChecked = [];
	$('.chkbx_amenity:checked').each(function () {
	    amenitiesChecked.push($(this).attr('data-id'));
	});

	// Send a new POST request to places_search with the list of Amenities, Cities, and States checked
	$.ajax({
	    type: 'POST',
	    url: 'http://127.0.0.1:5001/api/v1/places_search/',
	    contentType: 'application/json',
	    data: JSON.stringify({ amenities: amenitiesChecked }),
	    success: function (places) {
		$('.places').empty();
		$.each(places, function (index, place) {
		    $('.places').append(`<article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${place.max_guest} Guest${place.max_guest > 1 ? 's' : ''}</div>
                            <div class="number_rooms">${place.number_rooms} Room${place.number_rooms > 1 ? 's' : ''}</div>
                            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms > 1 ? 's' : ''}</div>
                        </div>
                        <div class="description">${place.description}</div>
                    </article>`);
		});
	    }
	});
    });

    // Listen for click event on the span next to the Reviews h2
    $('span:contains("Reviews")').on('click', function () {
	const $reviewsContainer = $('.reviews');
	const $reviewsToggle = $(this);

	// If the text is "hide", remove all Review elements from the DOM
	if ($reviewsToggle.text() === 'Hide') {
	    $reviewsContainer.empty();
	    $reviewsToggle.text('Reviews');
	    return; // Exit the function early
	}

	// Fetch, parse, and display reviews
	fetchReviews();

	// Change the text to "hide"
	$reviewsToggle.text('Hide');
    });
});

// Function to check API status
function checkApiStatus() {
    const apiUrl = 'http://127.0.0.1:5001/api/v1/status/';
    $.get(apiUrl, function (data, status) {
	if (data.status === 'OK' && status === 'success') {
	    $('#api_status').attr('class', 'available');
	} else {
	    $('#api_status').removeClass('available');
	}
    });
}

// Function to fetch places data from the API
function fetchPlacesApi() {
    const apiUrl = 'http://127.0.0.1:5001/api/v1/places_search/';
    $.ajax({
	type: 'POST',
	url: apiUrl,
	contentType: 'application/json',
	data: JSON.stringify({}),
	success: function (places) {
	    $.each(places, function (index, place) {
		$('.places').append(`<article>
                    <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">$${place.price_by_night}</div>
                    </div>
                    <div class="information">
                        <div class="max_guest">${place.max_guest} Guest${place.max_guest > 1 ? 's' : ''}</div>
                        <div class="number_rooms">${place.number_rooms} Room${place.number_rooms > 1 ? 's' : ''}</div>
                        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms > 1 ? 's' : ''}</div>
                    </div>
                    <div class="description">${place.description}</div>
                </article>`);
	    });
	}
    });
}

// Function to fetch and display reviews
function fetchReviews() {
    const $reviewsContainer = $('.reviews');

    // Make a request to the backend API to get reviews
    $.ajax({
	type: 'GET',
	url: 'http://127.0.0.1:5001/api/v1/reviews/',
	success: function (reviews) {
	    // Display reviews in the reviews container
	    $.each(reviews, function (index, review) {
		$reviewsContainer.append(`<div class="review">${review.text}</div>`);
	    });
	},
	error: function (error) {
	    console.error('Error fetching reviews:', error);
	}
    });
}
