// pages/map/ma p.js
const AV = require('../libs/av-weapp-min.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [],
    loadmapflag:false,
    latitude: '',
    longitude: '',

    controls: [{
      id: 1,
      iconPath: 'center.png',
      position: {
        left: 10,
        top: wx.getSystemInfoSync().windowHeight - 100,
        width: 30,
        height: 30
      },
      clickable: true
    },
    /** 
    {
      id: 2,
      iconPath: 'DontShowUp.png',
      position: {
        left: wx.getSystemInfoSync().windowWidth / 2 - 10,
        top: (wx.getSystemInfoSync().windowHeight - 42) / 2 - 30,
        width: 22,
        height: 31
      },
      clickable: true
    }
    */
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var value = wx.getStorageSync('showflag')
    if (value){
    console.log('非第一次进入!')
    }else{
      wx.showModal({
        title: '你好呀QAQ',
        content: '点击地图上的气泡来浏览已发布的信息，进入"发布"来发布自己的信息。',
        showCancel:false,
        confirmText:"知道啦",
        success: function (res) {
          if (res.confirm) {
            console.log('点击了确定')
            wx.setStorage({
              key: "showflag",
              data: "true"
            })
          }else{
            console.log('非第一次进入')
          }
        }
      })
    }
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
        app.globalData.longitude = that.data.longitude
        app.globalData.latitude = that.data.latitude
      }
    })
    var app = getApp()
    AV.User.loginWithWeapp().then(user => {
      app.globalData.user = user.toJSON();
      console.log('UssrOpenId:' + app.globalData.user.authData.lc_weapp.openid)
    }).catch(console.error);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapContext = wx.createMapContext('map')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var query = new AV.Query('ItemInformation');
    query.contains('query', 'query');
    query.find().then(function (item) {
      //——>从服务器加载物品信息并存到全局data里<——
      app.globalData.itemlist = item
      that.setData({
        itemlist: app.globalData.itemlist 
      })
      console.log('publicitem')
      console.log(app.globalData.itemlist)
      
      var markerss = []
      var obj = null
      for (var i = 0; i < item.length; i++) {

        if (item[i].attributes.sellorbuy == 'buy') {
          obj = {
            iconPath: "buy.png",
            id: item[i].attributes.itemDescribe,
            latitude: item[i].attributes.latitude,
            longitude: item[i].attributes.longitude,
            width: 20,
            height: 20,
            callout: {
              content: item[i].attributes.itemTitle,
              fontSize: 14,
              bgColor: "#FFF",
              borderWidth: 1,
              borderColor: "#CCC",
              padding: 4,
              display: "ALWAYS",
              textAlign: "center",
              borderRadius: 10
            }
          }
          markerss.push(obj)
        } else {
          obj = {
            iconPath: "sell.png",
            id: item[i].attributes.itemDescribe,
            latitude: item[i].attributes.latitude,
            longitude: item[i].attributes.longitude,
            width: 20,
            height: 20,
            callout: {
              content: item[i].attributes.itemTitle,
              fontSize: 14,
              bgColor: "#FFF",
              borderWidth: 1,
              borderColor: "#CCC",
              padding: 4,
              display: "ALWAYS",
              textAlign: "center",
              borderRadius:10
            }
          }
          markerss.push(obj)

        }
      }
      that.setData({
        markers: markerss,
        loadmapflag:true
      })
      console.log(this.data.markers)
    })
    
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
  handleControlTap: function (e) {
    console.log(e.controlId)
    if (e.controlId == 1) {
      this.mapContext.moveToLocation()
    }
  },
  markertap: function(e){
    console.log('IDformMarker:'+e.markerId)
    app.globalData.viewid = e.markerId
    wx.navigateTo({
      url: '../view/view',
    })
  }
})