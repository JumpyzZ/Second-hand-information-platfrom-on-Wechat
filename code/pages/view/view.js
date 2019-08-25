const AV = require('../libs/av-weapp-min.js');
const app = getApp()
// c.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemlist:[],
    loadingflag: false,
    imgpaths:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp()
    this.setData({
      userInfo: app.globalData.userInfo
    })
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
    console.log('IDfromMap:'+app.globalData.viewid)
    var that = this
    var query = new AV.Query('ItemInformation');
    query.equalTo('itemDescribe', app.globalData.viewid);
    query.find().then(function (viewitem) {
      //——>从服务器加载物品信息并存到页面data里<——
      app.globalData.viewitem = viewitem
      that.setData({
        viewitem: app.globalData.viewitem
      })
      console.log('viewitem:')
      console.log(that.data.viewitem[0])
      var obj = null
      var imgpath = []
      if (that.data.viewitem[0].attributes.imgurl0){
        imgpath.push(that.data.viewitem[0].attributes.imgurl0)
      }
      if (that.data.viewitem[0].attributes.imgurl1) {
        imgpath.push(that.data.viewitem[0].attributes.imgurl1)
      }
      if (that.data.viewitem[0].attributes.imgurl2) {
        imgpath.push(that.data.viewitem[0].attributes.imgurl2)
      }
      that.setData({
        imgpaths:imgpath
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
  previewImg(e) {
    let index = e.currentTarget.dataset.index;
    let imgpaths = this.data.imgpaths;
    wx.previewImage({
      current: imgpaths[index],
      urls: imgpaths,
    })
  },
})