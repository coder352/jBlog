### Description
``` zsh
layout.pug 是 jade-bootstrap 的入口, 其他 .pug 都使用 extend layout 及其子 pug

user-list.pug 会  user-add.pug 是在不同的界面上添加用户
user-manager.pug 是在同一个界面上进行增删, 并且显示, 后台调用了 users.js 中的 Restful API, 两种方式可以对比一下
第一种方式是 pug + route, 没用到 js 和 css, 第二种是 pug + js + css + route

./chat.pug 和 ./chat-layout.pug 是一个聊天界面的实例, 待整理
```
### 现状
``` zsh
./tools/html2jade.pug  # 半成品, 还没实现功能
./blog  # 失败, 还是慢慢来吧, 卡在注册时, 照片无法保存到本地的 /images, app.js 好多东西台大了, 我都注释掉了, 用的时候把 代码部分的注释取消掉
```
### Tips
``` zsh
<a class="item" href="posts/create">发表文章</a>
href 后面的不以 / 开头, 是使用的相对当前的路径
以 / 开头就是指的从网站的跟路径开始
```
