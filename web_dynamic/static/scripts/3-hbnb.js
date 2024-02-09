$(document).ready(function () {
  checkAmenities();
  checkApiStatus();
  fetchPlacesApi();
});

function checkAmenities () {
  const amenitList = {};
  $('.chkbx_amenity').on('change', function () {
    const amenitId = $(this).attr('data-id');
    const amenitName = $(this).attr('data-name');
    if ($(this).is(':checked')) {
      amenitList[amenitName] = amenitId;
    } else if ($(this).is(':not(:checked)')) {
      delete amenitList[amenitName];
    }
    const amenitNames = Object.keys(amenitList);
    $('.amenities h4').text(amenitNames.sort().join(', '));
  });
}

function checkApiStatus () {
  const apiUrl = 'http://127.0.0.1:5001/api/v1/status/';
  $.get(apiUrl, function (data, status) {
    if (data.status === 'OK' && status === 'success') {
      $('#api_status').attr('class', 'available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
}

function fetchPlacesApi () {
  const apiUrl = 'http://127.0.0.1:5001/api/v1/places_search/';
  $.ajax({
    type: 'POST',
    url: apiUrl,
    headers: { 'Content-Type': 'application/json' },
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
