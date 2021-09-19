import consumer from "./consumer"

consumer.subscriptions.create("ChatChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log("HELLLO");
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channe
    $("#content").append(`<div class='row'>
    <div class='col-md-1'></div>
    <div class='col-md-11'>${data["message"]}</div>
    </div><hr>`);
    $("#content").scrollTop($("#content").height());
  }
});
