// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"
import "../stylesheets/application";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { computeStyles } from "@popperjs/core";
require("bootstrap")

var fetched = 0;
var trueCount = 1;

require( 'jquery' );
require('jquery.iframetracker');
Rails.start()
Turbolinks.start()
ActiveStorage.start()

//Video controller
$(document).on("turbolinks:load", function()
{
  $("#video-player").on('pause', function(event)
  {
    $.ajax({
      type: "POST",
      url: '/pause_video?video=1',
      data: {pause: 1}
    });
  });
  $("#video-player").on('play', function(event)
  {
    $.ajax({
      type: "POST",
      url: '/play_video?video=1',
      data: {play: 1}
    });
  });
});


$(document).on("turbolinks:load", function(){
  
    var video = document.querySelector('video');
    var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
  
  if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
    var mediaSource = new MediaSource;
    video.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener('sourceopen', sourceOpen);
  } else {
    console.error('Unsupported MIME type or codec: ', mimeCodec);
  }
 
  function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

 var cutoff = 9;

function addData(sourceBuffer, end){
  fetchAB(end, function (buf) {
    sourceBuffer.appendBuffer(buf);
    sourceBuffer.addEventListener('updateend', function (_) {
      mediaSource.endOfStream();
      end += 1;
      if(end >= cutoff)
      {
        //End the stream...
        return end;
      }
      else{
        return addData(sourceBuffer, end);
      }
    });
  });
}



 function sourceOpen (_) {
    var mediaSource = this;
    var sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
    var segment_count = addData(sourceBuffer, 1);  
  };
  
  function fetchAB (count, cb) {
    var url = "/get_chunk?count=" + count.toString();
    var xhr = new XMLHttpRequest;
    xhr.open('get', url);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
      cb(xhr.response);
    };
    xhr.send();
  };
});

