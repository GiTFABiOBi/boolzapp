// function testAddMessage(sent, content) {
//
//   var wrapper = $(".dinamic-tab.selected .wrapper");
//
//   var rigaBox = document.createElement("div");
//   var message = document.createElement("div");
//   var boxMsg = document.createElement("div");
//   var messageContent = document.createElement("p");
//   var check = document.createElement("i");
//   var messageDetail = document.createElement("span");
//   var optionWin = document.createElement("div");
//   var divDelete = document.createElement("div");
//   var divInfo = document.createElement("div");
//   var txtDelete = document.createElement("span");
//   var txtInfo = document.createElement("span");
//
//   if (sent) {
//
//     $(message).addClass("mex-received");
//     $(boxMsg).addClass("box-relative-opt");
//     $(check).addClass("fas fa-check");
//     $(rigaBox).addClass("box-riga");
//     $(messageContent).addClass("txt-mex").text(content);
//     $(messageDetail).addClass("time-mex").text("12:34");
//     $(optionWin).addClass("box-option-msg");
//     $(divDelete).addClass("opt delete");
//     $(divInfo).addClass("opt info");
//     $(txtDelete).text("Delete Message");
//     $(txtInfo).text("Info Message");
//   } else {
//
//     $(message).addClass("mex-sent");
//     $(boxMsg).addClass("box-relative-opt");
//     $(check).addClass("fas fa-check");
//     $(rigaBox).addClass("box-riga");
//     $(messageContent).addClass("txt-mex").text(content);
//     $(messageDetail).addClass("time-mex").text("12:34");
//     $(optionWin).addClass("box-option-msg");
//     $(divDelete).addClass("opt delete");
//     $(divInfo).addClass("opt info");
//     $(txtDelete).text("Delete Message");
//     $(txtInfo).text("Info Message");
//   }
//
//   rigaBox.append(message);
//   message.append(boxMsg);
//   boxMsg.append(messageContent);
//   boxMsg.append(check);
//   boxMsg.append(messageDetail);
//   boxMsg.append(optionWin);
//   optionWin.append(divDelete);
//   optionWin.append(divInfo);
//   divDelete.append(txtDelete);
//   divInfo.append(txtInfo);
//
//   return rigaBox;
// }

function getRndAnswerAPI() {

  $.ajax({

    url : "https://flynn.boolean.careers/exercises/api/random/sentence",
    method : "GET",
    success : function(data, state) {

      // codice con logica corretta (ed uso sapiente delle funzioni)
      if (data.success) {

        var txt = data.response;
        testAddMessage(false, txt);
        var scrollSelector = $(".box.dx .wrapper");
        scrollSelector.animate({scrollTop: scrollSelector.prop("scrollHeight")});// scroll automatico all'aggiunta di messaggi che raggiungon il fondo della pagina
      }

      // codice con mia logica
      // var inData = {
      //   class : "mex-sent",
      //   testo : data.response,
      //   orario : "17:13",
      //   delete : "Delete Message",
      //   info : "Info Message",
      // };
      //
      // if (data.success) {
      //
      //   var wrapper = $(".dinamic-tab.selected .wrapper");
      //   var template = $("#box-template").html();
      //   var compiled = Handlebars.compile(template);
      //   var msgHTML = compiled(inData);
      //
      //   wrapper.append(msgHTML);
      // }
    },
    error : function(request, state, error) {

      console.log("request", request);
      console.log("state", state);
      console.log("error", error);
    },
  });
}

function testAddMessage(sent, content) {

  var wrapper = $(".dinamic-tab.selected .wrapper");
  var input = $(".input-txt");
  var txt = input.val();
  input.val("");

  var data = {
    orario : "17:13",
    delete : "Delete Message",
    info : "Info Message",
  };

  if (sent) {
    data.class = "mex-received";
    data.testo = txt;
  } else {
    data.class = "mex-sent";
    data.testo = content
  }

  var template = $("#box-template").html();
  var compiled = Handlebars.compile(template);
  var msgHTML = compiled(data);

  wrapper.append(msgHTML);
}

function txtEnterEvent(e) { // il parametro 'e' è la variabile che salva l'evento enter

  if (e.which == 13) { // se il bottone premuto è ENTER (il numero 13 fa riferimento proprio ad ENTER)

    testAddMessage(true);

    var scrollSelector = $(".box.dx .wrapper");
    scrollSelector.animate({scrollTop: scrollSelector.prop("scrollHeight")});// scroll automatico all'aggiunta di messaggi che raggiungon il fondo della pagina

    setTimeout(getRndAnswerAPI, 1000);
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

    var mex = listMex.eq(i);// estrae il singolo nome dell'elenco utenti sulla sx
    var mexTxt = mex.text().toLowerCase();// rende tutti i caratteri minuscoli
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

function show() {

  var me = $(this);
  var wind = me.find(".box-option-msg");
  wind.toggleClass("show");
}

function deleteMsg() {

  var me = $(this);
  var msgToDel = me.closest(".box-riga");
  msgToDel.remove();
}

function init() {
  var doc = $(document);

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
  // attiva finestra opzioni per cancellare un messaggio
  // var msgS = $(".box-riga");
  // msgS.mousedown(clickRight);

  doc.on("click", ".box-relative-opt", show);
  doc.on("click", ".opt.delete", deleteMsg);
}

$(document).ready(init);
