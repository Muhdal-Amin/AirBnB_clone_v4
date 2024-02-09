$(document).ready(function () {
  checkAmenities();
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
