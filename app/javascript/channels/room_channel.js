import consumer from "./consumer"
var connected = 0;
var seeked = 0;

var play = 0;
var pause = 0;
consumer.subscriptions.create("RoomChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    if(data == "PAUSE")
    {
      pause = 1;
      var video = document.querySelector('video');
      video.pause();
      pause = 0;
    }
    else if(data == "PLAY"){
      play = 1;
      var video = document.querySelector('video');
      video.play();
      play = 0;
    }
    else{
      if(typeof data === 'object')
      {
        seeked = 1;
        var video = document.querySelector('video');
        video.currentTime = data["seekTime"];
      }
      else{
         $("#view_count").text("View Count: " + data );
      }
    }
  
  }
});

$(document).on("turbolinks:load", function()
{

  $("#video-player").on('pause', function(event)
  {
    if(pause == 0)
    {
      $.ajax({
        type: "POST",
        url: '/pause_video?video=1',
        data: {pause: 1}
      });
    }
   
  });
  $("#video-player").on('seeked', function(event)
  {
    if(seeked == 0)
    {
      var seekTime = event.target.currentTime;
      $.ajax({
        type: "POST",
        url: '/seek_video?video=1',
        data: {seekTime: seekTime}
      });
    }
    else{
      seeked = 0;
    }
    
  });
  $("#video-player").on('play', function(event)
  {
    if(play == 0)
    {
      $.ajax({
        type: "POST",
        url: '/play_video?video=1'
      });
    }
  });
});
