### Run
``` zsh
# 使用
docmongo  # 打开 mongo 数据库, 如果不需要使用可以不开, 但会报错(不影响正常使用)
npm start  # 开启服务器

# 调试
docmongo
staexp  # alias 脚本, 会监测 sass
renpm  # 重启 npm start, 不重启 sass
stoexp
```

### 服务器部署
``` zsh
# 安装 Node 依赖, 开发环境 Node 7.10
$ cat /etc/issue  # 查看服务器系统版本
$ sudo apt install nodejs nodejs-legacy nodejs-dev npm python-pip  # 请确定是 7.10 以上版本

# 安装 NVM, 来控制 Node 版本
$ sudo apt-get update
$ sudo apt-get install build-essential libssl-dev
$ curl https://raw.githubusercontent.com/creationix/nvm/v0.16.1/install.sh | sh  # 下载 nvm 安装脚本并执行
$ source ~/.profile
$ nvm ls-remote
$ nvm install 7.1.0
$ nvm use 7.1.0
$ node -v

# 安装 npm 依赖
$ git clone https://github.com/coder352/jBlog.git
$ cd jBlog
$ npm install  # 安装 ./package.json 中的 dependencies

# 下载 CDN 文件
$ cd jBlog/views
$ wget https://raw.githubusercontent.com/coder352/jShellscript/master/bin/jcdn_cache
$ chmod +x jcdn_cache
$ pip install docopt
$ ./jcdn_cache
$ cd tools/ && ../jcdn_cache

# 编译 sass
$ npm i -g node-sass
$ cd public
$ node-sass sass/ -o stylesheets/ -r

# 开启服务
$ npm start > ~/npm.log &
$ netstat -ant  # 查看 3000 端口, 京东云 3000 端口默认可以访问, 不用去官网配置

## 选做
# MongoDB
```
