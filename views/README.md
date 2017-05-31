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
```
