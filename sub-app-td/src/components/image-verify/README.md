# Image Verify

> 图片验证码展示

## Usage

```html
<image-verify></image-verify>
```

## DataSource Methods

**1. getVcode()**

获取登录验证码图片信息以及pid，需要返回 **Promise**。

返回的数据大致如下：

```js
// return or resolve
{
  img: '', // image src
  pid: '' // verify pid
}
```

你也可以在外层ds传入的对象中获取`pid`。

比如:

```js
// parent component.
data() {
  return {
    pid: '',
    dataSource: {
      getImage() {
        return yourReqHere().then(data => {
          this.pid = data.pid // get pid here
          return {
            img: data.img,
            pid: data.pid
          }
        })
      }
    }
  }
}
```

## Events

**1. pid-change**

当区块获取到图片*src*信息以及*pid*信息时，区块将会向外`emit`一个名为`pid-change`的事件。

你可以通过如下代码获取`pid`信息：

```js
<image-verify @pid-change="pidChange"></image-verify>
...
methods: {
  pidChange(pid) {
    this.pid = pid
  }
}
```
