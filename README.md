# 淘宝移动端首页重制

陈紫晟，201408223005
可访问 [http://taobao.static.thecmw.cn](http://taobao.static.thecmw.cn) 以查看网页

## 文件结构

    - public（=> 打包完成后文件）
      |- assets（=> 静态文件）
      |- index.html（=> 首页文件）
    - src（=> 源代码）
      |- images (=> 图片)
      |- javascripts（=> CoffeeScript 文件）
      |- stylesheets（=> SCSS 文件）
      |- views（=> slim 视图模板文件）
    - vendor（=> 第三方文件 *需通过 bower 下载）

## 初次使用

    $ npm install -g gulp --verbose

## 启动

    $ gulp server

## 编辑模式

    $ npm install --verbose
    $ bower install
    $ gulp
