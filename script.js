function testAddMessage() {

var wrapper = $(".wrapper");

var rigaBox = document.createElement("div");
var message = document.createElement("div");
var messageContent = document.createElement("p");
var messageDetail = document.createElement("span");

var inputVal = $(".input-txt");
var usrVal = inputVal.val();
$(messageContent).text(usrVal);
$(messageDetail).text("12:31");

message.append(messageContent);
message.append(messageDetail);
rigaBox.append(message);
wrapper.append(rigaBox);


$(rigaBox).addClass("box-riga");
$(message).addClass("mex-received");
$(messageContent).addClass("txt-mex");
$(messageDetail).addClass("time-mex");

}

function testAddMessage2() {

var wrapper = $(".wrapper");

var rigaBox = document.createElement("div");
var message = document.createElement("div");
var messageContent = document.createElement("p");
var messageDetail = document.createElement("span");


$(messageContent).text("Chi sei??");
$(messageDetail).text("12:34");

message.append(messageContent);
message.append(messageDetail);
rigaBox.append(message);
wrapper.append(rigaBox);


$(rigaBox).addClass("box-riga");
$(message).addClass("mex-sent");
$(messageContent).addClass("txt-mex");
$(messageDetail).addClass("time-mex");

}

function txtEnterEvent(e) { // sostanzialmente è la variabile che salva l'evento enter

  if (e.which == 13) { // se il bottone premuto è ENTER (il numero 13 fa riferimento proprio ad ENTER)

    var inputVal = $(".input-txt");
    testAddMessage();
    setTimeout(testAddMessage2, 1000);
    inputVal.val("");

  }
}

function switchClass() {

  var old = $(".container-mex > .box-mex.active")
  old.removeClass("active");
  var me = $(this);
  me.addClass("active");
}

function searchMessage() {

  var me = $(this);
  var content = me.val();
  var listMex = $(".box_t-o > .titolo");

  for (var i = 0; i < listMex.length; i++) {

    var mex = listMex.eq(i);
    var mexTxt = mex.text();
    var boxes = $(".box-mex");// lista dei box che andranno nascosti se non corrispondono alla lettera inserita
    var box = boxes.eq(i); // estrae iEsimo elemento box da nascondere

    if (!mexTxt.includes(content)) {

      box.addClass("hidden");
    } else {

      box.removeClass("hidden");
    }

  }
}

function init() {


  var txt = $(".input-txt");
  txt.keyup(txtEnterEvent);

  var list = $(".container-mex > .box-mex");
  list.click(switchClass);

  var txtSearch = $("input.input");
  txtSearch.keyup(searchMessage);
}

$(document).ready(init);
