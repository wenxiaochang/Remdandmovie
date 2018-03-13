//只能用相对路径 不能使用绝对路径
var post_date = require('../../date/date.js');
Page({

  /**
   * 页面的初始数据
   * 小程序总是会读取data对象来做数据绑定，这个动作我们称之为动作A
   * 而这个动作A的执行，就是在onload事件执行之后发生的
   */
  data: {
    //轮播图片
    banner: [
      '/images/wx.png',
      '/images/iqiyi.png',
      '/images/vr.png',
      '/images/post/cat.png'
    ],
    //轮播图参数
    indicatorFcolor: "rgb(255,255,255)",
    autoplay: "true",
    interval: '3000',
    indicatordots: 'true'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //抛出数据
    this.setData({
      post_content: post_date.post_list,

    });
  },
  ontap:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+id
    })
  },
  itemgo:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + id
    })
  }

})