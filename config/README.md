### Description
``` zsh
node app  # 会使用 config/default.json
NODE_ENV=test node app  # require('config-lite') 会依次查找 config/test.js、config/test.json、config/test.node、
                        # config/test.yml、config/test.yaml 并合并 default 配置
NODE_ENV=production node app  # require('config-lite') 会依次降级查找 config/production.js、config/production.json、
                        # config/production.node、config/production.yml、config/production.yaml 并合并 default 配置
```
