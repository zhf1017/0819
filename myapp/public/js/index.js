$(function(){
    $(function () {
      // 退出登录
      $("#back").click(function () {
        sessionStorage.removeItem("username");
        window.location.href = "/views/login.html"
      })
      // console.log(sessionStorage.getItem("username"))
      var username = sessionStorage.getItem("username");
      var oGuan = document.getElementsByClassName("guanli")[0];
      oGuan.innerText = username;
      if (username) {
       
      } else {
        alert("请登录");
        window.location.href = "/views/login.html"
      }

      $(".leftnav h2").click(function () {
        $(this).next().slideToggle(200);
        $(this).toggleClass("on");
      })
      $(".leftnav ul li a").click(function () {
        $("#a_leader_txt").text($(this).text());
        $(".leftnav ul li a").removeClass("on");
        $(this).addClass("on");
      })

    });
})