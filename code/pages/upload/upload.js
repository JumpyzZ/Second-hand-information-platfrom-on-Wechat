const AV = require('../libs/av-weapp-min.js');
const app = getApp()

AV.init({
  appId: '9fjqPhhx4yV403aaDpen0o0p-gzGzoHsz',
  appKey: 'aBhxDp4w6b9krakmOdKUpf0u',
});
// pages/upload/puload.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    itemD: '',
    itemT: '',
    imgpaths: [],
    section: ['竹园', '楠园', '梅园', '橘园', '杏园', '桃园', '李园', '其他'],
    catagory: ['数码电子', '衣服/包', '化妆/日用', '学习考试', '交通', '卡/券', '技能服务', '其他'],
    pickerindex: 0,
    picker2index: 0,
    price: 0,
    check: ['sell', 'buy'],
    checked: 'sell',
    index:0,
    index2:0,
    addr: '点击选择',
  },
  staticData: {
    type: '',
    message: '',
    contact: '',
    latitude: '',
    longitude: ''
  },
  handleChooseTap: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        // console.log(that.data.address);返回点击选择,要勾选哦
        that.setData({
          addr: res.address  //替换addr
        })
        that.staticData.latitude = res.latitude;
        that.staticData.longitude = res.longitude;
        console.log(that.staticData.latitude)
        console.log(that.staticData.longitude)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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
  inputT: function (e) {
    this.data.itemT = e.detail.value;//input title
    //console.log(this.data.itemT)
  },
  inputD: function (e) {
    this.data.itemD = e.detail.value;//input describe
    console.log(this.data.itemD)
  },
  inputP: function (e) {
    var that = this
    this.setData({
      price: e.detail.value
    })
    console.log('Prise now changed:' + that.data.price)
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPicker2Change: function (e) {
    console.log('picker2发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  radioChange: function (e) {
    var that = this
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      checked: e.detail.value
    })
  },
  chooseImg() {
    let that = this;
    let len = this.data.imgpaths;
    if (len >= 9) {
      this.setData({
        lenMore: 1
      })


      return;
    }
    wx.chooseImage({
      success: (res) => {
        let tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        let imgpaths = that.data.imgpaths;
        for (let i = 0; i < tempFilePaths.length; i++) {
          if (imgpaths.length < 3) {
            imgpaths.push(tempFilePaths[i])
          } else {
            that.setData({
              imgpaths
            })
            wx.showModal({
              title: '提示',
              content: '最多只能有三张图片'
            })
            return;
          }
        }
        that.setData({
          imgpaths
        })
      }
    })
  },
  uploadnow: function () {
    wx.showToast({
      title: '正在发布..',
      icon: 'loading',
      duration:5000,
      mask: true
    })
    var that = this
    var itemInformation = AV.Object.extend('ItemInformation')
    //声明云端表名为'ItemInformation'的构造器itemInformation
    var itemInformation = new itemInformation()
    //新建itemInformation对象（本地
    /////////////////
    function postimg(callback) {
      setTimeout(callback, 5000)
      if (that.data.imgpaths[0]) {
      new AV.File(itemInformation.id + '_0', {
        blob: {
          uri: that.data.imgpaths[0],
        },
      }).save().then(
        function (file) {
          console.log('leancloud-fileurl-0:' + file.url() + 'Upload successful');
          that.setData({
            fileurl0: file.url(),
            fileid0: file.id
          })
        }
      ).catch(console.error);
      }
      //////////////////
      if (that.data.imgpaths[1]){
      new AV.File(itemInformation.id + '_1', {
        blob: {
          uri: that.data.imgpaths[1],
        },
      }).save().then(
        function (file) {
          console.log('leancloud-fileurl-1:' + file.url() + 'Upload successful');
          console.log(file.id)
          that.setData({
            fileurl1: file.url(),
            fileid1: file.id
          })
        }
      ).catch(console.error);
      }
      ///////////////////
      if (that.data.imgpaths[2]) {
      new AV.File(itemInformation.id + '_2', {
        blob: {
          uri: that.data.imgpaths[2],
        },
      }).save().then(
        function (file) {
          console.log('leancloud-fileurl-2:' + file.url() + 'Upload successful');
          that.setData({
            fileurl2: file.url(),
            fileid2: file.id
          })
        }
      ).catch(console.error);
      }
      console.log('1111111111')
    }
    function postitem() {
      function switchto() {
        wx.switchTab({
          url: '../map/map',
        })
      }
      wx.hideToast()
      function showtoast(callback){
      setTimeout(callback,1300)
      wx.showToast({
        title: '发布好啦!',
        icon: 'succes',
        duration: 1310,
        mask: true
      })

      }
      showtoast(switchto)
      itemInformation.set('itemTitle', that.data.itemT)
      itemInformation.set('itemDescribe', that.data.itemD)
      itemInformation.set('itemPrice', that.data.price)
      itemInformation.set('sellorbuy', that.data.checked)
      itemInformation.set('userOpenid', app.globalData.user.authData.lc_weapp.openid)
      itemInformation.set('userAvatarurl', app.globalData.userInfo.avatarUrl)
      itemInformation.set('userNickname', app.globalData.userInfo.nickName)
      itemInformation.set('section', that.data.section[that.data.index])
      itemInformation.set('catagory', that.data.catagory[that.data.index2])
      itemInformation.set('imgurl0', that.data.fileurl0)
      itemInformation.set('imgurl1', that.data.fileurl1)
      itemInformation.set('imgurl2', that.data.fileurl2)
      itemInformation.set('fileid0', that.data.fileid0)
      itemInformation.set('fileid1', that.data.fileid1)
      itemInformation.set('fileid2', that.data.fileid2)
      itemInformation.set('query', 'query')
      if (that.staticData.latitude){
        itemInformation.set('latitude', that.staticData.latitude)
        itemInformation.set('longitude', that.staticData.longitude)
      }else{
        itemInformation.set('latitude', app.globalData.latitude)
        itemInformation.set('longitude', app.globalData.longitude)
      }
      itemInformation.save().then(function () {
        console.log('Post successful!')
        console.log('itemID:' + itemInformation.id),
          console.log('itemTitle:' + that.data.itemT)
        console.log('itemDescribe:' + that.data.itemD)
        console.log('sellorbuy:' + that.data.checked)
        console.log('userOpenid:' + app.globalData.user.authData.lc_weapp.openid)
        console.log('userAvatarurl:' + app.globalData.userInfo.avatarUrl)
        console.log('userNickname:' + app.globalData.userInfo.nickName)
        console.log('imgurl0:' + that.data.fileurl0)
        console.log('imgurl1:' + that.data.fileurl1)
        console.log('imgurl2:' + that.data.fileurl2)
      })
    }
    postimg(postitem);
  },
  previewImg(e) {
    let index = e.currentTarget.dataset.index;
    let imgpaths = this.data.imgpaths;
    wx.previewImage({
      current: imgpaths[index],
      urls: imgpaths,
    })
  },
  deleteImg(e) {
    let _index = e.currentTarget.dataset.index;
    let imgpaths = this.data.imgpaths;
    imgpaths.splice(_index, 1);
    this.setData({
      imgpaths
    })
  }
})
