function testAdMessage() {

var wrapper = $(".wrapper");
//var row = $(".box-riga");

//var rigaBox = document.createElement("div");
var message = document.createElement("div");
var messageContent = document.createElement("p");
var messageDetail = document.createElement("span");

var inputVal = $(".input-txt");
var usrVal = inputVal.val();
$(messageContent).text(usrVal);
$(messageDetail).text("12:31");

message.append(messageContent);
message.append(messageDetail);
wrapper.append(message);
//row.append(rigaBox);


//$(rigaBox).addClass("box-riga");
$(message).addClass("mex-received");
$(messageContent).addClass("txt-mex");
$(messageDetail).addClass("time-mex");

}

function testAdMessage2() {

var wrapper = $(".wrapper");
//var row = $(".box-riga");

//var rigaBox = document.createElement("div");
var message = document.createElement("div");
var messageContent = document.createElement("p");
var messageDetail = document.createElement("span");


$(messageContent).text("Chi sei??");
$(messageDetail).text("12:34");

message.append(messageContent);
message.append(messageDetail);
wrapper.append(message);
//row.append(rigaBox);


//$(rigaBox).addClass("box-riga");
$(message).addClass("mex-sent");
$(messageContent).addClass("txt-mex");
$(messageDetail).addClass("time-mex");

}

function txtEnterEvent(e) { // e sostanzialmente è la variabile che salva l'evento enter che accade a riga 43

  if (e.which == 13) { // se il bottone premuti è ENTER sulla tastiera (il numero 13 fa riferimento proprio ad ENTER)

    var inputVal = $(".input-txt");
    testAdMessage();
    setTimeout(testAdMessage2, 3000);
    inputVal.val("");

  }
}

function switchClass() {

  var mexActive = $(".container-mex > .box-mex.active");
  var allMex = $(".container-mex > .box-mex");
  var me = $(this);
  me.click(function() {

    var allMex = $(".container-mex > .box-mex");
    var me = $(this);
    me.addClass("active");
    mexActive.removeClass("active");
  });
}

function init() {

  switchClass();

  var txt = $(".input-txt");
  txt.keyup(txtEnterEvent);
}

$(document).ready(init);
