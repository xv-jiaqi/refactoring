## 样式书写
---

[TOC]

1. Always 避免使用标签选择器
1. Never 选择器最后一个元素禁止使用标签元素
1. Always 样式书写嵌套结构只需要保持大元素结构的合理隔离即可，禁止跟 DOM 结构完全映射书写——防止过深嵌套
1. `0` 值属性推荐不写单位
1. Always 重复的16进制色值使用缩写
1. Never 禁止书写 !important——使用权值覆盖

### SCSS书写约定
---
> 1. 各模块顶层样式应以模块名的 class 选择器构成，子代（兄弟）选择器依次迭代，这样可以防止多模块的同名样式窜场
> 1. 尽量使用静默注释`//`，编译后可过滤。
> 1. 尽量避免使用属性嵌套，良好的选择器嵌套是非常有必要的，但是不要嵌套过深
> 1. .scss文件不要重复引用，否则会导致生成CSS输出重复出现，该问题会在Sass.4.x中修复。
> 1. width/height/padding/margin都使用`rem`，border-width和font-size使用`px`
> 1. 预编译器的使用会导致写出深嵌套的选择器，选择器规则越多，效率越低、速度越慢
> 1. 尽量避免用后代选择器，后代选择器耗时且效率低
> 1. 变量、混合器和函数名`-`和`_`是互相兼容“混淆”的，**统一使用`-`**。
> 1. 可以继承有后代选择器修饰规则的选择器，不管后代选择器多长，但不要用后代选择器去继承。
> 1. 合理平衡选择器性能、DOM简洁性和选择器可读性之间的关系
> 1. 不要给 ‘0’ 添加任何单位，此约定适用CSS书写约定。 eg: `width: 0;/*good*/`, `width: 0px;/*bad*/`
> 1. 在初始定义样式时，尽量少避免使用`! important`，方便后期皮肤样式改变，在需要优先的样式地方使用增加权值
> 1. 图片使用svg，如果使用jpg，尽可能使用渐进式图片


### CSS书写约定

#### 1. 书写顺序
---
> - 布局定位属性-->自身属性-->文本属性-->其他属性
  1. 位置属性(position, top, right, z-index, display, float等)
  1. 大小(width, height, padding, margin)
  1. 文字系列(font, line-height, letter-spacing, color- text-align等)
  1. 背景(background, border等)
  1. 其他(animation, transition等)

#### 2. 性能分析
---
> - [后代选择器是 CSS 中性能耗用最大的选择器](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Writing_efficient_CSS)，它是性能开销相当大的——特别是当选择器在标签或通用类别中。
- 提高性能的关键是匹配规则，对于一个给定的元素，需要匹配的规则越少，样式的解析就会越快。避免通用规则，请确保规则不以通用类型选择器作为结束，规则越多，匹配越慢，效率越低
- 尽量使用子选择器代替后代选择器，后者效率会慢很多
- 依赖继承属性
- 用唯一的 Class 名称来定位一个节点往往比组合定位更加快捷
- 选择器效率排序
  1. id选择器（#myid）
  1. 类选择器（.myclassname）
  1. 标签选择器（div,h1,p）
  1. 相邻选择器（h1+p）
  1. 子选择器（ul < li）
  1. 后代选择器（li a）
  1. 通配符选择器（*）
  1. 属性选择器（a[rel=”external”]）
  1. 伪类选择器（a:hover,li:nth-child）
- 从右到左的选择器匹配方式决定了右边的第一个**关键选择器**很重要
    ```css
    main .nav {..}/*优*/
    main a {..}/*差*/
    ```

#### 3. 正确使用display
---
> - display:inline后不应该再使用width、height、margin、padding以及float。
> - display:inline-block后不应该再使用float。
> - display:block后不应该再使用vertical-align。
> - display:table-*后不应该再使用margin或者float。

#### 4. h1~h6样式不重复定义

### Components

#### 命名
---
> - 对于 components， 我们希望除复合 components 外的其他components不要有任何依赖。
> - 一般来讲我们都要遵循一个component一个scss文件的约定。
> - 所有的 components 通过 ./components/_index.scss 导出。
> - 不要将注释写在对应 component 中，一般来讲，我们将注释写在 ./components/_index.scss 对应的 @import 的上一行。
> - 注释我们用 `//` 而非 `/*  */`。




