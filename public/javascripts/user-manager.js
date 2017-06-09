// Userlist data array for filling in info box
var userListData = [];
$(document).ready(function(){  // DOM Ready
    populateTable();  // Populate the user table on initial page load
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);  // Username 链接点击事件绑定, 第二个参数指向 Username
    $('#btnAddUser').on('click', addUser);
    $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);  // 删除用户链接点击事件, 第二个参数指向 Delete
    // 使用 jQuery 的 on 方法绑定事件, 这样可以捕捉动态插入的链接
    // 我们需要指明(静态的元素), 所以我们使用了 table tbody, 这样可以在添加或者删除用户之后保持不变, 具体触发事件的是 .on 中的参数
});
// Functions 添加数据到表格 ===========================================
function populateTable() {  // 执行完下面的事件以后都会刷新 User List, 相当于 AJAX
    var tableContent = '';  // Empty content string
    $.getJSON('/users/userlist', function(data){  // jQuery AJAX 使用 JSON
        userListData = data;  // 将用户数据保存在全局变量中
        $.each(data, function(){  // 把每一 JSON 数据 item 添加成行和列
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });
        $('#userList table tbody').html(tableContent);  // 把所有内容都放到 HTML 表格中
    });
};
// 显示用户信息, 上面的是自动加载, 这里是鼠标事件触发, 点击用户名, 在 div#userInfo 里面显示更加详细的信息
function showUserInfo(event) {
    event.preventDefault();  // 阻止链接默认行为
    var thisUserName = $(this).attr('rel');  // 从链接中获取用户名
    var arrayPosition = userListData  // 基于 id 值获取对象索引
        .map(function(arrayItem) {return arrayItem.username;})  // 使用匿名函数返回原数组中的 username, 生成一个新的叫 userListData 的数组
        .indexOf(thisUserName);  // 新的数组只包含了 usename, 使用链式的方法 indexOf 来生成 username 的 index
    var thisUserObject = userListData[arrayPosition];  // 获取 User 对象
    $('#userInfoName').text(thisUserObject.fullname);  // 填充 Info Box, text() 不需要 AJAX
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);
}
// 添加用户
function addUser(event) {
    event.preventDefault();
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if ($(this).val() === '') { errorCount++ }
    });  // 最基本的验证, 如果字段为空, errorCount 自增 1 次
    if (errorCount === 0) {  // 确定 errorCount 的数值为 0, 如果是 0, 将所有用户信息打包成一个对象
        var newUser = {
            'username': $('#addUser fieldset input#inputUserName').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'fullname': $('#addUser fieldset input#inputUserFullname').val(),
            'age': $('#addUser fieldset input#inputUserAge').val(),
            'location': $('#addUser fieldset input#inputUserLocation').val(),
            'gender': $('#addUser fieldset input#inputUserGender').val()
        };
        $.ajax({  // 使用 AJAX 将对象 post 到 adduser service
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function (response) {
            if (response.msg === '') {  // 检查 successful (blank) response, 因为 users.js 中写的是成功了返回 ""
                $('#addUser fieldset input').val('');  // 清空表单中输入内容
                populateTable();  // 更新表格
            } else {
                alert('Error: ' + response.msg);  // 如果出错, 提示错误信息
            }
        });
    } else {
        alert('Please fill in all fields');  // 如果 errorCount 大于 0, 提示错误
        return false;
    }
}
// 删除用户
function deleteUser(event) {
    event.preventDefault();
    var confirmation = confirm('Are you sure you want to delete this user?');  // Pop up a confirmation dialog
    if (confirmation === true) {  // Check and make sure the user confirmed
        $.ajax({  // If they did, do our delete
            type: 'DELETE',
            url: '/users/deleteuser/' + $(this).attr('rel')
        }).done(function (response) {
            if (response.msg === '') { }  // Check for a successful (blank) response
            else { alert('Error: ' + response.msg); }
            populateTable();  // Update the table
        });
    }
    else { return false; }  // If they said no to the confirm, do nothing
};
