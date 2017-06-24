[参考1: Github](https://github.com/cwbuecheler/node-tutorial-for-frontend-devs)
[中文翻译](http://www.jianshu.com/p/3b045636bcec)
[参考2: Github](https://github.com/cwbuecheler/node-tutorial-2-restful-app)
[中文翻译](http://www.jianshu.com/p/8a90687576f9)
[很多 bootstrap -> pug 的模板](http://rajasegar.github.io/JADE-Bootstrap/getting-started.html)
[这里也有 bootstrap -> pug 模板](https://bootstrap3-jade-node-express-grunt.azurewebsites.net/)
[基于 Node.js 的 Web 实时聊天项目](http://www.maiziedu.com/course/597/)
[N-blog](https://github.com/nswbmw/N-blog)
[html2pug](https://github.com/aaronpowell/html2jade-website)
[Youtube Bootstrap Responsive Landing Page](https://www.youtube.com/channel/UCEzbuVkoykjK1KPV2n0SWEA/videos)
### Description
我的个人网站, 主体是博客, 会挂上很多其他功能
``` zsh
虽然使用了 jade-bootstrap, 但是如果没用 + 开头的函数的话可以不太需要它...
users.js 路由只提供 Restful API, 不进行渲染
找时间把 sass 统一重写一遍
```
### Run
``` zsh
# 这是没用 pm2 的情况
npm install  # 安装 ./package.json 中的 dependencies
bower install  # 一些前端库, eg. messenger 只有 bower 能安装, 这个可以不用执行, 默认用的都是 cdnjs.com
staexp  # 在后台运行, alias 中有解释, npm start & node-sass --watch

# MongoDB
# mkdir data  # 存放 MongoDB, 这个在 .gitignore 中屏蔽了, 其实 data 放哪都没关系的...
# sudomongod ~/github/jBlog/data/  # 启动 mongodb, 指定输出路径, 27017 端口, 具体命令参见 alias
docmongo  # 将上面两步直接换掉了
mongo && use jblog && show dbs  # 连接数据库, 并创建新的, 其实是不存在的, 因为没有数据
# 向数据库中添加数据, 可以用 [] 先定义, 再添加
db.usercollection.insert({ "username" : "testuser1", "email" : "testuser1@testdomain.com" })
newstuff = [{ "username" : "testuser2", "email" : "testuser2@testdomain.com" }, { "username" : "testuser3", "email" : "testuser3@testdomain.com" }]
db.usercollection.insert(newstuff);
# 上面是添加到 usercollection, 下面的会自动生成 userlist 并插入
db.userlist.insert({'username' : 'test1','email' : 'test1@test.com','fullname' : 'Bob Smith','age' : 27,'location' : 'San Francisco','gender' : 'Male'})
# 这些数据可以不添加, 只有一个不太重要的界面用到了

# 结束
stoexp  # 关闭 pkill node && pkill sass # kill node<Tab>  # 也可以关闭
dkill<Tab>/dkilla && drm<Tab>/drma  # 关闭 mongod 的后台服务; killport 27017 是针对本地的服务

# 重启
renpm  # qkill node && nohupzsh npm start, 不用重启 sass-watch
```
### 文件介绍
各个子目录中 README.md 和 index.js 中有介绍
### 增加新的功能
``` zsh
1. ./routes/index.js 中添加路由, 也可在 users.js
2. ./views/ 中添加相关的 .pug
3. ./public/ 中添加相应的 js, css 文件
```
### Tips
``` zsh
// My code # 是我修改原来框架的地方

jade-bootstrap 在 bower 中 只到了 1.0.11, 还是 .jade 的文件
在 npm 中到了 1.0.14, 是 .pug 的文件

# 只修改 ./routes/index.js 和 ./view/* 就可以完成大部分的功能
# ./package.json 里面的版本很重要...

# Error: Cannot find module '../build/Release/bson'
#    at Object.<anonymous> (/home/coder352/github/jBlog/node_modules/bson/ext/index.js:15:10)
vim node_modules/bson/ext/index.js  # 15 行
bson = require('../build/Release/bson');  # 将这句话换成下面的
bson = require('bson');
```
