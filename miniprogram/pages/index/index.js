//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    m1:"../image/main1.png",
    m2: "../image/main2.png",
    m3: "../image/main3.png",
    m4: "../image/main4.png",
    main1:true,
    main2:true
  },
  //事件处理函数
  
  onLoad: function () {
    console.log("this")
    console.log(this.data.canIUse)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
       
      })
    }  else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          console.log(res.userInfo)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.onGetOpenid();
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShow:function(){
this.setData({
    main1: true,
    main2:true
  })
  },
  change1: function(){
    this.setData({
      main1: false
    })
    wx.navigateTo({
      url: '../jiaju/jiaju/jiaju',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    
  },
  change2: function () {
    this.setData({
      main2: false
    })
    wx.navigateTo({
      url: '../geren/geren/geren',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    
   
  },
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
})
