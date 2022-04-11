# token

一个辅助缓存 api token 的小工具。

## usage

```javascript
const {AbsToken} = require('@xesam/token');
class TestToken extends AbsToken {
    _dumpToken(token) {
        //持久化token
    }

    _loadToken() {
        //从本地读取 token，返回一个 Promise
    }
}
const token = new TestToken(function() {
    //这里返回一个初始化 token 的Promise。格式 {access_token: xxxxxx, expire: xxxx},expire 是一个绝对时间证书
});
function getData(){
    return token.get().then(({access_token})=>{
        ...
    });
}
```

或者使用 Token 类，但是需要提供要给实现了 storage 协议的类来进行 load/dump。

```javascript
const {Token} = require('@xesam/token');
const Config = require('@xesam/config');
const cfg = new Config('token1.test.json5');

const token = new Token(initializer, cfg, {name: 'test_token'})
function getData(){
    return token.get().then(({access_token})=>{
        ...
    });
}
```