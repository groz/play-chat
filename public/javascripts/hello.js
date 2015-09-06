if (window.console) {
  console.log("Welcome to your Play application's JavaScript!");
}

angular.module("ChatApp", []).controller("ChatController", function($scope){
  // connect to websockets endpoint of our server
  var ws = new WebSocket("ws://localhost:9000/socket");

  // binding model for the UI
  var chat = this;
  chat.messages = [];
  chat.currentMessage = "";
  chat.username = "";

  // what happens when user enters message
  chat.sendMessage = function() {
    var text = chat.username + ": " + chat.currentMessage;
    chat.messages.push(text);
    chat.currentMessage = "";
    // send it to the server through websockets
    ws.send(text);
  };

  // what to do when we receive message from the webserver
  ws.onmessage = function(msg) {
    chat.messages.push(msg.data);
    $scope.$digest();
  };
});
