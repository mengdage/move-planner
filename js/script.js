
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $street = $('#street');
    var $city = $('#city');

    var nytAPIKey = '69fa9b6742654bb499ce82d5f41ff1de';

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var nytBaseUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
    var googleMapsBase = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=';
    var streetName = $street.val();
    var cityName = $city.val();
    var address = streetName + ', '+cityName;
    var $mapImage = $('<img>');
    $greeting.text('You wan to live at ' + address + '?');
    $mapImage.addClass('bgimg');
    $mapImage.attr('src', googleMapsBase+address);
    $body.append($mapImage);

    // search articles from new york times
    var nytUrl = nytBaseUrl + '?q=' + cityName+'&api-key='+nytAPIKey;
    $.getJSON(nytUrl, function(response) {
      $nytHeaderElem.text('New York Times Articles about ' + cityName);
      var articles = response.response.docs;
      var $articleList = $('<ul>');
      $articleList.attr('id', 'nytimes-articles');
      $articleList.addClass('article-list');
      $nytElem.append($articleList);

      articles.forEach(function(article) {
      // console.log(response);
        var $articleItem = $('<li>');
        $articleItem.addClass('article');

        var articleTitle = article.headline.main;
        var articleDate = new Date(article.pub_date).toDateString();
        var articleSnippet = article.snippet;
        var articleUrl = article.web_url;

        $articleItem.append('<a href="' + articleUrl+'">' + articleTitle+' '+articleDate+'</a>' +
          '<p>'+articleSnippet+'</p>');
        $articleList.append($articleItem);
      });
    }).fail(function(){
      $nytHeaderElem.text('New York Times Articles Could Not Be loaded');
    });

    return false;
}

// $('#form-container').on('click', loadData);
$('#form-container').submit(loadData);
