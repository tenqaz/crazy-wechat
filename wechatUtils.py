# -*- coding: utf-8 -*-

__author__ = 'Jim'

from wxpy import *
import time
from crazy_wechat.settings import tuling_api_key


class WechatUtils:

    def __init__(self, qr_callback, *args, **kwargs):
        self._bot = Bot(qr_callback=qr_callback, *args, **kwargs)
        self.nofriends = []
        self.black_friends = []
        self._tuling = Tuling(api_key=tuling_api_key)

    def get_all_friends(self):
        """
        得到所有的好友
        :return:
        """
        return self._bot.friends().search()

    def register_check_friends_msg(self):
        """
        注册检查是否是好友的消息
        :return:
        """
        self.nofriends.clear()
        self.black_friends.clear()

        @self._bot.register(msg_types=NOTE)
        def check_friends_msg(msg):

            if "但被对方拒收了" in msg.text:
                print(f"{msg.sender.name} 已经把你拉黑了")
                self.nofriends.append(msg.sender.name)

            if "开启了朋友验证" in msg.text:
                print(f"{msg.sender.name} 不是你的好友")
                self.black_friends.append(msg.sender.name)


    def check_friend(self, friend):
        """
        检查该微信是否为好友
        :param friend:
        :return:
        """
        try:
            friend.send_msg('జ్ఞ ‌ా')
            # friend.send_msg('')
        except ResponseError as e:
            if e.err_code == 1204:
                self.black_friends.append(friend.name)
            else:
                print(f"出错啦,错误码:{e.err_code}, 错误信息: {e.err_msg}")

        time.sleep(5)

    def check_friends_able(self):
        """
        检测好友是否可用
        :return:
        """
        friend = self._bot.friends().search("robot")[0]
        self.check_friend(friend)

    def tuling_friend(self, friend):
        """
        使用图灵和朋友聊天
        :param friend:
        :return:
        """

        @self._bot.register(friend)
        def reply_my_friend(msg):
            self._tuling.do_reply(msg)

        self.__reply_my_friend = reply_my_friend

    def tuling_friend_close(self):
        """
        关闭图灵与朋友聊天
        :return:
        """
        self._bot.registered.disable(self.__reply_my_friend)

    def tuling_group(self):
        """
        使用图灵和群里@我的人聊天
        :return:
        """

        @self._bot.register(Group, TEXT)
        def reply_my_group(msg):
            if msg.is_at:
                self._tuling.do_reply(msg)

        self.__reply_my_group = reply_my_group

    def tuling_group_close(self):
        """
        关闭图灵和群里@我的人聊天
        :return:
        """
        self._bot.registered.disable(self.__reply_my_group)

    def stats(self):
        """
        获取用户的统计数据。
        性别: 1男,2女,0未知
        :return:
        """
        return self._bot.friends().stats()

class Test():

    def get_image(self, uuid, status, qrcode):
        with open("login.jpg", 'wb') as f:
            f.write(qrcode)

    def __init__(self):
        self.wechat = WechatUtils(self.get_image)

if __name__ == '__main__':
    # t = Test()

    wechat = WechatUtils(qr_callback=False, cache_path=True)


    # wechat.check_friends_able()

    # friend = wechat.get_all_friends().search("robot")[0]
    # wechat.tuling_friend(friend)
    # wechat.tuling_friend_close()
    # wechat.tuling_group()


    print(wechat.stats())

    # wechat._bot.join()