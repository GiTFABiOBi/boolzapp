function testAddMessage(sent, content) {

  var wrapper = $(".wrapper");


  var rigaBox = document.createElement("div");
  var message = document.createElement("div");
  var messageContent = document.createElement("p");
  var messageDetail = document.createElement("span");

  if (sent) {
    $(message).addClass("mex-sent");
    $(messageContent).text(content);
    $(messageDetail).text("12:34");

    $(rigaBox).addClass("box-riga");
    $(messageContent).addClass("txt-mex");
    $(messageDetail).addClass("time-mex");
  } else {
    $(message).addClass("mex-received");
    $(messageContent).text(content);
    $(messageDetail).text("12:34");

    $(rigaBox).addClass("box-riga");
    $(messageContent).addClass("txt-mex");
    $(messageDetail).addClass("time-mex");
  }

  message.append(messageContent);
  message.append(messageDetail);
  rigaBox.append(message);
  wrapper.append(rigaBox);

}

function txtEnterEvent(e) { // sostanzialmente è la variabile che salva l'evento enter

  var me = $(this);
  var activeMsg = $(".wrapper");

  if (e.which == 13) { // se il bottone premuto è ENTER (il numero 13 fa riferimento proprio ad ENTER)

    var txt = me.val();
    var msg = testAddMessage(false, txt);
    activeMsg.append(msg);

    setTimeout(function() {

      msg = testAddMessage(true, "chi sei??");
      activeMsg.append(msg);
    }, 2000);

  }
}

function switchClass() {

  var old = $(".container-contact > .box-mex.active")
  old.removeClass("active");
  var me = $(this);
  me.addClass("active");
}

function searchMessage() {

  var me = $(this);
  var content = me.val().toLowerCase();
  var listMex = $(".box_t-o > .titolo");

  for (var i = 0; i < listMex.length; i++) {

    var mex = listMex.eq(i);
    var mexTxt = mex.text().toLowerCase();
    var boxes = $(".box-mex");// lista dei box che andranno nascosti se non corrispondono alla lettera inserita
    var box = boxes.eq(i); // estrae iEsimo elemento box da nascondere

    if (!mexTxt.includes(content)) {

      box.addClass("hidden");
    } else {

      box.removeClass("hidden");
    }

  }
}

function clickContact() {

  var me = $(this);
  var indBox = me.index();

  var boxes = $(".dinamic-tab");
  boxes.removeClass("selected");
  var boxSelected = boxes.eq(indBox);
  boxSelected.addClass("selected");
}

function init() {


  var txt = $(".input-txt");
  txt.keyup(txtEnterEvent);

  var list = $(".container-contact > .box-mex");
  list.click(switchClass);

  var txtSearch = $("input.input");
  txtSearch.keyup(searchMessage);

  var boxes = $(".box-mex")
  boxes.click(clickContact);
}

$(document).ready(init);
