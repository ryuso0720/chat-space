$(function(){
  function buildHTML(message) {
    if (message.content && message.image) {
      var html = `<div class="message" data-message-id = ${message.id}>
        <div class="message__upper-info">
        <div class="message__upper-info__user-talker">
        ${message.user_name}
        </div>
        <div class="message__upper-info__date">
        ${message.created_at}
        </div>
        </div> 
        <div class="message__text"> 
        <p class="lower-message__content"> 
        ${message.content}
        </p>
        <img src=" ${message.image} " class="lower-message__image" >
        </div>
        </div>`
    } else if (message.content) {
      var html = `<div class="message" data-message-id=${message.id}>
        <div class="message__upper-info">
        <div class="message__upper-info__talker">
        ${message.user_name}
        </div>
        <div class="message__upper-info__date">
        ${message.created_at}
        </div>
        </div>
        <div class="message__text">
        <p class="lower-message__content">
        ${message.content}
        </p>
        </div>
        </div>`
    } else if (message.image) {
      var html = `<div class="message" data-message-id=${message.id}>
        <div class="message__upper-info">
        <div class="message__upper-info__talker">
        ${message.user_name}
        </div>
        <div class="message__upper-info__date">
        ${message.created_at} 
        </div>
        </div>
        <div class="message__content">
        <img src="  ${message.image} " class="lower-message__image" >
        </div>
        </div>`
    };
    return html;
  }

  //インクリメンタルサーチの記述

  //自動更新
  
  var reloadMessages = function() {
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function (messages) { //通信成功したら、controllerから受け取ったデータ（messages)を引数にとって以下のことを行う
      var insertHTML = '';//追加するHTMLの入れ物を作る
      messages.forEach(function (message) {//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        insertHTML = buildHTML(message); //メッセージが入ったHTMLを取得
        $('.messages').append(insertHTML);//メッセージを追加
      })
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');//最新のメッセージが一番下に表示されようにスクロールする。
    })
    .fail(function () {
      alert('自動更新に失敗しました');//
    });
  }
};
setInterval(reloadMessages, 5000);//5000ミリ秒ごとにreloadMessagesという関数を実行し自動更新を行う。
});

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function (data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
      $(".send-btn").prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  })
