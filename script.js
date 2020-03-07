/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

/*var tunes = document.getElementById('playlist').querySelectorAll('li');
var i;
for (i = 0; i < tunes.length; i++) {
  tunes[i].addEventListener("click", function(){
    this.classList.toggle('active');
  });
}*/

var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken('b65d6c4d1f5f451288cbedee9cbf93e6');


function searchSpotify(code) {
  spotifyApi.searchTracks('Love')
  .then(function(data) {
    console.log('Search by "Love"', data);
  }, function(err) {
    console.error(err);
  });
}

function decode(src) {
  console.log("lolo" + src);
  Quagga.decodeSingle(
    {
      inputStream: {
        size: 800,
        singleChannel: false
      },
      locator: {
        patchSize: "large",
        halfSample: false
      },
      decoder: {
        readers: [
          {
            format: "ean_reader",
            config: {}
          }
        ]
      },
      locate: true, 
      src: src 
    },
    function(result) {
      if (result.codeResult) {
        $("#coderes").text(result.codeResult.code);
        searchSpotify(result.codeResult.code);
      } else {
        console.log("not detected");
        $("#coderes").text("nope");
      }
    }
  );
}

$(function() {

  $("#btn input[type=file]").on("change", function(e) {
    if (e.target.files && e.target.files.length) {
        decode( URL.createObjectURL(e.target.files[0] ) );
    }
  });

  $("#btn2 input[type=file]").on("change", function(e) {
    if (e.target.files && e.target.files.length) {
        decode( URL.createObjectURL(e.target.files[0] ) );
    }
  });

  $(".wrapper-1 .reset").on("click", function(e) {
    $('.wrapper-1').toggleClass('active');
  });

  $(".wrapper-2 .reset").on("click", function(e) {
    $('.wrapper-2').toggleClass('active');
  });
});