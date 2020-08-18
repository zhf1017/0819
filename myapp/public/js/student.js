$(function () {
    $("#quxiao").click(function () {
        $(".panel").css({
            "display": "none"
        })
    })

    var model = "";
    var pageStart = 0;
    // 初始加载数据
    loadData(pageStart);

    $(".next").click(function () {
        if (pageStart == 2) {
            // $(this).attr("disabled", "disabled");
        } else {
            pageStart++;
            loadData(pageStart);
            $(".pagelist span").eq(pageStart).addClass("current").siblings(".pagelist span").removeClass(
                "current");
            // $(".prev").removeAttr("disabled");
        }
    })

    $(".prev").click(function () {
        if (pageStart == 0) {
            // $(this).attr("disabled", "disabled")
        } else {
            pageStart--;
            loadData(pageStart);
            $(".pagelist span").eq(pageStart).addClass("current").siblings(".pagelist span").removeClass(
                "current");
            // $(".next").removeAttr("disabled")
        }
    })

    $(".pagelist span").click(function () {
        pageStart = $(this).index() - 1;
        loadData(pageStart);
        $(".pagelist span").eq(pageStart).addClass("current").siblings(".pagelist span").removeClass(
            "current");
        // $("button").removeAttr("disabled")
    })

    $("#checkall").click(function () {
        $("input[name='id[]']").each(function () {
            if (this.checked) {
                this.checked = false;
            } else {
                this.checked = true;
            }
        });
    })


    //   删除
    $("#eveal").on("click", ".del", function () {
        var username = $(this).parent().siblings(".username").text();
        // console.log($(this).parent().siblings(".username").text());
        var sure = confirm("确定要删除吗？")
        if (sure) {
            $.ajax({
                url: "http://localhost:3000/stu_del", //请求地址
                type: "POST", //请求方式  GET POST
                async: true, //是否异步
                data: {
                    name: username
                },
                dataType: "json", //预期的服务器响应的数据类型  
                contentType: "application/x-www-form-urlencoded",
                success: function (response) {
                    if (response.msg == "success") {
                        alert("删除成功");
                        loadData(pageStart);
                    } else {
                        alert("删除失败，请稍后重试");
                    }
                },
                error: function (xhr, status, error) {
                    //失败后的回调
                    console.log(xhr);
                    console.log(status);
                    console.log(error);
                },
                complete: function () {
                    //无论失败还是成功都会执行   请求完成
                    console.log("请求已完成");
                }
            })
        }
    })


    // 编辑
    $("#eveal").on("click", ".edit", function () {
        var name = $(this).parent().siblings(".username").text();
        var age = $(this).parent().siblings(".age").text();
        var tel = $(this).parent().siblings(".tel").text();
        var email = $(this).parent().siblings(".email").text();
        var address = $(this).parent().siblings(".address").text();
        var date = $(this).parent().siblings(".date").text();
        var account = $(this).parent().siblings(".id").text();
        $("#name").val(name);
        $("#age").val(age);
        $("#tel").val(tel);
        $("#email").val(email);
        $("#address").val(address);
        $("#date").val(date);
        $("#account").val(account);
        $(".panel").css({
            "display": "block"
        })
    })


    $("#change_sure").click(function () {
        var name = $("#name").val();
        var age = $("#age").val();
        var tel = $("#tel").val();
        var email = $("#email").val();
        var address = $("#address").val();
        var date = $("#date").val();
        var account = $("#account").val();
        var sure = confirm("确定要修改吗？")
        if (sure) {
            $.ajax({
                url: "http://localhost:3000/stu_change", //请求地址
                type: "POST", //请求方式  GET POST
                async: true, //是否异步
                data: {
                    name,
                    age,
                    tel,
                    email,
                    address,
                    date,
                    account
                },
                dataType: "json", //预期的服务器响应的数据类型  
                contentType: "application/x-www-form-urlencoded",
                success: function (response) {
                    if (response.msg == "success") {
                        alert("修改成功");
                        loadData(pageStart);
                        $(".panel").css({
                            "display": "none"
                        })
                    } else {
                        alert("修改失败，请稍后重试");
                    }
                },
                error: function (xhr, status, error) {
                    //失败后的回调
                    console.log(xhr);
                    console.log(status);
                    console.log(error);
                },
                complete: function () {
                    //无论失败还是成功都会执行   请求完成
                    console.log("请求已完成");
                }
            })
        }
    })


})





function loadData(page) {
    var dataStart = page * 5;
    var dataEnd = (page + 1) * 5;
    $(function () {
        $.ajax({
            url: "http://localhost:3000/stu_info", //请求地址
            type: "GET", //请求方式  GET POST
            async: true, //是否异步
            dataType: "json", //预期的服务器响应的数据类型  json  jsonp
            // jsonpCallback: "", //在一个jsonp中规定回调函数的名称
            contentType: "application/x-www-form-urlencoded", //发送数据到服务器时所使用的数据类型
            success: function (response) {
                //成功后的回调
                console.log(response);
                // $("#eveal").find(".empty").empty();
                $("#eveal .empty").remove()
                if (response.msg == "success") {
                    // console.log(response.data);
                    for (var i = dataStart; i < dataEnd; i++) {
                        console.log(response.data[0].name)
                        model = $("#model").html().replace("$id$", i + 1).replace("$name$", response.data[i].name).replace("$age$", response.data[i].age).replace("$tel$", response.data[i].tel).replace("$email$", response.data[i].email).replace("$address$", response.data[i].address).replace("$date$", response.data[i].date).replace("$_id$", response.data[i]._id);
                        $("#eveal").append(model);
                    }

                } else {
                    alert("暂时没有数据信息")
                }

            },
            error: function (xhr, status, error) {
                //失败后的回调
                console.log(xhr);
                console.log(status);
                console.log(error);
            },
            complete: function () {
                //无论失败还是成功都会执行   请求完成
                console.log("请求已完成");
            }
        })
    })
}


// function del(id) {
//     if (confirm("您确定要删除吗?")) {

//     }
// }



// function DelSelect() {
//     var Checkbox = false;
//     $("input[name='id[]']").each(function () {
//         if (this.checked == true) {
//             Checkbox = true;
//         }
//     });
//     if (Checkbox) {
//         var t = confirm("您确认要删除选中的内容吗？");
//         if (t == false) return false;
//     } else {
//         alert("请选择您要删除的内容!");
//         return false;
//     }
// }