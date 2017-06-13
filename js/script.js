
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $street = $('#street');
    var $city = $('#city');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var googleMapsBase = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=';
    var streetName = $street.val();
    var cityName = $city.val();
    var address = streetName + ', '+cityName;
    var $mapImage = $('<img>');
    $greeting.text('You wan to live at ' + address + '?');
    $mapImage.addClass('bgimg');
    $mapImage.attr('src', googleMapsBase+address);
    $body.append($mapImage);

    return false;
}

// $('#form-container').on('click', loadData);
$('#form-container').submit(loadData);
