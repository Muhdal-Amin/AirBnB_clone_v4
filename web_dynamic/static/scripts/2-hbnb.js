$(document).ready(function () {
  checkAmenities();
  checkApiStatus();
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
  const url = 'http://127.0.0.1:5001/api/v1/status/';
  $.get(url, function (data, status) {
    if (data.status === 'OK' && status === 'success') {
      $('#api_status').attr('class', 'available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
}
