const AV = require('../libs/av-weapp-min.js');
const app = getApp()
// pages/myuploads/myuploads.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myitemlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that = this
    var query = new AV.Query('ItemInformation');
    query.contains('userOpenid', app.globalData.user.authData.lc_weapp.openid);
    query.find().then(function (item) {
      //——>从服务器加载物品信息并存到页面data里<——
      app.globalData.myitemlist = item
      console.log('myitem')
      console.log(app.globalData.myitemlist)
      that.setData({
        myitemlist: app.globalData.myitemlist
      })
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
  deleteone:function(e){
    wx.showToast({
      title: '删除..',
      icon: 'loading',
      duration: 1000,
      mask: true
    })
    console.log(e.target.dataset.query1)
    var that = this
    app.globalData.query1 = e.target.dataset.query1
    var query = new AV.Query('ItemInformation')
    query.contains('itemDescribe', app.globalData.query1)
    query.destroyAll().then(function(){
      wx.showToast({
        title: '已删除',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
      var query = new AV.Query('ItemInformation');
      query.contains('userOpenid', app.globalData.user.authData.lc_weapp.openid);
      query.find().then(function (item) {
        //——>用来刷新的<——
        app.globalData.myitemlist = item
        console.log('myitem')
        console.log(app.globalData.myitemlist)
        that.setData({
          myitemlist: app.globalData.myitemlist
        })
      })
    })
    }
  })