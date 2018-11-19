# Login

> 登录模块

## Usage

```html
<login></login>
```

## DataSource Methods

**1. getVcode()**

获取登录验证码图片信息以及pid，需要返回 **Promise**。

*PS: 如果你不需要验证码部分，则可以没有该DataSource*

返回的数据大致如下：

```js
// return or resolve
{
  img: '', // image src
  pid: '' // verify pid
}
```


**2. login()**

点击登录按钮时调用，需要返回 **Promise**.

登录成功时，**Promise** 需要是`resolve`状态,；登录失败时则需要是 `reject` 状态。

## Props

name | type | default value | note |
------ | ----- | ----- | ----- |
vcode | Boolean | true | 是否需要验证码部分 |
register | Boolean | true | 是否需要注册功能 |
dashboard-img | String | '' | 左侧展示的大图链接 |

## Events

**1. register-action**

当`register`属性被设置成 **true** 时，点击注册链接，一个名为 *register-action* 的`emit`事件将被触发。

所以，你可以大概这么来使用它：

```js
<login @register-action="register"></login>
...
methods: {
  register() {
    // code here...
    // this.$router.push('/')
  }
}
```

## Slot

该区块具备一个名为 **header** 的插槽。

这个插槽会被显示在页面的顶部，并且高度为 *65px*.
