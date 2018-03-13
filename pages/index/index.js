//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    
  },
  //事件处理函数
  bindViewTap: function() {
    //子父跳转
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
   
  },
  ontap:function(e){
    //平行跳转
    wx.redirectTo({
      url: '/pages/post/post',
    })
    // wx.navigateTo({
    //   url: '/pages/post/post',
    // })
  },
  onUnload:function(){
    console.log("onunload");
  },
  onHide:function(){
    console.log('onhide');
  }
 
})
