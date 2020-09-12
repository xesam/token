# token

一个辅助缓存 api token 的小工具。

## usage

```javascript
const cfg = new Config('demo', '.demo.json5');

const token = new Token(cfg, () => {
    return get('https://xxxx.xxx.xxx/gettoken');
});

function getData(){
    return token.get().then({access_token}=>{
        ...
    });
}
```