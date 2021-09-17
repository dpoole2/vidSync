import consumer from "./consumer"
var connected = 0;
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
      var video = document.querySelector('video');
      video.pause();
    }
    else if(data == "PLAY"){
      var video = document.querySelector('video');
      video.play();
    }
    else{
      console.log(data);
      $("#view_count").text("View Count: " + data );
    }
  
  }
});
