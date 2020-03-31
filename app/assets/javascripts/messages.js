$(function(){
  function buildHTML(message) {
    if (message.content && message.image) {
      var html = `<div class="message">` +
        `<div class="upper-info">` +
        `<div class="upper-info__user-talker">` +
        message.user_name +
        `</div>` +
        `<div class="upper-info__date">` +
        message.created_at +
        `</div>` +
        `</div>` +
        `<div class="message__text">` +
        `<p class="lower-message__content">` +
        message.content +
        `</p>` +
        `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
        `</div>`
    } else if (message.content) {
      var html = `<div class="message">` +
        `<div class="upper-info">` +
        `<div class="upper-info__talker">` +
        message.user_name +
        `</div>` +
        `<div class="upper-info__date">` +
        message.created_at +
        `</div>` +
        `</div>` +
        `<div class="message__text">` +
        `<p class="lower-message__content">` +
        message.content +
        `</p>` +
        `</div>` +
        `</div>`
    } else if (message.image) {
      var html = `<div class="message">` +
        `<div class="upper-info">` +
        `<div class="upper-info__talker">` +
        message.user_name +
        `</div>` +
        `<div class="upper-info__date">` +
        message.created_at +
        `</div>` +
        `</div>` +
        `<div class="message__content">` +
        `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
        `</div>`
    };
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    console.log(this)
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
});