'use strict';
$(document).ready(function () {
    getQuote(function (json) {
        updatePanel(json);
    });
    $('#btn-quote').on('click', function () {
        getQuote(function (json) {
            updatePanel(json);
        });
    });
    $('#btn-tweet').on('click', function () {
        var quote = $('#quote').text();
        var author = $('#author').text();
        var status = quote + ' - ' + author;
        postTweet(status);
    });
});
var getQuote = function getQuote(callback) {
    var url = 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous';
    var headers = {
        'X-Mashape-Key': 'TiNZ5sRwrGmshrZfmCMWU5dWdLtAp1WtSGMjsnMxGoWg7XCHVf',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    };
    $.ajax({
        url: url,
        headers: headers,
        dataType: 'json',
        success: function success(data) {
            callback(data);
        }
    });
};
var updatePanel = function updatePanel(json) {
    $('#quote').html('"' + json.quote + '"');
    $('#author').html(json.author);
};
var postTweet = function postTweet(status) {
    var twitterUrl = 'https://twitter.com/home';
    var tweetLink = twitterUrl + '?status=' + encodeURIComponent(status);
    console.log(tweetLink.length);
    if (tweetLink.length > 140) {
        alert('A tweet should be lesser or equal to 140 chars.');
        getQuote(function (json) {
            updatePanel(json);
        });
    } else {
        window.open(tweetLink, '_blank');
    }
};