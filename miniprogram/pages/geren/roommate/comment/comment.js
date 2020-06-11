// miniprogram/pages/comment/comment.js
wx.cloud.init()
const da = wx.cloud.database()
const Rcollection = da.collection('record')
const app = getApp();
var nick_name;
var userUrl
function get_timestamp() {
  var timestamp =
    Date.parse(new Date());
  timestamp = timestamp / 1000;
  var n = timestamp * 1000;
  var date = new Date(n);
  var Y = date.getFullYear();
  var M = (date.getMonth()

    + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  var D = date.getDate()
    < 10 ? '0' + date.getDate() :
    date.getDate();
  var h =
    date.getHours();
  var m =
    date.getMinutes();
  var s =
    date.getSeconds();
  var log = Y + "-" + M + "-" + D + "  " + h + ":" + m + ":" + s
  return log;

}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    Rcollection.get().then(res => {
      this.setData({
        record: res.data
      }) //onLoad获取数据库的数据
      this.setData({
        logs: get_timestamp(),
      })
    }), //时间戳赋值
      wx.getUserInfo({
        withCredentials: true,
        lang: '',
        success: function (res) {
          const userInfo = res.userInfo
          nick_name = userInfo.nickName;
          userUrl = userInfo.avatarUrl
        },
      })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  ctn_charChange: function (e) {
    if (e.detail && e.detail.value.length > 0) {

      this.setData({
        content: e.detail.value
      });
    }
    console.log(this.data.content)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  submit: function () {
    wx.showLoading({
      title: '上传中',
    })
    if (this.data.content) {
      wx.hideLoading()
      Rcollection.add({
        data: {
          message: this.data.content,
          related_id: app.globalData.current_data_id,
          time: this.data.logs,
          name: nick_name,
          //picture:
        }
      })
      wx.navigateTo({
        url: "../detail_info/detail_info"
      })
    }


  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})