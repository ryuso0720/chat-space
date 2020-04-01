$(function() {
  function addUser(user) {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user_name}</p>
      <div class="user-search-add chat-group-user__btn chat-group-user__btn--remove" user-id="${user_id}" user-name:"${user_name}">削除</div>
      <input type="hidden" value="${user_id}" checked="checked" name="group[user_ids][]" id="group_user_ids_${user_id}">
    </div>`

    $("#user-joined-in").append(html);
    $(".chat-group-user__btn--remove").on("click",function(){
    $(this).parent().remove();
});
}
    $("#user-search-result").append(html);
  }
  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users) {
        $("#user-search-result").empty();

        if (users.length !== 0) {
          users.forEach(function(user) {
            addUser(user);
          });
        } else if (input.length == 0) {
          return false;
        } else {
          addNoUser();
        }
      })
      .fail(function() {
        alert("通信エラーです。ユーザーが表示できません。");
      });
  });
});