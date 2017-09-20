### Description
``` zsh
layout.pug 是 jade-bootstrap 的入口, 其他 .pug 都使用 extend layout 及其子 pug

user-list.pug 会  user-add.pug 是在不同的界面上添加用户
user-manager.pug 是在同一个界面上进行增删, 并且显示, 后台调用了 users.js 中的 Restful API, 两种方式可以对比一下
第一种方式是 pug + route, 没用到 js 和 css, 第二种是 pug + js + css + route

./chat.pug 和 ./chat-layout.pug 是一个聊天界面的实例, 待整理

./echarts 和 ./baidumap 因为使用单文件调用 API 不方便, 所以放到服务器上
```
### 现状
``` zsh
./blog  # 失败, 还是慢慢来吧, 卡在注册时, 照片无法保存到本地的 /images, app.js 好多东西台大了, 我都注释掉了, 用的时候把 代码部分的注释取消掉
./user-manager  # 在处理 Ajax 上用的很好, 值得研究
./chat  # 比较好看的界面和功能, css 比较乱
./tools/html2pug.pug  # 界面还需要设计, 功能上主要有 代码编辑高亮, 内部也是 Ajax 实现
./about-me.pug  # 代码虽然多, 但是分 section, 很清晰, css 写的也很有条理, 仔细看一下, 可以从这里总结处一套 sass 的模板...
./about-welcome.pug  # about 系列都是一些优秀样式的收集
```
### Tips
``` zsh
<a class="item" href="posts/create">发表文章</a>
href 后面的不以 / 开头, 是使用的相对当前的路径
以 / 开头就是指的从网站的跟路径开始
```
