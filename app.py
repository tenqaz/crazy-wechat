from flask import Flask, render_template, session, jsonify
from flask_socketio import SocketIO, Namespace
from wechatUtils import WechatUtils

from crazy_wechat.settings import image_path
import os
from datetime import timedelta

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret~'
# 将缓存时间设置为1秒
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = timedelta(seconds=0)

socketio = SocketIO(app)


@app.route('/')
def hello_world():
    session['test'] = 'test2'
    return render_template('index.html')


# @app.route("/show_data")
# def show_data():
#
#     wechat = session['current_wechat']
#     data = wechat.stats()
#     print(data)
#
#     return jsonify(data)

class WechatNamespace(Namespace):

    def get_image(self, uuid, status, qrcode):
        with open(os.path.join(image_path, "login.jpg"), "wb") as f:
            f.write(qrcode)

        self.emit("login_image")

    def on_connect(self):
        print('websocket 连接..')

    def on_disconnect(self):
        print("websocket 断开连接..")

    def on_login(self):
        self._wechat = WechatUtils(self.get_image, cache_path=True)
        self.emit("login_status", "success")

    def on_check_friends(self):
        self._wechat.register_check_friends_msg()
        friends = self._wechat.get_all_friends()
        self.emit("friends_num", {'friends_num': len(friends)})

        for friend in friends:
            self._wechat.check_friend(friend)
            self.emit("check_friends_num")

        print(self._wechat.nofriends)
        print(self._wechat.black_friends)

        self.emit("check_friends", {'nofriends': self._wechat.nofriends, 'black_friends': self._wechat.black_friends})

    def on_show_data(self):
        data = self._wechat.stats()
        print(data)
        self.emit("show_data", data)

    def on_start_robot_chat(self):
        self._wechat.tuling_group()

    def on_stop_robot_chat(self):
        self._wechat.tuling_group_close()

    def on_message(self, data):
        print(f"reciver message: {data}")


socketio.on_namespace(WechatNamespace("/wechat"))

if __name__ == '__main__':
    socketio.run(app, port=8080, debug=True)
