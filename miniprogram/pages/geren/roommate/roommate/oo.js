// miniprogram/pages/u/oo.js

const app=getApp();
wx.cloud.init()
const da = wx.cloud.database()
const Rcollection = da.collection('mycollection')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tie_data:[
      {
        username:"",
        title:"",
        brf:"",
        tie_id:"",
        time:"",
        ondelete:"",
        delete_flag:true, 
      }
    ],
   counts:0,
   counts1:0,
    jdg: "删除",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    /*
    for (let i = 0; i < 9; i++) {
      var temp = new Array(4);//造假随机数数据
      
    if (i == 0) {
      this.data.tie_data = [{ username: temp[2], title: temp[1], brf: temp[3], tie_id: temp[4] }];
    }
    else {
      this.data.tie_data = [{ username: temp[2], title: temp[1], brf: temp[3], tie_id: temp[4] }].concat(this.data.tie_data);
    }
    this.setData({
      tie_data: this.data.tie_data,
    })
  }
    */
    wx.hideNavigationBarLoading();
    Rcollection.get().then(res => {
      console.log(res.data)
      var recive = res.data.reverse()
      this.setData({
        record: recive,
        delete_flag: true,
        judge:this.data.jdg,
      }, res => {
        console.log("succeessly update data")
      })

    })
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
    var that=this;
    wx.showNavigationBarLoading();
    Rcollection.get().then(res => {
      var recive = res.data.reverse()
      this.setData({
        record: recive
      }, res => {
        console.log("succeessly update data")
      })
    })
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();

  },

  /**
   * 页面上拉触底事件的处理函数

   */
  onReachBottom: function () {
    let counts = this.data.counts + 20;
    Rcollection.skip(counts).get().then(res => {
      let new_data = res.data
      let old_data = this.data.record
      this.setData({
        record: old_data.concat(new_data),
        Rcollection: Rcollection
      }, res => {
        console.log(" data's end")
      })
    }) //触底刷新并新增数据

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  tie_bind:function(e){
    var that=this;
    // app.globalData.current_data_id = e.currentTarget.id;
    // console.log(e.currentTarget.id);
    // wx.navigateTo({
    //   url: "../detail_info/detail_info"
    // })
    if(that.data.delete_flag==true){
      app.globalData.current_data_id = e.currentTarget.id;
      console.log(e.currentTarget.id);
      wx.navigateTo({
        url: "../detail_info/detail_info"
      })
    }
    else {
      app.globalData.current_data_id = e.currentTarget.id;
      console.log(e.currentTarget.id);
      }
  },
  buttom_bar_reply: function () {
    app.globalData.editarea_gateway = 1;
    wx.navigateTo({
      url: "../editarea/editarea"
    })

  },
  buttom_bar_mine: function () {
    if(this.data.counts1%2==0){
    this.data.jdg = "返回"
    this.setData({
      judge:this.data.jdg,
    })
    Rcollection.where({ _openid: app.globalData.openid}).get().then(res => {
      var recive = res.data.reverse()
      this.setData({
        delete_flag: false,
        record: recive,
      }, res => {
        console.log("succeessly update data")
        console.log(app.globalData.openid)
        wx.showToast({
          title: '更新完成',
        })
      })

    })
    this.data.counts1 +=1
    }
  else{
      this.data.jdg = "我的"
      Rcollection.get().then(res => {
        console.log(res.data)
        var recive = res.data.reverse()
        this.setData({
          delete_flag: true,
          record: recive,
          judge:this.data.jdg,
        }, res => {
          console.log("succeessly refresh data")
        })

      })
      this.data.counts1+=1
  }
  console.log(this.data.counts1)
  },
   remove: function (e) {
     var idV = app.globalData.current_data_id ;
     console.log(idV);
    Rcollection.doc(idV).remove().then(res => {
      console.log()
    })
     Rcollection.get().then(res => {
       console.log(res.data)
       var recive = res.data.reverse()
       this.setData({
         record: recive
       }, res => {
         console.log("succeessly refresh data")
       })

     })
  },
})


