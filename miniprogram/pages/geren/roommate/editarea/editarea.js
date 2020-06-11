// miniprogram/pages/editarea/editarea.js
wx.cloud.init()
const da = wx.cloud.database()
const Rcollection = da.collection('mycollection')
const app = getApp();
var pic_num=0;
var nick_name;
var userUrl
var pictemp = [
  "cloud://roommaty-973444.726f-roommaty-973444-1258743393/0.png",
"cloud://roommaty-973444.726f-roommaty-973444-1258743393/3.png"]

function get_timestamp(){
  var timestamp =
    Date.parse(new Date());
  timestamp = timestamp / 1000;
  var n = timestamp * 1000;
  var date = new Date(n);
  var Y =date.getFullYear();
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
    content:"",
    accepted:"",
    pic_onshow_flag: true,
    ctn_flag:false,
    all_pics_flag:false,
    on_show_src: "",
    on_show_id:"",
    evaContent_plcholdr:"",
    image_width: 0,
    image_height: 0,
    title:"",
    tip_del:"长按图片进行删除",
    imgs: [
      {

        src: "",
        

      }
    ],
   
     
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
        success: function (res) {
          const userInfo = res.userInfo
          nick_name = userInfo.nickName;
          userUrl = userInfo.avatarUrl
        },
      })
    console.log(nick_name)

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
  ctn_charChange: function (e) {
    if (e.detail && e.detail.value.length > 0) {
      
        this.setData({
          content: e.detail.value
        });
      }
      console.log(this.data.content)
  },
  submit:function(){
   const that=this;
    wx.showLoading({
      title: '上传中',
    })
    if(this.data.content){
      this.data.imgs.splice(0, 1);
      if(this.data.imgs){
      for (let i = 0; i < pic_num; i++) {
        var filePath = this.data.imgs[i].src;
        var timp = parseInt(Math.random() * (99999 - 10000 + 1) + 10000, 10).toString();

        var cloudPath = i.toString() + timp +filePath.match(/\.[^.]+?$/)[0];
        console.log(filePath)
        console.log(cloudPath)
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)
            var temp = res.fileID
            console.log("temp", temp)
            if (i == 0 && res.fileID) {
              this.data.picpath = [temp]
              console.log(this.data.picpath)
              this.setData({
                picpath: this.data.picpath,
              })
              console.log("opo", i, ":", this.data.picpath)
            }
            else if (res.fileID) {
              this.data.picpath = this.data.picpath.concat([temp]);
              this.setData({
                picpath: this.data.picpath
              })
              console.log("opo", i, ":", this.data.picpath)
            };

          }
        })
      }
      setTimeout(function () {
        
        console.log(that.data.content)
        Rcollection.add({
          data: {
            message: that.data.content,
            title: that.data.title,
            time: that.data.logs,
            name: nick_name,
            picture: that.data.picpath,
          }
        })
        console.log(that.data.content)

        wx.hideLoading()
      }, 8000);
    }
    }
    else{
      console.log(that.data.content)
      Rcollection.add({
        data: {
          message: that.data.content,
          title: that.data.title,
          time: that.data.logs,
          name: nick_name,
        }
      })
    }
    wx.redirectTo({
      url: '../roommate/oo'
    })

  },
  pic_bind: function (e) {
    var src = e.currentTarget.dataset.src;
    var id=e.currentTarget.id;
    console.log(src);
    this.setData({
      pic_onshow_flag: false,
      ctn_flag:true,
      all_pics_flag:true,
      on_show_src: src,
      on_show_id:id,

    })
  },
  image_on_show: function (e) {
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;
    var viewWidth = 718,           //设置图片显示宽度，左右留有16rpx边距
      viewHeight = 718 / ratio;
    console.log(viewHeight, viewWidth);

    //存储图片的宽高值

    this.setData({
      image_height: viewHeight,
      image_width: viewWidth,
    })
    console.log(this.data.image_width);
  },
  off_show: function () {
    this.setData({
      image_width: 0,
      image_height: 0,
      on_show_src: "",
      pic_onshow_flag: true,
      ctn_flag: false,
      all_pics_flag: false,
    })

  },
  choose_image:function(){
    var that = this;
    var i = 9 - pic_num;
    console.log(i);
    wx.chooseImage({

      count: i,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        console.log(res.tempFilePaths);
        for (let i = 0; i < 9; i++) {
          if (res.tempFilePaths[i]) { that.data.imgs = that.data.imgs.concat([{ src: res.tempFilePaths[i]}]) }
        }
        that.setData({
          imgs: that.data.imgs
        })
        pic_num = that.data.imgs.length - 1;
        that.setData({
          len: pic_num,
        })
      },
      fail: e => {
        console.error(e)
      }
    })

  },
  pic_del:function(e){
    var tieOdata = this.data.imgs;
    var i = e.currentTarget.id;

    console.log(i);

    tieOdata.splice(i, 1);
    this.setData({
      imgs: tieOdata,
    })
    pic_num = this.data.imgs.length - 1;//删除后更改图片数
    this.setData({
      image_width: 0,
      image_height: 0,
      on_show_src: "",
      pic_onshow_flag: true,
      ctn_flag: false,
      all_pics_flag: false,
    })

  },
  tit_chaChange:function(e){
    if (e.detail && e.detail.value.length > 0) {

      this.setData({
        title: e.detail.value,
      });
    }
    console.log(this.data.title)
  },

  
})