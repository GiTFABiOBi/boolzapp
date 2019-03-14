function testAddMessage(sent, content) {

  var wrapper = $(".dinamic-tab.selected .wrapper");

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

  if (e.which == 13) { // se il bottone premuto è ENTER (il numero 13 fa riferimento proprio ad ENTER)

    var activeMsg = $(".wrapper");

    var txt = me.val();
    var msg = testAddMessage(false, txt);
    activeMsg.append(msg);
    me.val("");

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

function clickRight(e) {

  if (e.which === 3) {


    var box = document.createElement("div");
    var mess = document.createElement("a");

    $(box).addClass("box-r_clk");
    $(mess).attr("href", "#");

    var me = $(this);
    var sent = $(".box-riga > .mex-sent");
    var received = $(".box-riga > .mex-received");
    if (me == sent) {

      mess.append("test click destro mouse");
      box.append(mess);
      sent.append(box);
    } else if (me == received){

      mess.append("test click destro mouse");
      box.append(mess);
      received.append(box);
    }
  }
}

function init() {
  // scatena evento enter da tastiera aggiungendo i messaggi
  var txt = $(".input-txt");
  txt.keyup(txtEnterEvent);
  //cambia il colore di sfondo a scuro per il contatto selezionato
  var list = $(".container-contact > .box-mex");
  list.click(switchClass);
  // campo di ricerca per i contatti: esclude i contatti che non contengono la/e lettere inserite nell'input
  var txtSearch = $("input.input");
  txtSearch.keyup(searchMessage);
  //cliccando su un contatto si attiva la sua scheda con i propri messaggi
  var boxes = $(".box-mex")
  boxes.click(clickContact);
  //
  var msgS = $(".box-riga");
  msgS.mousedown(clickRight);
}

$(document).ready(init);
