$(document).ready(function () {
    let amenitList = {};
    $('.chkbx_amenity').on('change', function () {
        let $checkbox = $(this);
        let amentId = $(this).attr('data-id');
        let amentName = $(this).attr('data-name');
        if ($checkbox.is(':checked')) {
            amenitList[amentName] = amentId;
        } else if ($(this).is(':not(:checked)')) {
            delete amenitList[amentName];
        }
        const amenitNames = Object.keys(amenitList);
        $('.amenities h4').text(amenitNames.sort().join(', '));
    });
});