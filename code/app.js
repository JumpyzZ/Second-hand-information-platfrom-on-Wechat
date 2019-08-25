const AV = require('./libs/av-weapp-min.js');
const { Realtime, TextMessage } = require('./libs/realtime.weapp.min.js');
const app = getApp();
AV.init({
  appId: '9fjqPhhx4yV403aaDpen0o0p-gzGzoHsz',
  appKey: 'aBhxDp4w6b9krakmOdKUpf0u',
});
//app.js
App({
  globalData: {
    userInfo: null,
    user: null,
    nickName: null,
    avatarUrl: null,
    itemlist:[],
    itemlist1: [],
    itemlist2: [],
    myitemlist:[],
  },
})
