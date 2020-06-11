//app.js

App({
  data:{
    current_data_id: ""
  },
  onLaunch: function() {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {
      current_data_id: "",
      ready_to_delete:false,
      userInfo:{},
      editarea_gateway:0,//0无效，1发帖，2回帖，3读书
      openid:""
    }
   
  }
   
  
})