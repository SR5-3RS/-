// miniprogram/pages/detail_info/detail_info.js
const app = getApp();
wx.cloud.init()
const da = wx.cloud.database()
const Rcollection = da.collection('record')
const Icollection = da.collection('mycollection')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic_file:[{
      src: ""
      
    }],
    cmt_data: [{
      cmt_id:"",
      username:"",
      brf:"",
      time:"",

    },
    ],
    main:"",
    flag:true,
    rvs_flag:false,
    on_show_src:"",
    image_width:0,
    image_height:0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Rcollection.where({ related_id: app.globalData.current_data_id,}).get().then(res => {
      var recive = res.data.reverse()
      this.setData({
        cmt_data: recive
      }, res => {
        console.log("succeessly update data")
      })

    })
    Icollection.where({ _id: app.globalData.current_data_id, }).get().then(res => {
      var recive = res.data
      var tmp_pic = recive[0].picture
      console.log(recive[0].message)
      if(tmp_pic){
      this.setData({
        main: recive[0].message,
        username: recive[0].name,
        title:recive[0].title,
        pic_file: tmp_pic,//0
      }, res => {
        console.log("succeessly update data", this.data.pic_file[0])
      })
      }
      else{
        this.setData({
          main: recive[0].message,
          username: recive[0].name,
          title: recive[0].title,
        }, res => {
          console.log("succeessly update data")
        })
      }

    })
    /*  console.log(app.globalData.current_data_id)
      var length_cmt;
      var length_pic;
      this.setData({
        main:""
      })
      //在这里要加入尝试查询事件，看是否有没有做一个res
      //在这里也要返回评论组的长度
      if(length_cmt!=0){
      wx.showNavigationBarLoading();
      for (let i = 0; i <length_cmt; i++) {
        var temp = new Array(4);
       
    if (i == 0) {
      this.data.cmt_data = [{ username: temp[0], brf: temp[1], brf: temp[2], cmt_id: temp[3] }];
    }
    else {
      this.data.cmt_data = this.data.cmt_data.concat([{ username: temp[0], brf: temp[1], brf: temp[2], cmt_id: temp[3] }]);
    }
    this.setData({
      cmt_data: this.data.cmt_data,
    })
  }
    if(length_pic!= 0){
  for (let i = 0; i < length_pic; i++) {
    var temp;
    
    if (i == 0) {
      this.data.pic_file = [{ src: temp }];
    }
    else {
      this.data.pic_file = this.data.pic_file.concat([{ src: temp }]);
    }
    this.setData({
      pic_file: this.data.pic_file,
    })
  }
}
wx.hideNavigationBarLoading();
    }*/
    // console.log("succeessly data", this.data.pic_file[0])
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    Rcollection.where({ related_id: app.globalData.current_data_id, }).get().then(res => {
      var recive = res.data.reverse()
      this.setData({
        cmt_data: recive
      }, res => {
        console.log("succeessly update data")
      })

    })

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  pic_bind:function(e){
    var that=this;
    var src = e.currentTarget.id;
    console.log(src);
    this.setData({
      flag:false,
      rvs_flag:true,
      on_show_src:src,

    })
  },
  image_on_show: function (e) {
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;    
    var viewWidth = 718,           //设置图片显示宽度，左右留有16rpx边距
      viewHeight = 718 / ratio;  
    console.log(viewHeight,viewWidth);
   
    //存储图片的宽高值
   
    this.setData({
      image_height:viewHeight,
      image_width: viewWidth,
    })
    console.log(this.data.image_width);
  },
  off_show:function(){
    this.setData({
      image_width:0,
      image_height:0,
      on_show_src:"",
      flag:true,
      rvs_flag:false,
    })

  },
  buttom_bar_reply:function(){
    wx.navigateTo({
      url: "../comment/comment"
    })
    app.globalData.editarea_gateway=2;

  }
})
