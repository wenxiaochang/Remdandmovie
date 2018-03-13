var post_date = require('../../../date/date.js');
//拿到全局变量
var app = getApp();
Page({
  data: {
    isplay: false,
  },
  onLoad: function (option) {
    var id = option.id;
    var posdata = post_date.post_list[id];
    this.setData({
      posdata: posdata,
      cid: id
    });
    //this.data.currentid = id;

    //设置缓存 模拟收藏效果
    var getcollected = wx.getStorageSync('collected');
    if (getcollected) {
      //重新赋值collected 读取缓存
      var collected = getcollected[id];
      this.setData({
        collected: collected
      })
    } else {
      var collected = {};
      collected[id] = false;
      wx.setStorageSync('collected', collected);
    }

    //监听音乐播放状态 切换页面初始化的BUG
    //app.globlDatag_currentpaly 判断全等该文章的音乐
    if (app.globlData.g_isplay && app.globlDatag_currentpaly === id) {
      this.setData({
        isplay: true
      });
    }

    //监听音乐总控状态
    var _this = this; //保存this 因为指针偏移了
    //音乐播放
    wx.onBackgroundAudioPlay(function () {
      _this.setData({
        isplay: true
      });
      //监听音乐播放状态 切换页面初始化的BUG
      app.globlData.g_isplay = true;
      //解决了音乐切换到其他文章还是会播放的状态
      app.globlDatag_currentpaly = id;
    });
    //音乐暂停
    wx.onBackgroundAudioPause(function () {
      _this.setData({
        isplay: false
      });
      //监听音乐播放状态 切换页面初始化的BUG
      app.globlData.g_isplay = false;
      //解决了音乐切换到其他文章还是会播放的状态
      app.globlDatag_currentpaly = null;
    });


  },
  oncollection: function (e) { //收藏按钮点击事件
    var collected = wx.getStorageSync('collected');
    var collecteds = collected[this.data.cid];
    //更新文章是否收藏的缓存值
    collecteds = !collecteds;
    collected[this.data.cid] = collecteds;
    //更新文章是否存在缓存值
    wx.setStorageSync('collected', collected);
    //更新数据绑定变量
    this.setData({
      collected: collecteds
    })
    wx.showToast({
      title: collecteds ? '收藏成功' : '取消收藏',
      duration: 1000,
      icon: 'success'
    })
  },
  onshare: function (e) {
    wx.showActionSheet({
      itemList: ['分享微信好友', '分享QQ好友', '分享新浪微博'],
      success: function (res) {
        //点击取消
        //console.log(res.cancel);
        //点击itemList 数组元素 序号从0开始
        console.log(res.tapIndex);
      }

    })
  },
  onplay: function (e) {
    var cid = this.data.cid;
    //音乐播放状态
    var isplay = this.data.isplay;
    if (isplay) {
      //音乐暂停
      wx.pauseBackgroundAudio();
      this.setData({
        isplay: false
      })
    } else {
      //音乐启动
      wx.playBackgroundAudio({
        dataUrl: post_date.post_list[cid].music.dataUrl,
        coverImgUrl: post_date.post_list[cid].music.coverImgUrl,
        title: post_date.post_list[cid].music.title
      });
      this.setData({
        isplay: true
      })
    }
  }
})