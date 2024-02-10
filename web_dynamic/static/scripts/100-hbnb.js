$(document).ready(function () {
	// checkAmenities();
	checkApiStatus();
	fetchPlacesApi();
	checkFilterChange('.chkbx_amenity', '.amenities h4');
	checkFilterChange('.chkbx_state', '.locations h4');
	checkFilterChange('.chkbx_city', '.locations h4');

	// checkStatesApi();
	// checkCitiesApi();

	$('button').on('click', function () {
		const amenitiesChecked = [];
		$('.chkbx_amenity:checked').each(function () {
			amenitiesChecked.push($(this).attr('data-id'));
		});

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
});

function checkAmenities() {
	const amenityList = {};
	$('.chkbx_amenity').on('change', function () {
		console.log($(this));
		const amenityId = $(this).attr('data-id');
		const amenityName = $(this).attr('data-name');
		console.log(amenityName);
		if ($(this).is(':checked')) {
			amenityList[amenityName] = amenityId;
		} else if ($(this).is(':not(:checked)')) {
			delete amenityList[amenityName];
		}
		const amenityNames = Object.keys(amenityList);
		$('.amenities h4').text(amenityNames.sort().join(', '));
	});
}

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

function checkStatesApi() {
	const statesList = {};
	$('.chkbx_state').on('change', function () {
		console.log($(this));
		const stateId = $(this).attr('data-id');
		const stateName = $(this).attr('data-name');
		if ($(this).is(':checked')) {
			statesList[stateName] = stateId;
		} else if ($(this).is(':not(:checked)')) {
			delete statesList[stateName];
		}
		console.log(statesList);
		const amenityNames = Object.keys(statesList);
		$('.locations h4').text(amenityNames.sort().join(', '));
	});
}

function checkCitiesApi() {
	const citiesList = {};
	$('.chkbx_city').on('change', function () {
		console.log($(this));
		const cityId = $(this).attr('data-id');
		const cityName = $(this).attr('data-name');
		if ($(this).is(':checked')) {
			citiesList[cityName] = cityId;
		} else if ($(this).is(':not(:checked)')) {
			delete citiesList[cityName];
		}
		console.log(citiesList);
		const citiesNames = Object.keys(citiesList);
		$('.locations h4').text(citiesNames.sort().join(', '));
	});
}

function checkFilterChange(filterClass, targetElementSelector) {
	const filterList = {};
	
	$(filterClass).on('change', function () {
		const $targetElement = $(targetElementSelector);
		const filterNames = [];
		$(filterClass).each(function () {
			if ($(this).is(':checked')) {
				const filterId = $(this).attr('data-id');
				const filterName = $(this).attr('data-name');
				filterList[filterName] = filterId;
			}
		});

		for (const filterName in filterList) {
			filterNames.push(filterName);
		}

		$targetElement.text(filterNames.sort().join(', ')) || '';
	});
}
