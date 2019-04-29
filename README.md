wechat的一些小功能

#### 功能
1. 检测微信好友是否删除或拉黑。(未完成)
 
జ్ఞ ‌ా 这个微信的bug已修复，暂不可用，需要找到新的bug

2. 聊天机器人(已完成)

2.1 群里发送消息@自己，机器人会自动回复消息
2.2 好友发送消息给自己，机器人会自动回复消息

3. 数据展示。性别分布，省级分布，市级分布(已完成)

4. 聊天消息情感分析(未完成)

对方聊天的消息进行情感分析，判断是高兴的还是难过的。


### 测试

[该项目测试网址](http://118.24.242.28/crazy-wechat/web/index.html)

### 技术

使用`flask`作为后端,`flask_socketio`和前端的`socket.io.min.js`完成`websocket`功能。

### 难点

微信二维码被扫，登录成功后，后端主动向前端发送数据，需要用到`websocket`技术。

### 博客
该项目一些技术要点的笔记博客。

[Flask使用flask_socketio实现websocket](https://blog.csdn.net/qq_22918243/article/details/89449850)

[浏览器缓存图片](https://blog.csdn.net/qq_22918243/article/details/89642345)


### 最后
觉得好的希望得到各位大佬的star。觉得不好的请给点意见。谢谢。