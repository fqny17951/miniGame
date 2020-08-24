(function () {
  'use strict';

  class config {
  }
  config.version = "100";
  config.appid = "ttd0d8a6654fe20b21";
  config.pkgName = "";
  config.appKey = "";
  config.env = 'release';
  config.url = 'https://gmone.huiruui.com';
  config.switchUrl = 'https://gmtwo.huiruui.com';

  class ptgcspsdk {
      static sendLogin(channel, action, openid, isnew, from_appid, from_imgid, code, callBack) { if (!isnew) {
          isnew = 0;
      } let data = { channel: channel, action: action, openid: openid, from_appid: from_appid, from_imgid: from_imgid, my_appid: config.appid, code: code, isnew: isnew }; NetWork.sendPost(data, callBack); }
      static sendAuthorize(channel, action, openid, isnew, from_appid, from_imgid, code, callBack) { if (!isnew) {
          isnew = 0;
      } let data = { channel: channel, action: action, openid: openid, from_appid: from_appid, from_imgid: from_imgid, my_appid: config.appid, code: code, isnew: isnew }; NetWork.sendPost(data, callBack); }
      static startGame(channel, action, openid, callBack) { let data = { channel: channel, action: action, openid: openid, my_appid: config.appid }; NetWork.sendPost(data, callBack); }
      static sendShare(channel, action, openid, type, callBack) { let data = { channel: channel, action: action, openid: openid, my_appid: config.appid, type: type }; NetWork.sendPost(data, callBack); }
      static watchVideo(channel, action, openid, type, callBack) { let data = { channel: channel, action: action, openid: openid, my_appid: config.appid, type: type }; NetWork.sendPost(data, callBack); }
      static sendJump(channel, action, openid, my_uuid, to_appid, callBack) { let data = { channel: channel, action: action, openid: openid, my_appid: config.appid, my_uuid: my_uuid, to_appid: to_appid }; NetWork.sendPost(data, callBack); }
      static sendEvent(openid, eventid, callBack) { let data = { openid: openid, eventId: eventid, appid: config.appid, }; NetWork.sendPost(data, callBack, "/saveEvent"); }
      static getJumpGameList(callBack) { NetWork.sendPost({ appid: config.appid, }, callBack, "/getJumpInfo"); }
      static getGameSwitch(callBack) { NetWork.sendGet('/index/switch_new?appid=' + config.appid + '&version=' + config.version, 2, callBack); }
      static getTouTiaoOpenid(code, anonymous_code, callBack) { NetWork.sendGet('/service/getTouTiaoOpenid?appid=' + config.appid + '&code=' + code + '&anonymous_code=' + anonymous_code, 1, callBack); }
      static getWxOpenid(code, anonymous_code, callBack) { NetWork.sendGet('/service/getWxOpenid?appid=' + config.appid + "&code=" + code, 1, callBack); }
      static getQQOpenid(code, callBack) { NetWork.sendGet('/service/getQQOpenid?appid=' + config.appid + "&js_code=" + code, 1, callBack); }
      static getOppoOpenid(token, callBack) { NetWork.sendGet('/service/getOppoOpenid?pkgName=' + config.pkgName + "&token=" + token + "&appid=" + config.appKey, 1, callBack); }
      static getVivoOpenid(token, callBack) { NetWork.sendGet('/service/getVivoOpenid?pkgName=' + config.pkgName + "&token=" + token + "&appid=" + config.appKey, 1, callBack); }
      static collection(action, openid, callBack) { var data = { action: action, openid: openid, my_appid: config.appid, }; NetWork.sendPost(data, callBack); }
      static probability(callBack) { var data = { appid: config.appid, }; NetWork.sendPost(data, callBack, "/probability"); }
  }
  class NetWork {
      static sendPost(data, call_back = null, action = null) { let xhr = new XMLHttpRequest(); let url = config.url; if (action) {
          url = url + action;
      } xhr.open("POST", url); xhr.onreadystatechange = function () { if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
          if (call_back) {
              if (config.env == "develop") {
                  console.log(url + "", JSON.parse(xhr.responseText));
              }
              call_back(JSON.parse(xhr.responseText));
          }
      } }; let dataStr = JSON.stringify(data); xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded'); xhr.send("param=" + encodeURIComponent(dataStr)); }
      static sendGet(action, type, call_back) { var xhr = new XMLHttpRequest(); let url = config.switchUrl; if (type == 1) {
          url = config.url;
      } xhr.open("GET", url + action); xhr.onreadystatechange = function () { if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
          if (call_back) {
              if (config.env == "develop") {
                  console.log(config.switchUrl + action + "：", JSON.parse(xhr.responseText));
              }
              call_back(JSON.parse(xhr.responseText));
          }
      } }; xhr.send(); }
  }
  var ActionType;
  (function (ActionType) {
      ActionType[ActionType["Login"] = 1005] = "Login";
      ActionType[ActionType["Authority"] = 1006] = "Authority";
      ActionType[ActionType["Start"] = 1008] = "Start";
      ActionType[ActionType["Share"] = 1009] = "Share";
      ActionType[ActionType["Video"] = 1010] = "Video";
      ActionType[ActionType["VideoSuccess"] = 1011] = "VideoSuccess";
      ActionType[ActionType["Jump"] = 1007] = "Jump";
      ActionType[ActionType["JumpSuccess"] = 1017] = "JumpSuccess";
  })(ActionType || (ActionType = {}));
  var uuidType;
  (function (uuidType) {
      uuidType[uuidType["Left"] = 1001] = "Left";
      uuidType[uuidType["Right"] = 1002] = "Right";
      uuidType[uuidType["Settlement"] = 1003] = "Settlement";
      uuidType[uuidType["Common"] = 1004] = "Common";
      uuidType[uuidType["SettlementScroll"] = 1006] = "SettlementScroll";
      uuidType[uuidType["ReviveScroll"] = 1007] = "ReviveScroll";
      uuidType[uuidType["LobbyScroll"] = 1008] = "LobbyScroll";
  })(uuidType || (uuidType = {}));

  class JSONManager {
      constructor() {
      }
      static getItemByID(id, items) {
          for (let i = 0; i < items.length; i++) {
              if (items[i].id == id) {
                  return items[i];
              }
          }
          return items[items.length - 1];
      }
  }

  class BaseConfig {
      constructor() {
      }
      static get RunPlatformID() {
          if (Laya.Browser.window.tt) {
              return BaseConfig.pid_dy;
          }
          else if (Laya.Browser.window.qg) {
              return config['vivo'] ? BaseConfig.pid_vivo : BaseConfig.pid_oppo;
          }
          else if (Laya.Browser.window.qq) {
              return BaseConfig.pid_qq;
          }
          else if (Laya.Browser.window.wx) {
              return BaseConfig.pid_wx;
          }
          else {
              return BaseConfig.pid_test;
          }
      }
  }
  BaseConfig.pid_test = "test";
  BaseConfig.pid_wx = "wx";
  BaseConfig.pid_dy = "dy";
  BaseConfig.pid_oppo = "oppo";
  BaseConfig.pid_vivo = "vivo";
  BaseConfig.pid_qq = "qq";

  class BasePlatform {
      constructor() {
          this.id = "test";
          this.proxy = null;
          this.videointerval = 0;
          this.clickList = [];
          this.iad_id = "jkn5mmoqg1n4f065cq";
          this.vad_id = "179c7bea95de9h44cg";
          this.bad_id = "24jcf61dpjhf4rh41l";
          this.session_key = "10000";
          this.anonymous_openid = "10000";
          this.openid = "10000";
          this.cid = 0;
      }
      initBannerAD() {
      }
      showMessage(mes) {
      }
      initVideoAD() {
      }
      initInterAD() {
      }
      isUseSubpackage() {
          return false;
      }
      loadSubpackage(name, callback, callbackLoad) {
          callback.run();
      }
      getGameConfig() {
          ptgcspsdk.getGameSwitch((res) => {
              console.log("getGameSwitch", res);
              if (typeof res == "string") {
                  res = JSON.parse(res);
              }
              this.gameSwitch = res.data;
          });
      }
      setGameList(list) {
          this.gameList = JSONManager.gameList;
      }
      getGameList(posid, count = 3) {
          let list = [];
          if (this.gameList != null && this.gameList.length > 0) {
              for (let i = 0; i < this.gameList.length; i++) {
                  if (this.gameList[i].position == posid) {
                      list.push(this.gameList[i]);
                  }
              }
              list = list.sort((item0, item1) => {
                  return Math.random() > 0.5 ? -1 : 1;
              });
              let tmp = [];
              for (let j = 0; j < count; j++) {
                  for (let i = 0; i < list.length; i++) {
                      tmp.push(list[i]);
                  }
              }
              list = tmp;
          }
          return list;
      }
      getUseAPI(apiId) {
          return false;
      }
      getSwitch(id) {
          return false;
      }
      get isNew() {
          let data = Laya.LocalStorage.getJSON("isNew");
          if (data == null || data == "") {
              Laya.LocalStorage.setJSON("isNew", { isNew: true });
              return 1;
          }
          return 0;
      }
      sendLog(aid, type = 0, posid = "", toAppid = "") {
      }
      init(callback) {
          if (callback)
              callback.run();
          this.getGameConfig();
      }
      zhengDongShort() {
      }
      zhengDongLong() {
      }
      openService() {
      }
      getOpenid(callback, callbackFail) {
          callbackFail.run();
      }
      login(callback, callbackFail) {
          callbackFail.run();
      }
      share(callback, callbackFail, type = 0) {
          callback.run();
      }
      shareVideo(callback, callbackFail) {
          if (GameData.Inst.platform.id != BaseConfig.pid_dy)
              callback.run();
      }
      videoAD(callback, callbackFail, type = 0) {
          callback.run();
      }
      bannerAD(callback) {
      }
      InterAD(callback) {
      }
      openApp(appInfo, callback) {
      }
      recordVideo(callback, callbackFail) {
      }
      stopVideo() {
      }
  }

  class DYPlatform extends BasePlatform {
      constructor() {
          super();
          this.videointerval = 0;
          this.appid = [];
      }
      showMessage(mes) {
          console.log("showMessage", mes);
          if (this.proxy) {
              let obj = {};
              obj["title"] = mes;
              this.proxy.showToast(obj);
          }
      }
      init(callback) {
          this.proxy = Laya.Browser.window.tt;
          this.proxy.showShareMenu({
              withShareTicket: true
          });
          this.proxy.onShareAppMessage(() => {
              return {
                  success() {
                      this.showMessage("分享成功");
                  },
                  fail(e) {
                      this.showMessage("分享失败");
                  }
              };
          });
          let menuObj = this.proxy.getMenuButtonBoundingClientRect();
          if (menuObj) {
          }
          var info = this.proxy.getSystemInfoSync();
          if (info) {
          }
          let launch = this.proxy.getLaunchOptionsSync();
          if (launch) {
              if (launch.referrerInfo && launch.referrerInfo.appId) {
              }
              if (launch.query) {
                  if (launch.query.channel) {
                  }
                  if (launch.query.inviteId) {
                  }
                  if (launch.query.id) {
                  }
                  if (launch.query.inviteId) {
                      var userId = launch.query["inviteId"];
                      if (userId != undefined || userId != null) {
                      }
                  }
              }
          }
          this.proxy.onShow((res) => {
              Laya.stage.event(Laya.Event.FOCUS);
              if (res.query != undefined) {
                  if (res.query.inviteId) {
                      var userId = res.query["inviteId"];
                      if (userId != undefined || userId != null) {
                      }
                  }
                  if (res.query.openGroup) {
                  }
                  if (res.scene == 1104) {
                  }
              }
          });
          this.proxy.onHide((res) => {
              Laya.stage.event(Laya.Event.BLUR);
          });
          if (callback)
              callback.run();
          this.getGameConfig();
      }
      openService() {
          this.proxy.openCustomerServiceConversation();
      }
      zhengDongShort() {
          this.proxy.vibrateShort();
      }
      zhengDongLong() {
          this.proxy.vibrateLong();
      }
      getGameConfig() {
          this.cid = 0;
          this.bad_id = "55pcpi7hetc5o9h60f";
          this.iad_id = "alqc7949jckc88gibl";
          this.vad_id = "19b9icik0bkn24a94g";
          this.initBannerAD();
          this.initVideoAD();
          let $this = this;
          ptgcspsdk.getGameSwitch((res) => {
              console.log("getGameSwitch", res);
              if (typeof res == "string") {
                  res = JSON.parse(res);
              }
              $this.gameSwitch = res.data;
          });
          $this.gameList = [];
          console.log("准备获得游戏list");
          ptgcspsdk.getJumpGameList((res) => {
              console.log("getJumpGameList", res);
              if (typeof res == "string") {
                  res = JSON.parse(res);
              }
              $this.gameList = res;
          });
          this.gameList = JSONManager.gameList;
      }
      getUseAPI(apiId) {
          return true;
      }
      getSwitch(id) {
          console.log("进来了");
          if (this.gameSwitch == null)
              return false;
          if (this.gameSwitch.version == 0)
              return false;
          if (this.gameSwitch.local_switch == 1)
              return false;
          switch (id) {
              case 0:
                  if (this.gameSwitch.ignore_check == 0)
                      return false;
                  return this.gameSwitch.default_check == 1;
                  break;
              case 1:
                  return this.gameSwitch.delay_display == 1;
                  break;
              case 2:
                  return this.gameSwitch.force_video1 == 1;
                  break;
              case 3:
                  return this.gameSwitch.force_share == 1;
                  break;
              case 4:
                  let systemInfo = this.proxy.getSystemInfoSync();
                  if (systemInfo.platform == "ios")
                      return false;
                  return this.gameSwitch.screen_switch == 1;
                  break;
              case 5:
                  return this.gameSwitch.delay_egg_switch == 1;
                  break;
              case 6:
                  return this.gameSwitch.force_video2 == 1;
                  break;
              case 7:
                  console.log("进来了");
                  if (this.gameSwitch.ignore_check == 1)
                      return true;
                  break;
              case 8:
                  return this.gameSwitch.force_video3 == 1;
                  break;
              case 9:
                  return this.gameSwitch.video_number >= 1;
                  break;
              case 10:
                  return this.gameSwitch.force_sharetimes >= 1;
                  break;
          }
          return false;
      }
      sendLog(aid, type = 0, uid = "", toAppid = "") {
          switch (aid) {
              case 1005:
                  ptgcspsdk.sendLogin(this.cid, aid, this.openid, this.isNew);
                  break;
              case 1008:
                  ptgcspsdk.startGame(this.cid, aid, this.openid);
                  break;
              case 1009:
                  ptgcspsdk.sendShare(this.cid, aid, this.openid, type);
                  break;
              case 1010:
              case 1011:
                  ptgcspsdk.watchVideo(this.cid, aid, this.openid, type);
                  break;
              case 1007:
              case 1017:
                  ptgcspsdk.sendJump(this.cid, aid, this.openid, uid, toAppid);
                  break;
          }
      }
      getOpenid(callback, callbackFail) {
          callbackFail.run();
          GameData.Inst.platform.openid = "10000";
          GameData.Inst.platform.anonymous_openid = "10000";
          GameData.Inst.platform.session_key = "10000";
          this.isLogined = false;
      }
      login(callback, callbackFail) {
          if (this.isLogined) {
              if (callback)
                  callback.run();
              return;
          }
          ;
          this.isLogined = true;
          this.proxy.login({
              success(data) {
                  console.log(`login调用成功${data.code} ${data.anonymousCode}`);
                  ptgcspsdk.getTouTiaoOpenid(data.code, data.anonymousCode, (res) => {
                      console.log("上传成功");
                      if (callback)
                          callback.run();
                      if (res.openid == null)
                          res.openid = "10001";
                      if (res.anonymous_openid == null)
                          res.anonymous_openid = "10001";
                      if (res.session_key == null)
                          res.session_key = "10001";
                      GameData.Inst.platform.openid = res.openid;
                      GameData.Inst.platform.anonymous_openid = res.anonymous_openid;
                      GameData.Inst.platform.session_key = res.session_key;
                      GameData.Inst.platform.sendLog(1005);
                  });
              },
              fail(res) {
                  console.log(`login调用失败`);
                  if (callbackFail)
                      callbackFail.run();
              }
          });
      }
      share(callback, callbackFail, type = 0) {
          this.sendLog(1009, type);
          this.proxy.shareAppMessage({
              templateId: "6j07k6lnjlr6cuabgt",
              success() {
                  callback.run();
                  this.showMessage("分享成功");
              },
              fail(e) {
                  callbackFail.run();
                  this.showMessage("分享失败");
              }
          });
      }
      shareVideo(callback, callbackFail) {
          console.log("调用了分享视频");
          let $this = this;
          this.proxy.shareAppMessage({
              channel: "video",
              extra: {
                  videoPath: $this.recorderPath,
              },
              success() {
                  callback.run();
                  $this.showMessage("分享成功");
              },
              fail(res) {
                  callbackFail.run();
                  console.log("分享失败");
                  if ($this.proxy.getSystemInfoSync().appName == 'Toutiao') {
                      if ($this.proxy.getSystemInfoSync().platform == "ios") {
                          if (res.errMsg == 'shareAppMessage:fail video duration is too short') {
                              $this.showMessage('录屏时间短于3s不能分享哦~~');
                          }
                          else {
                              if (res.errMsg.split('shareAppMessage:fail video file is too short')[0] == '') {
                                  $this.showMessage('录屏时长少于3秒，无法分享');
                              }
                              else {
                                  $this.showMessage('发布取消');
                              }
                          }
                      }
                      else {
                          let msg = res.errMsg.split(',')[0];
                          console.log('msg', msg);
                          if (msg == 'shareAppMessage:fail video file is too short') {
                              $this.showMessage('录屏时间短于3s不能分享哦~~');
                          }
                          else {
                              if (res.errMsg.split('shareAppMessage:fail video file is too short')[0] == '') {
                                  $this.showMessage('录屏时长少于3秒，无法分享');
                              }
                              else {
                                  $this.showMessage('发布取消');
                              }
                          }
                      }
                  }
                  else if ($this.proxy.getSystemInfoSync().appName == 'news_article_lite') {
                      if ($this.proxy.getSystemInfoSync().platform == "ios") {
                          if (res.errMsg == 'shareAppMessage:fail video duration is too short') {
                              $this.showMessage('录屏时间短于3s不能分享哦~~');
                          }
                          else {
                              if (res.errMsg.split('shareAppMessage:fail video file is too short')[0] == '') {
                                  $this.showMessage('录屏时长少于3秒，无法分享');
                              }
                              else {
                                  $this.showMessage('发布取消');
                              }
                          }
                      }
                      else {
                          let msg = res.errMsg.split(',')[0];
                          console.log('msg', msg);
                          if (msg == 'shareAppMessage:fail video file is too short') {
                              $this.showMessage('录屏时间短于3s不能分享哦~~');
                          }
                          else {
                              if (res.errMsg.split('shareAppMessage:fail video file is too short')[0] == '') {
                                  $this.showMessage('录屏时长少于3秒，无法分享');
                              }
                              else {
                                  $this.showMessage('发布取消');
                              }
                          }
                      }
                  }
                  else if ($this.proxy.getSystemInfoSync().appName == 'Douyin') {
                      if ($this.proxy.getSystemInfoSync().platform == "ios") {
                          if (res.errMsg == 'shareAppMessage:fail video duration is too short') {
                              $this.showMessage('录屏时间短于3s不能分享哦~~');
                          }
                          else {
                              if (res.errMsg.split('shareAppMessage:fail video file is too short')[0] == '') {
                                  $this.showMessage('录屏时长少于3秒，无法分享');
                              }
                              else {
                                  $this.showMessage('发布取消');
                              }
                          }
                      }
                      else {
                          let msg = res.errMsg.split(',')[0];
                          console.log('msg', msg);
                          if (msg == 'shareAppMessageDirectly:fail') {
                              $this.showMessage('录屏时间短于3s不能分享哦~~');
                          }
                          else {
                              if (res.errMsg.split('shareAppMessage:fail video file is too short')[0] == '') {
                                  $this.showMessage('录屏时长少于3秒，无法分享');
                              }
                              else {
                                  $this.showMessage('发布取消');
                              }
                          }
                      }
                  }
                  else {
                      if (res.errMsg.split('shareAppMessage:fail video file is too short')[0] == '') {
                          $this.showMessage('录屏时长少于3秒，无法分享');
                      }
                      else {
                          $this.showMessage('发布取消');
                      }
                  }
              }
          });
      }
      initVideoAD() {
          if (!this.proxy.createRewardedVideoAd)
              return;
          if (this.videoADObj == null) {
              this.videoADObj = this.proxy.createRewardedVideoAd({ adUnitId: this.vad_id });
              this.videoADObj.onError(err => {
                  if (this.callbackFailVideoAD) {
                      console.log("没有视频但是有回调");
                      this.showMessage("暂无视频");
                      this.callbackFailVideoAD.run();
                      this.callbackVideoAD = null;
                      this.callbackFailVideoAD = null;
                  }
              });
              this.videoADObj.onClose(res => {
                  console.log("onClose");
                  if (res.isEnded) {
                      console.log("给奖励");
                      GameData.Inst.data.taskType4VAD++;
                      if (this.callbackVideoAD)
                          this.callbackVideoAD.run();
                      this.sendLog(1011, this.currVADType);
                  }
                  else {
                      console.log("调用回调");
                      console.log(this.callbackFailVideoAD);
                      if (this.callbackFailVideoAD)
                          this.callbackFailVideoAD.run();
                      this.showMessage("关闭视频");
                  }
                  this.callbackVideoAD = null;
                  this.callbackFailVideoAD = null;
              });
              console.log("initVideoAD");
          }
      }
      videoAD(callback, callbackFail, type = 0) {
          console.log("准备看电影");
          if (this.videoADObj == null)
              return;
          if (this.callbackVideoAD != null)
              return;
          console.log("有电影");
          if (this.proxy.getSystemInfoSync().appName == 'Douyin' && GameData.Inst.platform.proxy.getSystemInfoSync().platform == "ios") {
              if (callbackFail)
                  callbackFail.run();
              this.showMessage("暂无视频");
              return;
          }
          this.currVADType = type;
          this.callbackVideoAD = callback;
          this.callbackFailVideoAD = callbackFail;
          this.sendLog(1010, type);
          this.videoADObj.show().then(() => {
              console.log("videoAD广告显示成功");
          }).catch(err => {
              console.log("广告组件出现问题", err);
              this.videoADObj.load().then(() => {
                  console.log("手动加载成功");
                  this.videoADObj.show();
              });
          });
          console.log("videoAD");
      }
      initBannerAD() {
          if (this.proxy.getSystemInfoSync().appName == 'Douyin')
              return;
          if (!this.proxy.createBannerAd)
              return;
          if (this.bannerADObj == null) {
              this.bannerADObj = this.proxy.createBannerAd({
                  adUnitId: this.bad_id,
                  adIntervals: 30,
                  style: {
                      left: 0,
                      top: -800,
                      width: 100,
                  },
              });
              this.bannerADObj.onLoad(() => {
                  console.log("initBannerAD广告显示成功");
              });
              this.bannerADObj.onResize((size) => {
                  console.log("setSize", size.width, size.height);
                  let systemInfo = this.proxy.getSystemInfoSync();
                  let windowWidth = systemInfo.windowWidth;
                  let windowHeight = systemInfo.windowHeight;
                  this.bannerADObj.style.top = windowHeight - size.height;
                  this.bannerADObj.style.left = (windowWidth - size.width) / 2;
              });
              console.log("initBannerAD");
          }
      }
      bannerAD(callback) {
          console.log("是否为抖音", this.proxy.getSystemInfoSync().appName);
          if (this.proxy.getSystemInfoSync().appName == 'Douyin')
              return;
          if (!this.proxy.createBannerAd)
              return;
          console.log(this.bannerADObj);
          if (this.bannerADObj) {
              if (this.proxy.getSystemInfoSync().appName != 'XiGua') {
                  this.bannerADObj.hide();
                  this.bannerADObj.offLoad();
                  this.bannerADObj.offResize();
              }
              this.bannerADObj.destroy();
              this.bannerADObj = null;
          }
          this.bannerADObj = this.proxy.createBannerAd({
              adUnitId: this.bad_id,
              adIntervals: 30,
              style: {
                  left: 0,
                  top: -800,
                  width: 100,
              }
          });
          this.bannerADObj.onError((err) => {
              console.log("banner广告加载失败", err);
              this.bannerADObj = null;
          });
          this.bannerADObj.onLoad(() => {
              console.log("initBannerAD广告显示成功");
              this.bannerADObj.style.top = this.proxy.getSystemInfoSync().windowHeight - this.bannerADObj.height;
              this.bannerADObj.style.left = (this.proxy.getSystemInfoSync().windowWidth - this.bannerADObj.width) / 2;
              callback.run();
          });
          this.bannerADObj.onResize((size) => {
              console.log("setSize", size.width, size.height);
              let systemInfo = this.proxy.getSystemInfoSync();
              let windowWidth = systemInfo.windowWidth;
              let windowHeight = systemInfo.windowHeight;
              this.bannerADObj.style.top = windowHeight - size.height;
              this.bannerADObj.style.left = (windowWidth - size.width) / 2;
              callback.run();
          });
          console.log("bannerAD");
      }
      initInterAD() {
          if (!this.proxy.createInterstitialAd)
              return;
          if (this.interADObj == null) {
              this.interADObj = this.proxy.createInterstitialAd({
                  adUnitId: this.iad_id
              });
              this.interADObj.onError(err => {
                  console.log("暂无InterAD");
              });
              this.interADObj.onLoad(() => {
                  console.log("initInterAD广告显示成功");
              });
              console.log("initInterAD");
          }
      }
      InterAD(callback) {
          if (this.interADObj == null)
              return;
          this.interADObj.show().then(() => {
              console.log("InterAD广告显示成功");
          }).catch(err => {
              console.log("InterAD问题", err);
              this.interADObj.load().then(() => {
                  console.log("手动InterAD成功");
                  this.interADObj.show();
              });
          });
          console.log("InterAD");
      }
      openApp(appInfo, callback) {
          console.log("openApp", appInfo);
          if (!this.proxy.showMoreGamesModal)
              return;
          let systemInfo = this.proxy.getSystemInfoSync();
          if (systemInfo.platform == "ios")
              return;
          for (var i = 0; i < this.gameList.length; i++) {
              this.appid.push({
                  appId: JSONManager.gameList[i].appid,
                  query: "channel=" + JSONManager.gameList.appid,
                  extraData: {}
              });
          }
          console.log("获得的游戏list", this.appid);
          this.proxy.showMoreGamesModal({
              appLaunchOptions: this.appid,
              success(res) {
                  console.log("openApp success", res, res.errMsg);
                  GameData.Inst.platform.sendLog(1017, 0, appInfo[0].posid, appInfo[0].appId);
              },
              fail(res) {
                  console.log("openApp fail", res, res.errMsg);
              }
          });
          console.log("openApp");
      }
      recordVideo(callback, callbackFail) {
          if (this.recorderPath)
              this.recorderPath = null;
          this.recorder = this.proxy.getGameRecorderManager();
          this.recorder.start({ duration: 30 });
          this.recorder.onStop(res => {
              console.log("视频链接地址", res.videoPath);
              this.recorderPath = res.videoPath;
          });
      }
      stopVideo() {
          if (this.recorder != null) {
              this.recorder.stop();
              this.recorder = null;
          }
      }
  }

  class ResManager {
      constructor() {
      }
  }

  var REG = Laya.ClassUtils.regClass;
  var ui;
  (function (ui) {
      var ads;
      (function (ads) {
          class AD1ItemUI extends Laya.View {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(AD1ItemUI.uiView);
              }
          }
          AD1ItemUI.uiView = { "type": "View", "props": { "width": 189, "height": 205 }, "compId": 2, "child": [{ "type": "Button", "props": { "var": "btn_click", "top": 0, "stateNum": 1, "skin": " ", "right": 0, "left": 0, "bottom": 0, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 3, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "bannerAD/ty_5.png" }, "compId": 10 }, { "type": "Image", "props": { "y": -2, "x": -1, "width": 192, "var": "img_icon", "skin": "adgame/ty_4.png", "height": 194 }, "compId": 4, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 192, "skin": "adgame/ty_4.png", "renderType": "mask", "height": 193 }, "compId": 8 }] }, { "type": "Label", "props": { "y": 123, "x": 3, "width": 122, "visible": false, "var": "txt_name", "valign": "middle", "text": "200", "overflow": "hidden", "height": 29, "fontSize": 24, "color": "#ffffff", "align": "center" }, "compId": 5 }, { "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 6 }] }], "loadList": ["bannerAD/ty_5.png", "adgame/ty_4.png"], "loadList3D": [] };
          ads.AD1ItemUI = AD1ItemUI;
          REG("ui.ads.AD1ItemUI", AD1ItemUI);
          class AD2ItemUI extends Laya.View {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(AD2ItemUI.uiView);
              }
          }
          AD2ItemUI.uiView = { "type": "View", "props": { "width": 150, "height": 150 }, "compId": 2, "child": [{ "type": "Button", "props": { "y": 75, "x": 75, "width": 150, "var": "btn_click", "stateNum": 1, "skin": " ", "height": 150, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 3, "child": [{ "type": "Image", "props": { "y": 0, "x": 4, "width": 143, "skin": "bannerAD/ty_5.png", "height": 158 }, "compId": 9 }, { "type": "Image", "props": { "y": 0, "x": 1, "width": 147, "var": "img_icon", "skin": "adgame/ty_4.png", "height": 147 }, "compId": 4, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 147, "skin": "adgame/ty_4.png", "renderType": "mask", "height": 147 }, "compId": 8 }] }, { "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 6 }] }], "loadList": ["bannerAD/ty_5.png", "adgame/ty_4.png"], "loadList3D": [] };
          ads.AD2ItemUI = AD2ItemUI;
          REG("ui.ads.AD2ItemUI", AD2ItemUI);
          class AD3ItemUI extends Laya.View {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(AD3ItemUI.uiView);
              }
          }
          AD3ItemUI.uiView = { "type": "View", "props": { "width": 120, "height": 150 }, "compId": 2, "child": [{ "type": "Button", "props": { "y": 75, "x": 60, "width": 120, "var": "btn_click", "stateNum": 1, "skin": " ", "height": 150, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 3, "child": [{ "type": "Image", "props": { "x": 0, "top": 3, "skin": "adgame/di_1.png", "right": 0, "left": 0, "bottom": 0 }, "compId": 7 }, { "type": "Image", "props": { "y": 10, "x": 5, "width": 110, "var": "img_icon", "skin": "adgame/p_yx_bg.png", "height": 110, "sizeGrid": "19,22,20,22" }, "compId": 4, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 110, "skin": "adgame/p_yx_bg.png", "renderType": "mask", "height": 122, "sizeGrid": "19,22,20,22" }, "compId": 8 }] }, { "type": "Image", "props": { "width": 120, "skin": "adgame/kuang_1_1.png", "right": 0, "left": 0, "height": 38, "bottom": 0 }, "compId": 9 }, { "type": "Label", "props": { "width": 122, "var": "txt_name", "valign": "middle", "text": "200", "overflow": "hidden", "height": 32, "fontSize": 22, "color": "#ffffff", "centerX": 0, "bottom": 1, "align": "center" }, "compId": 5 }, { "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 6 }] }], "loadList": ["adgame/di_1.png", "adgame/p_yx_bg.png", "adgame/kuang_1_1.png"], "loadList3D": [] };
          ads.AD3ItemUI = AD3ItemUI;
          REG("ui.ads.AD3ItemUI", AD3ItemUI);
          class ADItemUI extends Laya.View {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(ADItemUI.uiView);
              }
          }
          ADItemUI.uiView = { "type": "View", "props": { "width": 250, "height": 300 }, "compId": 2, "child": [{ "type": "Button", "props": { "y": 150, "x": 125, "width": 250, "var": "btn_click", "stateNum": 1, "skin": " ", "height": 300, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 3, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 248, "skin": "bannerAD/ty_1.png", "height": 305 }, "compId": 7 }, { "type": "Image", "props": { "y": 8, "x": 8, "width": 231, "var": "img_icon", "skin": "adgame/p_yx_bg.png", "height": 227, "sizeGrid": "19,22,20,22" }, "compId": 4, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 231, "skin": "adgame/p_yx_bg.png", "renderType": "mask", "height": 227, "sizeGrid": "19,22,20,22" }, "compId": 8 }] }, { "type": "Label", "props": { "width": 192, "var": "txt_name", "valign": "middle", "text": "200", "overflow": "hidden", "height": 32, "fontSize": 30, "color": "#ffffff", "centerX": 0, "bottom": 21, "align": "center" }, "compId": 5 }, { "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 6 }] }], "loadList": ["bannerAD/ty_1.png", "adgame/p_yx_bg.png"], "loadList3D": [] };
          ads.ADItemUI = ADItemUI;
          REG("ui.ads.ADItemUI", ADItemUI);
          class ADMainItemUI extends Laya.View {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(ADMainItemUI.uiView);
              }
          }
          ADMainItemUI.uiView = { "type": "View", "props": { "width": 220, "height": 300 }, "compId": 2, "child": [{ "type": "Button", "props": { "width": 220, "var": "btn_click", "top": 0, "stateNum": 1, "skin": " ", "left": 0, "bottom": 0, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 3, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 220, "skin": "bannerAD/ty_1.png", "height": 300 }, "compId": 10 }, { "type": "Image", "props": { "y": 10, "x": 7, "width": 205, "var": "img_icon", "skin": "adgame/p_yx_bg.png", "height": 220, "sizeGrid": "19,22,20,22" }, "compId": 4, "child": [{ "type": "Image", "props": { "y": -1, "x": 0, "width": 205, "skin": "adgame/p_yx_bg.png", "renderType": "mask", "height": 220, "sizeGrid": "19,22,20,22" }, "compId": 8 }] }, { "type": "Label", "props": { "width": 192, "var": "txt_name", "valign": "middle", "text": "200", "overflow": "hidden", "height": 32, "fontSize": 30, "color": "#000000", "centerX": 0, "bottom": 24, "align": "center" }, "compId": 5 }, { "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 6 }] }], "loadList": ["bannerAD/ty_1.png", "adgame/p_yx_bg.png"], "loadList3D": [] };
          ads.ADMainItemUI = ADMainItemUI;
          REG("ui.ads.ADMainItemUI", ADMainItemUI);
          class JumpBannerUI extends Laya.View {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(JumpBannerUI.uiView);
              }
          }
          JumpBannerUI.uiView = { "type": "View", "props": { "y": 0, "x": 0, "width": 750, "runtime": "ads/JumpBanner.ts", "name": "1001", "height": 180 }, "compId": 2, "child": [{ "type": "Sprite", "props": { "y": 0, "x": 0, "width": 750, "texture": "bannerAD/ty_d.png", "height": 180 }, "compId": 32 }, { "type": "List", "props": { "y": 14, "x": 9, "width": 732, "var": "list_ad", "spaceY": 40, "spaceX": 10, "repeatY": 1, "height": 162, "hScrollBarSkin": " " }, "compId": 33, "child": [{ "type": "AD2Item", "props": { "renderType": "render", "runtime": "ui.ads.AD2ItemUI" }, "compId": 37 }, { "type": "Script", "props": { "showType": 1, "runtime": "ads/ADSList.ts" }, "compId": 38 }] }], "loadList": ["bannerAD/ty_d.png"], "loadList3D": [] };
          ads.JumpBannerUI = JumpBannerUI;
          REG("ui.ads.JumpBannerUI", JumpBannerUI);
          class JumpPage1UI extends Laya.Dialog {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(JumpPage1UI.uiView);
              }
          }
          JumpPage1UI.uiView = { "type": "Dialog", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "compId": 2, "child": [{ "type": "Script", "props": { "yTag": 1044, "y": 0, "x": 0, "showType": 2, "btnName": "btn_close", "adType": 2, "runtime": "platforms/BannerScr.ts" }, "compId": 29 }, { "type": "Image", "props": { "y": 0, "x": 0, "var": "img_bg", "skin": "bannerAD/ty_bg1.png" }, "compId": 38 }, { "type": "List", "props": { "y": 60, "x": 87, "width": 575, "var": "list_ad", "vScrollBarSkin": " ", "spaceY": 40, "spaceX": 70, "repeatX": 2, "height": 1207 }, "compId": 33, "child": [{ "type": "ADItem", "props": { "renderType": "render", "runtime": "ui.ads.ADItemUI" }, "compId": 36 }, { "type": "Script", "props": { "showType": 1, "runtime": "ads/ADSList.ts" }, "compId": 37 }] }, { "type": "Button", "props": { "y": 1044, "x": 375, "var": "btn_close", "stateNum": 1, "skin": "adgame/ty_btn_jxyx.png", "name": "btn_close", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 4, "child": [{ "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 18 }] }], "loadList": ["bannerAD/ty_bg1.png", "adgame/ty_btn_jxyx.png"], "loadList3D": [] };
          ads.JumpPage1UI = JumpPage1UI;
          REG("ui.ads.JumpPage1UI", JumpPage1UI);
          class JumpPage2UI extends Laya.Dialog {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(JumpPage2UI.uiView);
              }
          }
          JumpPage2UI.uiView = { "type": "Dialog", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "compId": 2, "child": [{ "type": "Sprite", "props": { "y": 0, "x": 0, "var": "img_bg", "texture": "bannerAD/ty_bg1.png" }, "compId": 46 }, { "type": "Box", "props": { "y": 0, "top": 0, "right": 0, "left": 0, "height": 1334 }, "compId": 31, "child": [{ "type": "Sprite", "props": { "y": 37, "x": 44, "texture": "bannerAD/ty_djdzw.png" }, "compId": 37 }, { "type": "Sprite", "props": { "y": 329, "x": 0, "texture": "adgame/ty_rmtj.png" }, "compId": 39 }, { "type": "List", "props": { "y": 111, "x": 0, "width": 752, "var": "list_ad2", "spaceX": 10, "repeatY": 1, "height": 218, "hScrollBarSkin": " " }, "compId": 41, "child": [{ "type": "AD1Item", "props": { "y": 0, "x": 9, "renderType": "render", "runtime": "ui.ads.AD1ItemUI" }, "compId": 43 }, { "type": "Script", "props": { "runtime": "ads/ADSList.ts" }, "compId": 44 }] }] }, { "type": "Script", "props": { "yTag": 1044, "y": 0, "x": 0, "showType": 2, "btnName": "btn_close", "adType": 2, "runtime": "platforms/BannerScr.ts" }, "compId": 29 }, { "type": "List", "props": { "y": 430, "x": 16, "width": 715, "var": "list_ad", "vScrollBarSkin": " ", "spaceY": 20, "spaceX": 20, "repeatX": 3, "height": 880 }, "compId": 33, "child": [{ "type": "ADMainItem", "props": { "y": 0, "x": 7, "renderType": "render", "runtime": "ui.ads.ADMainItemUI" }, "compId": 40 }, { "type": "Script", "props": { "runtime": "ads/ADSList.ts" }, "compId": 45 }] }, { "type": "Button", "props": { "y": 1044, "x": 375, "var": "btn_close", "stateNum": 1, "skin": "adgame/ty_btn_jxyx.png", "name": "btn_close", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 4, "child": [{ "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 18 }] }], "loadList": ["bannerAD/ty_bg1.png", "bannerAD/ty_djdzw.png", "adgame/ty_rmtj.png", "adgame/ty_btn_jxyx.png"], "loadList3D": [] };
          ads.JumpPage2UI = JumpPage2UI;
          REG("ui.ads.JumpPage2UI", JumpPage2UI);
          class JumpPageGameUI extends Laya.View {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(JumpPageGameUI.uiView);
              }
          }
          JumpPageGameUI.uiView = { "type": "View", "props": { "width": 750, "top": 0, "runtime": "ads/JumpPageGame.ts", "right": 0, "mouseThrough": true, "left": 0, "height": 1334, "bottom": 0 }, "compId": 2, "child": [{ "type": "Box", "props": { "var": "box_list", "mouseThrough": true, "left": -422, "centerY": 0 }, "compId": 31, "child": [{ "type": "Sprite", "props": { "texture": "adgame/ty_cl.png" }, "compId": 32 }, { "type": "List", "props": { "y": 26, "x": 13, "width": 387, "var": "list_ad", "vScrollBarSkin": " ", "spaceY": 15, "spaceX": 10, "repeatX": 3, "height": 528 }, "compId": 33, "child": [{ "type": "AD3Item", "props": { "renderType": "render", "runtime": "ui.ads.AD3ItemUI" }, "compId": 41 }, { "type": "Script", "props": { "runtime": "ads/ADSList.ts" }, "compId": 48 }] }, { "type": "Button", "props": { "var": "btn_click", "top": 231, "stateNum": 1, "skin": "adgame/ty_btn_cl.png", "left": 415, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 38, "child": [{ "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 40 }] }, { "type": "Button", "props": { "y": 10, "x": 10, "var": "btn_click2", "top": 231, "stateNum": 1, "skin": "adgame/ty_btn_cl_2.png", "left": 415, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 44, "child": [{ "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 46 }, { "type": "Sprite", "props": { "y": -10, "x": 43, "texture": "adgame/ty_hd.png" }, "compId": 47 }] }] }, { "type": "JumpBanner", "props": { "name": "1007", "bottom": 0, "runtime": "ads/JumpBanner.ts" }, "compId": 37 }, { "type": "Button", "props": { "var": "btn_close", "top": 160, "stateNum": 1, "skin": "adgame/ty_fh.png", "right": 0, "name": "btn_close", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 4, "child": [{ "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 18 }, { "type": "Script", "props": { "runtime": "platforms/Switch_default_check.ts" }, "compId": 43 }] }], "loadList": ["adgame/ty_cl.png", "adgame/ty_btn_cl.png", "adgame/ty_btn_cl_2.png", "adgame/ty_hd.png", "adgame/ty_fh.png"], "loadList3D": [] };
          ads.JumpPageGameUI = JumpPageGameUI;
          REG("ui.ads.JumpPageGameUI", JumpPageGameUI);
          class JumpPageMainUI extends Laya.Dialog {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(JumpPageMainUI.uiView);
              }
          }
          JumpPageMainUI.uiView = { "type": "Dialog", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "compId": 2, "child": [{ "type": "Box", "props": { "y": 0, "width": 750, "top": 0, "left": 0, "height": 1334 }, "compId": 31, "child": [{ "type": "Sprite", "props": { "y": 268, "x": 7.5, "width": 735, "texture": "bannerAD/ty_bg3.png", "height": 970 }, "compId": 38, "child": [{ "type": "List", "props": { "y": 100, "x": 27, "width": 691, "var": "list_ad", "vScrollBarSkin": " ", "spaceY": 15, "spaceX": 10, "repeatX": 3, "height": 841 }, "compId": 33, "child": [{ "type": "ADMainItem", "props": { "renderType": "render", "runtime": "ui.ads.ADMainItemUI" }, "compId": 36 }, { "type": "Script", "props": { "showType": 1, "runtime": "ads/ADSList.ts" }, "compId": 37 }] }, { "type": "Button", "props": { "y": 72, "x": 698.5, "width": 73, "var": "btn_close", "stateNum": 1, "skin": "bannerAD/ty_bg3_x.png", "name": "btn_close", "height": 72, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 4, "child": [{ "type": "Script", "props": { "runtime": "platforms/Switch_delay_display.ts" }, "compId": 17 }, { "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 18 }] }] }] }], "loadList": ["bannerAD/ty_bg3.png", "bannerAD/ty_bg3_x.png"], "loadList3D": [] };
          ads.JumpPageMainUI = JumpPageMainUI;
          REG("ui.ads.JumpPageMainUI", JumpPageMainUI);
      })(ads = ui.ads || (ui.ads = {}));
  })(ui || (ui = {}));
  (function (ui) {
      var items;
      (function (items) {
          class BgItemUI extends Laya.View {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(BgItemUI.uiView);
              }
          }
          BgItemUI.uiView = { "type": "View", "props": { "width": 190, "height": 268 }, "compId": 2, "child": [{ "type": "Button", "props": { "y": 0, "x": 0, "var": "btn_select", "top": 0, "stateNum": 1, "skin": " ", "right": 0, "left": 0, "bottom": 0 }, "compId": 12 }, { "type": "Image", "props": { "y": 0, "x": 0, "var": "img_show", "skin": "game/yxz_dk.png" }, "compId": 13 }, { "type": "Image", "props": { "y": 134, "x": 95, "width": 156, "var": "img_icon", "skin": "game/yxz_dk.png", "height": 227, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 14 }, { "type": "Image", "props": { "y": 134, "x": 95, "width": 183, "var": "img_lock", "skin": "shop/sc_db_4.png", "height": 269, "anchorY": 0.5, "anchorX": 0.5, "alpha": 0.65 }, "compId": 15, "child": [{ "type": "Sprite", "props": { "y": 61, "x": 64, "texture": "shop/sc_db_s.png" }, "compId": 16 }, { "type": "Sprite", "props": { "y": 175, "x": 18, "texture": "game/yxz_btn.png" }, "compId": 17 }, { "type": "Sprite", "props": { "y": 194, "x": 54.5, "texture": "shop/sc_gg.png", "scaleY": 0.5, "scaleX": 0.5 }, "compId": 18 }, { "type": "FontClip", "props": { "y": 197, "x": 76, "width": 121, "var": "txt_video_num", "value": "0/1", "text": "0/3", "stroke": 2, "spaceX": -10, "skin": "shop/sc_ansz_1.png", "sheet": "0123456789/", "scaleY": 0.5, "scaleX": 0.5, "height": 41, "fontSize": 44, "color": "#ffffff", "align": "center" }, "compId": 19 }] }], "loadList": ["game/yxz_dk.png", "shop/sc_db_4.png", "shop/sc_db_s.png", "game/yxz_btn.png", "shop/sc_gg.png", "shop/sc_ansz_1.png"], "loadList3D": [] };
          items.BgItemUI = BgItemUI;
          REG("ui.items.BgItemUI", BgItemUI);
          class BoxItemUI extends Laya.View {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(BoxItemUI.uiView);
              }
          }
          BoxItemUI.uiView = { "type": "View", "props": { "width": 155, "height": 155 }, "compId": 2, "child": [{ "type": "Sprite", "props": { "y": 2, "x": 2, "width": 155, "texture": "shop/sc_db_2.png", "height": 155 }, "compId": 5 }, { "type": "Sprite", "props": { "y": -13, "x": 7, "texture": "task/jinbi_2.png" }, "compId": 6 }, { "type": "Sprite", "props": { "y": 0, "x": 0, "width": 156, "texture": "shop/sc_db_3.png", "height": 157 }, "compId": 17 }, { "type": "Label", "props": { "y": 114, "x": 18, "width": 119, "var": "txt_cent", "text": "200", "height": 31, "fontSize": 30, "color": "#ffffff", "align": "center" }, "compId": 7 }, { "type": "Button", "props": { "var": "btn_open", "top": 0, "stateNum": 1, "skin": "shop/sc_db_2.png", "sizeGrid": "21,19,18,25", "right": 0, "left": 0, "bottom": 0 }, "compId": 3, "child": [{ "type": "Sprite", "props": { "y": 15, "x": 8, "texture": "box/p_i_bx.png" }, "compId": 4 }, { "type": "Script", "props": { "y": 14, "x": 13, "runtime": "view/BtnSoundScript.ts" }, "compId": 15 }, { "type": "Image", "props": { "y": 96, "x": 99, "var": "img_video", "skin": "box/p_i_sp.png", "alpha": 0.75 }, "compId": 18 }] }], "loadList": ["shop/sc_db_2.png", "task/jinbi_2.png", "shop/sc_db_3.png", "box/p_i_bx.png", "box/p_i_sp.png"], "loadList3D": [] };
          items.BoxItemUI = BoxItemUI;
          REG("ui.items.BoxItemUI", BoxItemUI);
          class GameADUI extends Laya.View {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(GameADUI.uiView);
              }
          }
          GameADUI.uiView = { "type": "View", "props": { "width": 131, "height": 164 }, "compId": 2, "child": [{ "type": "Button", "props": { "y": 80, "x": 70, "width": 131, "var": "btn_click", "stateNum": 1, "skin": " ", "height": 164, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 3, "child": [{ "type": "Image", "props": { "y": 0, "x": -2, "skin": "adgame/p_yx_bg.png", "sizeGrid": "19,22,20,22" }, "compId": 7 }, { "type": "Image", "props": { "y": 10, "x": 8, "width": 110, "var": "img_icon", "skin": "adgame/p_yx_bg.png", "height": 110, "sizeGrid": "19,22,20,22" }, "compId": 4, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 110, "skin": "adgame/p_yx_bg.png", "renderType": "mask", "height": 110, "sizeGrid": "19,22,20,22" }, "compId": 8 }] }, { "type": "Label", "props": { "y": 128, "x": 3, "width": 122, "var": "txt_name", "valign": "middle", "text": "200", "overflow": "hidden", "height": 29, "fontSize": 24, "color": "#2b7cf5", "align": "center" }, "compId": 5 }, { "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 6 }] }], "loadList": ["adgame/p_yx_bg.png"], "loadList3D": [] };
          items.GameADUI = GameADUI;
          REG("ui.items.GameADUI", GameADUI);
          class GameADItemUI extends Laya.View {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(GameADItemUI.uiView);
              }
          }
          GameADItemUI.uiView = { "type": "View", "props": { "width": 216, "height": 250 }, "compId": 2, "child": [{ "type": "Button", "props": { "y": 139, "x": 108, "width": 216, "var": "btn_click", "stateNum": 1, "skin": " ", "height": 250, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 3, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 216, "skin": "bannerAD/ty_5.png", "height": 250 }, "compId": 7 }, { "type": "Image", "props": { "y": 7, "x": 10, "width": 196, "var": "img_icon", "skin": "adgame/p_yx_bg.png", "height": 216, "sizeGrid": "19,22,20,22" }, "compId": 4, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 196, "skin": "adgame/p_yx_bg.png", "renderType": "mask", "height": 216, "sizeGrid": "19,22,20,22" }, "compId": 8 }] }, { "type": "Label", "props": { "y": 228, "x": 11, "width": 192, "visible": false, "var": "txt_name", "valign": "middle", "text": "200", "overflow": "hidden", "height": 32, "fontSize": 30, "color": "#ffffff", "align": "center" }, "compId": 5 }, { "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 6 }] }], "loadList": ["bannerAD/ty_5.png", "adgame/p_yx_bg.png"], "loadList3D": [] };
          items.GameADItemUI = GameADItemUI;
          REG("ui.items.GameADItemUI", GameADItemUI);
          class GameMoreUI extends Laya.View {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(GameMoreUI.uiView);
              }
          }
          GameMoreUI.uiView = { "type": "View", "props": { "width": 75, "height": 185 }, "compId": 2, "child": [{ "type": "Button", "props": { "y": 92, "x": 35, "width": 70, "var": "btn_click", "stateNum": 1, "skin": " ", "height": 185, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 3, "child": [{ "type": "Image", "props": { "y": 1, "x": 1, "skin": "adgame/p_more.png" }, "compId": 7 }, { "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 9 }] }], "loadList": ["adgame/p_more.png"], "loadList3D": [] };
          items.GameMoreUI = GameMoreUI;
          REG("ui.items.GameMoreUI", GameMoreUI);
          class ShopItemUI extends Laya.View {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(ShopItemUI.uiView);
              }
          }
          ShopItemUI.uiView = { "type": "View", "props": { "width": 145, "height": 145 }, "compId": 2, "child": [{ "type": "Button", "props": { "y": 0, "x": 0, "var": "btn_select", "top": 0, "stateNum": 1, "skin": " ", "right": 0, "left": 0, "bottom": 0 }, "compId": 3 }, { "type": "Image", "props": { "y": 0, "x": 0, "var": "img_show", "skin": "shop/sc_db_2.png" }, "compId": 5, "child": [{ "type": "Image", "props": { "y": 72, "x": 72, "var": "img_icon", "skin": "shop/sc_jb.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 6 }, { "type": "Image", "props": { "y": 0, "x": 0, "var": "img_use", "skin": "shop/sc_yzb.png" }, "compId": 8 }] }, { "type": "Image", "props": { "y": 72, "x": 72, "var": "img_lock", "skin": "shop/sc_db_4.png", "anchorY": 0.5, "anchorX": 0.5, "alpha": 0.75 }, "compId": 10, "child": [{ "type": "Sprite", "props": { "y": 42, "x": 45, "texture": "shop/sc_db_s.png" }, "compId": 11 }] }, { "type": "Image", "props": { "y": 0, "x": 0, "var": "img_select", "skin": "shop/sc_db_3.png" }, "compId": 9 }], "loadList": ["shop/sc_db_2.png", "shop/sc_jb.png", "shop/sc_yzb.png", "shop/sc_db_4.png", "shop/sc_db_s.png", "shop/sc_db_3.png"], "loadList3D": [] };
          items.ShopItemUI = ShopItemUI;
          REG("ui.items.ShopItemUI", ShopItemUI);
          class TaskItemUI extends Laya.View {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(TaskItemUI.uiView);
              }
          }
          TaskItemUI.uiView = { "type": "View", "props": { "width": 180, "height": 207 }, "compId": 2, "child": [{ "type": "Sprite", "props": { "y": -1, "x": 0, "var": "spr_item", "texture": "task/qiandaokuang_1.png" }, "compId": 5, "child": [{ "type": "Image", "props": { "y": 101, "x": 86, "var": "img_icon", "skin": "task/jinbi_1.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 6 }, { "type": "Sprite", "props": { "y": 159, "x": 36, "texture": "task/qiandaokuang_jinbi.png" }, "compId": 13 }, { "type": "Label", "props": { "y": 168, "x": 33, "width": 106, "var": "txt_cent", "text": "200", "height": 25, "fontSize": 22, "color": "#ffffff", "align": "center" }, "compId": 7 }, { "type": "Label", "props": { "y": 17, "x": 34, "width": 110, "var": "txt_desc", "text": "第1天", "height": 29, "fontSize": 28, "color": "#ffffff", "align": "center" }, "compId": 8 }] }, { "type": "Sprite", "props": { "y": 79, "x": 63, "var": "spr_geted", "texture": "task/gou.png" }, "compId": 15 }, { "type": "Sprite", "props": { "var": "spr_curr", "texture": "task/qiandaokuang_1_1.png" }, "compId": 16 }], "loadList": ["task/qiandaokuang_1.png", "task/jinbi_1.png", "task/qiandaokuang_jinbi.png", "task/gou.png", "task/qiandaokuang_1_1.png"], "loadList3D": [] };
          items.TaskItemUI = TaskItemUI;
          REG("ui.items.TaskItemUI", TaskItemUI);
          class TaskItem1UI extends Laya.View {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(TaskItem1UI.uiView);
              }
          }
          TaskItem1UI.uiView = { "type": "View", "props": { "width": 300, "height": 176 }, "compId": 2, "child": [{ "type": "Sprite", "props": { "y": 0, "x": 0, "var": "spr_item", "texture": "task/qiandaokuang_2.png" }, "compId": 5, "child": [{ "type": "Image", "props": { "y": 62, "x": 183, "var": "img_icon", "skin": "task/jinbi_1.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 6 }, { "type": "Sprite", "props": { "y": 128, "x": 130, "texture": "task/qiandaokuang_jinbi.png" }, "compId": 13 }, { "type": "Label", "props": { "y": 136, "x": 127, "width": 106, "var": "txt_cent", "text": "200", "height": 25, "fontSize": 22, "color": "#ffffff", "align": "center" }, "compId": 7 }, { "type": "Label", "props": { "y": 43, "x": 22, "width": 48, "var": "txt_desc", "text": "第\\n七\\n天", "leading": 5, "height": 91, "fontSize": 28, "color": "#ffffff", "align": "center" }, "compId": 8 }] }, { "type": "Sprite", "props": { "y": 38, "x": 160, "var": "spr_geted", "texture": "task/gou.png" }, "compId": 15 }, { "type": "Sprite", "props": { "var": "spr_curr", "texture": "task/qiandaokuang_2_1.png" }, "compId": 16 }], "loadList": ["task/qiandaokuang_2.png", "task/jinbi_1.png", "task/qiandaokuang_jinbi.png", "task/gou.png", "task/qiandaokuang_2_1.png"], "loadList3D": [] };
          items.TaskItem1UI = TaskItem1UI;
          REG("ui.items.TaskItem1UI", TaskItem1UI);
      })(items = ui.items || (ui.items = {}));
  })(ui || (ui = {}));
  (function (ui) {
      var panels;
      (function (panels) {
          class BoxUI extends Laya.Dialog {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(BoxUI.uiView);
              }
          }
          BoxUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "compId": 2, "child": [{ "type": "Box", "props": { "width": 750, "height": 1334, "centerY": 0, "centerX": 0 }, "compId": 39, "child": [{ "type": "Image", "props": { "y": 317, "x": 65, "width": 620, "skin": "box/diban.png", "sizeGrid": "24,13,21,20", "height": 620 }, "compId": 3 }, { "type": "BoxItem", "props": { "y": 364, "x": 115, "var": "ui_box_0", "runtime": "ui.items.BoxItemUI" }, "compId": 18 }, { "type": "BoxItem", "props": { "y": 364, "x": 297, "var": "ui_box_1", "runtime": "ui.items.BoxItemUI" }, "compId": 19 }, { "type": "BoxItem", "props": { "y": 364, "x": 478, "var": "ui_box_2", "runtime": "ui.items.BoxItemUI" }, "compId": 20 }, { "type": "BoxItem", "props": { "y": 548, "x": 115, "var": "ui_box_3", "runtime": "ui.items.BoxItemUI" }, "compId": 21 }, { "type": "BoxItem", "props": { "y": 548, "x": 298, "var": "ui_box_4", "runtime": "ui.items.BoxItemUI" }, "compId": 22 }, { "type": "BoxItem", "props": { "y": 548, "x": 478, "var": "ui_box_5", "runtime": "ui.items.BoxItemUI" }, "compId": 23 }, { "type": "BoxItem", "props": { "y": 732, "x": 115, "var": "ui_box_6", "runtime": "ui.items.BoxItemUI" }, "compId": 24 }, { "type": "BoxItem", "props": { "y": 732, "x": 298, "var": "ui_box_7", "runtime": "ui.items.BoxItemUI" }, "compId": 25 }, { "type": "BoxItem", "props": { "y": 732, "x": 478, "var": "ui_box_8", "runtime": "ui.items.BoxItemUI" }, "compId": 26 }, { "type": "Button", "props": { "y": 1007, "x": 374, "width": 214, "var": "btn_gotoGame", "stateNum": 1, "skin": "game/p_btn_huangs.png", "height": 56, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 31, "child": [{ "type": "Sprite", "props": { "y": 7, "x": 31, "texture": "game/jixuyouxi_annu.png" }, "compId": 32 }, { "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 33 }] }, { "type": "Button", "props": { "y": 1102, "x": 375, "width": 200, "var": "btn_close", "stateNum": 1, "height": 45, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 4, "child": [{ "type": "Sprite", "props": { "y": 4, "x": 34, "texture": "egg/bulexiexie_anniu.png" }, "compId": 5 }, { "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 17 }, { "type": "Script", "props": { "showType": 1, "runtime": "platforms/Switch_delay_display.ts" }, "compId": 41 }] }, { "type": "Button", "props": { "y": 1007, "x": 375, "var": "btn_get", "stateNum": 1, "skin": "egg/p_f_zk.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 6, "child": [{ "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 16 }] }, { "type": "Box", "props": { "y": 210, "x": 267, "var": "box_key" }, "compId": 35, "child": [{ "type": "Image", "props": { "x": 0, "var": "img_key_0", "skin": "box/p_i_ys.png" }, "compId": 36 }, { "type": "Image", "props": { "y": 0, "x": 80, "var": "img_key_1", "skin": "box/p_i_ys.png" }, "compId": 37 }, { "type": "Image", "props": { "y": 0, "x": 160, "var": "img_key_2", "skin": "box/p_i_ys.png" }, "compId": 38 }] }] }, { "type": "Script", "props": { "runtime": "platforms/BannerScr.ts" }, "compId": 42 }], "loadList": ["box/diban.png", "game/p_btn_huangs.png", "game/jixuyouxi_annu.png", "egg/bulexiexie_anniu.png", "egg/p_f_zk.png", "box/p_i_ys.png"], "loadList3D": [] };
          panels.BoxUI = BoxUI;
          REG("ui.panels.BoxUI", BoxUI);
          class EggUI extends Laya.Dialog {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(EggUI.uiView);
              }
          }
          EggUI.uiView = { "type": "Dialog", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "compId": 2, "child": [{ "type": "Box", "props": { "width": 750, "height": 1334, "centerY": 0, "centerX": 0 }, "compId": 21, "child": [{ "type": "Sprite", "props": { "y": 412, "x": 290, "texture": "egg/p_jd.png" }, "compId": 3 }, { "type": "Sprite", "props": { "y": 220, "x": 91, "texture": "egg/p_f_zjd.png" }, "compId": 17 }, { "type": "Sprite", "props": { "y": 729, "x": 164, "texture": "egg/p_jdt_bg.png" }, "compId": 18 }, { "type": "Image", "props": { "y": 729, "x": 164, "var": "img_jindu", "skin": "egg/p_jdt.png", "sizeGrid": "0,22,0,22" }, "compId": 19 }, { "type": "Label", "props": { "y": 687, "x": 140, "width": 470, "var": "txt_msg", "text": "砸开金蛋获得200金币", "height": 35, "fontSize": 30, "color": "#ffffff", "align": "center" }, "compId": 20 }] }, { "type": "Button", "props": { "y": 1205, "x": 291, "var": "btn_get", "stateNum": 1, "skin": "egg/kuangdianlingjiang_anniu.png", "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 6, "child": [{ "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 16 }] }], "loadList": ["egg/p_jd.png", "egg/p_f_zjd.png", "egg/p_jdt_bg.png", "egg/p_jdt.png", "egg/kuangdianlingjiang_anniu.png"], "loadList3D": [] };
          panels.EggUI = EggUI;
          REG("ui.panels.EggUI", EggUI);
          class EggEndQQUI extends Laya.Dialog {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(EggEndQQUI.uiView);
              }
          }
          EggEndQQUI.uiView = { "type": "Dialog", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "compId": 2, "child": [{ "type": "Box", "props": { "width": 750, "height": 1334, "centerY": 0, "centerX": 0 }, "compId": 21, "child": [{ "type": "Sprite", "props": { "y": 527, "x": 375, "width": 169, "var": "egg", "texture": "egg/p_jd.png", "pivotY": 115, "pivotX": 85, "height": 230 }, "compId": 3 }, { "type": "Sprite", "props": { "y": 220, "x": 91, "texture": "egg/p_f_zjd.png" }, "compId": 17 }, { "type": "Sprite", "props": { "y": 729, "x": 164, "texture": "egg/p_jdt_bg.png" }, "compId": 18 }, { "type": "Image", "props": { "y": 729, "x": 164, "var": "img_jindu", "skin": "egg/p_jdt.png", "sizeGrid": "0,22,0,22" }, "compId": 19 }, { "type": "Label", "props": { "y": 687, "x": 140, "width": 470, "var": "txt_msg", "text": "砸开金蛋获得200金币", "height": 35, "fontSize": 30, "color": "#ffffff", "align": "center" }, "compId": 20 }] }, { "type": "Button", "props": { "y": 1247, "var": "btn_get", "stateNum": 1, "skin": "egg/kuangdianlingjiang_anniu.png", "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 6, "child": [{ "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 16 }] }, { "type": "Script", "props": { "adType": 3, "runtime": "platforms/BannerScr.ts" }, "compId": 24 }, { "type": "Script", "props": { "runtime": "platforms/BlockAdScr.ts" }, "compId": 25 }], "loadList": ["egg/p_jd.png", "egg/p_f_zjd.png", "egg/p_jdt_bg.png", "egg/p_jdt.png", "egg/kuangdianlingjiang_anniu.png"], "loadList3D": [] };
          panels.EggEndQQUI = EggEndQQUI;
          REG("ui.panels.EggEndQQUI", EggEndQQUI);
          class EggEndTTUI extends Laya.Dialog {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(EggEndTTUI.uiView);
              }
          }
          EggEndTTUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "compId": 2, "child": [{ "type": "Box", "props": { "y": 10, "x": 10, "width": 750, "height": 1334, "centerY": 0, "centerX": 0 }, "compId": 3, "child": [{ "type": "Sprite", "props": { "y": 527, "x": 375, "width": 169, "var": "egg", "texture": "egg/p_jd.png", "pivotY": 115, "pivotX": 85, "height": 230 }, "compId": 5 }, { "type": "Sprite", "props": { "y": 220, "x": 91, "texture": "egg/p_f_zjd.png" }, "compId": 6 }, { "type": "Sprite", "props": { "y": 729, "x": 164, "texture": "egg/p_jdt_bg.png" }, "compId": 7 }, { "type": "Image", "props": { "y": 729, "x": 164, "var": "img_jindu", "skin": "egg/p_jdt.png", "sizeGrid": "0,22,0,22" }, "compId": 8 }, { "type": "Label", "props": { "y": 687, "x": 140, "width": 470, "var": "txt_msg", "text": "砸开金蛋获得200金币", "height": 35, "fontSize": 30, "color": "#ffffff", "align": "center" }, "compId": 9 }] }, { "type": "Button", "props": { "var": "btn_get", "stateNum": 1, "skin": "egg/kuangdianlingjiang_anniu.png", "centerY": 200, "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 4, "child": [{ "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 10 }] }, { "type": "Box", "props": { "x": 240, "width": 270, "visible": true, "var": "box_select1", "height": 41, "bottom": 30 }, "compId": 11, "child": [{ "type": "Button", "props": { "y": 0, "x": 1, "var": "box_select", "stateNum": 1, "skin": "main/p_gxk_bg.png" }, "compId": 12 }, { "type": "Image", "props": { "y": -2, "x": 1, "var": "img_selected", "skin": "main/p_gxk_selected.png" }, "compId": 13, "child": [{ "type": "Script", "props": { "y": 9, "x": 4, "runtime": "platforms/Switch_default_check.ts" }, "compId": 14 }] }, { "type": "Label", "props": { "y": 9, "x": 53, "width": 263, "text": "观看视频立即领取", "name": "txt_select_0", "height": 28, "fontSize": 24, "color": "#ffffff", "bold": true }, "compId": 15 }] }], "loadList": ["egg/p_jd.png", "egg/p_f_zjd.png", "egg/p_jdt_bg.png", "egg/p_jdt.png", "egg/kuangdianlingjiang_anniu.png", "main/p_gxk_bg.png", "main/p_gxk_selected.png"], "loadList3D": [] };
          panels.EggEndTTUI = EggEndTTUI;
          REG("ui.panels.EggEndTTUI", EggEndTTUI);
          class EggStartUI extends Laya.Dialog {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(EggStartUI.uiView);
              }
          }
          EggStartUI.uiView = { "type": "Dialog", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "compId": 2, "child": [{ "type": "Box", "props": { "width": 750, "height": 1334, "centerY": 0, "centerX": 0 }, "compId": 21, "child": [{ "type": "Sprite", "props": { "y": 700, "x": 372, "width": 169, "var": "egg", "texture": "egg/p_jd.png", "pivotY": 115, "pivotX": 85, "height": 230 }, "compId": 3 }, { "type": "Button", "props": { "y": 700, "x": 375, "width": 168, "var": "btn_get", "stateNum": 1, "skin": "game/bx_gq.png", "pivotY": 86, "pivotX": 84, "height": 172 }, "compId": 26, "child": [{ "type": "Image", "props": { "y": 74, "x": 76, "skin": "game/p_sz.png" }, "compId": 27 }] }, { "type": "Sprite", "props": { "y": 220, "x": 91, "texture": "egg/p_f_zjd.png" }, "compId": 17 }, { "type": "Sprite", "props": { "y": 394, "x": 164.5, "texture": "egg/p_jdt_bg.png" }, "compId": 18 }, { "type": "Image", "props": { "y": 394, "x": 164, "var": "img_jindu", "skin": "egg/p_jdt.png", "sizeGrid": "0,22,0,22" }, "compId": 19 }, { "type": "Label", "props": { "y": 352, "x": 140, "width": 470, "var": "txt_msg", "text": "砸开金蛋获得200金币", "height": 35, "fontSize": 30, "color": "#ffffff", "align": "center" }, "compId": 20 }] }, { "type": "Button", "props": { "y": 1205, "x": 291, "visible": false, "stateNum": 1, "skin": "egg/kuangdianlingjiang_anniu.png", "centerX": 0, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 6, "child": [{ "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 16 }] }, { "type": "Script", "props": { "showType": 2, "runtime": "platforms/BoxGameListScr.ts" }, "compId": 24 }, { "type": "Script", "props": { "runtime": "platforms/BannerScr.ts" }, "compId": 25 }, { "type": "Script", "props": { "runtime": "platforms/BlockAdScr.ts" }, "compId": 28 }], "loadList": ["egg/p_jd.png", "game/bx_gq.png", "game/p_sz.png", "egg/p_f_zjd.png", "egg/p_jdt_bg.png", "egg/p_jdt.png", "egg/kuangdianlingjiang_anniu.png"], "loadList3D": [] };
          panels.EggStartUI = EggStartUI;
          REG("ui.panels.EggStartUI", EggStartUI);
          class GameFuhuoUI extends Laya.Dialog {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(GameFuhuoUI.uiView);
              }
          }
          GameFuhuoUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "compId": 2, "child": [{ "type": "Box", "props": { "width": 750, "height": 1334, "centerY": 0, "centerX": 0 }, "compId": 29, "child": [{ "type": "Sprite", "props": { "y": 19, "x": 191.5, "texture": "game/tiaoguo_biaoti.png" }, "compId": 3 }, { "type": "Sprite", "props": { "y": 104, "x": 291, "texture": "bannerAD/p_djs_bg.png" }, "compId": 58, "child": [{ "type": "FontClip", "props": { "y": 52, "x": -34, "width": 248, "var": "txt_time", "value": "19", "skin": "bannerAD/n_djs.png", "sheet": "0123456789", "height": 123, "align": "center" }, "compId": 57 }] }, { "type": "Button", "props": { "y": 930, "x": 375, "var": "btn_get", "stateNum": 1, "skin": "game/tiaoguo_anniu.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 43, "child": [{ "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 48 }] }, { "type": "List", "props": { "y": 311, "x": 55, "width": 653, "var": "list_ad", "vScrollBarSkin": " ", "spaceY": 20, "spaceX": 30, "height": 492 }, "compId": 59, "child": [{ "type": "AD1Item", "props": { "y": 12, "x": 10, "renderType": "render", "runtime": "ui.ads.AD1ItemUI" }, "compId": 61 }, { "type": "Script", "props": { "showType": 1, "runtime": "ads/ADSList.ts" }, "compId": 62 }] }] }, { "type": "Script", "props": { "showType": 2, "adType": 2, "runtime": "platforms/BannerScr.ts" }, "compId": 33 }, { "type": "Button", "props": { "y": 1048, "x": 375, "width": 200, "var": "btn_close", "stateNum": 1, "name": "btn_close", "height": 45, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 46, "child": [{ "type": "Sprite", "props": { "y": 2, "x": 24, "texture": "game/jixuyouxi_annu.png" }, "compId": 50 }, { "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 51 }] }, { "type": "Box", "props": { "y": 0, "x": 240, "width": 270, "visible": true, "var": "box_select1", "height": 41, "bottom": 30 }, "compId": 64, "child": [{ "type": "Button", "props": { "y": 0, "x": 1, "var": "box_select", "stateNum": 1, "skin": "main/p_gxk_bg.png" }, "compId": 65 }, { "type": "Image", "props": { "y": -2, "x": 1, "var": "img_selected", "skin": "main/p_gxk_selected.png" }, "compId": 66, "child": [{ "type": "Script", "props": { "y": 9, "x": 4, "runtime": "platforms/Switch_default_check.ts" }, "compId": 67 }] }, { "type": "Label", "props": { "y": 9, "x": 53, "width": 263, "text": "不看视频 放弃复活", "name": "txt_select_0", "height": 28, "fontSize": 24, "color": "#ffffff", "bold": true }, "compId": 68 }] }], "loadList": ["game/tiaoguo_biaoti.png", "bannerAD/p_djs_bg.png", "bannerAD/n_djs.png", "game/tiaoguo_anniu.png", "game/jixuyouxi_annu.png", "main/p_gxk_bg.png", "main/p_gxk_selected.png"], "loadList3D": [] };
          panels.GameFuhuoUI = GameFuhuoUI;
          REG("ui.panels.GameFuhuoUI", GameFuhuoUI);
          class GameListUI extends Laya.Dialog {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(GameListUI.uiView);
              }
          }
          GameListUI.uiView = { "type": "Dialog", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "compId": 2, "child": [{ "type": "Button", "props": { "var": "btn_close", "top": 0, "stateNum": 1, "right": 0, "left": 0, "bottom": 0, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 6 }, { "type": "Box", "props": { "width": 550, "height": 472, "centerY": 0, "centerX": 0 }, "compId": 29, "child": [{ "type": "Sprite", "props": { "y": -260, "x": -159, "texture": "adgame/p_hyw_bg.png" }, "compId": 3 }, { "type": "List", "props": { "y": 50, "x": 24, "width": 502, "vScrollBarSkin": " ", "spaceY": 40, "spaceX": 50, "repeatX": 3, "height": 371 }, "compId": 24, "child": [{ "type": "Script", "props": { "runtime": "platforms/GameList.ts" }, "compId": 34 }, { "type": "GameAD", "props": { "y": 0, "x": 0, "renderType": "render", "runtime": "ui.items.GameADUI" }, "compId": 39 }] }] }], "loadList": ["adgame/p_hyw_bg.png"], "loadList3D": [] };
          panels.GameListUI = GameListUI;
          REG("ui.panels.GameListUI", GameListUI);
          class GameLoseUI extends Laya.Dialog {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(GameLoseUI.uiView);
              }
          }
          GameLoseUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "compId": 2, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "width": 750, "height": 1334, "centerY": 0, "centerX": 0 }, "compId": 27, "child": [{ "type": "Sprite", "props": { "y": 50, "x": 115, "texture": "game/zaijiezaili.png" }, "compId": 66 }, { "type": "List", "props": { "y": 242, "x": 18, "width": 714, "vScrollBarSkin": " ", "spaceY": 10, "spaceX": 30, "repeatX": 3, "height": 571 }, "compId": 68, "child": [{ "type": "Image", "props": { "y": 204, "x": 186, "skin": "game/xingxing_2.png", "name": "bg" }, "compId": 75, "child": [{ "type": "Sprite", "props": { "y": -53, "x": 120, "texture": "game/xingxing_2.png" }, "compId": 93 }, { "type": "Sprite", "props": { "y": 0, "x": 240, "texture": "game/xingxing_2.png" }, "compId": 94 }] }, { "type": "GameADItem", "props": { "y": 0, "x": 0, "renderType": "render", "runtime": "ui.items.GameADItemUI" }, "compId": 76 }, { "type": "Script", "props": { "runtime": "platforms/GameList.ts" }, "compId": 77 }] }, { "type": "Button", "props": { "y": 910, "x": 367, "width": 208, "var": "btn_get", "stateNum": 1, "skin": "game/sanbeijianglianniu.png", "height": 79, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 69, "child": [{ "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 79 }] }, { "type": "Sprite", "props": { "y": 816, "x": 276, "width": 67, "texture": "main/p_i_coin.png", "scaleY": 0.75, "scaleX": 0.75, "height": 66 }, "compId": 71 }, { "type": "Label", "props": { "y": 824, "x": 285, "width": 186, "var": "txt_get_cent", "text": "x9999", "height": 47, "fontSize": 35, "color": "#fff891", "align": "center" }, "compId": 72 }, { "type": "Box", "props": { "y": 949.5, "x": 240, "width": 270, "visible": true, "var": "box_select1", "height": 41 }, "compId": 87, "child": [{ "type": "Button", "props": { "y": 0, "x": 1, "var": "box_select", "stateNum": 1, "skin": "main/p_gxk_bg.png" }, "compId": 88 }, { "type": "Image", "props": { "y": -2, "x": 1, "var": "img_selected", "skin": "main/p_gxk_selected.png" }, "compId": 89, "child": [{ "type": "Script", "props": { "y": 9, "x": 4, "runtime": "platforms/Switch_default_check.ts" }, "compId": 92 }] }, { "type": "Label", "props": { "y": 9, "x": 53, "width": 263, "text": "看视频3倍领取", "name": "txt_select_0", "height": 28, "fontSize": 24, "color": "#ffffff", "bold": true }, "compId": 90 }, { "type": "Label", "props": { "y": 9, "x": 53, "width": 263, "visible": false, "text": "不看视频3倍领取", "name": "txt_select_1", "height": 28, "fontSize": 24, "color": "#ffffff", "bold": true }, "compId": 91 }] }] }, { "type": "Button", "props": { "y": 1028, "x": 363, "width": 154, "var": "btn_gotoGame", "stateNum": 1, "name": "btn_close", "height": 51, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 74, "child": [{ "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 85 }, { "type": "Sprite", "props": { "y": 5, "x": 1, "texture": "game/jixuyouxi.png" }, "compId": 86 }] }, { "type": "Script", "props": { "showType": 2, "adType": 2, "runtime": "platforms/BannerScr.ts" }, "compId": 31 }, { "type": "Script", "props": { "showNum": 4, "runtime": "platforms/BlockAdScr.ts" }, "compId": 95 }, { "type": "Script", "props": { "runtime": "platforms/BoxGameListScr.ts" }, "compId": 96 }], "loadList": ["game/zaijiezaili.png", "game/xingxing_2.png", "game/sanbeijianglianniu.png", "main/p_i_coin.png", "main/p_gxk_bg.png", "main/p_gxk_selected.png", "game/jixuyouxi.png"], "loadList3D": [] };
          panels.GameLoseUI = GameLoseUI;
          REG("ui.panels.GameLoseUI", GameLoseUI);
          class GameWinUI extends Laya.Dialog {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(GameWinUI.uiView);
              }
          }
          GameWinUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "compId": 2, "child": [{ "type": "Box", "props": { "width": 750, "height": 1334, "centerY": 0, "centerX": 0 }, "compId": 26, "child": [{ "type": "Sprite", "props": { "y": 50, "x": 134, "texture": "game/tiaozhanchenggong.png" }, "compId": 3 }, { "type": "List", "props": { "y": 242, "x": 18, "width": 714, "vScrollBarSkin": " ", "spaceY": 10, "spaceX": 30, "repeatX": 3, "height": 571 }, "compId": 62, "child": [{ "type": "Image", "props": { "y": 204, "x": 191, "var": "img_star_0", "skin": "game/xingxing_1.png", "name": "bg" }, "compId": 63, "child": [{ "type": "Image", "props": { "y": -45, "x": 120, "var": "img_star_1", "skin": "game/xingxing_1.png" }, "compId": 74 }, { "type": "Image", "props": { "y": 0, "x": 240, "var": "img_star_2", "skin": "game/xingxing_1.png" }, "compId": 75 }] }, { "type": "GameADItem", "props": { "y": 0, "x": 0, "renderType": "render", "runtime": "ui.items.GameADItemUI" }, "compId": 64 }, { "type": "Script", "props": { "runtime": "platforms/GameList.ts" }, "compId": 65 }] }, { "type": "Button", "props": { "y": 916, "x": 370, "width": 252, "var": "btn_get", "stateNum": 1, "skin": "game/sanbeijianglianniu.png", "height": 75, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 6, "child": [{ "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 24 }] }, { "type": "Sprite", "props": { "y": 816, "x": 280, "width": 71, "texture": "main/p_i_coin.png", "scaleY": 0.75, "scaleX": 0.75, "height": 76 }, "compId": 22 }, { "type": "Label", "props": { "y": 828, "x": 309.5, "width": 152, "var": "txt_get_cent", "text": "x9999", "height": 38, "fontSize": 35, "color": "#fff891", "align": "center" }, "compId": 68 }, { "type": "Box", "props": { "y": 956, "x": 247, "width": 326, "visible": true, "var": "box_select1", "height": 47 }, "compId": 25, "child": [{ "type": "Button", "props": { "y": 1, "x": 1, "var": "box_select", "stateNum": 1, "skin": "main/p_gxk_bg.png", "name": "btn_select" }, "compId": 8 }, { "type": "Image", "props": { "y": 0, "x": 1, "var": "img_selected", "skin": "main/p_gxk_selected.png" }, "compId": 12, "child": [{ "type": "Script", "props": { "y": 7, "x": 4, "runtime": "platforms/Switch_default_check.ts" }, "compId": 29 }] }, { "type": "Label", "props": { "y": 10, "x": 52, "width": 263, "visible": true, "text": "看视频3倍领取", "name": "txt_select_0", "height": 28, "fontSize": 24, "color": "#ffffff", "bold": true }, "compId": 23 }, { "type": "Label", "props": { "y": 10, "x": 52, "width": 263, "visible": false, "text": "不看视频3倍领取", "name": "txt_select_1", "height": 28, "fontSize": 24, "color": "#ffffff", "bold": true }, "compId": 73 }] }] }, { "type": "Script", "props": { "showType": 2, "adType": 2, "runtime": "platforms/BannerScr.ts" }, "compId": 30 }, { "type": "Script", "props": { "y": -1, "x": 0, "showNum": 3, "runtime": "platforms/BlockAdScr.ts" }, "compId": 76 }, { "type": "Button", "props": { "y": 1030, "x": 369, "var": "btn_gotoGame", "stateNum": 1, "skin": "game/jixuyouxi.png", "name": "btn_close", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 69, "child": [{ "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 71 }] }, { "type": "Script", "props": { "runtime": "platforms/BoxGameListScr.ts" }, "compId": 77 }], "loadList": ["game/tiaozhanchenggong.png", "game/xingxing_1.png", "game/sanbeijianglianniu.png", "main/p_i_coin.png", "main/p_gxk_bg.png", "main/p_gxk_selected.png", "game/jixuyouxi.png"], "loadList3D": [] };
          panels.GameWinUI = GameWinUI;
          REG("ui.panels.GameWinUI", GameWinUI);
          class GameWinVideoUI extends Laya.Dialog {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(GameWinVideoUI.uiView);
              }
          }
          GameWinVideoUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "compId": 2, "child": [{ "type": "Box", "props": { "width": 750, "height": 1334, "centerY": 0, "centerX": 0 }, "compId": 29, "child": [{ "type": "Image", "props": { "y": 230, "x": 375, "var": "img_title", "skin": "game/tiaozhanchenggong.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 3 }, { "type": "Sprite", "props": { "y": 382, "x": 108, "texture": "game/jindutiao_1.png" }, "compId": 40 }, { "type": "Sprite", "props": { "y": 483, "x": 412, "texture": "game/yxz_dk_2.png" }, "compId": 56 }, { "type": "Sprite", "props": { "y": 483, "x": 71, "texture": "game/yxz_dk_2.png" }, "compId": 55 }, { "type": "Image", "props": { "y": 382, "x": 108, "width": 534, "var": "img_line", "skin": "game/jindutiao_2.png", "sizeGrid": "0,19,0,19" }, "compId": 41, "child": [{ "type": "Image", "props": { "skin": "game/jindutiao_3.png", "right": 0, "centerY": 0 }, "compId": 54 }] }, { "type": "Button", "props": { "y": 1030, "x": 375, "var": "btn_get", "stateNum": 1, "skin": "game/fenxiangluping_anniu.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 43, "child": [{ "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 48 }] }, { "type": "Sprite", "props": { "y": 893, "x": 268, "var": "spr_get_cent", "texture": "main/p_i_coin.png", "scaleY": 0.75, "scaleX": 0.75 }, "compId": 45, "child": [{ "type": "Label", "props": { "y": 29, "x": 74, "width": 185, "var": "txt_get_cent", "text": "x9999", "height": 49, "fontSize": 50, "color": "#fff891", "align": "center" }, "compId": 44 }] }, { "type": "Label", "props": { "y": 342, "x": 211, "width": 327, "var": "txt_desc", "text": "相似度00%", "height": 34, "fontSize": 30, "color": "#fff89a", "align": "center" }, "compId": 53 }, { "type": "Image", "props": { "y": 506, "x": 92, "width": 227, "var": "img_mine", "height": 330 }, "compId": 58 }, { "type": "Image", "props": { "y": 506, "x": 434, "width": 227, "var": "img_target", "skin": "game/yxz_dk_2.png", "height": 330 }, "compId": 59 }] }, { "type": "Script", "props": { "showType": 2, "adType": 2, "runtime": "platforms/BannerScr.ts" }, "compId": 33 }, { "type": "Button", "props": { "y": 1124, "x": 375, "width": 200, "var": "btn_close", "stateNum": 1, "name": "btn_close", "height": 45, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 46, "child": [{ "type": "Sprite", "props": { "y": 2, "x": 24, "texture": "game/jixuyouxi.png" }, "compId": 50 }, { "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 51 }] }], "loadList": ["game/tiaozhanchenggong.png", "game/jindutiao_1.png", "game/yxz_dk_2.png", "game/jindutiao_2.png", "game/jindutiao_3.png", "game/fenxiangluping_anniu.png", "main/p_i_coin.png", "game/jixuyouxi.png"], "loadList3D": [] };
          panels.GameWinVideoUI = GameWinVideoUI;
          REG("ui.panels.GameWinVideoUI", GameWinVideoUI);
          class GetCentUI extends Laya.Dialog {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(GetCentUI.uiView);
              }
          }
          GetCentUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "compId": 2, "child": [{ "type": "Box", "props": { "width": 750, "height": 1334, "centerY": 0, "centerX": 0 }, "compId": 29, "child": [{ "type": "Sprite", "props": { "y": 304, "x": 156, "texture": "main/p_t_gxhd.png" }, "compId": 33 }, { "type": "Sprite", "props": { "y": 422, "x": 151, "texture": "main/tc_gx.png" }, "compId": 3 }, { "type": "Sprite", "props": { "y": 500, "x": 223, "texture": "main/tc_jb.png" }, "compId": 4 }, { "type": "Button", "props": { "y": 910, "x": 375, "var": "btn_get", "stateNum": 1, "skin": "game/sanbeijianglianniu.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 6, "child": [{ "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 24 }] }, { "type": "Label", "props": { "y": 796, "x": 319, "width": 181, "var": "txt_get_cent", "text": "x9999", "stroke": 3, "height": 53, "fontSize": 50, "color": "#ffffff", "align": "center" }, "compId": 32 }, { "type": "Sprite", "props": { "y": 783, "x": 267, "texture": "main/p_i_coin.png", "scaleY": 0.75, "scaleX": 0.75 }, "compId": 22 }] }, { "type": "Script", "props": { "showNum": 3, "runtime": "platforms/BlockAdScr.ts" }, "compId": 34 }, { "type": "Script", "props": { "y": 0, "x": 0, "showType": 2, "adType": 0, "runtime": "platforms/BannerScr.ts" }, "compId": 30 }, { "type": "Button", "props": { "y": 1014, "x": 375, "width": 200, "var": "btn_close", "stateNum": 1, "name": "btn_close", "height": 45, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 26, "child": [{ "type": "Sprite", "props": { "y": 1, "x": 61, "texture": "main/tc_tg.png" }, "compId": 27 }, { "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 28 }] }], "loadList": ["main/p_t_gxhd.png", "main/tc_gx.png", "main/tc_jb.png", "game/sanbeijianglianniu.png", "main/p_i_coin.png", "main/tc_tg.png"], "loadList3D": [] };
          panels.GetCentUI = GetCentUI;
          REG("ui.panels.GetCentUI", GetCentUI);
          class InterADUI extends Laya.Dialog {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(InterADUI.uiView);
              }
          }
          InterADUI.uiView = { "type": "Dialog", "props": { "width": 750, "top": 0, "right": 0, "mouseThrough": true, "left": 0, "height": 1334, "bottom": 0 }, "compId": 2, "child": [{ "type": "Box", "props": { "width": 750, "top": 0, "mouseThrough": true, "bottom": 0 }, "compId": 16, "child": [{ "type": "Image", "props": { "y": 1136, "x": 0, "width": 750, "var": "image", "skin": "adgame/ad-box.png", "sizeGrid": "22,19,32,24", "height": 200 }, "compId": 3, "child": [{ "type": "Image", "props": { "width": 750, "var": "img_ad", "top": 0, "skin": "adgame/mask.png", "sizeGrid": "22,19,32,24", "left": 0, "height": 200 }, "compId": 31 }, { "type": "Button", "props": { "var": "btn_click2", "top": 0, "stateNum": 1, "right": 0, "left": 0, "bottom": 0, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 32 }, { "type": "Button", "props": { "width": 60, "visible": false, "var": "btn_close", "top": 15, "stateNum": 1, "left": 15, "height": 60, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 4, "child": [{ "type": "Sprite", "props": { "y": 6, "x": 6, "texture": "adgame/ad-close.png" }, "compId": 5 }, { "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 18 }] }, { "type": "Image", "props": { "y": 0, "x": 700, "var": "img_txt", "skin": "adgame/ad-text.png" }, "compId": 35 }] }, { "type": "Button", "props": { "y": 1145, "x": 375, "var": "btn_click", "stateNum": 1, "skin": "adgame/ad-btn-bg.png", "height": 100, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 6, "child": [{ "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 19 }, { "type": "Label", "props": { "y": 27, "x": 44, "width": 185, "var": "txt_btn", "valign": "middle", "text": "点击跳过", "name": "name", "height": 47, "fontSize": 40, "color": "#ffffff", "bold": true, "align": "center" }, "compId": 8 }] }, { "type": "Label", "props": { "y": 1236, "x": 72, "width": 590, "var": "txt_ad", "valign": "middle", "text": "获得奖励", "height": 35, "fontSize": 30, "color": "#ffffff", "bold": true, "align": "center" }, "compId": 14 }] }], "loadList": ["adgame/ad-box.png", "adgame/mask.png", "adgame/ad-close.png", "adgame/ad-text.png", "adgame/ad-btn-bg.png"], "loadList3D": [] };
          panels.InterADUI = InterADUI;
          REG("ui.panels.InterADUI", InterADUI);
          class InterAD1UI extends Laya.Dialog {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(InterAD1UI.uiView);
              }
          }
          InterAD1UI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "compId": 2, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "width": 750 }, "compId": 3, "child": [{ "type": "Image", "props": { "x": 0, "width": 750, "var": "image", "top": 500, "skin": "adgame/ad-box.png", "sizeGrid": "22,19,32,24", "height": 300 }, "compId": 4, "child": [{ "type": "Image", "props": { "width": 750, "var": "img_ad", "top": 0, "left": 0, "height": 300 }, "compId": 5 }, { "type": "Button", "props": { "var": "btn_click2", "top": 0, "stateNum": 1, "right": 0, "left": 0, "bottom": 0, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 6 }, { "type": "Button", "props": { "width": 66, "visible": false, "var": "btn_close", "top": 1, "stateNum": 1, "left": 5, "height": 69, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 7, "child": [{ "type": "Sprite", "props": { "y": 0, "x": 0, "width": 66, "texture": "adgame/ad-close.png", "height": 69 }, "compId": 8 }, { "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 9 }] }, { "type": "Image", "props": { "y": 0, "x": 675, "width": 75, "var": "img_txt", "skin": "adgame/ad-text.png", "height": 42 }, "compId": 10 }] }, { "type": "Button", "props": { "y": 885, "x": 367, "var": "btn_click", "stateNum": 1, "skin": "adgame/ad-btn-bg.png", "height": 100, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 11, "child": [{ "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 12 }, { "type": "Label", "props": { "y": 27, "x": 44, "width": 185, "var": "txt_btn", "valign": "middle", "text": "点击跳过", "name": "name", "height": 47, "fontSize": 40, "color": "#ffffff", "bold": true, "align": "center" }, "compId": 13 }] }, { "type": "Label", "props": { "y": 765, "x": 20.5, "width": 709, "var": "txt_ad", "valign": "middle", "text": "获得奖励", "height": 35, "fontSize": 30, "color": "#ffffff", "bold": true, "align": "center" }, "compId": 14 }] }], "loadList": ["adgame/ad-box.png", "adgame/ad-close.png", "adgame/ad-text.png", "adgame/ad-btn-bg.png"], "loadList3D": [] };
          panels.InterAD1UI = InterAD1UI;
          REG("ui.panels.InterAD1UI", InterAD1UI);
          class NewPlayerTipsUI extends Laya.Dialog {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(NewPlayerTipsUI.uiView);
              }
          }
          NewPlayerTipsUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "compId": 2, "child": [{ "type": "Box", "props": { "width": 750, "height": 1334, "centerY": 0, "centerX": 0 }, "compId": 5, "child": [{ "type": "Sprite", "props": { "y": 382, "x": 106, "texture": "game/xsyd_dk.png" }, "compId": 3 }] }], "loadList": ["game/xsyd_dk.png"], "loadList3D": [] };
          panels.NewPlayerTipsUI = NewPlayerTipsUI;
          REG("ui.panels.NewPlayerTipsUI", NewPlayerTipsUI);
          class SharevideoUI extends Laya.Dialog {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(SharevideoUI.uiView);
              }
          }
          SharevideoUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "compId": 2, "child": [{ "type": "Sprite", "props": { "y": 346, "x": 106.5, "texture": "game/fenxiang_diban.png" }, "compId": 3 }, { "type": "Sprite", "props": { "y": 481, "x": 226, "texture": "game/pzwzq.png" }, "compId": 5 }, { "type": "Text", "props": { "y": 820, "x": 226, "text": "分享获得100金币", "fontSize": 40, "runtime": "laya.display.Text" }, "compId": 8 }, { "type": "Button", "props": { "y": 413, "x": 128, "width": 81, "var": "close_btn", "stateNum": 1, "skin": "bannerAD/ty_bg3_x.png", "pivotY": 43, "pivotX": 41, "height": 85 }, "compId": 9, "child": [{ "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 10 }] }, { "type": "Button", "props": { "y": 974, "x": 226, "var": "share", "stateNum": 1, "skin": "game/fenxiangluping_anniu.png" }, "compId": 11 }], "loadList": ["game/fenxiang_diban.png", "game/pzwzq.png", "bannerAD/ty_bg3_x.png", "game/fenxiangluping_anniu.png"], "loadList3D": [] };
          panels.SharevideoUI = SharevideoUI;
          REG("ui.panels.SharevideoUI", SharevideoUI);
          class ShiYongUI extends Laya.Dialog {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(ShiYongUI.uiView);
              }
          }
          ShiYongUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "compId": 2, "child": [{ "type": "Box", "props": { "width": 750, "height": 1334, "centerY": 0, "centerX": 0 }, "compId": 16, "child": [{ "type": "Sprite", "props": { "y": 265, "x": 185, "texture": "main/tc_mfsy.png" }, "compId": 3 }, { "type": "Sprite", "props": { "y": 442, "x": 151, "texture": "main/tc_gx.png" }, "compId": 31 }, { "type": "Sprite", "props": { "y": 444, "x": 240, "texture": "shop/sc_xk.png" }, "compId": 32 }, { "type": "Image", "props": { "y": 698, "x": 374, "width": 225, "var": "img_icon", "skin": "shop/sc_xk_2.png", "height": 330, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 30 }, { "type": "Button", "props": { "y": 980, "x": 375, "width": 342, "var": "btn_video", "stateNum": 1, "skin": "main/tc_btn_mfsy.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 6, "child": [{ "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 19 }] }] }, { "type": "Script", "props": { "showNum": 3, "runtime": "platforms/BlockAdScr.ts" }, "compId": 33 }, { "type": "Script", "props": { "yTag": 1114, "showType": 2, "btnName": "btn_close", "adType": 2, "runtime": "platforms/BannerScr.ts" }, "compId": 34 }, { "type": "Button", "props": { "y": 1114, "x": 375, "width": 200, "var": "btn_close", "stateNum": 1, "name": "btn_close", "height": 45, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 4, "child": [{ "type": "Sprite", "props": { "y": 1, "x": 26, "texture": "main/tc_zbsy.png" }, "compId": 5 }, { "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 18 }] }], "loadList": ["main/tc_mfsy.png", "main/tc_gx.png", "shop/sc_xk.png", "shop/sc_xk_2.png", "main/tc_btn_mfsy.png", "main/tc_zbsy.png"], "loadList3D": [] };
          panels.ShiYongUI = ShiYongUI;
          REG("ui.panels.ShiYongUI", ShiYongUI);
          class ShopUI extends Laya.Dialog {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(ShopUI.uiView);
              }
          }
          ShopUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "compId": 2, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "top": 0, "skin": "shop/sc_bg.jpg", "right": 0, "left": 0, "bottom": 0 }, "compId": 22 }, { "type": "Box", "props": { "width": 750, "height": 1334, "centerY": 0, "centerX": 0 }, "compId": 52, "child": [{ "type": "Button", "props": { "y": 194, "x": 85, "var": "btn_close", "stateNum": 1, "skin": "shop/sc_back.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 6, "child": [{ "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 16 }] }, { "type": "Image", "props": { "y": 603, "skin": "shop/sc_db.png", "right": 0, "left": 0, "sizeGrid": "0,60,0,60" }, "compId": 24 }, { "type": "Sprite", "props": { "y": 558, "x": 20, "texture": "shop/sc_tab.png" }, "compId": 55 }, { "type": "Sprite", "props": { "y": 84, "x": 240, "texture": "shop/sc_xk.png" }, "compId": 56 }, { "type": "Image", "props": { "y": 177, "x": 262, "width": 225, "var": "img_show", "skin": "shop/sc_xk_2.png", "height": 327 }, "compId": 57 }, { "type": "List", "props": { "y": 685, "x": 54, "width": 642, "var": "list_item", "vScrollBarSkin": " ", "spaceY": 20, "spaceX": 20, "repeatY": 2, "repeatX": 4, "height": 318, "elasticEnabled": true }, "compId": 28, "child": [{ "type": "ShopItem", "props": { "renderType": "render", "runtime": "ui.items.ShopItemUI" }, "compId": 29 }] }, { "type": "Button", "props": { "y": 1079, "x": 196, "var": "btn_buy", "stateNum": 1, "skin": "shop/sc_btn_2.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 30, "child": [{ "type": "Sprite", "props": { "y": 15, "x": 35, "texture": "main/p_i_coin.png", "scaleY": 0.75, "scaleX": 0.75 }, "compId": 39 }, { "type": "FontClip", "props": { "y": 35, "x": 108, "width": 149, "var": "txt_buy_cent", "value": "321", "text": "000000", "stroke": 2, "skin": "shop/sc_ansz_2.png", "sheet": "0123456789", "height": 41, "fontSize": 36, "color": "#ffffff", "align": "center" }, "compId": 40 }, { "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 42 }] }, { "type": "Button", "props": { "y": 1079, "x": 562, "var": "btn_video", "stateNum": 1, "skin": "shop/sc_btn_1.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 35, "child": [{ "type": "Sprite", "props": { "y": 24, "x": 55, "texture": "shop/sc_gg.png" }, "compId": 37 }, { "type": "FontClip", "props": { "y": 30, "x": 124, "width": 121, "var": "txt_video_num", "value": "0/3", "text": "0/3", "stroke": 2, "skin": "shop/sc_ansz_1.png", "sheet": "0123456789/", "height": 41, "fontSize": 44, "color": "#ffffff", "align": "center" }, "compId": 38 }, { "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 43 }] }, { "type": "Button", "props": { "y": 1079, "x": 375, "var": "btn_use", "stateNum": 1, "skin": "shop/sc_btn_3.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 31, "child": [{ "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 44 }] }, { "type": "Sprite", "props": { "y": 33, "x": 12, "texture": "main/p_i_coin_bg.png" }, "compId": 48 }, { "type": "Button", "props": { "y": 1030, "x": 236, "var": "btn_used", "stateNum": 1, "skin": "shop/sc_btn_3.png", "disabled": true }, "compId": 33 }, { "type": "Label", "props": { "y": 62, "x": 86, "width": 132, "var": "txt_cent", "text": "100", "height": 27, "fontSize": 28, "color": "#ffffff", "align": "center" }, "compId": 54 }] }, { "type": "Script", "props": { "runtime": "platforms/BannerScr.ts" }, "compId": 53 }], "loadList": ["shop/sc_bg.jpg", "shop/sc_back.png", "shop/sc_db.png", "shop/sc_tab.png", "shop/sc_xk.png", "shop/sc_xk_2.png", "shop/sc_btn_2.png", "main/p_i_coin.png", "shop/sc_ansz_2.png", "shop/sc_btn_1.png", "shop/sc_gg.png", "shop/sc_ansz_1.png", "shop/sc_btn_3.png", "main/p_i_coin_bg.png"], "loadList3D": [] };
          panels.ShopUI = ShopUI;
          REG("ui.panels.ShopUI", ShopUI);
          class ShopTipsUI extends Laya.Dialog {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(ShopTipsUI.uiView);
              }
          }
          ShopTipsUI.uiView = { "type": "Dialog", "props": { "width": 750, "top": 0, "height": 1334, "bottom": 0 }, "compId": 2, "child": [{ "type": "Box", "props": { "width": 750, "top": 0, "bottom": 0 }, "compId": 16, "child": [{ "type": "Image", "props": { "y": 416, "x": 158, "width": 434, "skin": "main/tc_gx.png", "height": 501 }, "compId": 3 }, { "type": "Sprite", "props": { "y": 551, "x": 223, "texture": "main/tc_jb.png" }, "compId": 18 }, { "type": "Sprite", "props": { "y": 267, "x": 185, "texture": "main/tc_jbbz.png" }, "compId": 19 }, { "type": "Button", "props": { "y": 937, "x": 375, "var": "btn_video", "stateNum": 1, "skin": "main/tc_btn_ksplq.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 5, "child": [{ "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 9 }] }, { "type": "Button", "props": { "y": 1077, "x": 374.5, "width": 200, "var": "btn_close", "stateNum": 1, "height": 45, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 12, "child": [{ "type": "Sprite", "props": { "y": 1, "x": 61, "texture": "main/tc_tg.png" }, "compId": 13 }, { "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 14 }] }] }], "loadList": ["main/tc_gx.png", "main/tc_jb.png", "main/tc_jbbz.png", "main/tc_btn_ksplq.png", "main/tc_tg.png"], "loadList3D": [] };
          panels.ShopTipsUI = ShopTipsUI;
          REG("ui.panels.ShopTipsUI", ShopTipsUI);
          class SystemTipsUI extends Laya.Dialog {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(SystemTipsUI.uiView);
              }
          }
          SystemTipsUI.uiView = { "type": "Dialog", "props": { "width": 750, "mouseThrough": true, "mouseEnabled": false, "height": 1334 }, "compId": 2, "child": [{ "type": "Box", "props": { "width": 750, "height": 1334, "centerY": 0, "centerX": 0 }, "compId": 16, "child": [{ "type": "Image", "props": { "y": 649, "x": 125, "var": "img_msg", "skin": "main/ts_dt.png" }, "compId": 17, "child": [{ "type": "Label", "props": { "y": 6, "x": -48, "width": 604, "var": "txt_msg", "text": "金币不足，是否观看视频解锁", "strokeColor": "#2d2d2d", "stroke": 3, "height": 30, "fontSize": 30, "color": "#eeeeee", "align": "center" }, "compId": 15 }] }] }], "animations": [{ "nodes": [{ "target": 17, "keyframes": { "y": [{ "value": 649, "tweenMethod": "linearNone", "tween": true, "target": 17, "key": "y", "index": 0 }, { "value": 649, "tweenMethod": "linearNone", "tween": true, "target": 17, "key": "y", "index": 10 }, { "value": 300, "tweenMethod": "linearNone", "tween": true, "target": 17, "key": "y", "index": 30 }], "alpha": [{ "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 17, "key": "alpha", "index": 0 }, { "value": 1, "tweenMethod": "linearNone", "tween": true, "target": 17, "key": "alpha", "index": 10 }, { "value": 0.2, "tweenMethod": "linearNone", "tween": true, "target": 17, "key": "alpha", "index": 30 }] } }], "name": "ani1", "id": 1, "frameRate": 24, "action": 1 }], "loadList": ["main/ts_dt.png"], "loadList3D": [] };
          panels.SystemTipsUI = SystemTipsUI;
          REG("ui.panels.SystemTipsUI", SystemTipsUI);
          class TaskUI extends Laya.Dialog {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(TaskUI.uiView);
              }
          }
          TaskUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "compId": 2, "child": [{ "type": "Box", "props": { "width": 750, "height": 1334, "centerY": 0, "centerX": 0 }, "compId": 22, "child": [{ "type": "Sprite", "props": { "y": 144, "x": 35, "texture": "task/diban.png" }, "compId": 25 }, { "type": "Button", "props": { "y": 134, "x": 105, "var": "btn_close", "stateNum": 1, "skin": "shop/sc_back.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 6, "child": [{ "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 16 }] }, { "type": "TaskItem", "props": { "y": 366, "x": 85, "var": "ui_task_0", "runtime": "ui.items.TaskItemUI" }, "compId": 18 }, { "type": "TaskItem", "props": { "y": 366, "x": 283, "var": "ui_task_1", "runtime": "ui.items.TaskItemUI" }, "compId": 19 }, { "type": "TaskItem", "props": { "y": 366, "x": 480, "var": "ui_task_2", "runtime": "ui.items.TaskItemUI" }, "compId": 20 }, { "type": "TaskItem", "props": { "y": 582, "x": 85, "var": "ui_task_3", "runtime": "ui.items.TaskItemUI" }, "compId": 21 }, { "type": "TaskItem", "props": { "y": 582, "x": 283, "var": "ui_task_4", "runtime": "ui.items.TaskItemUI" }, "compId": 30 }, { "type": "TaskItem", "props": { "y": 582, "x": 480, "var": "ui_task_5", "runtime": "ui.items.TaskItemUI" }, "compId": 31 }, { "type": "TaskItem1", "props": { "y": 797, "x": 85, "var": "ui_task_6", "runtime": "ui.items.TaskItem1UI" }, "compId": 32 }, { "type": "Button", "props": { "y": 900, "x": 535, "var": "btn_geted", "stateNum": 1, "skin": "task/qiandaoanniu_2.png", "disabled": true, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 28 }, { "type": "Button", "props": { "y": 872, "x": 535, "var": "btn_get", "stateNum": 1, "skin": "task/qiandaoanniu_1.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 26, "child": [{ "type": "Script", "props": { "runtime": "view/BtnScript.ts" }, "compId": 27 }] }, { "type": "Box", "props": { "y": 924, "x": 411, "var": "box_select" }, "compId": 33, "child": [{ "type": "Image", "props": { "y": 0, "x": 2, "var": "img_selected", "skin": "task/gouxuan.png" }, "compId": 35, "child": [{ "type": "Script", "props": { "runtime": "platforms/Switch_default_check.ts" }, "compId": 41 }] }, { "type": "Button", "props": { "y": 0, "x": 1, "width": 46, "var": "btn_select", "stateNum": 1, "skin": "task/gouxuankuang.png", "height": 41 }, "compId": 34, "child": [{ "type": "Script", "props": { "y": 10, "x": 9, "runtime": "view/BtnScript.ts" }, "compId": 40 }] }, { "type": "Label", "props": { "y": 8, "x": 56, "width": 193, "text": "看视频双倍领取", "name": "txt_select_0", "height": 31, "fontSize": 26, "color": "#bb8ce2" }, "compId": 37 }, { "type": "Label", "props": { "y": 8, "x": 56, "width": 193, "visible": false, "text": "不看视频双倍领取", "name": "txt_select_1", "height": 31, "fontSize": 26, "color": "#bb8ce2" }, "compId": 38 }] }] }, { "type": "Script", "props": { "runtime": "platforms/BannerScr.ts" }, "compId": 23 }], "loadList": ["task/diban.png", "shop/sc_back.png", "task/qiandaoanniu_2.png", "task/qiandaoanniu_1.png", "task/gouxuan.png", "task/gouxuankuang.png"], "loadList3D": [] };
          panels.TaskUI = TaskUI;
          REG("ui.panels.TaskUI", TaskUI);
      })(panels = ui.panels || (ui.panels = {}));
  })(ui || (ui = {}));
  (function (ui) {
      var view;
      (function (view) {
          class GameInfoUI extends Laya.View {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(GameInfoUI.uiView);
              }
          }
          GameInfoUI.uiView = { "type": "View", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "compId": 2, "child": [{ "type": "Label", "props": { "y": 312, "width": 491, "text": "游戏中的UI界面\\n自行开发", "height": 137, "fontSize": 50, "color": "#ffffff", "centerX": 0, "align": "center" }, "compId": 44 }], "loadList": [], "loadList3D": [] };
          view.GameInfoUI = GameInfoUI;
          REG("ui.view.GameInfoUI", GameInfoUI);
          class GameStageUI extends Laya.View {
              constructor() {
                  super();
              }
              createChildren() {
                  super.createChildren();
                  this.createView(GameStageUI.uiView);
              }
          }
          GameStageUI.uiView = { "type": "View", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "compId": 2, "child": [{ "type": "Label", "props": { "width": 491, "text": "游戏中玩法自行开发", "height": 137, "fontSize": 50, "color": "#ffffff", "centerY": 0, "centerX": 0, "align": "center" }, "compId": 3 }], "loadList": [], "loadList3D": [] };
          view.GameStageUI = GameStageUI;
          REG("ui.view.GameStageUI", GameStageUI);
          class GameViewUI extends Laya.Scene {
              constructor() { super(); }
              createChildren() {
                  super.createChildren();
                  this.loadScene("view/GameView");
              }
          }
          view.GameViewUI = GameViewUI;
          REG("ui.view.GameViewUI", GameViewUI);
          class LoadViewUI extends Laya.Scene {
              constructor() { super(); }
              createChildren() {
                  super.createChildren();
                  this.loadScene("view/LoadView");
              }
          }
          view.LoadViewUI = LoadViewUI;
          REG("ui.view.LoadViewUI", LoadViewUI);
      })(view = ui.view || (ui.view = {}));
  })(ui || (ui = {}));

  class OPPOPlatform extends BasePlatform {
      constructor() {
          super();
          this.bannerCallbacak = null;
          this.iad_id2 = '201845';
          this.iad_id_curr = "";
          this.InterADClickRate = 0;
      }
      showMessage(mes) {
          console.log("showMessage", mes);
          if (this.proxy) {
              let obj = {};
              obj["title"] = mes;
              this.proxy.showToast(obj);
          }
      }
      isUseSubpackage() {
          return false;
      }
      loadSubpackage(name, callback, callbackLoad) {
          let subTask = this.proxy.loadSubpackage({
              name: name,
              success: function () {
                  console.log(name, "子包加载成功");
                  callback.run();
              }
          });
          subTask.onProgressUpdate(function (res) {
              let progress = res["progress"];
              console.log(name, "子包加载...", progress);
              callbackLoad.runWith(progress);
          });
      }
      init(callback) {
          this.proxy = Laya.Browser.window.qg;
          this.proxy.onShow((res) => {
              Laya.stage.event(Laya.Event.FOCUS);
          });
          this.proxy.onHide((res) => {
              Laya.stage.event(Laya.Event.BLUR);
          });
          if (callback)
              callback.run();
          this.getGameConfig();
          this.proxy.onAudioInterruptionBegin(() => {
              SoundManager.stopBg();
          });
          this.proxy.onAudioInterruptionEnd(() => {
              if (GameData.Inst.data.sound)
                  SoundManager.playBg();
          });
      }
      zhengDongShort() {
          this.proxy.vibrateShort();
      }
      zhengDongLong() {
          this.proxy.vibrateLong();
      }
      getGameConfig() {
          this.cid = 0;
          this.bad_id = "201842";
          this.iad_id = "";
          this.vad_id = "201846";
          this.initBannerAD();
          this.initVideoAD();
          this.initInterAD();
          let $this = this;
          ptgcspsdk.getGameSwitch((res) => {
              console.log("getGameSwitch", res);
              if (typeof res == "string") {
                  res = JSON.parse(res);
              }
              $this.gameSwitch = res.data;
              if ($this.getSwitch(9)) {
                  Laya.timer.loop(25000, $this, () => {
                  });
              }
              if (this.getSwitch(11)) {
                  ptgcspsdk.probability((data) => {
                      console.log("interADPanel probability", data);
                      $this.InterADClickRate = data;
                  });
              }
          });
          ptgcspsdk.getJumpGameList((res) => {
              console.log("getJumpGameList", res);
              if (typeof res == "string") {
                  res = JSON.parse(res);
              }
              $this.gameList = res;
          });
      }
      setGameList(list) {
      }
      getUseAPI(apiId) {
          switch (apiId) {
              case 0:
                  return false;
                  break;
              case 10:
                  return false;
                  break;
              case 20:
                  return false;
                  break;
          }
          return true;
      }
      getSwitch(id) {
          if (this.gameSwitch == null)
              return false;
          if (this.gameSwitch.version == 0)
              return false;
          switch (id) {
              case 0:
                  return this.gameSwitch.default_check == 1;
                  break;
              case 1:
                  return this.gameSwitch.delay_txt_switch == 1;
                  break;
              case 2:
                  return this.gameSwitch.force_video == 1;
                  break;
              case 3:
                  return this.gameSwitch.force_share == 1;
                  break;
              case 4:
                  return this.gameSwitch.export_marquee == 1;
                  break;
              case 5:
                  return this.gameSwitch.delay_egg_switch == 1;
                  break;
              case 6:
                  return this.gameSwitch.ptg_native_limit_city == 1;
                  break;
              case 7:
                  return this.gameSwitch.ptg_native_limit == 1;
                  break;
              case 8:
                  if (this.gameSwitch.ptg_native_province == 1)
                      return true;
                  if (this.gameSwitch.ptg_native_city == 1)
                      return true;
                  break;
              case 9:
                  if (this.gameSwitch.local_switch == 2)
                      return true;
                  break;
              case 10:
                  return this.gameSwitch.ptg_native_btn_text == 1;
                  break;
              case 11:
                  return this.gameSwitch.ptg_threshold == 1;
                  break;
          }
          return false;
      }
      sendLog(aid, type = 0, uid = "", toAppid = "") {
          console.log("sendLog", aid);
          switch (aid) {
              case 1005:
                  ptgcspsdk.sendLogin(this.cid, aid, this.openid, this.isNew);
                  break;
              case 1008:
                  ptgcspsdk.startGame(this.cid, aid, this.openid);
                  break;
              case 1009:
                  ptgcspsdk.sendShare(this.cid, aid, this.openid, type);
                  break;
              case 1010:
              case 1011:
                  ptgcspsdk.watchVideo(this.cid, aid, this.openid, type);
                  break;
              case 1007:
              case 1017:
                  ptgcspsdk.sendJump(this.cid, aid, this.openid, uid, toAppid);
                  break;
          }
      }
      login(callback, callbackFail) {
          if (this.isLogined)
              return;
          this.isLogined = true;
          this.proxy.login({
              success(data) {
                  console.log(`login调用成功${data.data.token} `);
                  GameData.Inst.platform.openid = "";
                  ptgcspsdk.getOppoOpenid(data.data.token, (res) => {
                      console.log(res);
                      if (GameData.Inst.platform.openid != "")
                          return;
                      GameData.Inst.platform.openid = res.userId;
                      GameData.Inst.platform.anonymous_openid = res.userId;
                      GameData.Inst.platform.session_key = res.userId;
                      GameData.Inst.platform.sendLog(1005);
                  });
                  Laya.timer.once(5000, this, () => {
                      if (GameData.Inst.platform.openid != "")
                          return;
                      GameData.Inst.platform.openid = "10000";
                      GameData.Inst.platform.anonymous_openid = "10000";
                      GameData.Inst.platform.session_key = "10000";
                      GameData.Inst.platform.sendLog(1005);
                  });
              },
              fail(res) {
                  console.log(`login调用失败`);
                  callbackFail.run();
              }
          });
      }
      share(callback, callbackFail, type = 0) {
          return;
      }
      shareVideo(callback, callbackFail) {
          return;
      }
      initVideoAD() {
          if (!this.proxy.createRewardedVideoAd)
              return;
          if (this.videoADObj == null) {
              let $this = this;
              this.vad_id = ["201846", "201847"][Math.floor(Math.random() * 1)];
              this.videoADObj = this.proxy.createRewardedVideoAd({ adUnitId: this.vad_id });
              this.videoADObj.onError((err) => {
                  console.log("video err:", err);
                  if ($this.callbackFailVideoAD) {
                      $this.showMessage("暂无视频");
                      $this.callbackFailVideoAD.run();
                  }
                  $this.callbackVideoAD = null;
                  $this.callbackFailVideoAD = null;
              });
              this.videoADObj.onClose((res) => {
                  console.log("onClose", $this.currVADType);
                  console.log("onClose 0");
                  if (res.isEnded) {
                      GameData.Inst.data.taskType4VAD++;
                      $this.callbackVideoAD.run();
                      $this.sendLog(1011, this.currVADType);
                      console.log("onClose 1");
                  }
                  else {
                      $this.callbackFailVideoAD.run();
                      $this.showMessage("关闭视频");
                  }
                  $this.callbackVideoAD = null;
                  $this.callbackFailVideoAD = null;
                  if (GameData.Inst.data.sound)
                      SoundManager.playBg();
              });
              this.videoADObj.onLoad(() => {
                  console.log("显示视频");
                  $this.videoADObj.show();
              });
              console.log("initVideoAD");
          }
      }
      videoAD(callback, callbackFail, type = 0) {
          if (this.videoADObj == null)
              return;
          if (this.callbackVideoAD != null)
              return;
          this.currVADType = type;
          this.callbackVideoAD = callback;
          this.callbackFailVideoAD = callbackFail;
          this.sendLog(1010, type);
          this.videoADObj.load();
          console.log("videoAD 0");
          console.log("videoAD 1");
      }
      initBannerAD() {
          if (!this.proxy.createBannerAd)
              return;
          if (this.bannerADObj != null) {
              this.bannerADObj.destroy();
              Laya.timer.once(2000, this, () => {
                  this.bannerADObj = null;
                  this.initBannerAD();
                  this.bannerADObj.show();
              });
          }
          if (this.bannerADObj == null) {
              this.bad_id = ["201842", "201843"][Math.floor(Math.random() * 1)];
              console.log("显示广告id", this.bad_id);
              this.bannerADObj = this.proxy.createBannerAd({
                  adUnitId: this.bad_id,
                  style: {
                      top: 300,
                      left: 0,
                      width: GameData.Inst.platform.proxy.getSystemInfoSync().windowWidth,
                      height: 300
                  }
              });
              this.bannerADObj.onLoad(() => {
                  console.log("initBannerAD广告显示成功");
              });
              this.bannerADObj.onError((err) => {
                  console.log("报错了！");
                  console.log(err);
              });
              this.bannerADObj.onResize((size) => {
                  console.log("setSize", size.width, size.height);
                  let systemInfo = this.proxy.getSystemInfoSync();
                  let windowWidth = systemInfo.windowWidth;
                  let windowHeight = systemInfo.windowHeight;
                  this.bannerADObj.style.top = windowHeight - size.height;
                  this.bannerADObj.style.left = (windowWidth - size.width) / 2;
              });
              console.log("initBannerAD");
          }
      }
      bannerAD(callback) {
          this.bannerCallbacak = callback;
          this.initBannerAD();
          console.log("bannerAD");
      }
      initInterAD() {
          this.interADPanel = new ui.panels.InterADUI();
          let $this = this;
          this.interADPanel.onAwake = () => {
              this.interADPanel.btn_click.on(Laya.Event.CLICK, this, () => {
                  ptgcspsdk.collection(1051, this.openid, (data) => { });
                  if (this.getSwitch(11)) {
                      ptgcspsdk.probability((data) => {
                          console.log("interADPanel probability", data);
                          $this.InterADClickRate = data;
                      });
                  }
                  this.interADObj.reportAdClick({
                      adId: this.iad_id_curr
                  });
              });
              this.interADPanel.btn_click2.on(Laya.Event.CLICK, this, () => {
                  ptgcspsdk.collection(1051, this.openid, (data) => { });
                  if (this.getSwitch(11)) {
                      ptgcspsdk.probability((data) => {
                          console.log("interADPanel probability", data);
                          $this.InterADClickRate = data;
                      });
                  }
                  this.interADObj.reportAdClick({
                      adId: this.iad_id_curr
                  });
              });
              this.interADPanel.btn_close.on(Laya.Event.CLICK, this, () => {
              });
          };
          this.interADPanel.onEnable = () => {
              console.log("interADPanel.onEnable", this.getSwitch(6));
          };
      }
      InterAD(callback) {
          console.log("准备执行");
          console.log(callback);
          console.log(this.getSwitch(7));
          if (callback != null) {
              if (!this.getSwitch(7))
                  return;
          }
          this.InterAD3();
      }
      InterAD3() {
          console.log("ad3");
          console.log(this.getSwitch(8));
          console.log(this.proxy.createNativeAd);
          if (!this.proxy.createNativeAd)
              return;
          let $this = this;
          if (this.interADObj)
              this.interADObj.destroy();
          this.iad_id = "201844";
          this.interADObj = this.proxy.createNativeAd({
              adUnitId: this.iad_id
          });
          this.interADObj.onError(err => {
              console.log("暂无InterAD");
              $this.InterAD2();
          });
          this.interADObj.onLoad((res) => {
              console.log("initInterAD广告显示成功", res);
              $this.iad_id_curr = res.adList[0].adId;
              this.interADObj.reportAdShow({
                  adId: this.iad_id_curr
              });
              ptgcspsdk.collection(1050, this.openid, (data) => { });
              if (this.InterADClickRate == 1) {
                  if (this.getSwitch(11)) {
                      ptgcspsdk.probability((data) => {
                          console.log("interADPanel probability", data);
                          $this.InterADClickRate = data;
                      });
                  }
                  return;
              }
              $this.interADPanel.txt_ad.text = res.adList[0].desc;
              $this.interADPanel.txt_btn.text = this.getSwitch(10) ? "点击查看" : "查看广告";
              let imgURL = res.adList[0].imgUrlList[0];
              $this.interADPanel.img_ad.skin = imgURL;
              $this.interADPanel.show();
              $this.interADPanel.y = Laya.stage.height - 1334;
              console.log($this.interADPanel.y);
              console.log("他的坐标");
              if (this.getSwitch(6)) {
                  this.interADPanel.btn_close.visible = false;
                  Laya.timer.once(3000, this, () => {
                      this.interADPanel.btn_close.visible = false;
                  });
                  console.log("interADPanel.onEnable 1");
              }
              else {
                  this.interADPanel.btn_close.visible = false;
                  console.log("interADPanel.onEnable 0");
              }
              console.log(this.interADPanel.btn_close.visible);
          });
          this.interADObj.load();
          console.log("InterAD");
      }
      InterAD2() {
          if (!this.proxy.createNativeAd)
              return;
          let $this = this;
          if (this.interADObj)
              this.interADObj.destroy();
          this.interADObj = this.proxy.createNativeAd({
              adUnitId: this.iad_id2
          });
          this.interADObj.onError(err => {
              console.log("暂无InterAD");
              $this.InterAD3();
          });
          this.interADObj.onLoad((res) => {
              console.log("initInterAD广告显示成功", res);
              $this.iad_id_curr = res.adList[0].adId;
              this.interADObj.reportAdShow({
                  adId: this.iad_id_curr
              });
              ptgcspsdk.collection(1050, this.openid, (data) => { });
              if (this.InterADClickRate == 1) {
                  if (this.getSwitch(11)) {
                      ptgcspsdk.probability((data) => {
                          console.log("interADPanel probability", data);
                          $this.InterADClickRate = data;
                      });
                  }
                  return;
              }
              $this.interADPanel.txt_ad.text = res.adList[0].desc;
              $this.interADPanel.txt_btn.text = this.getSwitch(10) ? "点击查看" : "查看广告";
              let imgURL = res.adList[0].imgUrlList[0];
              $this.interADPanel.img_ad.skin = imgURL;
              $this.interADPanel.show();
              $this.interADPanel.y = Laya.stage.height - 1334;
              if (this.getSwitch(6)) {
                  this.interADPanel.btn_close.visible = false;
                  Laya.timer.once(3000, this, () => {
                      this.interADPanel.btn_close.visible = false;
                  });
                  console.log("interADPanel.onEnable 1");
              }
              else {
                  this.interADPanel.btn_close.visible = false;
                  console.log("interADPanel.onEnable 0");
              }
          });
          this.interADObj.load();
          console.log("InterAD");
      }
      openApp(appInfo, callback) {
          console.log("openApp", appInfo);
          if (!this.proxy.navigateToMiniGame)
              return;
          let $this = this;
          this.proxy.navigateToMiniGame({
              pkgName: appInfo[0].pkgname,
              path: appInfo[0].query,
              extraData: {},
              success(res) {
                  console.log("openApp success", res, res.errMsg);
              },
              fail(res) {
                  console.log("openApp fail", res, res.errMsg);
                  $this.showMessage("无法打开应用");
              }
          });
          console.log("openApp");
          $this.sendLog(1017, 0, appInfo[0].posid, appInfo[0].appId);
      }
  }

  class VIVOPlatform extends BasePlatform {
      constructor() {
          super();
          this.showVADTime = 0;
          this.isShowVAD = false;
          this.showBADTime = 0;
          this.showIADTime = 0;
          this.iad_id2 = 'ca2be0596bbe4e72a8a2280c74c719a2';
          this.iad_id_curr = "";
          this.InterADClickRate = 0;
      }
      showMessage(mes) {
          console.log("showMessage", mes);
          if (this.proxy) {
              let obj = {};
              obj["message"] = mes;
              this.proxy.showToast(obj);
          }
      }
      isUseSubpackage() {
          return true;
      }
      loadSubpackage(name, callback, callbackLoad) {
          let subTask = this.proxy.loadSubpackage({
              name: name,
              success: function () {
                  console.log(name, "子包加载成功");
                  callback.run();
              }
          });
          subTask.onProgressUpdate(function (res) {
              let progress = res["progress"];
              console.log(name, "子包加载...", progress);
              callbackLoad.runWith(progress);
          });
      }
      init(callback) {
          this.proxy = Laya.Browser.window.qg;
          this.proxy.onShow((res) => {
              Laya.stage.event(Laya.Event.FOCUS);
              Laya.timer.once(100, this, () => {
                  if (this.isShowVAD)
                      SoundManager.stopBg();
              });
          });
          this.proxy.onHide((res) => {
              Laya.stage.event(Laya.Event.BLUR);
          });
          if (callback)
              callback.run();
          this.getGameConfig();
      }
      zhengDongShort() {
          this.proxy.vibrateShort();
      }
      zhengDongLong() {
          this.proxy.vibrateLong();
      }
      getGameConfig() {
          this.cid = 0;
          this.bad_id = "d7b63eae2c0e4ddf9984c2b3aa190ea0";
          this.iad_id = "e963944a8e924338ae3a9032a35dfc79";
          this.vad_id = "2754682acd784bca99d2117de2b7478b";
          this.initBannerAD();
          this.initVideoAD();
          this.initInterAD();
          let $this = this;
          ptgcspsdk.getGameSwitch((res) => {
              console.log("getGameSwitch", res);
              if (typeof res == "string") {
                  res = JSON.parse(res);
              }
              $this.gameSwitch = res.data;
              if ($this.getSwitch(9) && !$this.getSwitch(8)) {
                  Laya.timer.loop(25000, $this, () => {
                      $this.InterAD(null);
                  });
              }
              if (this.getSwitch(11)) {
                  ptgcspsdk.probability((data) => {
                      console.log("interADPanel probability", data);
                      $this.InterADClickRate = data;
                  });
              }
          });
          $this.gameList = [];
      }
      setGameList(list) {
      }
      getUseAPI(apiId) {
          switch (apiId) {
              case 0:
                  return false;
                  break;
              case 10:
                  return false;
                  break;
              case 20:
                  return false;
                  break;
          }
          return true;
      }
      getSwitch(id) {
          if (this.gameSwitch == null)
              return false;
          if (this.gameSwitch.version == 0)
              return false;
          switch (id) {
              case 0:
                  return this.gameSwitch.default_check == 1;
                  break;
              case 1:
                  return this.gameSwitch.delay_txt_switch == 1;
                  break;
              case 2:
                  return this.gameSwitch.force_video == 1;
                  break;
              case 3:
                  return this.gameSwitch.force_share == 1;
                  break;
              case 4:
                  if (this.gameSwitch.local_switch == 2)
                      return true;
                  break;
              case 5:
                  return this.gameSwitch.delay_egg_switch == 1;
                  break;
              case 6:
                  return this.gameSwitch.ptg_native_limit_city == 1;
                  break;
              case 7:
                  return this.gameSwitch.ptg_native_limit == 1;
                  break;
              case 8:
                  if (this.gameSwitch.ptg_native_province == 1)
                      return true;
                  if (this.gameSwitch.ptg_native_city == 1)
                      return true;
                  break;
              case 9:
                  return this.gameSwitch.ptg_yuansheng_limit == 1;
                  break;
              case 10:
                  return this.gameSwitch.ptg_native_btn_text == 1;
                  break;
              case 11:
                  return this.gameSwitch.ptg_threshold == 1;
                  break;
          }
          return false;
      }
      sendLog(aid, type = 0, uid = "", toAppid = "") {
          console.log("sendLog", aid);
          switch (aid) {
              case 1005:
                  ptgcspsdk.sendLogin(this.cid, aid, this.openid, this.isNew);
                  break;
              case 1008:
                  ptgcspsdk.startGame(this.cid, aid, this.openid);
                  break;
              case 1009:
                  ptgcspsdk.sendShare(this.cid, aid, this.openid, type);
                  break;
              case 1010:
              case 1011:
                  ptgcspsdk.watchVideo(this.cid, aid, this.openid, type);
                  break;
              case 1007:
              case 1017:
                  ptgcspsdk.sendJump(this.cid, aid, this.openid, uid, toAppid);
                  break;
          }
      }
      login(callback, callbackFail) {
          if (this.isLogined)
              return;
          this.isLogined = true;
          if (this.proxy.getSystemInfoSync().platformVersionCode < 1053)
              return;
          this.proxy.login().then((data) => {
              if (data.data.token != "") {
                  console.log(`login调用成功${data.data.token} `);
                  GameData.Inst.platform.openid = "";
                  ptgcspsdk.getVivoOpenid(data.data.token, (res) => {
                      console.log(res, `login调用成功${data.data.token} `);
                      if (GameData.Inst.platform.openid != "")
                          return;
                      if (res.openId == null)
                          res.openId = "10001";
                      if (res.anonymous_openId == null)
                          res.anonymous_openId = "10001";
                      if (res.session_key == null)
                          res.session_key = "10001";
                      GameData.Inst.platform.openid = res.openId;
                      GameData.Inst.platform.anonymous_openid = res.openId;
                      GameData.Inst.platform.session_key = res.openId;
                      GameData.Inst.platform.sendLog(1005);
                  });
                  Laya.timer.once(5000, this, () => {
                      if (GameData.Inst.platform.openid != "")
                          return;
                      callback.run();
                      GameData.Inst.platform.openid = "10000";
                      GameData.Inst.platform.anonymous_openid = "10000";
                      GameData.Inst.platform.session_key = "10000";
                      GameData.Inst.platform.sendLog(1005);
                  });
              }
              else {
                  console.log(`login调用失败`);
                  callbackFail.run();
              }
          }, (err) => {
              console.log(`login调用失败`);
              callbackFail.run();
          });
      }
      share(callback, callbackFail, type = 0) {
      }
      shareVideo(callback, callbackFail) {
          return;
      }
      initVideoAD() {
          if (!this.proxy.createRewardedVideoAd)
              return;
          if (this.videoADObj == null) {
              let $this = this;
              this.vad_id = ["6ce9b2794a5e42a6ae0a0f04ec3d3461", "71e7f2b1578f4f1d97cc1d1e7a01b87e"][Math.floor(Math.random() * 1)];
              this.videoADObj = this.proxy.createRewardedVideoAd({ posId: this.vad_id });
              this.videoADObj.onError((err) => {
                  if ($this.callbackFailVideoAD) {
                      $this.showMessage("暂无视频");
                      $this.callbackFailVideoAD.run();
                  }
                  $this.callbackVideoAD = null;
                  $this.callbackFailVideoAD = null;
                  console.log("onError end");
                  this.showVADTime = Laya.Browser.now();
                  this.isShowVAD = false;
              });
              this.videoADObj.onClose((res) => {
                  console.log("onClose", $this.currVADType);
                  console.log("onClose 0");
                  if (res && res.isEnded) {
                      GameData.Inst.data.taskType4VAD++;
                      $this.callbackVideoAD.run();
                      $this.sendLog(1011, this.currVADType);
                      console.log("onClose 1");
                  }
                  else {
                      $this.callbackFailVideoAD.run();
                      $this.showMessage("关闭视频");
                  }
                  $this.callbackVideoAD = null;
                  $this.callbackFailVideoAD = null;
                  if (GameData.Inst.data.sound)
                      SoundManager.playBg();
                  console.log("onClose end");
                  this.showVADTime = Laya.Browser.now();
                  this.isShowVAD = false;
              });
              this.videoADObj.onLoad(() => {
                  if ($this.callbackVideoAD) {
                      $this.videoADObj.show().then(() => {
                          console.log('激励视频广告展示完成');
                          SoundManager.stopBg();
                          this.isShowVAD = true;
                      }).catch((err) => {
                          console.log('激励视频广告展示失败', JSON.stringify(err));
                      });
                  }
              });
              console.log("initVideoAD");
          }
      }
      videoAD(callback, callbackFail, type = 0) {
          this.isShowVAD = false;
          if (this.videoADObj == null)
              return;
          if (this.callbackVideoAD != null)
              return;
          let time = Math.floor((Laya.Browser.now() - this.showVADTime) / 1000);
          if (time < 60) {
              this.showMessage((60 - time) + "秒后再观看视频");
              return;
          }
          this.currVADType = type;
          this.callbackVideoAD = callback;
          this.callbackFailVideoAD = callbackFail;
          this.sendLog(1010, type);
          console.log("videoAD 0");
          this.videoADObj.load();
          console.log("videoAD 1");
      }
      initBannerAD() {
          if (!this.proxy.createBannerAd)
              return;
          if (this.bannerADObj != null) {
              this.bannerADObj.destroy();
              this.bannerADObj.offResize();
              this.bannerADObj.offLoad();
              this.bannerADObj.offError();
              Laya.timer.once(4000, this, () => {
                  this.bannerADObj = null;
                  this.initBannerAD();
              });
              return;
          }
          let time = Math.floor((Laya.Browser.now() - this.showBADTime) / 1000);
          if (time < 10) {
              return;
          }
          this.bad_id = ["d7b63eae2c0e4ddf9984c2b3aa190ea0", "493d71db70464f8ca9be426f38f83150"][Math.floor(Math.random() * 1)];
          this.bannerADObj = this.proxy.createBannerAd({
              posId: this.bad_id,
              style: {}
          });
          this.bannerADObj.onError((err) => {
              console.log("banner广告加载失败", err);
              this.showBADTime = Laya.Browser.now();
          });
          this.bannerADObj.onLoad(() => {
              console.log("initBannerAD广告显示成功");
          });
          this.bannerADObj.onClose(() => {
              console.log("initBannerAD onClose");
              this.showBADTime = Laya.Browser.now();
          });
          if (this.proxy.getSystemInfoSync().platformVersionCode >= 1053) {
              this.bannerADObj.onSize((size) => {
                  console.log("setSize", size.width, size.height);
                  let systemInfo = this.proxy.getSystemInfoSync();
                  let windowWidth = systemInfo.screenWidth;
                  let windowHeight = systemInfo.screenHeight;
                  this.bannerADObj.style.top = windowHeight - size.height;
                  this.bannerADObj.style.left = (windowWidth - size.width) / 2;
                  this.showBADTime = Laya.Browser.now();
              });
          }
          this.showBADTime = Laya.Browser.now();
          console.log("bannerAD");
      }
      bannerAD(callback) {
          let time = Math.floor((Laya.Browser.now() - this.showBADTime) / 1000);
          if (time < 10) {
              return;
          }
          this.showBADTime = Laya.Browser.now();
          if (this.bannerADObj) {
              this.initBannerAD();
              if (callback)
                  callback.run();
          }
      }
      initInterAD() {
          if (this.proxy.getSystemInfoSync().platformVersionCode < 1053)
              return;
          this.interADPanel = new ui.panels.InterAD1UI();
          let $this = this;
          this.interADPanel.onAwake = () => {
              this.interADPanel.btn_click.on(Laya.Event.CLICK, this, () => {
                  ptgcspsdk.collection(1051, this.openid, (data) => { });
                  if (this.getSwitch(11)) {
                      ptgcspsdk.probability((data) => {
                          console.log("interADPanel probability", data);
                          $this.InterADClickRate = data;
                      });
                  }
                  this.interADPanel.close();
                  this.interADPanel.dataSource.reportAdClick({
                      adId: this.iad_id_curr
                  });
              });
              this.interADPanel.btn_click2.on(Laya.Event.CLICK, this, () => {
                  ptgcspsdk.collection(1051, this.openid, (data) => { });
                  if (this.getSwitch(11)) {
                      ptgcspsdk.probability((data) => {
                          console.log("interADPanel probability", data);
                          $this.InterADClickRate = data;
                      });
                  }
                  this.interADPanel.close();
                  this.interADPanel.dataSource.reportAdClick({
                      adId: this.iad_id_curr
                  });
              });
              this.interADPanel.btn_close.on(Laya.Event.CLICK, this, () => {
                  if (this.getSwitch(6) && !this.getSwitch(8)) {
                      ptgcspsdk.collection(1051, this.openid, (data) => { });
                      if (this.getSwitch(11)) {
                          ptgcspsdk.probability((data) => {
                              console.log("interADPanel probability", data);
                              $this.InterADClickRate = data;
                          });
                      }
                      this.interADPanel.close();
                      this.interADPanel.dataSource.reportAdClick({
                          adId: this.iad_id_curr
                      });
                  }
                  else
                      this.interADPanel.close();
              });
          };
          this.interADPanel.onEnable = () => {
          };
      }
      InterAD(callback) {
          if (this.proxy.getSystemInfoSync().platformVersionCode < 1053)
              return;
          if (callback == null) {
          }
          let time = Math.floor((Laya.Browser.now() - this.showIADTime) / 1000);
          if (time < 10) {
              return;
          }
          this.showIADTime = Laya.Browser.now();
          this.InterAD3();
      }
      InterAD3() {
          if (this.proxy.getSystemInfoSync().platformVersionCode < 1053)
              return;
          if (!this.proxy.createNativeAd)
              return;
          let $this = this;
          if (this.interADObj == null) {
              this.iad_id = ["81fc7a1fb5bd4a939f83fee525f50ca7", "c02c2a0095304c62accf715872f45f6c"][Math.floor(Math.random() * 1)];
              this.interADObj = this.proxy.createNativeAd({
                  adUnitId: this.iad_id
              });
              this.interADObj.onError(err => {
                  console.log("暂无InterAD");
                  $this.InterAD2();
              });
              this.interADObj.onLoad((res) => {
                  console.log("initInterAD广告显示成功", res);
                  for (var i = 0; i < 1; i++) {
                      let url = res.adList[i].imgUrlList[0];
                      console.log("图片地址为", url);
                      Laya.loader.create([{ url: url, type: Laya.Loader.IMAGE }], Laya.Handler.create(this, () => {
                          $this.interADPanel.img_ad.texture = Laya.loader.getRes(url);
                      }), Laya.Handler.create(this, (propress) => {
                      }, [], false));
                      $this.iad_id_curr = res.adList[i].adId;
                      $this.interADPanel.txt_ad.text = res.adList[i].desc;
                  }
                  this.interADObj.reportAdShow({
                      adId: this.iad_id_curr
                  });
                  ptgcspsdk.collection(1050, this.openid, (data) => { });
                  if (this.InterADClickRate == 1) {
                      if (this.getSwitch(11)) {
                          ptgcspsdk.probability((data) => {
                              console.log("interADPanel probability", data);
                              $this.InterADClickRate = data;
                          });
                      }
                      return;
                  }
                  $this.interADPanel.txt_btn.text = (this.getSwitch(10) && !this.getSwitch(8)) ? "点击查看" : "查看广告";
                  let imgURL = res.adList[0].imgUrlList[0];
                  if (imgURL.indexOf("?") != -1)
                      imgURL = imgURL.substring(0, imgURL.indexOf("?"));
                  $this.interADPanel.dataSource = this.interADObj;
                  $this.interADPanel.show();
                  if ($this.getSwitch(6) && !$this.getSwitch(8)) {
                      $this.interADPanel.btn_close.visible = false;
                      Laya.timer.once(3000, this, () => {
                          $this.interADPanel.btn_close.visible = true;
                      });
                  }
                  else {
                      $this.interADPanel.btn_close.visible = true;
                  }
              });
          }
          this.interADObj.load();
          console.log("InterAD");
      }
      InterAD2() {
          if (this.proxy.getSystemInfoSync().platformVersionCode < 1053)
              return;
          if (!this.proxy.createNativeAd)
              return;
          let $this = this;
          if (this.interADObj2 == null) {
              this.interADObj2 = this.proxy.createNativeAd({
                  adUnitId: this.iad_id2
              });
              this.interADObj2.onError(err => {
                  console.log("暂无InterAD");
              });
              this.interADObj2.onLoad((res) => {
                  console.log("initInterAD广告显示成功", res);
                  for (var i = 0; i < res.adList.length; i++) {
                      if (i == res.adList.length - 1) {
                          $this.interADPanel.img_ad.skin = res.adList[i].imgUrlList[0];
                          $this.iad_id_curr = res.adList[i].adId;
                          $this.interADPanel.txt_ad.text = res.adList[0].desc;
                      }
                      if (res.adList[i].imgUrlList[0].indexOf("?") != -1)
                          continue;
                      $this.interADPanel.img_ad.skin = res.adList[i].imgUrlList[0];
                      $this.iad_id_curr = res.adList[i].adId;
                      $this.interADPanel.txt_ad.text = res.adList[0].desc;
                  }
                  this.interADObj2.reportAdShow({
                      adId: this.iad_id_curr
                  });
                  ptgcspsdk.collection(1050, this.openid, (data) => { });
                  if (this.InterADClickRate == 1) {
                      if (this.getSwitch(11)) {
                          ptgcspsdk.probability((data) => {
                              console.log("interADPanel probability", data);
                              $this.InterADClickRate = data;
                          });
                      }
                      return;
                  }
                  $this.interADPanel.txt_btn.text = (this.getSwitch(10) && !this.getSwitch(8)) ? "点击查看" : "查看广告";
                  let imgURL = res.adList[0].imgUrlList[0];
                  if (imgURL.indexOf("?") != -1)
                      imgURL = imgURL.substring(0, imgURL.indexOf("?"));
                  console.log("图片地址为", imgURL);
                  $this.interADPanel.dataSource = this.interADObj2;
                  $this.interADPanel.show();
                  if ($this.getSwitch(6) && !$this.getSwitch(8)) {
                      $this.interADPanel.btn_close.visible = false;
                      Laya.timer.once(3000, this, () => {
                          $this.interADPanel.btn_close.visible = true;
                      });
                  }
                  else {
                      $this.interADPanel.btn_close.visible = true;
                  }
              });
          }
          this.interADObj2.load();
          console.log("InterAD");
      }
      openApp(appInfo, callback) {
          console.log("openApp", appInfo);
          if (!this.proxy.navigateToMiniGame)
              return;
          let $this = this;
          this.proxy.navigateToMiniGame({
              pkgName: appInfo[0].pkgname,
              path: appInfo[0].query,
              extraData: {},
              success(res) {
                  console.log("openApp success", res, res.errMsg);
              },
              fail(res) {
                  console.log("openApp fail", res, res.errMsg);
                  $this.showMessage("无法打开应用");
              }
          });
          console.log("openApp");
          $this.sendLog(1017, 0, appInfo[0].posid, appInfo[0].appId);
      }
  }

  class SystemTips {
      constructor() {
      }
      static get Inst() {
          if (SystemTips._inst == null)
              SystemTips._inst = new SystemTips();
          return SystemTips._inst;
      }
      showMsg(msg) {
          let tips = new ui.panels.SystemTipsUI();
          tips.width = Laya.stage.width;
          tips.height = Laya.stage.height;
          tips.onAwake = () => { tips.txt_msg.text = msg; };
          tips.show();
          Laya.timer.once(1000, this, () => {
              tips.closeEffect = null;
              tips.close();
          });
      }
  }

  class QQPlatform extends BasePlatform {
      constructor() {
          super();
          this.showVADTime = 0;
          this.isShowVAD = false;
          this.bannerCallbacak = null;
      }
      showMessage(mes) {
          console.log("showMessage", mes);
          if (this.proxy) {
              let obj = {};
              obj["title"] = mes;
              this.proxy.showToast(obj);
          }
      }
      isUseSubpackage() {
          return true;
      }
      loadSubpackage(name, callback, callbackLoad) {
          let $this = this;
          let subTask = this.proxy.loadSubpackage({
              name: name,
              success: function () {
                  console.log(name, "子包加载成功");
                  callback.run();
              },
              fail(res) {
                  $this.showMessage("加载分包错误");
              }
          });
          subTask.onProgressUpdate(function (res) {
              console.log(name, "子包加载...", res, res.progress);
              let progress = res.progress;
              if (progress == null)
                  progress = 0;
              callbackLoad.runWith(progress / 100);
          });
      }
      init(callback) {
          this.proxy = Laya.Browser.window.qq;
          this.proxy.showShareMenu({
              showShareItems: ['qq', 'qzone', 'wechatFriends', 'wechatMoment']
          });
          this.proxy.onShareAppMessage(() => ({
              title: '拍照我最强，等你来挑战!',
              imageUrl: 'https://hotupdate.hnpingtouge.com/gameshare/fxt.png'
          }));
          this.proxy.onShow((res) => {
              Laya.stage.event(Laya.Event.FOCUS);
              Laya.timer.once(100, this, () => {
              });
          });
          this.proxy.onHide((res) => {
              Laya.stage.event(Laya.Event.BLUR);
          });
          if (callback)
              callback.run();
          this.getGameConfig();
      }
      zhengDongShort() {
          this.proxy.vibrateShort();
      }
      zhengDongLong() {
          this.proxy.vibrateLong();
      }
      getGameConfig() {
          this.cid = 0;
          this.bad_id = "6c62d69ab8e09b86bd08e10813331916";
          this.iad_id = "";
          this.vad_id = "8c1f7c23dc8b1082b939bd2211386586";
          this.initBannerAD();
          this.initVideoAD();
          let $this = this;
          ptgcspsdk.getGameSwitch((res) => {
              console.log("getGameSwitch", res);
              if (typeof res == "string") {
                  res = JSON.parse(res);
              }
              $this.gameSwitch = res.data;
          });
          $this.gameList = [];
      }
      setGameList(list) {
      }
      getUseAPI(apiId) {
          switch (apiId) {
              case 0:
                  return false;
                  break;
              case 10:
                  return false;
                  break;
              case 20:
                  return false;
                  break;
          }
          return true;
      }
      getSwitch(id) {
          if (this.gameSwitch == null)
              return false;
          if (this.gameSwitch.version == 0)
              return false;
          if (this.gameSwitch.local_switch == 1)
              return false;
          switch (id) {
              case 0:
                  return this.gameSwitch.default_check == 1;
                  break;
              case 1:
                  return this.gameSwitch.delay_display == 1;
                  break;
              case 2:
                  return this.gameSwitch.video_paly == 1;
                  break;
              case 3:
                  return this.gameSwitch.force_share == 1;
                  break;
              case 4:
                  return this.gameSwitch.export_marquee == 1;
                  break;
              case 5:
                  return this.gameSwitch.video_display1 >= 1;
                  break;
              case 6:
                  return this.gameSwitch.video_display2 >= 1;
                  break;
              case 7:
                  return this.gameSwitch.video_display3 >= 1;
                  break;
              case 8:
                  return this.gameSwitch.video_display4 >= 1;
                  break;
              case 9:
                  return this.gameSwitch.delay_egg_switch4 >= 1;
                  break;
              case 10:
                  return this.gameSwitch.Refresh_time1 > 0;
                  break;
              case 11:
                  return this.gameSwitch.Refresh_time2 > 0;
                  break;
              case 12:
                  return this.gameSwitch.banner_display == 1;
                  break;
              case 13:
                  return this.gameSwitch.screen_ad_switch == 1;
                  break;
              case 14:
                  return this.gameSwitch.delay_egg_switch1 >= 1;
                  break;
              case 15:
                  return this.gameSwitch.delay_egg_switch2 >= 1;
                  break;
              case 16:
                  return this.gameSwitch.blocks_show == 1;
                  break;
              case 17:
                  return this.gameSwitch.screen_ad_switch == 1;
                  break;
              case 18:
                  return this.gameSwitch.delay_egg_switch3 >= 1;
                  break;
              case 19:
                  return this.gameSwitch.video_display >= 1;
                  break;
              case 20:
                  return this.gameSwitch.video_paly2 >= 1;
                  break;
          }
          return false;
      }
      sendLog(aid, type = 0, uid = "", toAppid = "") {
          console.log("sendLog", aid);
          switch (aid) {
              case 1005:
                  ptgcspsdk.sendLogin(this.cid, aid, this.openid, this.isNew);
                  break;
              case 1008:
                  ptgcspsdk.startGame(this.cid, aid, this.openid);
                  break;
              case 1009:
                  ptgcspsdk.sendShare(this.cid, aid, this.openid, type);
                  break;
              case 1010:
              case 1011:
                  ptgcspsdk.watchVideo(this.cid, aid, this.openid, type);
                  break;
              case 1007:
              case 1017:
                  ptgcspsdk.sendJump(this.cid, aid, this.openid, uid, toAppid);
                  break;
          }
      }
      login(callback, callbackFail) {
          if (this.isLogined)
              return;
          this.isLogined = true;
          this.proxy.login({
              success(data) {
                  console.log(`login调用成功${data.code}`);
                  ptgcspsdk.getQQOpenid(data.code, (res) => {
                      if (callback)
                          callback.run();
                      if (res.openid == null)
                          res.openid = "10001";
                      if (res.anonymous_openid == null)
                          res.anonymous_openid = "10001";
                      if (res.session_key == null)
                          res.session_key = "10001";
                      GameData.Inst.platform.openid = res.openid;
                      GameData.Inst.platform.anonymous_openid = res.anonymous_openid;
                      GameData.Inst.platform.session_key = res.session_key;
                      GameData.Inst.platform.sendLog(1005);
                  });
              },
              fail(res) {
                  console.log(`login调用失败`);
                  if (callbackFail)
                      callbackFail.run();
              }
          });
      }
      share(callback, callbackFail, type = 0) {
      }
      shareVideo(callback, callbackFail) {
          return;
      }
      initVideoAD() {
          if (!this.proxy.createRewardedVideoAd)
              return;
          if (this.videoADObj == null) {
              let $this = this;
              this.videoADObj = this.proxy.createRewardedVideoAd({ adUnitId: this.vad_id });
              this.videoADObj.onError((err) => {
                  if ($this.callbackFailVideoAD) {
                      $this.showMessage("暂无视频");
                      $this.callbackFailVideoAD.run();
                  }
                  $this.callbackVideoAD = null;
                  $this.callbackFailVideoAD = null;
                  console.log("onError end");
                  this.showVADTime = Laya.Browser.now();
                  this.isShowVAD = false;
              });
              this.videoADObj.onClose((res) => {
                  console.log("onClose", $this.currVADType);
                  console.log("onClose 0");
                  if (res && res.isEnded) {
                      GameData.Inst.data.taskType4VAD++;
                      if ($this.callbackVideoAD)
                          $this.callbackVideoAD.run();
                      $this.sendLog(1011, this.currVADType);
                      console.log("onClose 1");
                  }
                  else {
                      if ($this.callbackFailVideoAD)
                          $this.callbackFailVideoAD.run();
                      $this.showMessage("关闭视频");
                  }
                  $this.callbackVideoAD = null;
                  $this.callbackFailVideoAD = null;
                  console.log("onClose end");
                  this.showVADTime = Laya.Browser.now();
                  this.isShowVAD = false;
              });
              this.videoADObj.onLoad(() => {
                  console.log("加载成功");
                  this.isShowVAD = true;
              });
              console.log("initVideoAD");
          }
      }
      videoAD(callback, callbackFail, type = 0) {
          this.isShowVAD = false;
          if (this.videoADObj == null)
              return;
          if (this.callbackVideoAD != null)
              return;
          this.currVADType = type;
          this.callbackVideoAD = callback;
          this.callbackFailVideoAD = callbackFail;
          this.sendLog(1010, type);
          console.log("videoAD 0");
          this.videoADObj.show().then(() => {
              console.log("videoAD广告显示成功");
          }).catch(err => {
              console.log("广告组件出现问题", err);
              this.videoADObj.load().then(() => {
                  console.log("手动加载成功");
                  this.videoADObj.show();
              });
          });
          console.log("videoAD 1");
      }
      initBannerAD() {
          if (!this.proxy.createBannerAd)
              return;
          if (this.bannerADObj) {
              this.bannerADObj.destroy();
              this.bannerADObj.offResize();
              this.bannerADObj.offLoad();
              this.bannerADObj = null;
          }
          this.bannerADObj = this.proxy.createBannerAd({
              adUnitId: this.bad_id,
              style: {
                  left: 0,
                  top: 0,
                  width: GameData.Inst.platform.proxy.getSystemInfoSync().windowWidth,
                  height: 120
              }
          });
          this.bannerADObj.onError((err) => {
              console.log("banner广告加载失败", err);
          });
          this.bannerADObj.onLoad(() => {
              console.log("initBannerAD广告显示成功");
              if (this.bannerCallbacak)
                  this.bannerCallbacak.run();
              this.bannerCallbacak = null;
          });
          this.bannerADObj.onResize((size) => {
              let systemInfo = this.proxy.getSystemInfoSync();
              let windowWidth = systemInfo.windowWidth;
              let windowHeight = systemInfo.windowHeight;
              console.log("setSize", size.width, size.height);
              this.bannerADObj.style.top = windowHeight - size.height;
              this.bannerADObj.style.left = (windowWidth - size.width) / 2;
              console.log("setSize", windowWidth, "  ", size.width, this.bannerADObj.style.left);
          });
      }
      bannerAD(callback) {
          this.bannerCallbacak = callback;
          this.initBannerAD();
          console.log("bannerAD");
      }
      initInterAD() {
      }
      InterAD(callback) {
      }
      openApp(appInfo, callback) {
          console.log("openApp", appInfo);
          if (!this.proxy.navigateToMiniGame)
              return;
          let $this = this;
          this.proxy.navigateToMiniGame({
              pkgName: appInfo[0].pkgname,
              path: appInfo[0].query,
              extraData: {},
              success(res) {
                  console.log("openApp success", res, res.errMsg);
              },
              fail(res) {
                  console.log("openApp fail", res, res.errMsg);
                  $this.showMessage("无法打开应用");
              }
          });
          console.log("openApp");
          $this.sendLog(1017, 0, appInfo[0].posid, appInfo[0].appId);
      }
  }

  class WXPlatform extends BasePlatform {
      constructor() {
          super();
          this.showVADTime = 0;
          this.isShowVAD = false;
          this.bannerCount = 0;
          this.bannerTime = 0;
          this.bannerCallbacak = null;
      }
      showMessage(mes) {
          console.log("showMessage", mes);
          if (this.proxy) {
              let obj = {};
              obj["title"] = mes;
              this.proxy.showToast(obj);
          }
      }
      isUseSubpackage() {
          return true;
      }
      loadSubpackage(name, callback, callbackLoad) {
          let $this = this;
          let subTask = this.proxy.loadSubpackage({
              name: name,
              success: function () {
                  console.log(name, "子包加载成功");
                  callback.run();
              },
              fail(res) {
                  $this.showMessage("加载分包错误");
              }
          });
          subTask.onProgressUpdate(function (res) {
              console.log(name, "子包加载...", res, res.progress);
              let progress = res.progress;
              if (progress == null)
                  progress = 0;
              callbackLoad.runWith(progress / 100);
          });
      }
      init(callback) {
          this.proxy = Laya.Browser.window.wx;
          this.proxy.showShareMenu({
              withShareTicket: true
          });
          this.proxy.onShareAppMessage(() => ({
              title: '拍照我最强，等你来挑战!',
              imageUrl: 'https://hotupdate.hnpingtouge.com/gameshare/fxt.png'
          }));
          this.proxy.onShow((res) => {
              Laya.stage.event(Laya.Event.FOCUS);
              Laya.timer.once(100, this, () => {
              });
          });
          this.proxy.onHide((res) => {
              Laya.stage.event(Laya.Event.BLUR);
          });
          if (callback)
              callback.run();
          let wxData = this.proxy.getLaunchOptionsSync();
          if (wxData && wxData.query) {
              if (wxData.query.channel) {
                  this.cid = wxData.query.channel;
              }
          }
          this.getGameConfig();
      }
      zhengDongShort() {
          this.proxy.vibrateShort();
      }
      zhengDongLong() {
          this.proxy.vibrateLong();
      }
      getGameConfig() {
          this.cid = 0;
          this.bad_id = Math.random() > 0.5 ? "adunit-0bc7200af6664d69" : "adunit-95cacaf83d3e65db";
          this.iad_id = "adunit-ef65baecdd4efc6d";
          this.vad_id = Math.random() > 0.5 ? "adunit-c7dddb7d238fabf5" : "adunit-ca9e25b08f00bcb3";
          this.initBannerAD();
          this.initVideoAD();
          let $this = this;
          ptgcspsdk.getGameSwitch((res) => {
              console.log("getGameSwitch", res);
              if (typeof res == "string") {
                  res = JSON.parse(res);
              }
              $this.gameSwitch = res.data;
          });
          $this.gameList = [];
          ptgcspsdk.getJumpGameList((res) => {
              console.log("getJumpGameList", res);
              if (typeof res == "string") {
                  res = JSON.parse(res);
              }
              $this.gameList = res;
          });
      }
      setGameList(list) {
      }
      getUseAPI(apiId) {
          switch (apiId) {
              case 0:
                  return false;
                  break;
              case 10:
                  return false;
                  break;
              case 20:
                  return false;
                  break;
          }
          return true;
      }
      getSwitch(id) {
          if (this.gameSwitch == null)
              return false;
          if (this.gameSwitch.version == 0)
              return false;
          if (this.gameSwitch.local_switch == 1)
              return false;
          if (this.gameSwitch.delay_turn == 1)
              return true;
          switch (id) {
              case 0:
                  return this.gameSwitch.ignore_check == 1;
                  break;
              case 1:
                  return this.gameSwitch.delay_display == 1;
                  break;
              case 2:
                  return this.gameSwitch.force_video == 1;
                  break;
              case 3:
                  return this.gameSwitch.force_share == 1;
                  break;
              case 4:
                  return this.gameSwitch.video_update == 1;
                  break;
              case 5:
                  return this.gameSwitch.delay_egg_switch == 1;
                  break;
              case 17:
                  return this.gameSwitch.delay_turn == 1;
                  break;
          }
          return false;
      }
      sendLog(aid, type = 0, uid = "", toAppid = "") {
          console.log("sendLog", aid);
          switch (aid) {
              case 1005:
                  ptgcspsdk.sendLogin(this.cid, aid, this.openid, this.isNew);
                  break;
              case 1008:
                  ptgcspsdk.startGame(this.cid, aid, this.openid);
                  break;
              case 1009:
                  ptgcspsdk.sendShare(this.cid, aid, this.openid, type);
                  break;
              case 1010:
              case 1011:
                  ptgcspsdk.watchVideo(this.cid, aid, this.openid, type);
                  break;
              case 1007:
              case 1017:
                  ptgcspsdk.sendJump(this.cid, aid, this.openid, uid, toAppid);
                  break;
          }
      }
      login(callback, callbackFail) {
          if (this.isLogined)
              return;
          this.isLogined = true;
          this.proxy.login({
              success(data) {
                  console.log(`login调用成功${data.code}`);
                  ptgcspsdk.getWxOpenid(data.code, data.code, (res) => {
                      if (callback)
                          callback.run();
                      if (res.openid == null)
                          res.openid = "10001";
                      if (res.anonymous_openid == null)
                          res.anonymous_openid = "10001";
                      if (res.session_key == null)
                          res.session_key = "10001";
                      GameData.Inst.platform.openid = res.openid;
                      GameData.Inst.platform.anonymous_openid = res.anonymous_openid;
                      GameData.Inst.platform.session_key = res.session_key;
                      GameData.Inst.platform.sendLog(1005);
                  });
              },
              fail(res) {
                  console.log(`login调用失败`);
                  if (callbackFail)
                      callbackFail.run();
              }
          });
      }
      share(callback, callbackFail, type = 0) {
          this.proxy.shareAppMessage({
              title: '',
              imageUrl: ''
          });
          if (callback)
              callback.run();
      }
      shareVideo(callback, callbackFail) {
          return;
      }
      initVideoAD() {
          if (!this.proxy.createRewardedVideoAd)
              return;
          if (this.videoADObj == null) {
              let $this = this;
              this.videoADObj = this.proxy.createRewardedVideoAd({ adUnitId: this.vad_id });
              this.videoADObj.onError((err) => {
                  if ($this.callbackFailVideoAD) {
                      $this.showMessage("暂无视频");
                      $this.callbackFailVideoAD.run();
                  }
                  $this.callbackVideoAD = null;
                  $this.callbackFailVideoAD = null;
                  console.log("onError end");
                  this.showVADTime = Laya.Browser.now();
                  this.isShowVAD = false;
              });
              this.videoADObj.onClose((res) => {
                  console.log("onClose", $this.currVADType);
                  if (GameData.Inst.data.sound)
                      SoundManager.playBg();
                  console.log("onClose 0");
                  if (res && res.isEnded) {
                      GameData.Inst.data.taskType4VAD++;
                      $this.callbackVideoAD.run();
                      $this.sendLog(1011, this.currVADType);
                      console.log("onClose 1");
                  }
                  else {
                      $this.callbackFailVideoAD.run();
                      $this.showMessage("关闭视频");
                  }
                  $this.callbackVideoAD = null;
                  $this.callbackFailVideoAD = null;
                  console.log("onClose end");
                  this.showVADTime = Laya.Browser.now();
                  this.isShowVAD = false;
              });
              this.videoADObj.onLoad(() => {
                  console.log("加载成功");
                  this.isShowVAD = true;
              });
              console.log("initVideoAD");
          }
      }
      videoAD(callback, callbackFail, type = 0) {
          this.isShowVAD = false;
          if (this.videoADObj == null)
              return;
          if (this.callbackVideoAD != null)
              return;
          this.currVADType = type;
          this.callbackVideoAD = callback;
          this.callbackFailVideoAD = callbackFail;
          this.sendLog(1010, type);
          console.log("videoAD 0");
          this.videoADObj.show().then(() => {
              console.log("videoAD广告显示成功");
          }).catch(err => {
              console.log("广告组件出现问题", err);
              this.videoADObj.load().then(() => {
                  console.log("手动加载成功");
                  this.videoADObj.show();
              });
          });
          console.log("videoAD 1");
      }
      initBannerAD() {
          if (!this.proxy.createBannerAd)
              return;
          if (this.bannerADObj)
              this.bannerADObj.destroy();
          this.bad_id = "adunit-" + ["0bc7200af6664d69", "95cacaf83d3e65db", "579ca33fd0ab5f77", "420880b28b3f38e8", "bed9b430c793eb41", "a0b9b94d1fbf2753"][Math.floor(Math.random() * 6)];
          this.bannerADObj = this.proxy.createBannerAd({
              adUnitId: this.bad_id,
              adIntervals: 30,
              style: {
                  left: 0,
                  top: 0,
                  width: 320,
                  height: 90
              }
          });
          this.bannerADObj.onError((err) => {
              console.log("banner广告加载失败", err);
              this.bannerADObj = null;
          });
          this.bannerADObj.onLoad(() => {
              console.log("initBannerAD广告显示成功");
              if (this.bannerCallbacak)
                  this.bannerCallbacak.run();
              this.bannerCallbacak = null;
          });
          this.bannerADObj.onResize((size) => {
              let systemInfo = this.proxy.getSystemInfoSync();
              let windowWidth = systemInfo.windowWidth;
              let windowHeight = systemInfo.windowHeight;
              console.log("setSize", size.width, size.height);
              this.bannerADObj.style.top = windowHeight - size.height;
              this.bannerADObj.style.left = (windowWidth - size.width) / 2;
              if (size.width > 300) {
                  this.bannerADObj.style.width = 300;
              }
              console.log("setSize", windowWidth, "  ", size.width, this.bannerADObj.style.left);
          });
      }
      bannerUpdate(isInit = true) {
          if (this.bannerTime == 0) {
              this.bannerTime = Laya.Browser.now();
          }
          if (this.bannerTime + 10000 < Laya.Browser.now()) {
              this.bannerTime = 0;
              if (this.bannerADObj)
                  this.bannerADObj.destroy();
              this.bannerADObj = null;
          }
          if (this.bannerCount >= 10) {
              if (this.bannerADObj)
                  this.bannerADObj.destroy();
              this.bannerADObj = null;
              this.bannerCount = 0;
          }
          if (this.bannerADObj == null) {
              this.bannerCallbacak = null;
              this.initBannerAD();
          }
      }
      bannerAD(callback) {
          this.bannerCallbacak = callback;
          this.initBannerAD();
          this.bannerUpdate(false);
          if (this.bannerADObj) {
              callback.run();
          }
          else {
              this.bannerCallbacak = callback;
              this.initBannerAD();
          }
          console.log("bannerAD");
      }
      initInterAD() {
          if (!this.proxy.createInterstitialAd)
              return;
          this.interADObj = this.proxy.createInterstitialAd({ adUnitId: this.iad_id });
      }
      InterAD(callback) {
          if (!this.proxy.createInterstitialAd)
              return;
          if (!this.interADObj)
              return;
          this.interADObj.show().catch((err) => { console.log(err); });
      }
      openApp(appInfo, callback) {
          console.log("openApp", appInfo);
          if (!this.proxy.navigateToMiniProgram)
              return;
          let $this = this;
          this.proxy.navigateToMiniProgram({
              appId: appInfo[0].appId,
              path: appInfo[0].query,
              success(res) {
                  console.log("openApp success", res, res.errMsg);
                  $this.clickList.push(appInfo[0].appId);
                  $this.sendLog(1017, 0, appInfo[0].posid, appInfo[0].appId);
              },
              fail(res) {
                  console.log("openApp fail", res, res.errMsg);
                  if (callback)
                      callback.run();
                  $this.showMessage("未打开应用");
              }
          });
          console.log("openApp");
          $this.sendLog(1007, 0, appInfo[0].posid, appInfo[0].appId);
      }
  }

  class GameData {
      constructor() {
          this.platform = null;
          this.resUrl = [];
          this.gameCentRate = 0;
          this.trySkinID = 0;
          this.gameScene = "view/GameView.scene";
          this.gameID = "photo3d";
          this.isTest = false;
          this.state = 0;
          this.data = {
              sound: true,
              zhengdong: true,
              date: 0,
              offlineTime: 0,
              shareCount: 0,
              qiaoDaoTag: 0,
              qiaoDao: 0,
              skin: [],
              skinVideo: [],
              skinFaxing: 1,
              skinYifu: 1,
              key: 0,
              cent: 100,
              level: 1,
              speed: 1,
              jump: 1,
              offline: 1,
          };
      }
      static get Inst() {
          if (GameData._inst == null) {
              GameData._inst = new GameData();
          }
          return GameData._inst;
      }
      initGame() {
          let pid = BaseConfig.RunPlatformID;
          if (pid == BaseConfig.pid_qq) {
              this.platform = new QQPlatform();
          }
          else if (pid == BaseConfig.pid_vivo) {
              this.platform = new VIVOPlatform();
          }
          else if (pid == BaseConfig.pid_oppo) {
              this.platform = new OPPOPlatform();
          }
          else if (pid == BaseConfig.pid_dy) {
              this.platform = new DYPlatform();
          }
          else if (pid == BaseConfig.pid_wx) {
              this.platform = new WXPlatform();
          }
          else {
              this.platform = new BasePlatform();
          }
          this.platform.id = pid;
          console.log("this.platform.id", pid, Laya.Browser.onPC, Laya.Browser.onQQMiniGame);
          this.resUrl[0] = { urls: [{ url: "res/atlas/box.json", type: Laya.Loader.ATLAS }, { url: "res/atlas/adgame.json", type: Laya.Loader.ATLAS }, { url: "res/atlas/egg.json", type: Laya.Loader.ATLAS }, { url: "res/atlas/task.json", type: Laya.Loader.ATLAS }, { url: "res/atlas/main.json", type: Laya.Loader.ATLAS }, { url: "res/atlas/game.json", type: Laya.Loader.ATLAS }, { url: "res/atlas/shop.json", type: Laya.Loader.ATLAS }, "json/gameinit.json"], type: 0, callback: Laya.Handler.create(this, () => {
                  JSONManager.gameinit = Laya.loader.getRes("json/gameinit.json");
              }) };
          this.resUrl[1] = { urls: ["res3d/LayaScene_Game3D/Conventional/Game3D.ls", "res3d/LayaScene_Photo3D/Conventional/Photo3D.ls"], type: 1, name: "res3d", callback: Laya.Handler.create(this, () => {
                  ResManager.scene3dPhoto = Laya.loader.getRes("res3d/LayaScene_Photo3D/Conventional/Photo3D.ls");
                  ResManager.cameraPhoto = ResManager.scene3dPhoto.getChildByName("Main Camera");
                  ResManager.scene3d = Laya.loader.getRes("res3d/LayaScene_Game3D/Conventional/Game3D.ls");
                  ResManager.camera = ResManager.scene3d.getChildByName("Main Camera");
                  ResManager.light = ResManager.scene3d.getChildByName("Directional Light");
                  ResManager.player = ResManager.scene3d.getChildByName("player");
                  ResManager.scene3d.removeChild(ResManager.player);
              }) };
          this.resUrl[2] = { urls: ["json/update.json", "json/shop.json", "json/task.json", "json/talk.json", "json/box.json", "json/gamelist.json", "json/monster.json", "json/scene.json", "json/stage.json"], type: 0, callback: Laya.Handler.create(this, () => {
                  JSONManager.grade = Laya.loader.getRes("json/update.json");
                  JSONManager.shop = Laya.loader.getRes("json/shop.json");
                  JSONManager.task = Laya.loader.getRes("json/task.json");
                  JSONManager.talk = Laya.loader.getRes("json/talk.json");
                  JSONManager.box = Laya.loader.getRes("json/box.json");
                  JSONManager.gameList = Laya.loader.getRes("json/gamelist.json");
                  GameData.Inst.platform.setGameList(JSONManager.gameList);
                  JSONManager.monster = Laya.loader.getRes("json/monster.json");
                  JSONManager.scene = Laya.loader.getRes("json/scene.json");
                  JSONManager.level = Laya.loader.getRes("json/stage.json");
              }) };
          if (GameData.Inst.platform.id != BaseConfig.pid_vivo) {
              this.resUrl[3] = { urls: [], type: 1, name: "sound", callback: Laya.Handler.create(this, () => {
                  }) };
              this.resUrl[4] = { urls: [], type: 1, name: "shop", callback: Laya.Handler.create(this, () => {
                  }) };
          }
      }
      checkCent(cent, isTips = true) {
          let isMore = this.data.cent >= cent;
          if (isTips && !isMore)
              SystemTips.Inst.showMsg("金币不足");
          return isMore;
      }
      addCent(cent) {
          cent = Math.floor(cent);
          this.data.cent += cent;
          Laya.stage.event(Laya.Event.CHANGE);
          this.getData();
          if (cent > 0) {
              SystemTips.Inst.showMsg("获得金币:" + cent);
              SoundManager.playCoinn();
          }
          return this.data.cent;
      }
      updateLevel() {
          this.data.level++;
          this.data.key++;
          this.getData();
      }
      updateLevelJSON() {
          let id = GameData.Inst.data.level % JSONManager.level.length;
          if (GameData.Inst.data.level >= JSONManager.level.length)
              id += 1;
          this.levelItem = JSONManager.getItemByID(id, JSONManager.level);
          this.sceneItem = JSONManager.getItemByID(GameData.Inst.levelItem.sceneID, JSONManager.scene);
      }
      clearTaskLog(data) {
          data.qiaoDaoTag = 0;
      }
      getDefaultSkin() {
          if (this.data.skin == null || this.data.skin.length <= 0) {
              this.data.skin = [];
              for (let i = 0; i < JSONManager.shop.length; i++) {
                  if (JSONManager.shop[i].unlockType == 1) {
                      this.data.skin.push(JSONManager.shop[i].id);
                      if (JSONManager.shop[i].type == 1) {
                          this.data.skinFaxing = JSONManager.shop[i].id;
                      }
                      else {
                          this.data.skinYifu = JSONManager.shop[i].id;
                      }
                  }
              }
          }
      }
      getSkinData(isRand = false) {
          let skinData = [];
          for (let i = 0; i < JSONManager.shop.length; i++) {
              if (this.data.skin.indexOf(JSONManager.shop[i].id) == -1) {
                  skinData.push(JSONManager.shop[i]);
              }
          }
          if (isRand) {
              let index = Math.floor(skinData.length * Math.random());
              return skinData[index];
          }
          else {
              return skinData[0];
          }
      }
      getPlayerModel(skinID) {
          let id;
          let body = ResManager.scene3d.addChild(ResManager.player.getChildAt(0).getChildAt(0).clone());
          id = JSONManager.getItemByID(skinID, JSONManager.shop).model;
          let head = ResManager.head.getChildByName("" + id).clone();
          head.active = true;
          body.getChildByName("Bip001").getChildByName("Bip001 Pelvis").getChildByName("Bip001 Spine").getChildByName("Bip001 Spine1").getChildByName("Bip001 Spine2").getChildByName("Bip001 Neck").getChildByName("Bip001 Head").removeChildren();
          body.getChildByName("Bip001").getChildByName("Bip001 Pelvis").getChildByName("Bip001 Spine").getChildByName("Bip001 Spine1").getChildByName("Bip001 Spine2").getChildByName("Bip001 Neck").getChildByName("Bip001 Head").addChild(head);
          return body;
      }
      initData(data = null) {
          let date = new Date();
          let datetime = date.getTime();
          if (data == null) {
              let dataStr = Laya.LocalStorage.getItem(this.gameID);
              if (typeof dataStr == "string") {
                  if (dataStr != "") {
                      data = JSON.parse(dataStr);
                  }
              }
              if (data == null || data == "") {
                  data = this.data;
                  datetime = 0;
              }
          }
          if (data.date == 0) {
          }
          else {
              let oldDate = new Date(data.date);
              let oldNum = oldDate.getDate();
              let currNum = date.getDate();
              console.log("date", oldNum, currNum);
              if (oldNum != currNum) {
                  this.clearTaskLog(data);
              }
          }
          let time = Math.floor((datetime - data.date) / 1000);
          if (time < 0)
              time = 0;
          if (time > 300)
              time = 300;
          data.offlineTime += time / 5;
          if (data.offlineTime > 60)
              data.offlineTime = 60;
          if (data.offlineTime < 0)
              data.offlineTime = 0;
          if (data.shareCount == null)
              data.shareCount = 0;
          data.date = date.getTime();
          this.getDefaultSkin();
          this.data = data;
          this.getData();
          this.updateLevelJSON();
      }
      getData() {
          this.data.date = new Date().getTime();
          let dataStr = JSON.stringify(this.data);
          Laya.LocalStorage.setItem(this.gameID, dataStr);
          return this.data;
      }
  }
  GameData._inst = null;

  class SoundManager {
      static zhengDongShort() {
          if (GameData.Inst.data.zhengdong)
              GameData.Inst.platform.zhengDongShort();
      }
      static zhengDongLong() {
          if (GameData.Inst.data.zhengdong)
              GameData.Inst.platform.zhengDongLong();
      }
      static playBg() {
          if (GameData.Inst.data.sound)
              Laya.SoundManager.playMusic("sound/bgm.mp3", 0);
      }
      static stopBg() {
          Laya.SoundManager.stopAll();
      }
      static playButton() {
          if (GameData.Inst.data.sound)
              Laya.SoundManager.playSound("sound/button.mp3");
      }
      static playCoinn() {
          if (GameData.Inst.data.sound)
              Laya.SoundManager.playSound("sound/coin.mp3");
      }
      static playShutter() {
          if (GameData.Inst.data.sound)
              Laya.SoundManager.playSound("sound/shutter.mp3");
      }
      static playWin() {
          if (GameData.Inst.data.sound)
              Laya.SoundManager.playSound("sound/win.mp3");
      }
      static playWin1() {
          if (GameData.Inst.data.sound)
              Laya.SoundManager.playSound("sound/win1.mp3");
      }
      static playLose() {
          if (GameData.Inst.data.sound)
              Laya.SoundManager.playSound("sound/lose.mp3");
      }
      constructor() {
      }
  }

  class BtnScript extends Laya.Script {
      onAwake() {
          this.btn = this.owner;
      }
      onMouseUp() {
          Laya.Tween.to(this.btn, { scaleX: 1, scaleY: 1 }, 150);
      }
      onMouseDown() {
          SoundManager.playButton();
          Laya.Tween.to(this.btn, { scaleX: 0.85, scaleY: 0.85 }, 150);
      }
      onMouseOut() {
          this.onMouseUp();
      }
  }

  class JumpBanner extends ui.ads.JumpBannerUI {
      constructor() {
          super();
      }
      onAwake() {
      }
      onEnable() {
          if (GameData.Inst.platform.id != BaseConfig.pid_wx) {
              this.visible = false;
              return;
          }
          let id = this.name;
          if (GameData.Inst.platform.gameList && GameData.Inst.platform.gameList.length > 0) {
              let list = GameData.Inst.platform.getGameList(id, 2);
              if (list.length > 0) {
                  this.visible = true;
                  this.list_ad.array = list;
              }
              else {
                  this.visible = false;
                  this.list_ad.array = [];
              }
          }
          else {
              this.visible = false;
              this.list_ad.array = [];
          }
      }
      onDisable() {
          this.list_ad.array = [];
          this.visible = false;
          Laya.timer.clearAll(this);
      }
  }

  class GameInfo extends ui.view.GameInfoUI {
      constructor() {
          super();
          this.time = 30;
          GameInfo._inst = this;
      }
      static get Inst() {
          return GameInfo._inst;
      }
      onAwake() {
      }
      onEnable() {
      }
      showTime() {
      }
      timeChange() {
          this.showTime();
          if (this.time <= 0) {
              this.event(Laya.Event.END);
              return;
          }
          this.time--;
          Laya.timer.once(1000, this, this.timeChange);
      }
      clearTime() {
          Laya.timer.clearAll(this);
      }
      onDisable() {
          super.onDisable();
      }
      destroy() {
          super.destroy();
      }
  }

  class BannerScr extends Laya.Script {
      constructor() {
          super();
          this.showType = 0;
          this.adType = 0;
          this.btnName = "";
          this.yTag = 0;
          this.isInit = false;
      }
      onAwake() {
          if (this.btnName != "") {
              this.btn = this.owner.getChildByName(this.btnName);
          }
      }
      onEnable() {
          if (GameData.Inst.platform.id == BaseConfig.pid_wx && GameData.Inst.platform.bannerADObj) {
              GameData.Inst.platform.bannerADObj.hide();
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_qq && this.adType != 3) {
              this.showBanner();
              this.isInit = false;
              return;
          }
          this.isInit = false;
          if (this.showType > 0) {
              if (this.showType == 2) {
                  if (GameData.Inst.platform.id == BaseConfig.pid_oppo || GameData.Inst.platform.id == BaseConfig.pid_vivo || GameData.Inst.platform.id == BaseConfig.pid_dy) {
                      return;
                  }
              }
          }
          if (this.adType <= 0) {
              if (GameData.Inst.platform.id == BaseConfig.pid_vivo)
                  this.showOldBanner();
              else
                  this.showBanner();
          }
          else {
              if (GameData.Inst.platform.id == BaseConfig.pid_wx) {
                  GameData.Inst.platform['bannerUpdate']();
              }
              if (this.adType == 1) {
                  if (GameData.Inst.platform.id == BaseConfig.pid_wx && this.btn != null && GameData.Inst.platform.getSwitch(17)) {
                      this.btn.visible = true;
                      this.btn.y = Laya.stage.height - 30;
                      this.btn.mouseEnabled = false;
                      Laya.timer.once(1500, this, this.showBanner);
                  }
                  else {
                      this.btn.y = Laya.stage.height - 30;
                  }
              }
          }
      }
      showOldBanner() {
          if (GameData.Inst.platform.bannerADObj != null) {
              GameData.Inst.platform.bannerADObj.hide();
              Laya.timer.once(3000, this, () => {
                  console.log("显示原来的", this.owner.name);
                  console.log(this.owner.name);
                  console.log(this.owner);
                  this.isInit = true;
                  GameData.Inst.platform.bannerADObj.show();
              });
          }
          else
              this.showBanner();
      }
      showBanner() {
          console.log("新建一个", this.owner.name);
          console.log(this.owner.name);
          if (this.showType > 0) {
              if (this.showType == 2) {
              }
          }
          GameData.Inst.platform.bannerAD(Laya.Handler.create(this, () => {
              this.isInit = true;
              if (GameData.Inst.platform.id != BaseConfig.pid_vivo) {
              }
              GameData.Inst.platform.bannerADObj.show();
              if (this.adType == 1) {
                  if (GameData.Inst.platform.id == BaseConfig.pid_wx && this.btn != null && GameData.Inst.platform.getSwitch(17)) {
                      Laya.timer.once(1000, this, () => {
                          this.btn.mouseEnabled = true;
                      });
                      Laya.Tween.to(this.btn, { y: this.yTag + (Laya.stage.height - 1334) / 2 }, 200);
                  }
              }
          }));
      }
      refreshBanner() {
          if (this.isInit) {
              if (GameData.Inst.platform.bannerADObj) {
                  GameData.Inst.platform.bannerADObj.destroy();
                  GameData.Inst.platform.bannerADObj.offLoad();
                  GameData.Inst.platform.bannerADObj = null;
              }
              this.showBanner();
          }
      }
      onDisable() {
          if (this.isInit && GameData.Inst.platform.bannerADObj) {
              GameData.Inst.platform.bannerADObj.hide();
              console.log("隐藏老banner");
          }
          this.isInit = false;
          Laya.timer.clearAll(this);
      }
      onDestroy() {
          if (this.isInit && GameData.Inst.platform.bannerADObj) {
              if (GameData.Inst.platform.id != BaseConfig.pid_vivo)
                  GameData.Inst.platform.bannerADObj.hide();
          }
          this.isInit = false;
          Laya.timer.clearAll(this);
      }
  }

  class JumpPage1 extends ui.ads.JumpPage1UI {
      constructor() {
          super();
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
      }
      static get Inst() {
          if (JumpPage1._inst == null)
              JumpPage1._inst = new JumpPage1();
          return JumpPage1._inst;
      }
      onAwake() {
          this.btn_close.on(Laya.Event.CLICK, this, () => {
              if (!GameData.Inst.platform.getSwitch(17)) {
                  this.close();
                  return;
              }
              if (this.bannerState == 2) {
                  this.close();
              }
              else {
                  if (this.bannerState == 1)
                      return;
                  this.bannerState = 1;
                  Laya.timer.once(1500, this, () => {
                      this.getComponent(BannerScr).showOldBanner();
                  });
                  Laya.timer.once(2500, this, () => {
                      this.bannerState = 2;
                      this.getComponent(BannerScr).onDisable();
                  });
              }
          });
      }
      onEnable() {
          this.bannerState = 0;
          this.btn_close.y = Laya.stage.height - 100 / 2 - 80;
          this.list_ad.height = Laya.stage.height - this.list_ad.x - 80;
      }
      onDisable() {
      }
      popup() {
          if (GameData.Inst.platform.id != BaseConfig.pid_wx) {
              this.visible = false;
              return;
          }
          let id = "1004";
          if (GameData.Inst.platform.gameList && GameData.Inst.platform.gameList.length > 0) {
              let list = GameData.Inst.platform.getGameList(id);
              if (list.length > 0) {
                  this.list_ad.array = list;
              }
              else {
                  this.list_ad.array = [];
              }
          }
          else {
              this.list_ad.array = [];
          }
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
          this.callback = null;
          Laya.timer.once(500, this, () => {
              this.width = Laya.stage.width;
              this.height = Laya.stage.height;
              this.img_bg.width = Laya.stage.width;
              this.img_bg.height = Laya.stage.height;
              this.list_ad.refresh();
              super.popup();
          });
      }
      close() {
          super.close();
          Laya.timer.clearAll(this);
          if (this.callback) {
              this.callback.run();
          }
          this.callback = null;
      }
  }

  class EggEndQQPanel extends ui.panels.EggEndQQUI {
      constructor() {
          super();
          this.clickTime = 0;
          this.isShowVAD = false;
          this.zhuantai = 0;
          this.isShowBanner = false;
          this.isShowIndex = 5;
          this.cent = 100;
          this.widthLen = 421;
          this.currPoint = 0;
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
      }
      static get Inst() {
          if (EggEndQQPanel._inst == null)
              EggEndQQPanel._inst = new EggEndQQPanel();
          return EggEndQQPanel._inst;
      }
      judgeswitch(zhuantai) {
          switch (zhuantai) {
              case 1:
                  if (GameData.Inst.platform.gameSwitch.video_display1 == 3 || (GameData.Inst.platform.gameSwitch.video_display1 == 2))
                      return true;
                  else
                      return false;
              case 2:
                  if (GameData.Inst.platform.gameSwitch.video_display2 == 3 || (GameData.Inst.platform.gameSwitch.video_display2 == 2))
                      return true;
                  else
                      return false;
              case 3:
                  if (GameData.Inst.platform.gameSwitch.video_display3 == 3 || (GameData.Inst.platform.gameSwitch.video_display3 == 2))
                      return true;
                  else
                      return false;
              case 4:
                  if (GameData.Inst.platform.gameSwitch.video_display4 == 3 || (GameData.Inst.platform.gameSwitch.video_display4 == 2))
                      return true;
                  else
                      return false;
          }
          return false;
      }
      onAwake() {
          this.btn_get.on(Laya.Event.CLICK, this, () => {
              if (this.currPoint >= 5)
                  return;
              if (!this.isShowVAD && Laya.Browser.now() - this.clickTime <= 1500) {
                  this.isShowVAD = true;
                  if (this.judgeswitch(this.zhuantai)) {
                      GameData.Inst.platform.videoAD(Laya.Handler.create(this, () => {
                      }), Laya.Handler.create(this, () => {
                      }), 8);
                  }
              }
              this.clickTime = Laya.Browser.now();
              this.egg.scale(0.8, 0.8);
              Laya.timer.once(100, this, () => {
                  this.egg.scale(1.0, 1.0);
              });
              Laya.Tween.clearAll(this.img_jindu);
              this.currPoint++;
              if (this.isShowBanner && this.currPoint >= 5 && Math.random() > 0.95) {
                  this.currPoint = 5;
              }
              if (this.currPoint > 5)
                  this.currPoint = 5;
              this.updateJindu();
              Laya.timer.clear(this, this.updateZore);
              if (this.currPoint > 0 && this.currPoint < 5) {
                  Laya.timer.loop(500, this, this.updateZore);
              }
              if (this.currPoint >= 5) {
              }
          });
      }
      updateZore() {
          this.currPoint--;
          if (this.currPoint < 0) {
              this.currPoint = 0;
          }
          this.updateJindu();
      }
      updateJindu() {
          if (!this.isShowBanner && this.currPoint == this.isShowIndex && this.isShowVAD) {
              this.isShowBanner = true;
              if (GameData.Inst.platform.id == BaseConfig.pid_qq) {
                  console.log(this.getComponent(BannerScr));
                  this.getComponent(BannerScr).showOldBanner();
              }
              else {
                  this.getComponent(BannerScr).showBanner();
              }
              Laya.timer.once(100, this, () => {
                  Laya.timer.once(1000, this, () => {
                      this.close();
                  });
              });
          }
          Laya.Tween.to(this.img_jindu, { width: this.currPoint * this.widthLen / 10 }, 200);
      }
      onEnable() {
          this.currPoint = 0;
          this.img_jindu.width = 0;
          this.txt_msg.text = `砸开金蛋获得${this.cent}金币`;
      }
      popup() {
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
          this.isShowVAD = false;
          this.clickTime = 0;
          Laya.timer.once(300, this, () => {
              super.popup();
              this.isShowBanner = false;
              this.isShowIndex = 5;
              this.btn_get.y = Laya.stage.height - 90;
          });
      }
      close() {
          Laya.timer.clearAll(this);
          if (this.jumpHandler)
              this.jumpHandler.run();
          Laya.Tween.clearAll(this.img_jindu);
          super.close();
          GameData.Inst.addCent(this.cent);
      }
  }

  class GetCentPanel extends ui.panels.GetCentUI {
      constructor() {
          super();
          this.getCent = 0;
          this.rate = 0;
          this.isdouble = 0;
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
      }
      static get Inst() {
          if (GetCentPanel._inst == null)
              GetCentPanel._inst = new GetCentPanel();
          return GetCentPanel._inst;
      }
      onAwake() {
          this.btn_get.on(Laya.Event.CLICK, this, () => {
              GameData.Inst.platform.videoAD(Laya.Handler.create(this, () => {
                  if (GameData.Inst.platform.id == BaseConfig.pid_dy) {
                      this.addCent(3);
                      this.close();
                  }
                  else {
                      this.addCent(3);
                      this.close();
                  }
              }), Laya.Handler.create(this, () => {
              }), 6);
          });
          this.btn_close.on(Laya.Event.CLICK, this, () => {
              this.addCent(1);
              this.close();
          });
      }
      setCent(cent, rate = 3, callback = null) {
          this.getCent = cent;
          this.callback = callback;
          this.rate = rate;
      }
      addCent(rate = 1) {
          if (this.callback)
              this.callback.run();
          GameData.Inst.addCent(this.getCent * rate);
      }
      onEnable() {
          this.txt_get_cent.text = "" + this.getCent;
      }
      popup() {
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
          Laya.timer.once(300, this, () => {
              super.popup();
          });
          if (GameData.Inst.platform.id == BaseConfig.pid_vivo) {
              if (GameData.Inst.platform.bannerADObj && GameData.Inst.platform.getSwitch(1) && GameData.Inst.platform.getSwitch(4)) {
                  if (GameData.Inst.platform.bannerADObj)
                      GameData.Inst.platform.bannerADObj.hide();
                  this.getComponent(BannerScr).showOldBanner();
                  this.btn_close.y = Laya.stage.height - 30;
                  this.bannerState = 1;
                  Laya.timer.once(3000, this, () => {
                      this.bannerState = 2;
                      Laya.Tween.to(this.btn_close, { y: 1014 + (Laya.stage.height - 1334) / 2 }, 200);
                  });
              }
              else {
                  this.btn_close.y = 1014 + (Laya.stage.height - 1334) / 2;
                  this.bannerState = 2;
              }
              return;
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_oppo) {
              if (GameData.Inst.platform.bannerADObj && GameData.Inst.platform.getSwitch(9) && GameData.Inst.platform.getSwitch(1)) {
                  GameData.Inst.platform.bannerADObj.hide();
                  this.getComponent(BannerScr).showOldBanner();
                  this.btn_close.y = Laya.stage.height - 30;
                  this.bannerState = 1;
                  Laya.timer.once(3000, this, () => {
                      this.bannerState = 2;
                      Laya.Tween.to(this.btn_close, { y: 1014 + (Laya.stage.height - 1334) / 2 }, 200);
                  });
              }
              else {
                  this.getComponent(BannerScr).showOldBanner();
                  this.btn_close.y = 1014 + (Laya.stage.height - 1334) / 2;
                  this.bannerState = 2;
              }
              return;
          }
          if (GameView.Inst.box_bottom.visible && GameData.Inst.platform.id == BaseConfig.pid_qq) {
              GameView.Inst.event(Laya.Event.START);
              this.btn_close.y = 1310 + (Laya.stage.height - 1334) / 2;
              if (GameData.Inst.platform.getSwitch(1)) {
                  this.btn_close.visible = false;
                  Laya.timer.once(2000, this, () => {
                      this.btn_close.y = 1049 + (Laya.stage.height - 1334) / 2;
                      this.btn_close.visible = true;
                  });
              }
              return;
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_wx) {
              if (GameData.Inst.platform.getSwitch(17)) {
                  if (GameData.Inst.platform.id == BaseConfig.pid_wx)
                      this.btn_close.y = Laya.stage.height - 30;
                  Laya.timer.once(2000, this, () => {
                      this.getComponent(BannerScr).showOldBanner();
                      Laya.Tween.to(this.btn_close, { y: 1014 + (Laya.stage.height - 1334) / 2 }, 200);
                      this.bannerState = 2;
                  });
              }
              else {
                  this.bannerState = 2;
                  this.btn_close.y = 1014 + (Laya.stage.height - 1334) / 2;
                  this.getComponent(BannerScr).showOldBanner();
              }
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_dy) {
              console.log("调出获得金币", this.isdouble);
              this.btn_close.visible = false;
              if (GameData.Inst.platform.getSwitch(1)) {
                  this.btn_close.visible = false;
                  Laya.timer.once(3000, this, () => {
                      this.btn_close.visible = true;
                  });
              }
              else
                  this.btn_close.visible = true;
              this.btn_close.y = 1014 + (Laya.stage.height - 1334) / 2;
              this.bannerState = 2;
          }
      }
      close() {
          this.isdouble = 0;
          this.bannerState = 0;
          Laya.timer.clearAll(this);
          super.close();
          if (GameView.Inst.box_bottom.visible && GameData.Inst.platform.getSwitch(1)) {
              GameView.Inst.event(Laya.Event.CHANGE);
              TaskPanel.Inst.event(Laya.Event.CHANGE);
          }
      }
  }

  class ShopTips extends ui.panels.ShopTipsUI {
      constructor() {
          super();
          this.bannerState = 0;
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
      }
      static get Inst() {
          if (ShopTips._inst == null)
              ShopTips._inst = new ShopTips();
          return ShopTips._inst;
      }
      onEnable() {
          this.bannerState = 0;
          if (GameData.Inst.platform.id == BaseConfig.pid_oppo) {
              this.btn_close.visible = true;
              if (GameData.Inst.platform.bannerADObj && GameData.Inst.platform.getSwitch(1)) {
                  console.log("到这里");
                  GameData.Inst.platform.bannerADObj.hide();
                  this.getComponent(BannerScr).showOldBanner();
                  this.btn_close.y = Laya.stage.height - 50;
                  this.btn_close.visible = true;
                  this.bannerState = 1;
                  Laya.timer.once(3000, this, () => {
                      this.bannerState = 2;
                      Laya.Tween.to(this.btn_close, { y: 1000 + (Laya.stage.height - 1334) / 2 }, 200);
                  });
              }
              else {
                  console.log("到这里1");
                  this.btn_close.y = 1000 + (Laya.stage.height - 1334) / 2;
                  this.bannerState = 2;
              }
          }
          this.btn_close.on(Laya.Event.CLICK, this, () => {
              if (GameData.Inst.platform.id != BaseConfig.pid_oppo)
                  this.bannerState = 2;
              if (this.bannerState == 2) {
                  this.close();
                  return;
              }
              if (this.bannerState == 1)
                  return;
              this.bannerState = 1;
          });
          this.btn_video.on(Laya.Event.CLICK, this, () => {
              GameData.Inst.platform.videoAD(Laya.Handler.create(this, () => {
                  if (this.btn_video.visible) {
                      if (GameData.Inst.data.skinVideo[ShopPanel.Inst.list_item.selectedItem.id] == null)
                          GameData.Inst.data.skinVideo[ShopPanel.Inst.list_item.selectedItem.id] = 0;
                      GameData.Inst.data.skinVideo[ShopPanel.Inst.list_item.selectedItem.id] += 1;
                      if (ShopPanel.Inst.list_item.selectedItem.video <= GameData.Inst.data.skinVideo[ShopPanel.Inst.list_item.selectedItem.id]) {
                          GameData.Inst.data.skin.push(ShopPanel.Inst.list_item.selectedItem.id);
                          ShopPanel.Inst.useSkin();
                      }
                  }
                  else {
                      GameData.Inst.data.skin.push(ShopPanel.Inst.list_item.selectedItem.id);
                      ShopPanel.Inst.useSkin();
                  }
                  GameData.Inst.addCent(0);
                  ShopPanel.Inst.list_item.refresh();
                  this.close();
              }), Laya.Handler.create(this, () => {
              }), 2);
          });
      }
      onAwake() {
      }
      popup() {
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
          console.log("到这里2");
          if (GameData.Inst.platform.id == BaseConfig.pid_dy)
              this.btn_close.y = 1016 + (Laya.stage.height - 1334) / 2;
          Laya.timer.once(300, this, () => {
              super.popup();
          });
          this.btn_close.visible = false;
          if (GameData.Inst.platform.getSwitch(1)) {
              this.btn_close.visible = false;
              Laya.timer.once(3000, this, () => {
                  this.btn_close.visible = true;
              });
          }
          else
              this.btn_close.visible = true;
      }
      close() {
          this.bannerState = 0;
          this.btn_close.y = Laya.stage.height - 200;
          super.close();
      }
  }

  class ShopPanel extends ui.panels.ShopUI {
      constructor() {
          super();
          this.selectID = -1;
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
      }
      static get Inst() {
          if (ShopPanel._inst == null)
              ShopPanel._inst = new ShopPanel();
          return ShopPanel._inst;
      }
      onAwake() {
          this.btn_close.on(Laya.Event.CLICK, this, () => {
              this.close();
          });
          this.btn_use.on(Laya.Event.CLICK, this, () => {
              console.log("btn_use index : ", this.list_item.selectedItem);
              this.useSkin();
              this.showModel();
              this.list_item.refresh();
          });
          this.btn_buy.on(Laya.Event.CLICK, this, () => {
              console.log("btn_buy index : ", this.list_item.selectedItem);
              if (GameData.Inst.checkCent(this.list_item.selectedItem.coin)) {
                  GameData.Inst.data.skin.push(this.list_item.selectedItem.id);
                  this.useSkin();
                  this.list_item.refresh();
                  GameData.Inst.addCent(-this.list_item.selectedItem.coin);
              }
              else {
                  ShopTips.Inst.popup();
              }
          });
          this.btn_video.on(Laya.Event.CLICK, this, () => {
              console.log("btn_video index : ", this.list_item.selectedItem);
              GameData.Inst.platform.videoAD(Laya.Handler.create(this, () => {
                  if (GameData.Inst.data.skinVideo[this.list_item.selectedItem.id] == null)
                      GameData.Inst.data.skinVideo[this.list_item.selectedItem.id] = 0;
                  GameData.Inst.data.skinVideo[this.list_item.selectedItem.id] += 1;
                  if (this.list_item.selectedItem.video <= GameData.Inst.data.skinVideo[this.list_item.selectedItem.id]) {
                      GameData.Inst.data.skin.push(this.list_item.selectedItem.id);
                      this.useSkin();
                  }
                  this.list_item.refresh();
              }), Laya.Handler.create(this, () => {
              }), 2);
          });
          this.list_item.selectEnable = true;
          this.list_item.on(Laya.Event.CLICK, this, (event) => {
              if (event.target instanceof Laya.Button) {
                  this.selectID = this.list_item.selectedIndex;
                  this.list_item.refresh();
              }
          });
          this.list_item.renderHandler = Laya.Handler.create(this, (cell, index) => {
              let data = cell.dataSource;
              if (GameData.Inst.data.skin.indexOf(data.id) != -1) {
                  cell.img_show.visible = true;
                  cell.img_lock.visible = false;
                  cell.img_use.visible = false;
                  if (this.list_item.selectedIndex == index) {
                      this.btn_use.visible = true;
                      this.btn_used.visible = false;
                      this.btn_buy.visible = false;
                      this.btn_video.visible = false;
                  }
              }
              else {
                  cell.img_show.visible = true;
                  cell.img_lock.visible = true;
                  cell.img_use.visible = false;
                  cell.img_select.visible = false;
                  if (this.list_item.selectedIndex == index) {
                      this.btn_use.visible = false;
                      this.btn_used.visible = false;
                      this.btn_buy.visible = data.coin > 0;
                      this.txt_buy_cent.value = data.coin;
                      this.btn_video.visible = data.video > 0;
                      if (GameData.Inst.data.skinVideo[data.id] == null)
                          GameData.Inst.data.skinVideo[data.id] = 0;
                      this.txt_video_num.value = GameData.Inst.data.skinVideo[data.id] + "/" + data.video;
                      if (this.btn_buy.visible && this.btn_video.visible) {
                          this.btn_buy.x = 198;
                          this.btn_video.x = 552;
                      }
                      else {
                          if (this.btn_buy.visible)
                              this.btn_buy.x = this.btn_use.x;
                          if (this.btn_video.visible)
                              this.btn_video.x = this.btn_use.x;
                      }
                  }
              }
              cell.img_icon.skin = "shop/" + data.icon;
              cell.img_use.visible = false;
              this.btn_use.visible = false;
              cell.img_select.visible = index == this.selectID;
              if (cell.img_select.visible) {
                  this.img_show.skin = "shop/" + data.model;
              }
              if (cell.img_select.visible) {
                  this.showSelectModel(data);
              }
          }, [], false);
          Laya.stage.on(Laya.Event.CHANGE, this, () => {
              this.txt_cent.text = "" + GameData.Inst.data.cent;
          });
      }
      useSkin() {
          GameData.Inst.data.skinYifu = this.list_item.selectedItem.id;
          GameData.Inst.getData();
      }
      onEnable() {
          this.selectID = -1;
          this.skinData = [];
          for (let i = 0; i < JSONManager.shop.length; i++) {
              {
                  if (GameData.Inst.data.skinYifu == JSONManager.shop[i].id)
                      this.selectID = this.skinData.length;
                  this.skinData.push(JSONManager.shop[i]);
              }
          }
          this.txt_cent.text = "" + GameData.Inst.data.cent;
          this.btn_use.visible = false;
          this.btn_used.visible = false;
          this.btn_buy.visible = false;
          this.btn_video.visible = false;
          this.list_item.array = this.skinData;
          this.list_item.selectedIndex = this.selectID;
      }
      popup() {
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
          if (GameData.Inst.platform.id != BaseConfig.pid_vivo)
              GameView.Inst.event(Laya.Event.START);
          Laya.timer.once(300, this, () => {
              super.popup();
          });
          if (GameData.Inst.platform.id == BaseConfig.pid_oppo) {
              GameData.Inst.platform.bannerADObj.hide();
              GameData.Inst.platform.InterAD(null);
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_dy) {
          }
      }
      showSelectModel(data) {
          this.useSkinID = data.id;
          this.showModel();
      }
      showModel() {
          this.useSkinID;
      }
      close() {
          super.close();
          if (GameData.Inst.platform.id == BaseConfig.pid_oppo)
              GameData.Inst.platform.interADPanel.close();
          this.event(Laya.Event.CHANGE);
          GameView.Inst.showInterAD();
          if (GameData.Inst.platform.id != BaseConfig.pid_vivo)
              GameView.Inst.event(Laya.Event.CHANGE);
          TaskPanel.Inst.event(Laya.Event.CHANGE);
      }
  }

  class GameView extends ui.view.GameViewUI {
      constructor() {
          super();
          this.Checkornot = false;
          GameView._inst = this;
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
          this.box_setting.visible = false;
          this.btn_setting.on(Laya.Event.CLICK, this, () => {
              this.box_setting.visible = !this.box_setting.visible;
          });
          this.btn_sound.on(Laya.Event.CLICK, this, () => {
              GameData.Inst.data.sound = !GameData.Inst.data.sound;
              this.btn_sound.skin = GameData.Inst.data.sound ? "main/p_i_music.png" : "main/p_i_music_off.png";
              if (GameData.Inst.data.sound) {
                  SoundManager.playBg();
              }
              else {
                  SoundManager.stopBg();
              }
              GameData.Inst.getData();
          });
          this.btn_zhangdong.on(Laya.Event.CLICK, this, () => {
              GameData.Inst.data.zhengdong = !GameData.Inst.data.zhengdong;
              this.btn_zhangdong.skin = GameData.Inst.data.zhengdong ? "main/p_i_zd.png" : "main/p_i_zd_off.png";
              GameData.Inst.getData();
          });
          this.btn_qiandao.on(Laya.Event.CLICK, this, () => {
              if (Laya.Browser.now() - GameView.Inst.timelLimit <= 2000)
                  return;
              GameView.Inst.timelLimit = Laya.Browser.now();
              TaskPanel.Inst.popup();
          });
          if (GameData.Inst.platform.id != BaseConfig.pid_vivo)
              this.AddDesktop.visible = false;
          this.AddDesktop.on(Laya.Event.CLICK, this, () => {
              this.createdesktop();
          });
          this.btn_time.clickHandler = Laya.Handler.create(this, () => {
              if (Laya.Browser.now() - GameView.Inst.timelLimit <= 2000)
                  return;
              GameView.Inst.timelLimit = Laya.Browser.now();
              if (GameData.Inst.data.offlineTime <= 0) {
                  return;
              }
              if (GameData.Inst.isTest) {
                  GameData.Inst.addCent(this.getTimeReward(GameData.Inst.data.offlineTime));
                  GameData.Inst.data.offlineTime = 0;
                  this.playTime();
              }
              else {
                  GetCentPanel.Inst.setCent(this.getTimeReward(GameData.Inst.data.offlineTime), 5, Laya.Handler.create(this, () => {
                      GameData.Inst.data.offlineTime = 0;
                      this.playTime();
                  }));
                  GetCentPanel.Inst.popup();
              }
          }, [], false);
          this.btn_skin.on(Laya.Event.CLICK, this, () => {
              if (Laya.Browser.now() - GameView.Inst.timelLimit <= 2000)
                  return;
              GameView.Inst.timelLimit = Laya.Browser.now();
              GameView.Inst.event(Laya.Event.TRAIL_FILTER_CHANGE);
              ShopPanel.Inst.popup();
          });
          this.btn_select.on(Laya.Event.CLICK, this, () => {
              console.log("点击事件");
              if (this.Checkornot) {
                  this.Checkornot = false;
                  this.img_selected.visible = false;
              }
              else {
                  this.Checkornot = true;
                  this.img_selected.visible = true;
              }
          });
          Laya.Browser.window.test = (msg) => {
              console.log("test :", msg);
          };
          this.btn_start.on(Laya.Event.MOUSE_UP, this, () => {
              console.log("开始登录~~~~~~~~~~~~~~");
              GameData.Inst.platform.login(Laya.Handler.create(this, () => {
                  this.loginstartgame();
              }), Laya.Handler.create(this, () => {
                  console.log("失败~~~~~~~~~~~~~~");
                  this.loginstartgame();
              }));
              console.log("登录完了");
          });
          Laya.stage.on(Laya.Event.CHANGE, this, () => {
              this.txt_cent.text = "" + GameData.Inst.data.cent;
          });
      }
      static get Inst() {
          return GameView._inst;
      }
      loginstartgame() {
          GameData.Inst.gameCentRate = 1;
          GameView.Inst.isvodio = false;
          if (this.img_selected.visible && [BaseConfig.pid_qq, BaseConfig.pid_oppo, BaseConfig.pid_vivo, BaseConfig.pid_dy].indexOf(GameData.Inst.platform.id) == -1) {
              console.log("看电影准备开始");
              GameData.Inst.platform.videoAD(Laya.Handler.create(this, () => {
                  GameData.Inst.gameCentRate = 2;
                  GameView.Inst.isvodio = true;
                  this.playGame();
              }), Laya.Handler.create(this, () => {
                  this.playGame();
              }));
          }
          else {
              GameData.Inst.gameCentRate = 1;
              GameView.Inst.isvodio = false;
              if (this.img_selected.visible && [BaseConfig.pid_qq, BaseConfig.pid_oppo, BaseConfig.pid_vivo, BaseConfig.pid_dy].indexOf(GameData.Inst.platform.id) == -1) {
                  console.log("看电影准备开始");
                  GameData.Inst.platform.videoAD(Laya.Handler.create(this, () => {
                      GameData.Inst.gameCentRate = 2;
                      GameView.Inst.isvodio = true;
                      this.playGame();
                  }), Laya.Handler.create(this, () => {
                      this.playGame();
                  }));
              }
              else {
                  console.log("不等于不看电影准备开始");
                  this.playGame();
              }
              this.playGame();
          }
      }
      createdesktop() {
          Laya.Browser.window.qg.hasShortcutInstalled({
              success: function (res) {
                  if (res == false) {
                      Laya.Browser.window.qg.installShortcut({
                          success: function () {
                              GameData.Inst.platform.showMessage("没有桌面图标");
                          },
                          fail: function (err) {
                              GameData.Inst.platform.showMessage("创建频繁2分钟后恢复");
                          },
                          complete: function () {
                              GameData.Inst.platform.showMessage("取消创建");
                          }
                      });
                  }
                  else {
                      GameData.Inst.platform.showMessage("已有桌面图标");
                  }
              },
              fail: function (err) { },
              complete: function () { }
          });
      }
      playGame() {
          if (!GameStage.Inst.isStart) {
              this.event(Laya.Event.START);
              this.box_bottom.visible = false;
              this.btn_qiandao.visible = false;
              this.box_right.visible = false;
              this.ui_adbanner.visible = false;
              GameInfo.Inst.visible = true;
              Laya.timer.once(500, this, () => {
                  if (GameData.Inst.platform.getSwitch(2) && !GameView.Inst.isvodio && GameData.Inst.platform.id != BaseConfig.pid_wx && GameData.Inst.platform.videointerval == 0) {
                      GameData.Inst.platform.videoAD(Laya.Handler.create(this, () => {
                          GameStage.Inst.startGame();
                      }), Laya.Handler.create(this, () => {
                          GameStage.Inst.startGame();
                      }));
                  }
                  else {
                      GameStage.Inst.startGame();
                  }
              });
          }
      }
      playTime(isAdd = false, time = 1) {
          if (isAdd) {
              GameData.Inst.data.offlineTime += time;
          }
          this.txt_time_cent.text = "" + this.getTimeReward(GameData.Inst.data.offlineTime);
          Laya.Tween.clearAll(this.img_time_jindu);
          if (GameData.Inst.data.offlineTime >= 60) {
              this.img_time_jindu.width = 93;
              return;
          }
          this.img_time_jindu.width = 0;
          Laya.Tween.to(this.img_time_jindu, { width: 93 }, 5000, null, Laya.Handler.create(this, this.playTime, [true]));
      }
      getTimeReward(count) {
          return Math.floor(count * 5);
      }
      onOpened(isFrist = false) {
          if (GameData.Inst.isTest)
              return;
          if (isFrist) {
              console.log("Laya.Stat.FPS", Laya.Stat.FPS);
              if (Laya.Stat.FPS > 70) {
                  Laya.stage.frameRate = Laya.Stage.FRAME_SLOW;
              }
              if (GameData.Inst.platform.id != BaseConfig.pid_oppo && GameData.Inst.platform.id != BaseConfig.pid_vivo) {
                  Laya.timer.once(500, this.btn_time.clickHandler, this.btn_time.clickHandler.run);
              }
          }
          else {
              SoundManager.playBg();
              if (GameData.Inst.platform.id == BaseConfig.pid_oppo || GameData.Inst.platform.id == BaseConfig.pid_vivo) {
              }
              else {
                  this.showInterAD();
              }
          }
      }
      showInterAD() {
          if (GameData.Inst.platform.id == BaseConfig.pid_oppo || GameData.Inst.platform.id == BaseConfig.pid_vivo) {
          }
          else {
              if (Math.random() > 0.5)
                  GameData.Inst.platform.InterAD(null);
          }
      }
      onDisable() {
          this.removeChildren();
          Laya.stage.offAllCaller(this);
          Laya.timer.clearAll(this);
          this.btn_select.offAll();
      }
      onDestroy() {
          Laya.stage.offAllCaller(this);
          Laya.timer.clearAll(this);
          this.btn_select.offAll();
      }
      onAwake() {
          Laya.stage.on(Laya.Event.FOCUS, this, () => {
              if (!this.visible)
                  return;
              let timeCha = Laya.Browser.now() - this.hideTime;
              let time = Math.floor(timeCha / 5000);
              if (time > 0)
                  this.playTime(true, time);
          });
          Laya.stage.on(Laya.Event.BLUR, this, () => {
              this.hideTime = Laya.Browser.now();
          });
          this.btn_sound.skin = GameData.Inst.data.sound ? "main/p_i_music.png" : "main/p_i_music_off.png";
          this.btn_zhangdong.skin = GameData.Inst.data.zhengdong ? "main/p_i_zd.png" : "main/p_i_zd_off.png";
          this.txt_cent.text = "" + GameData.Inst.data.cent;
          this.txt_level.value = "" + GameData.Inst.data.level;
          GameStage.Inst.init();
          this.ui.visible = true;
          this.box_setting.visible = false;
          GameInfo.Inst.visible = false;
          this.Checkornot = this.img_selected.visible = GameData.Inst.platform.getSwitch(0);
          this.playTime();
      }
  }

  class TaskPanel extends ui.panels.TaskUI {
      constructor() {
          super();
          this.skinID = -1;
          this.Checkornot = true;
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
      }
      static get Inst() {
          if (TaskPanel._inst == null)
              TaskPanel._inst = new TaskPanel();
          return TaskPanel._inst;
      }
      onAwake() {
          this.btn_close.on(Laya.Event.CLICK, this, () => {
              this.close();
          });
          this.btn_get.on(Laya.Event.CLICK, this, () => {
              if (this.taskList[this.index].rewardType == 2) {
                  GameData.Inst.data.skin.push(this.skinID);
                  SystemTips.Inst.showMsg("获得一个皮肤");
                  this.getCent(0);
                  return;
              }
              if (this.img_selected.visible) {
                  GameData.Inst.platform.videoAD(Laya.Handler.create(this, () => {
                      if (GameData.Inst.platform.id == BaseConfig.pid_dy) {
                          GetCentPanel.Inst.isdouble = 1;
                          GetCentPanel.Inst.getCent = this.taskList[this.index].rewardNum * 2;
                          GetCentPanel.Inst.popup();
                          let itemUI = this['ui_task_' + this.index];
                          itemUI.spr_item.alpha = 0.5;
                          itemUI.spr_geted.visible = true;
                          GameData.Inst.data.qiaoDao += 1;
                          GameData.Inst.data.qiaoDaoTag = 1;
                          this.btn_geted.visible = GameData.Inst.data.qiaoDaoTag == 1;
                          this.btn_get.visible = !this.btn_geted.visible;
                          this.box_select.visible = this.btn_get.visible;
                      }
                      else
                          this.getCent(2);
                  }), Laya.Handler.create(this, () => {
                  }));
              }
              else {
                  if (GameData.Inst.platform.id == BaseConfig.pid_dy) {
                      GetCentPanel.Inst.getCent = this.taskList[this.index].rewardNum;
                      GetCentPanel.Inst.isdouble = 1;
                      GetCentPanel.Inst.popup();
                      let itemUI = this['ui_task_' + this.index];
                      itemUI.spr_item.alpha = 0.5;
                      itemUI.spr_geted.visible = true;
                      GameData.Inst.data.qiaoDao += 1;
                      GameData.Inst.data.qiaoDaoTag = 1;
                      this.btn_geted.visible = GameData.Inst.data.qiaoDaoTag == 1;
                      this.btn_get.visible = !this.btn_geted.visible;
                      this.box_select.visible = this.btn_get.visible;
                  }
                  else
                      this.getCent(1);
              }
          });
      }
      getCent(rate = 1) {
          let itemUI = this['ui_task_' + this.index];
          itemUI.spr_item.alpha = 0.5;
          itemUI.spr_geted.visible = true;
          GameData.Inst.data.qiaoDao += 1;
          GameData.Inst.data.qiaoDaoTag = 1;
          if (this.taskList[this.index].rewardType == 2) {
          }
          else {
              GameData.Inst.addCent(this.taskList[this.index].rewardNum * rate);
          }
          this.btn_geted.visible = GameData.Inst.data.qiaoDaoTag == 1;
          this.btn_get.visible = !this.btn_geted.visible;
          this.box_select.visible = this.btn_get.visible;
      }
      onEnable() {
          this.img_selected.visible = false;
          this.Checkornot = false;
          if (GameData.Inst.data.qiaoDao < 7) {
              this.taskList = JSONManager.task.slice(0, 7);
          }
          else {
              this.taskList = JSONManager.task.slice(7, 14);
          }
          this.index = GameData.Inst.data.qiaoDao % 7;
          this.btn_geted.visible = GameData.Inst.data.qiaoDaoTag == 1;
          this.btn_get.visible = !this.btn_geted.visible;
          this.box_select.visible = this.btn_get.visible;
          let dayName = ["一", "二", "三", "四", "五", "六", "七"];
          for (let i = 0; i < 7; i++) {
              let itemUI = this['ui_task_' + i];
              itemUI.spr_curr.visible = i == this.index;
              if (i <= 5)
                  itemUI.txt_desc.text = "第" + dayName[i] + "天";
              if (this.taskList[i].rewardType == 2) {
                  let skinItem = GameData.Inst.getSkinData();
                  if (skinItem == null) {
                      this.taskList[i].rewardType == 1;
                      this.taskList[i].icon = "jinbi_2.png";
                  }
                  else {
                      this.skinID = skinItem.id;
                      itemUI.txt_cent.text = "景点";
                  }
              }
              if (this.taskList[i].rewardType == 1) {
                  itemUI.txt_cent.text = "" + this.taskList[i].text;
              }
              itemUI.img_icon.skin = "task/" + this.taskList[i].icon;
              if (i == this.index && this.taskList[i].rewardType == 2) {
                  this.box_select.visible = false;
              }
              if (i < this.index) {
                  itemUI.spr_item.alpha = 0.5;
                  itemUI.spr_geted.visible = true;
              }
              else {
                  itemUI.spr_item.alpha = 1;
                  itemUI.spr_geted.visible = false;
              }
          }
      }
      popup() {
          this.btn_select.on(Laya.Event.CLICK, this, () => {
              console.log("点击事件");
              this.img_selected.visible = !this.img_selected.visible;
          });
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
          if (GameData.Inst.platform.id != BaseConfig.pid_vivo)
              GameView.Inst.event(Laya.Event.START);
          Laya.timer.once(300, this, () => {
              super.popup();
          });
          if (GameData.Inst.platform.id == BaseConfig.pid_oppo) {
              GameData.Inst.platform.bannerADObj.hide();
              GameData.Inst.platform.InterAD(null);
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_dy) {
              this.btn_close.visible = false;
              if (GameData.Inst.platform.getSwitch(1)) {
                  Laya.timer.once(3000, this, () => {
                      this.btn_close.visible = true;
                  });
              }
              else
                  this.btn_close.visible = true;
          }
      }
      close() {
          super.close();
          GameView.Inst.showInterAD();
          if (GameData.Inst.platform.id == BaseConfig.pid_oppo)
              GameData.Inst.platform.interADPanel.close();
          if (GameData.Inst.platform.id != BaseConfig.pid_vivo)
              GameView.Inst.event(Laya.Event.CHANGE);
          this.event(Laya.Event.CHANGE);
          this.btn_select.offAll();
      }
  }

  class BoxGameListScr extends Laya.Script {
      constructor() {
          super();
          this.showType = 0;
          this.isInit = false;
          this.Promise = false;
      }
      onAwake() {
      }
      onEnable() {
          this.appBox = null;
          TaskPanel.Inst.on(Laya.Event.CHANGE, this, this.showBanner);
          this.isInit = false;
          if (GameData.Inst.platform.id != BaseConfig.pid_qq)
              return;
          if (!GameData.Inst.platform.getSwitch(13))
              return;
          if (this.showType == 1) {
              Laya.timer.once(500, this, this.showBanner);
          }
          else if (this.showType == 2) {
          }
          else {
              this.showBanner();
          }
      }
      showBanner() {
          if (GameData.Inst.platform.id != BaseConfig.pid_qq)
              return;
          if (!GameData.Inst.platform.getSwitch(13))
              return;
          if (this.isInit)
              return;
          this.isInit = true;
          console.log("AppBox show");
          if (this.appBox) {
              this.Promise = this.appBox.destroy();
              this.appBox = null;
              Laya.timer.loop(100, this, () => {
                  if (this.Promise) {
                      Laya.timer.clearAll(this);
                      this.Promise = false;
                      this.appBox = GameData.Inst.platform.proxy.createAppBox({ adUnitId: "815449bea27d1ca778150d43eb9687fa" });
                      this.appBox.onClose(() => {
                          this.appBox.destroy();
                          this.appBox = null;
                          this.isInit = false;
                      });
                      this.appBox.load().then(() => {
                          console.log("AppBox 显示成功");
                          this.appBox.show();
                      });
                  }
              });
          }
          else {
              this.appBox = GameData.Inst.platform.proxy.createAppBox({ adUnitId: "815449bea27d1ca778150d43eb9687fa" });
              this.appBox.load().then(() => {
                  console.log("AppBox 显示成功");
                  this.appBox.show();
                  this.appBox.onClose(() => {
                      this.appBox.destroy();
                      this.appBox = null;
                      this.isInit = false;
                  });
              });
          }
      }
      onDisable() {
          this.isInit = false;
          if (this.appBox) {
              this.appBox.destroy();
              this.appBox = null;
              this.Promise = false;
          }
          Laya.timer.clearAll(this);
      }
      onDestroy() {
          if (this.appBox) {
              this.appBox.destroy();
              this.appBox = null;
              this.Promise = false;
          }
          this.isInit = false;
          Laya.timer.clearAll(this);
      }
  }

  class EggStartPanel extends ui.panels.EggStartUI {
      constructor() {
          super();
          this.clickTime = 0;
          this.isShowVAD = false;
          this.zhuantai = 0;
          this.cent = 100;
          this.isShowBanner = false;
          this.widthLen = 421;
          this.currPoint = 0;
          this.isShowIndex = 5;
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
      }
      static get Inst() {
          if (EggStartPanel._inst == null)
              EggStartPanel._inst = new EggStartPanel();
          return EggStartPanel._inst;
      }
      judgeswitch(zhuantai) {
          switch (zhuantai) {
              case 1:
                  if (GameData.Inst.platform.gameSwitch.video_display1 == 3 || (GameData.Inst.platform.gameSwitch.video_display1 == 1))
                      return true;
                  else
                      return false;
              case 2:
                  if (GameData.Inst.platform.gameSwitch.video_display2 == 3 || (GameData.Inst.platform.gameSwitch.video_display2 == 1))
                      return true;
                  else
                      return false;
              case 3:
                  if (GameData.Inst.platform.gameSwitch.video_display3 == 3 || (GameData.Inst.platform.gameSwitch.video_display3 == 1))
                      return true;
                  else
                      return false;
              case 4:
                  if (GameData.Inst.platform.gameSwitch.video_display4 == 3 || (GameData.Inst.platform.gameSwitch.video_display4 == 1))
                      return true;
                  else
                      return false;
          }
          return false;
      }
      onAwake() {
          this.btn_get.on(Laya.Event.CLICK, this, () => {
              if (this.currPoint >= 10)
                  return;
              if (!this.isShowVAD && Laya.Browser.now() - this.clickTime <= 1500) {
                  this.isShowVAD = true;
                  if (this.judgeswitch(this.zhuantai)) {
                      GameData.Inst.platform.videoAD(Laya.Handler.create(this, () => {
                      }), Laya.Handler.create(this, () => {
                      }), 8);
                  }
              }
              this.clickTime = Laya.Browser.now();
              Laya.Tween.clearAll(this.img_jindu);
              this.currPoint++;
              if (this.currPoint > 5)
                  this.currPoint = 5;
              this.updateJindu();
              this.egg.scale(0.8, 0.8);
              Laya.timer.once(100, this, () => {
                  this.egg.scale(1.0, 1.0);
              });
              Laya.timer.clear(this, this.updateZore);
              if (this.currPoint > 0 && this.currPoint < 5) {
                  Laya.timer.loop(500, this, this.pointzoom);
                  Laya.timer.loop(500, this, this.updateZore);
              }
              if (this.currPoint >= 10) {
              }
          });
      }
      pointzoom() {
          Laya.Tween.to(this.btn_get, { scaleX: 0.8, scaleY: 0.8 }, 250);
          Laya.timer.once(250, this, () => {
              Laya.Tween.to(this.btn_get, { scaleX: 1.0, scaleY: 1.0 }, 250);
          });
      }
      updateZore() {
          this.currPoint--;
          if (this.currPoint < 0) {
              this.currPoint = 0;
          }
          this.updateJindu();
      }
      updateJindu() {
          if (!this.isShowBanner && this.currPoint == this.isShowIndex) {
              this.isShowBanner = true;
              this.getComponent(BoxGameListScr).showBanner();
              Laya.timer.once(1500, this, () => {
                  this.close();
              });
          }
          Laya.Tween.to(this.img_jindu, { width: this.currPoint * this.widthLen / 10 }, 200);
      }
      onEnable() {
          this.currPoint = 0;
          this.img_jindu.width = 0;
          this.txt_msg.text = `砸开金蛋获得${this.cent}金币`;
      }
      popup() {
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
          this.isShowVAD = false;
          this.clickTime = 0;
          Laya.timer.once(300, this, () => {
              this.isShowBanner = false;
              this.isShowIndex = 5;
              super.popup();
              Laya.timer.loop(500, this, this.pointzoom);
          });
      }
      close() {
          super.close();
          Laya.timer.clearAll(this);
          if (this.jumpHandler)
              this.jumpHandler.run();
          Laya.Tween.clearAll(this.img_jindu);
          GameData.Inst.addCent(this.cent);
      }
  }

  class GameLose extends ui.panels.GameLoseUI {
      constructor() {
          super();
          this.isshowindex = 0;
          this.switchCount = 0;
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
      }
      static get Inst() {
          if (GameLose._inst == null)
              GameLose._inst = new GameLose();
          return GameLose._inst;
      }
      onAwake() {
          this.btn_get.on(Laya.Event.CLICK, this, () => {
              let cent = 0;
              GameData.Inst.platform.videoAD(Laya.Handler.create(this, () => {
                  cent = this.getCent(3);
                  GameData.Inst.addCent(cent);
                  this.close();
              }), Laya.Handler.create(this, () => {
              }), 7);
          });
          this.btn_gotoGame.on(Laya.Event.CLICK, this, () => {
              if ([BaseConfig.pid_qq, BaseConfig.pid_dy].indexOf(GameData.Inst.platform.id) != -1)
                  this.bannerState = 2;
              if (this.bannerState == 2) {
                  if (GameData.Inst.platform.id == BaseConfig.pid_dy) {
                      if ((!this.img_selected.visible && this.isshowindex == 0) || (this.img_selected.visible && this.isshowindex == 1)) {
                          GameData.Inst.platform.videoAD(Laya.Handler.create(this, () => {
                              let cent = this.getCent(3);
                              GameData.Inst.addCent(cent);
                              this.close();
                          }), Laya.Handler.create(this, () => {
                              return;
                          }), 6);
                      }
                      else {
                          if (GameData.Inst.platform.getSwitch(8) && GameData.Inst.platform.videointerval == 0) {
                              GameData.Inst.platform.videoAD(Laya.Handler.create(this, () => {
                                  let cent = this.getCent(3);
                                  GameData.Inst.addCent(cent);
                                  this.close();
                              }), Laya.Handler.create(this, () => {
                                  console.log("第二个关闭");
                                  let cent = this.getCent(1);
                                  GameData.Inst.addCent(cent);
                                  console.log("第二个关闭");
                                  this.close();
                              }), 6);
                          }
                          else {
                              let cent = 0;
                              cent = Math.floor(this.getCent(1));
                              GameData.Inst.addCent(cent);
                              this.close();
                          }
                      }
                      return;
                  }
                  if ([BaseConfig.pid_qq, BaseConfig.pid_wx].indexOf(GameData.Inst.platform.id) != -1) {
                      {
                          let cent = 0;
                          cent = Math.floor(this.getCent(1));
                          GameData.Inst.addCent(cent);
                          this.close();
                          return;
                      }
                  }
                  let cent = 0;
                  if (this.img_selected.visible && GameData.Inst.platform.id != BaseConfig.pid_qq) {
                      GameData.Inst.platform.videoAD(Laya.Handler.create(this, () => {
                          cent = Math.floor(this.getCent(3));
                          GameData.Inst.addCent(cent);
                          this.close();
                      }), Laya.Handler.create(this, () => {
                          cent = Math.floor(this.getCent(1));
                          GameData.Inst.addCent(cent);
                          this.close();
                      }), 7);
                  }
                  else {
                      if (GameData.Inst.platform.getSwitch(2) || this.img_selected.visible) {
                          GameData.Inst.platform.videoAD(Laya.Handler.create(this, () => {
                              cent = Math.floor(this.getCent(3));
                              GameData.Inst.addCent(cent);
                              this.close();
                          }), Laya.Handler.create(this, () => {
                              cent = Math.floor(this.getCent(1));
                              GameData.Inst.addCent(cent);
                              this.close();
                          }), 7);
                      }
                      else {
                          cent = Math.floor(this.getCent(1));
                          GameData.Inst.addCent(cent);
                          this.close();
                          return;
                      }
                  }
              }
              else {
                  if (this.bannerState == 1)
                      return;
                  this.bannerState = 1;
                  Laya.timer.clearAll(this);
                  Laya.timer.once(1500, this, () => {
                      Laya.Tween.to(this.btn_gotoGame, { y: 1100 + (Laya.stage.height - 1334) / 2 }, 200);
                      this.getComponent(BannerScr).showOldBanner();
                  });
                  Laya.timer.once(2500, this, () => {
                      this.bannerState = 2;
                  });
              }
          });
          this.box_select.on(Laya.Event.CLICK, this, () => {
              if (this.isshowindex == 0)
                  this.showCent();
              else
                  this.showCent1();
          });
      }
      kongzhi() {
          if (GameData.Inst.platform.getSwitch(1)) {
              this.btn_gotoGame.visible = false;
              Laya.timer.once(2000, this, () => {
                  this.btn_gotoGame.visible = true;
                  this.btn_gotoGame.y = 1050 + (Laya.stage.height - 1334) / 2;
              });
          }
          else {
              this.btn_gotoGame.visible = true;
              this.btn_gotoGame.y = 1050 + (Laya.stage.height - 1334) / 2;
          }
      }
      onEnable() {
          if (GameData.Inst.platform.id == BaseConfig.pid_oppo)
              GameData.Inst.platform.interADPanel.y = Laya.stage.height - 1334;
          Laya.timer.once(100, this, this.showCent2);
          if (GameData.Inst.platform.id == BaseConfig.pid_qq)
              this.testModel();
      }
      testModel() {
          this.showCent1();
      }
      showCent2() {
          if (this.img_selected.visible) {
              if (this.isshowindex == 0)
                  this.txt_get_cent.text = "" + Math.floor(this.getCent(1));
              else
                  this.txt_get_cent.text = "" + Math.floor(this.getCent(3));
          }
          else {
              if (this.isshowindex == 0)
                  this.txt_get_cent.text = "" + Math.floor(this.getCent(3));
              else
                  this.txt_get_cent.text = "" + Math.floor(this.getCent(1));
          }
      }
      showCent1() {
          if (this.img_selected.visible) {
              this.img_selected.visible = false;
              this.txt_get_cent.text = "" + Math.floor(this.getCent(1));
          }
          else {
              this.img_selected.visible = true;
              this.txt_get_cent.text = "" + Math.floor(this.getCent(3));
          }
      }
      showCent() {
          if (this.img_selected.visible) {
              this.img_selected.visible = false;
              this.txt_get_cent.text = "" + Math.floor(this.getCent(3));
          }
          else {
              this.img_selected.visible = true;
              this.txt_get_cent.text = "" + Math.floor(this.getCent(1));
          }
      }
      getCent(rate) {
          console.log("这里出问题了？");
          console.log(GameStage.Inst.countCent);
          console.log(rate);
          return rate * GameStage.Inst.countCent;
          console.log("这里出问题了？1");
      }
      popup() {
          if (GameData.Inst.platform.id == BaseConfig.pid_qq) {
              if (GameData.Inst.platform.getSwitch(15)) {
                  let stateSwitch = GameData.Inst.platform.gameSwitch.delay_egg_switch2;
                  if (GameData.Inst.platform.gameSwitch.delay_egg_switch2 == 3) {
                      stateSwitch = this.switchCount % 2 + 1;
                      this.switchCount++;
                  }
                  if (stateSwitch == 1) {
                      EggStartPanel.Inst.popup();
                      EggStartPanel.Inst.zhuantai = 2;
                      EggStartPanel.Inst.jumpHandler = Laya.Handler.create(this, () => {
                          this.btn_gotoGame.visible = false;
                          this.width = Laya.stage.width;
                          this.height = Laya.stage.height;
                          if (GameData.Inst.platform.id == BaseConfig.pid_qq)
                              this.kongzhi();
                          this.width = Laya.stage.width;
                          this.height = Laya.stage.height;
                          super.popup();
                      });
                  }
                  else if (stateSwitch == 2) {
                      EggEndQQPanel.Inst.popup();
                      EggEndQQPanel.Inst.zhuantai = 2;
                      EggEndQQPanel.Inst.jumpHandler = Laya.Handler.create(this, () => {
                          this.width = Laya.stage.width;
                          this.btn_gotoGame.visible = false;
                          this.height = Laya.stage.height;
                          if (GameData.Inst.platform.id == BaseConfig.pid_qq)
                              this.kongzhi();
                          this.width = Laya.stage.width;
                          this.height = Laya.stage.height;
                          super.popup();
                      });
                  }
                  else {
                      this.width = Laya.stage.width;
                      this.height = Laya.stage.height;
                      this.btn_gotoGame.visible = false;
                      if (GameData.Inst.platform.id == BaseConfig.pid_qq)
                          this.kongzhi();
                      this.width = Laya.stage.width;
                      this.height = Laya.stage.height;
                      super.popup();
                  }
              }
              else {
                  this.width = Laya.stage.width;
                  this.height = Laya.stage.height;
                  this.btn_gotoGame.visible = false;
                  if (GameData.Inst.platform.id == BaseConfig.pid_qq)
                      this.kongzhi();
                  this.width = Laya.stage.width;
                  this.height = Laya.stage.height;
                  super.popup();
              }
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_oppo) {
              console.log("8==", GameData.Inst.platform.getSwitch(8));
              console.log("9==", GameData.Inst.platform.getSwitch(9));
              console.log("this.gameSwitch.ptg_native_province==", GameData.Inst.platform.gameSwitch.ptg_native_province);
              console.log("this.gameSwitch.ptg_native_city==", GameData.Inst.platform.gameSwitch.ptg_native_city);
              console.log("this.gameSwitch.local_switch==", GameData.Inst.platform.gameSwitch.local_switch);
              if (GameData.Inst.platform.bannerADObj && !GameData.Inst.platform.getSwitch(8) && GameData.Inst.platform.getSwitch(1)) {
                  GameData.Inst.platform.bannerADObj.hide();
                  this.btn_gotoGame.y = Laya.stage.height - 30;
                  this.bannerState = 1;
                  Laya.timer.once(3000, this, () => {
                      GameData.Inst.platform.InterAD(null);
                      this.bannerState = 2;
                      Laya.Tween.to(this.btn_gotoGame, { y: 1030 + (Laya.stage.height - 1334) / 2 }, 200);
                  });
              }
              else {
                  GameData.Inst.platform.bannerADObj.hide();
                  GameData.Inst.platform.InterAD(null);
                  this.btn_gotoGame.y = 1030 + (Laya.stage.height - 1334) / 2;
                  this.bannerState = 2;
              }
              super.popup();
              return;
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_vivo) {
              if (GameData.Inst.platform.bannerADObj)
                  GameData.Inst.platform.bannerADObj.hide();
              GameData.Inst.platform.InterAD(null);
              this.btn_gotoGame.y = 1030 + (Laya.stage.height - 1334) / 2;
              this.bannerState = 2;
              if (GameData.Inst.platform.getSwitch(6)) {
                  this.box_select1.visible = false;
                  Laya.timer.once(3000, this, () => {
                      this.box_select1.visible = true;
                  });
              }
              super.popup();
              return;
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_wx) {
              JumpPage1.Inst.popup();
              JumpPage1.Inst.callback = Laya.Handler.create(this, () => {
                  this.width = Laya.stage.width;
                  this.height = Laya.stage.height;
                  if (GameData.Inst.platform.id == BaseConfig.pid_wx)
                      this.btn_gotoGame.y = Laya.stage.height - 30;
                  this.btn_gotoGame.visible = true;
                  super.popup();
                  if (GameData.Inst.platform.id == BaseConfig.pid_wx) {
                      if (GameData.Inst.platform.getSwitch(17)) {
                          if (GameData.Inst.platform.id == BaseConfig.pid_wx)
                              this.btn_gotoGame.y = Laya.stage.height - 30;
                          Laya.timer.once(2000, this, () => {
                              this.btn_gotoGame.visible = true;
                              this.getComponent(BannerScr).showOldBanner();
                              Laya.Tween.to(this.btn_gotoGame, { y: 1014 + (Laya.stage.height - 1334) / 2 }, 200);
                              this.bannerState = 2;
                          });
                      }
                      else {
                          this.bannerState = 2;
                          this.btn_gotoGame.y = 1014 + (Laya.stage.height - 1334) / 2;
                          this.getComponent(BannerScr).showOldBanner();
                          this.btn_gotoGame.visible = true;
                      }
                  }
              });
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_dy) {
              this.bannerState = 2;
              this.width = Laya.stage.width;
              this.height = Laya.stage.height;
              this.btn_gotoGame.y = 1028 + (Laya.stage.height - 1334) / 2;
              super.popup();
              if (this.isshowindex == 0) {
                  this.box_select1.getChildByName("txt_select_0").text = "不看视频，不3倍领取";
              }
              else {
                  this.box_select1.getChildByName("txt_select_0").text = "看视频3倍领取";
              }
              console.log("他的值为");
              console.log(GameData.Inst.platform.getSwitch(7));
              console.log(GameData.Inst.platform.gameSwitch.ignore_check);
              if (!GameData.Inst.platform.getSwitch(7)) {
                  this.box_select1.visible = false;
                  this.isshowindex = 1;
              }
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_test) {
              this.width = Laya.stage.width;
              this.height = Laya.stage.height;
              this.btn_gotoGame.y = 1310 + (Laya.stage.height - 1334) / 2;
              super.popup();
          }
      }
      close() {
          console.log("准备删除");
          if (GameData.Inst.platform.id == BaseConfig.pid_dy) {
              GameData.Inst.platform.videointerval++;
              if (GameData.Inst.platform.videointerval > GameData.Inst.platform.gameSwitch.video_number)
                  GameData.Inst.platform.videointerval = 0;
              this.isshowindex = this.isshowindex + 1;
              this.isshowindex = (this.isshowindex) % 2;
          }
          console.log(GameData.Inst.platform.gameSwitch.video_number);
          this.bannerState = 0;
          super.close();
          if (GameData.Inst.platform.id == BaseConfig.pid_oppo)
              GameData.Inst.platform.interADPanel.close();
          Laya.timer.clearAll(this);
          if (GameData.Inst.platform.id == BaseConfig.pid_wx) {
              JumpPage2.Inst.popup();
              JumpPage2.Inst.callback = Laya.Handler.create(this, () => {
                  GameStage.Inst.showGameView();
              });
          }
          else {
              GameStage.Inst.showGameView();
              if (GameData.Inst.platform.id == BaseConfig.pid_vivo && GameData.Inst.platform.getSwitch(7) && !GameData.Inst.platform.getSwitch(8))
                  GameData.Inst.platform.InterAD(null);
          }
      }
  }

  class GameFufuo extends ui.panels.GameFuhuoUI {
      constructor() {
          super();
          this.time = 10;
          this.isshowindex = 0;
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
      }
      static get Inst() {
          if (GameFufuo._inst == null)
              GameFufuo._inst = new GameFufuo();
          return GameFufuo._inst;
      }
      onAwake() {
          this.box_select.on(Laya.Event.CLICK, this, () => {
              this.img_selected.visible = !this.img_selected.visible;
          });
          this.btn_get.on(Laya.Event.CLICK, this, () => {
              Laya.timer.clearAll(this);
              GameData.Inst.platform.videoAD(Laya.Handler.create(this, () => {
                  if (this.callback)
                      this.callback.run();
                  this.close();
              }), Laya.Handler.create(this, () => {
                  this.updateTime();
                  if (GameData.Inst.platform.getSwitch(1) && GameData.Inst.platform.id != BaseConfig.pid_dy) {
                      this.btn_close.y = Laya.stage.height - 30;
                      this.bannerState = 1;
                      Laya.timer.once(3000, this, () => {
                          this.bannerState = 2;
                          Laya.Tween.to(this.btn_close, { y: 1014 + (Laya.stage.height - 1334) / 2 }, 200);
                      });
                  }
              }), 6);
          });
          this.btn_close.on(Laya.Event.CLICK, this, () => {
              console.log("取消复活");
              if ([BaseConfig.pid_qq, BaseConfig.pid_dy].indexOf(GameData.Inst.platform.id) != -1)
                  this.bannerState = 2;
              if (this.bannerState == 2) {
                  if (GameData.Inst.platform.id == BaseConfig.pid_dy) {
                      if ((!this.img_selected.visible && this.isshowindex == 0) || (this.img_selected.visible && this.isshowindex == 1)) {
                          Laya.timer.clearAll(this);
                          GameData.Inst.platform.videoAD(Laya.Handler.create(this, () => {
                              if (this.callback)
                                  this.callback.run();
                              this.close();
                              return;
                          }), Laya.Handler.create(this, () => {
                              this.updateTime();
                              return;
                          }), 6);
                      }
                      else {
                          if (this.closeCallback)
                              this.closeCallback.run();
                          this.close();
                          return;
                      }
                  }
                  else {
                      if (this.closeCallback)
                          this.closeCallback.run();
                      this.close();
                      return;
                  }
              }
              else {
                  if (this.bannerState == 1)
                      return;
                  this.bannerState = 1;
                  Laya.timer.clearAll(this);
                  Laya.timer.once(1500, this, () => {
                      Laya.Tween.to(this.btn_close, { y: 1250 + (Laya.stage.height - 1334) / 2 }, 200);
                      this.getComponent(BannerScr).showOldBanner();
                  });
                  Laya.timer.once(2500, this, () => {
                      this.bannerState = 2;
                  });
              }
          });
      }
      onEnable() {
          this.time = 10;
          this.updateTime();
          let id = "1006";
          if (GameData.Inst.platform.gameList && GameData.Inst.platform.gameList.length > 0) {
              let list = GameData.Inst.platform.getGameList(id, 2);
              if (list.length > 0) {
                  this.list_ad.array = list;
              }
              else {
                  this.list_ad.array = [];
              }
          }
          else {
              this.list_ad.array = [];
          }
      }
      updateTime() {
          if (this.time <= 0) {
              if (this.closeCallback)
                  this.closeCallback.run();
              this.close();
              return;
          }
          this.txt_time.value = "" + this.time;
          this.time--;
          Laya.timer.once(1000, this, this.updateTime);
      }
      popup() {
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
          this.bannerState = 0;
          super.popup();
          if (GameData.Inst.platform.id == BaseConfig.pid_qq) {
              if (GameData.Inst.platform.getSwitch(1)) {
                  this.btn_close.visible = false;
                  Laya.timer.once(2000, this, () => {
                      this.btn_close.y = 1124 + (Laya.stage.height - 1334) / 2;
                      this.btn_close.visible = true;
                  });
              }
              else
                  this.btn_close.y = 1124 + (Laya.stage.height - 1334) / 2;
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_wx) {
              if (GameData.Inst.platform.getSwitch(17)) {
                  if (GameData.Inst.platform.id == BaseConfig.pid_wx)
                      this.btn_close.y = Laya.stage.height - 30;
                  Laya.timer.once(2000, this, () => {
                      this.getComponent(BannerScr).showOldBanner();
                      Laya.Tween.to(this.btn_close, { y: 1014 + (Laya.stage.height - 1334) / 2 }, 200);
                      this.bannerState = 2;
                  });
              }
              else {
                  this.bannerState = 2;
                  this.btn_close.y = 1014 + (Laya.stage.height - 1334) / 2;
                  this.getComponent(BannerScr).showOldBanner();
              }
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_oppo) {
              if (GameData.Inst.platform.bannerADObj && GameData.Inst.platform.getSwitch(9) && GameData.Inst.platform.getSwitch(1)) {
                  GameData.Inst.platform.bannerADObj.hide();
                  this.getComponent(BannerScr).showOldBanner();
                  this.btn_close.y = Laya.stage.height - 30;
                  this.bannerState = 1;
                  Laya.timer.once(3000, this, () => {
                      this.bannerState = 2;
                      Laya.Tween.to(this.btn_close, { y: 1014 + (Laya.stage.height - 1334) / 2 }, 200);
                  });
              }
              else {
                  GameData.Inst.platform.bannerADObj.hide();
                  this.getComponent(BannerScr).showOldBanner();
                  this.btn_close.y = 1014 + (Laya.stage.height - 1334) / 2;
                  this.bannerState = 2;
              }
              return;
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_vivo) {
              if (GameData.Inst.platform.getSwitch(1) && GameData.Inst.platform.getSwitch(4)) {
                  this.getComponent(BannerScr).showOldBanner();
                  this.btn_close.y = Laya.stage.height - 30;
                  this.bannerState = 1;
                  Laya.timer.once(3000, this, () => {
                      this.bannerState = 2;
                      Laya.Tween.to(this.btn_close, { y: 1014 + (Laya.stage.height - 1334) / 2 }, 200);
                  });
              }
              else {
                  this.getComponent(BannerScr).showOldBanner();
                  this.btn_close.y = 1014 + (Laya.stage.height - 1334) / 2;
                  this.bannerState = 2;
              }
              return;
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_dy) {
              this.btn_close.y = 1014 + (Laya.stage.height - 1334) / 2;
              this.box_select1.visible = true;
              if (this.isshowindex == 0) {
                  this.box_select1.getChildByName("txt_select_0").text = "不看广告，放弃复活";
              }
              else {
                  this.box_select1.getChildByName("txt_select_0").text = "观看广告，进行复活";
              }
              if (!GameData.Inst.platform.getSwitch(7)) {
                  this.box_select1.visible = false;
                  this.isshowindex = 1;
              }
          }
          else
              this.box_select1.visible = false;
      }
      close() {
          this.isshowindex = this.isshowindex + 1;
          this.isshowindex = (this.isshowindex) % 2;
          console.log("复活界面的", this.isshowindex);
          this.bannerState = 0;
          Laya.timer.clearAll(this);
          console.log("关闭复活界面");
          this.bannerState = 0;
          this.time = 10;
          super.close();
          Laya.timer.clearAll(this);
          if (this.callback)
              this.callback = null;
          if (this.closeCallback)
              this.closeCallback = null;
      }
  }

  class GameWinVideo extends ui.panels.GameWinVideoUI {
      constructor() {
          super();
          this.getCent = 0;
          this.bannerState = 0;
          this.targetP = new Laya.Point();
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
      }
      static get Inst() {
          if (GameWinVideo._inst == null)
              GameWinVideo._inst = new GameWinVideo();
          return GameWinVideo._inst;
      }
      onAwake() {
          this.btn_get.on(Laya.Event.CLICK, this, () => {
              GameData.Inst.platform.shareVideo(Laya.Handler.create(this, () => {
                  this.close();
                  GameData.Inst.addCent(this.getCent);
              }), Laya.Handler.create(this, () => {
              }));
          });
          this.btn_close.on(Laya.Event.CLICK, this, () => {
              console.log(this.bannerState);
              if ([BaseConfig.pid_qq, BaseConfig.pid_dy].indexOf(GameData.Inst.platform.id) != -1)
                  this.bannerState = 2;
              if (this.bannerState == 2) {
                  this.close();
                  return;
              }
              if (this.bannerState == 1)
                  return;
              this.bannerState = 1;
              Laya.timer.clearAll(this);
              Laya.timer.once(1500, this, () => {
                  Laya.Tween.to(this.btn_close, { y: 1080 + (Laya.stage.height - 1334) / 2 }, 200);
                  this.getComponent(BannerScr).showOldBanner();
              });
              Laya.timer.once(2500, this, () => {
                  this.bannerState = 2;
              });
          });
      }
      onEnable() {
          this.getCent = 100;
          this.txt_get_cent.text = "" + this.getCent;
          this.btn_get.visible = GameData.Inst.platform.getUseAPI(20);
          this.btn_get.visible = false;
          this.spr_get_cent.visible = this.btn_get.visible;
      }
      popup() {
          this.bannerState = 0;
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
          this.completeRate = 0;
          if (this.photoBgID == GameData.Inst.levelItem.bgID) {
              this.completeRate = 30;
          }
          let chaTime = Math.abs(this.photoRate - GameData.Inst.levelItem.time);
          if (chaTime <= 0.02) {
              this.completeRate += 40;
          }
          else {
              if (40 - chaTime * 100 > 0) {
                  this.completeRate += 40 - chaTime * 100;
              }
          }
          this.targetP.x = GameData.Inst.levelItem.x;
          this.targetP.y = GameData.Inst.levelItem.y;
          let chaXY = this.targetP.distance(this.photoX, this.photoY);
          if (30 - (chaXY - 5) / 3 > 0) {
              this.completeRate += 30 - (chaXY - 5) / 3;
          }
          this.completeRate /= 100;
          if (this.completeRate >= 0.85)
              this.completeRate += 0.025;
          if (this.completeRate > 1)
              this.completeRate = 1;
          this.txt_desc.text = "相似度" + Math.floor(this.completeRate * 100) + "%";
          this.img_line.width = 534 * this.completeRate;
          this.img_title.skin = this.completeRate < 0.6 ? "game/zaijiezaili.png" : "game/tiaozhanchenggong.png";
          this.img_target.skin = "res/level/" + GameData.Inst.levelItem.photo;
          Laya.timer.once(300, this, () => {
              super.popup();
          });
          if (GameData.Inst.platform.id == BaseConfig.pid_qq) {
              if (GameData.Inst.platform.getSwitch(1)) {
                  this.btn_close.visible = false;
                  Laya.timer.once(2000, this, () => {
                      this.btn_close.y = 1124 + (Laya.stage.height - 1334) / 2;
                      this.btn_close.visible = true;
                  });
              }
              else
                  this.btn_close.y = 1124 + (Laya.stage.height - 1334) / 2;
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_wx) {
              if (GameData.Inst.platform.getSwitch(17)) {
                  if (GameData.Inst.platform.id == BaseConfig.pid_wx)
                      this.btn_close.y = Laya.stage.height - 30;
                  Laya.timer.once(2000, this, () => {
                      this.getComponent(BannerScr).showOldBanner();
                      Laya.Tween.to(this.btn_close, { y: 1124 + (Laya.stage.height - 1334) / 2 }, 200);
                      this.bannerState = 2;
                  });
              }
              else {
                  this.bannerState = 2;
                  this.btn_close.y = 1124 + (Laya.stage.height - 1334) / 2;
                  this.getComponent(BannerScr).showOldBanner();
              }
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_oppo) {
              if (GameData.Inst.platform.bannerADObj && GameData.Inst.platform.getSwitch(9) && GameData.Inst.platform.getSwitch(1)) {
                  GameData.Inst.platform.bannerADObj.hide();
                  this.getComponent(BannerScr).showOldBanner();
                  this.btn_close.y = Laya.stage.height - 30;
                  this.bannerState = 1;
                  Laya.timer.once(3000, this, () => {
                      this.bannerState = 2;
                      Laya.Tween.to(this.btn_close, { y: 1124 + (Laya.stage.height - 1334) / 2 }, 200);
                  });
              }
              else {
                  this.getComponent(BannerScr).showOldBanner();
                  this.btn_close.y = 1124 + (Laya.stage.height - 1334) / 2;
                  this.bannerState = 2;
              }
              return;
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_vivo) {
              console.log("区域开关", GameData.Inst.platform.gameSwitch.local_switch);
              console.log(GameData.Inst.platform.getSwitch(4));
              console.log(GameData.Inst.platform.getSwitch(4));
              if (GameData.Inst.platform.getSwitch(1) && GameData.Inst.platform.getSwitch(4)) {
                  this.getComponent(BannerScr).showOldBanner();
                  this.btn_close.y = Laya.stage.height - 30;
                  this.bannerState = 1;
                  Laya.timer.once(3000, this, () => {
                      this.bannerState = 2;
                      Laya.Tween.to(this.btn_close, { y: 1124 + (Laya.stage.height - 1334) / 2 }, 200);
                  });
              }
              else {
                  this.getComponent(BannerScr).showOldBanner();
                  this.btn_close.y = 1124 + (Laya.stage.height - 1334) / 2;
                  this.bannerState = 2;
              }
              return;
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_dy) {
              this.btn_close.y = 1124 + (Laya.stage.height - 1334) / 2;
          }
      }
      close() {
          super.close();
          this.bannerState = 0;
          Laya.timer.clearAll(this);
          if (this.completeRate < 0.6) {
              console.log("复活界面pop");
              GameFufuo.Inst.closeCallback = Laya.Handler.create(this, () => {
                  console.log("调用回掉pop失败界面");
                  GameStage.Inst.countCent = 5;
                  SoundManager.playLose();
                  GameStage.Inst.event(Laya.Event.STOPPED);
                  GameLose.Inst.popup();
              });
              GameFufuo.Inst.callback = Laya.Handler.create(this, () => {
                  GameStage.Inst.countCent = 30;
                  this.completeRate = 1;
                  SoundManager.playWin();
                  SoundManager.playWin1();
                  GameStage.Inst.event(Laya.Event.STOPPED);
                  GameWin.Inst.popup();
                  GameData.Inst.updateLevel();
              });
              GameFufuo.Inst.popup();
          }
          else {
              if (this.completeRate >= 0.9) {
                  GameStage.Inst.countCent = 30;
                  SoundManager.playWin();
                  SoundManager.playWin1();
              }
              else if (this.completeRate >= 0.8) {
                  GameStage.Inst.countCent = 20;
                  SoundManager.playWin();
              }
              else {
                  GameStage.Inst.countCent = 10;
                  SoundManager.playWin();
              }
              GameStage.Inst.event(Laya.Event.STOPPED);
              GameWin.Inst.popup();
              GameData.Inst.updateLevel();
          }
      }
  }

  class Switch_default_check extends Laya.Script {
      constructor() {
          super();
          this.Checkornot = true;
      }
      onAwake() {
          this.target = this.owner;
      }
      onEnable() {
          console.log("默认勾选", GameData.Inst.platform.getSwitch(0));
          if (GameData.Inst.platform.id != BaseConfig.pid_wx)
              this.target.visible = GameData.Inst.platform.getSwitch(0);
          else
              this.target.visible = false;
      }
  }

  class Switch_delay_display extends Laya.Script {
      constructor() {
          super();
          this.showType = 0;
      }
      onAwake() {
          this.target = this.owner;
      }
      run() {
          if (GameData.Inst.platform.getSwitch(1)) {
              this.target.visible = false;
              Laya.timer.once(2000, this, () => {
                  this.target.visible = true;
              });
          }
          else {
              this.target.visible = true;
          }
      }
      onEnable() {
          if (this.showType == 0)
              this.run();
      }
  }

  class BoxPanel extends ui.panels.BoxUI {
      constructor() {
          super();
          this.switchCount = 0;
          this.conutCent = 0;
          this.baseCent = 10;
          this.keyCount = 3;
          this.boxCount = 9;
          this.openIndex = 1;
          this.bestCent = 0;
          this.isGeted = false;
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
      }
      static get Inst() {
          if (BoxPanel._inst == null)
              BoxPanel._inst = new BoxPanel();
          return BoxPanel._inst;
      }
      onAwake() {
          this.btn_get.on(Laya.Event.CLICK, this, () => {
              GameData.Inst.platform.videoAD(Laya.Handler.create(this, () => {
                  this.isGeted = true;
                  this.initKey();
                  this.box_key.visible = true;
                  this.btn_get.visible = false;
                  this.btn_close.visible = false;
                  this.btn_gotoGame.visible = false;
              }), Laya.Handler.create(this, () => {
              }), 8);
          });
          this.btn_gotoGame.on(Laya.Event.CLICK, this, () => {
              this.close();
              GameData.Inst.data.key -= 3;
              GameData.Inst.addCent(this.conutCent);
          });
          this.btn_close.on(Laya.Event.CLICK, this, () => {
              this.close();
              GameData.Inst.data.key -= 3;
              GameData.Inst.addCent(this.conutCent);
          });
          this.on(Laya.Event.CLICK, this, (event) => {
              if (event.target.parent instanceof ui.items.BoxItemUI) {
                  let boxItem = event.target.parent;
                  if (boxItem.img_video.visible) {
                      GameData.Inst.platform.videoAD(Laya.Handler.create(this, () => {
                          this.openBoxStart(boxItem);
                      }), Laya.Handler.create(this, () => {
                      }), 8);
                  }
                  else if (this.keyCount > 0) {
                      this.openBoxStart(boxItem);
                  }
              }
          });
      }
      openBoxStart(boxItem) {
          if (!boxItem.img_video.visible) {
              this.keyCount--;
              this['img_key_' + this.keyCount].disabled = true;
          }
          this.openBox(boxItem);
          if (this.keyCount <= 0) {
              this.box_key.visible = false;
              if (boxItem.img_video.visible)
                  return;
              if (this.isGeted) {
                  this.btn_get.visible = false;
                  this.btn_close.visible = false;
                  this.btn_gotoGame.visible = true;
              }
              else {
                  this.btn_get.visible = true;
                  this.btn_close.visible = true;
                  this.btn_close.getComponent(Switch_delay_display).run();
              }
          }
      }
      openBox(boxItem) {
          boxItem.mouseEnabled = false;
          boxItem.btn_open.visible = false;
          let cent = Math.ceil(this.jsonData["box" + this.openIndex] * this.baseCent);
          boxItem.txt_cent.text = "" + cent;
          GameData.Inst.data.taskType3Box++;
          this.conutCent += cent;
          this.openIndex++;
      }
      onEnable() {
          this.box_key.visible = true;
          this.btn_get.visible = false;
          this.btn_close.visible = false;
          this.btn_gotoGame.visible = false;
          this.baseCent = 1;
          this.conutCent = 0;
          this.bestCent = 0;
          this.openIndex = 1;
          this.jsonData = this.getRandBox();
          let videoADList = [];
          let videoADListTmp = [];
          for (let i = 0; i < this.boxCount; i++) {
              videoADListTmp.push(i);
          }
          videoADList.push(videoADListTmp.splice(Math.floor(Math.random() * videoADListTmp.length), 1)[0]);
          videoADList.push(videoADListTmp.splice(Math.floor(Math.random() * videoADListTmp.length), 1)[0]);
          videoADList.push(videoADListTmp.splice(Math.floor(Math.random() * videoADListTmp.length), 1)[0]);
          for (let i = 0; i < this.boxCount; i++) {
              this['ui_box_' + i].mouseEnabled = true;
              this['ui_box_' + i].btn_open.visible = true;
              this['ui_box_' + i].img_video.visible = (videoADList.indexOf(i) != -1);
              if (this.bestCent < this.jsonData["box" + (i + 1)]) {
                  this.bestCent = this.jsonData["box" + (i + 1)];
              }
          }
          this.keyCount = 3;
          for (let i = 0; i < this.keyCount; i++) {
              this['img_key_' + i].disabled = false;
          }
          this.isGeted = false;
          this.initKey();
      }
      initKey() {
          this.keyCount = 3;
          for (let i = 0; i < this.keyCount; i++) {
              this['img_key_' + i].disabled = false;
          }
      }
      getRandBox() {
          let data = JSONManager.box[0];
          let rand = Math.random();
          for (let i = 0; i < JSONManager.box.length; i++) {
              if (rand <= JSONManager.box[i].rate) {
                  data = JSONManager.box[i];
                  break;
              }
          }
          return data;
      }
      popup() {
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
          Laya.timer.once(300, this, () => {
              super.popup();
          });
      }
      close() {
          super.close();
          if (this.closeCallback)
              this.closeCallback.run();
      }
  }

  class EggPanel extends ui.panels.EggUI {
      constructor() {
          super();
          this.cent = 100;
          this.widthLen = 421;
          this.currPoint = 0;
          this.isShowBanner = false;
          this.isShowIndex = 5;
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
      }
      static get Inst() {
          if (EggPanel._inst == null)
              EggPanel._inst = new EggPanel();
          return EggPanel._inst;
      }
      onAwake() {
          this.btn_get.on(Laya.Event.CLICK, this, () => {
              if (this.currPoint >= 10)
                  return;
              Laya.Tween.clearAll(this.img_jindu);
              this.currPoint++;
              if (this.isShowBanner && this.currPoint >= 5 && Math.random() > 0.95) {
                  this.currPoint = 10;
              }
              if (this.currPoint > 10)
                  this.currPoint = 10;
              this.updateJindu();
              Laya.timer.clear(this, this.updateZore);
              if (this.currPoint > 0 && this.currPoint < 10) {
                  Laya.timer.loop(200, this, this.updateZore);
              }
              if (this.currPoint >= 10) {
              }
          });
      }
      onEnable() {
          this.currPoint = 0;
          this.img_jindu.width = 0;
          this.txt_msg.text = `砸开金蛋获得${this.cent}金币`;
      }
      updateZore() {
          this.currPoint--;
          if (this.currPoint < 0) {
              this.currPoint = 0;
          }
          this.updateJindu();
      }
      updateJindu() {
          if (!this.isShowBanner && this.currPoint == this.isShowIndex) {
              this.isShowBanner = true;
              this.getComponent(BannerScr).showBanner();
              Laya.timer.once(1500, this, () => {
                  this.btn_get.y = Laya.stage.height - 100 / 2 - 80 - 200;
                  Laya.timer.once(1000, this, () => {
                      this.close();
                  });
              });
          }
          Laya.Tween.to(this.img_jindu, { width: this.currPoint * this.widthLen / 10 }, 200);
      }
      popup() {
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
          Laya.timer.once(300, this, () => {
              super.popup();
              this.isShowBanner = false;
              this.isShowIndex = 2 + Math.floor(Math.random() * 2);
              this.btn_get.y = Laya.stage.height - 100 / 2 - 80;
          });
      }
      close() {
          Laya.timer.clearAll(this);
          if (this.closeCallback)
              this.closeCallback.run();
          Laya.Tween.clearAll(this.img_jindu);
          super.close();
          GameData.Inst.addCent(this.cent);
      }
  }

  class EggEndTTPanel extends ui.panels.EggEndTTUI {
      constructor() {
          super();
          this.clickTime = 0;
          this.isShowVAD = false;
          this.zhuantai = 0;
          this.isvido = false;
          this.isShowBanner = false;
          this.isShowIndex = 5;
          this.cent = 100;
          this.widthLen = 421;
          this.currPoint = 0;
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
      }
      static get Inst() {
          if (EggEndTTPanel._inst == null)
              EggEndTTPanel._inst = new EggEndTTPanel();
          return EggEndTTPanel._inst;
      }
      onAwake() {
          this.box_select.on(Laya.Event.CLICK, this, () => {
              this.img_selected.visible = !this.img_selected.visible;
          });
          this.btn_get.on(Laya.Event.CLICK, this, () => {
              if (this.currPoint >= 5) {
                  if (this.isvido)
                      this.updateJindu();
                  return;
              }
              this.egg.scale(0.8, 0.8);
              Laya.timer.once(100, this, () => {
                  this.egg.scale(1.0, 1.0);
              });
              Laya.Tween.clearAll(this.img_jindu);
              this.currPoint++;
              if (this.isShowBanner && this.currPoint >= 5 && Math.random() > 0.95) {
                  this.currPoint = 5;
              }
              if (this.currPoint > 5)
                  this.currPoint = 5;
              this.updateJindu();
              Laya.timer.clear(this, this.updateZore);
              if (this.currPoint > 0 && this.currPoint < 5) {
                  Laya.timer.loop(500, this, this.updateZore);
              }
              if (this.currPoint >= 5) {
              }
          });
      }
      updateZore() {
          this.currPoint--;
          if (this.currPoint < 0) {
              this.currPoint = 0;
          }
          this.updateJindu();
      }
      updateJindu() {
          if (this.currPoint >= this.isShowIndex) {
              if (this.img_selected.visible) {
                  this.isvido = false;
                  GameData.Inst.platform.videoAD(Laya.Handler.create(this, () => {
                      GameData.Inst.addCent(this.cent * 2);
                      this.close();
                      console.log("金蛋看完了视频");
                      return;
                  }), Laya.Handler.create(this, () => {
                      this.isvido = true;
                  }), 7);
              }
              else {
                  GameData.Inst.addCent(this.cent);
                  this.close();
              }
          }
          Laya.Tween.to(this.img_jindu, { width: this.currPoint * this.widthLen / 10 }, 200);
      }
      onEnable() {
          this.currPoint = 0;
          this.img_jindu.width = 0;
          this.txt_msg.text = `砸开金蛋获得${this.cent}金币`;
      }
      popup() {
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
          this.isShowVAD = false;
          this.clickTime = 0;
          Laya.timer.once(300, this, () => {
              super.popup();
              this.isShowBanner = false;
              this.isShowIndex = 5;
          });
      }
      close() {
          this.isvido = false;
          if (this.jumpHandler) {
              console.log("关闭金蛋有回调");
              this.jumpHandler.run();
              this.jumpHandler = null;
          }
          Laya.timer.clearAll(this);
          Laya.Tween.clearAll(this.img_jindu);
          super.close();
      }
  }

  class vidioshare extends ui.panels.SharevideoUI {
      constructor() {
          super();
          this.bannerState = 0;
          this.index = 0;
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
      }
      static get Inst() {
          if (vidioshare._inst == null)
              vidioshare._inst = new vidioshare();
          return vidioshare._inst;
      }
      onEnable() {
      }
      onAwake() {
          this.share.on(Laya.Event.CLICK, this, () => {
              GameData.Inst.platform.stopVideo();
              GameData.Inst.platform.shareVideo(Laya.Handler.create(this, () => {
                  this.close();
                  GameData.Inst.addCent(100);
              }), Laya.Handler.create(this, () => {
                  this.close();
              }));
          });
          this.close_btn.on(Laya.Event.CLICK, this, () => {
              if (GameData.Inst.platform.getSwitch(3)) {
                  console.log("强制分享的次数", GameData.Inst.platform.gameSwitch.force_sharetimes);
                  console.log("强制分享剩余的次数", this.index);
                  if (GameData.Inst.platform.gameSwitch.force_sharetimes > 0 && this.index >= GameData.Inst.platform.gameSwitch.force_sharetimes) {
                      this.close();
                  }
                  else {
                      GameData.Inst.platform.stopVideo();
                      GameData.Inst.platform.shareVideo(Laya.Handler.create(this, () => {
                          this.index++;
                          this.close();
                          GameData.Inst.addCent(100);
                      }), Laya.Handler.create(this, () => {
                          this.index++;
                          this.close();
                      }));
                  }
              }
              else
                  this.close();
          });
      }
      popup() {
          GameData.Inst.platform.stopVideo();
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
          Laya.timer.once(300, this, () => {
              super.popup();
          });
          if (GameData.Inst.platform.getSwitch(1)) {
              this.close_btn.visible = false;
              Laya.timer.once(3000, this, () => {
                  this.close_btn.visible = true;
              });
          }
      }
      close() {
          super.close();
      }
  }

  class GameWin extends ui.panels.GameWinUI {
      constructor() {
          super();
          this.switchCount = 0;
          this.isshowindex = 0;
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
      }
      static get Inst() {
          if (GameWin._inst == null)
              GameWin._inst = new GameWin();
          return GameWin._inst;
      }
      onAwake() {
          this.btn_get.on(Laya.Event.CLICK, this, () => {
              let cent = 0;
              GameData.Inst.platform.videoAD(Laya.Handler.create(this, () => {
                  cent = this.getCent(3);
                  GameData.Inst.addCent(cent);
                  this.isShare = true;
                  this.close();
              }), Laya.Handler.create(this, () => {
              }), 7);
          });
          this.btn_gotoGame.on(Laya.Event.CLICK, this, () => {
              if ([BaseConfig.pid_qq, BaseConfig.pid_dy].indexOf(GameData.Inst.platform.id) != -1)
                  this.bannerState = 2;
              if (this.bannerState == 2) {
                  if ([BaseConfig.pid_qq, BaseConfig.pid_wx].indexOf(GameData.Inst.platform.id) != -1) {
                      {
                          console.log("qq wx 直接删除");
                          let cent = 0;
                          cent = Math.floor(this.getCent(1));
                          GameData.Inst.addCent(cent);
                          this.close();
                          return;
                      }
                  }
                  if (GameData.Inst.platform.id == BaseConfig.pid_dy) {
                      console.log("dy继续判断");
                      if ((this.img_selected.visible && this.isshowindex == 0) || (!this.img_selected.visible && this.isshowindex == 1)) {
                          console.log("需要看电影");
                          GameData.Inst.platform.videoAD(Laya.Handler.create(this, () => {
                              let cent = Math.floor(this.getCent(3));
                              GameData.Inst.addCent(cent);
                              this.isShare = true;
                              this.close();
                              return;
                          }), Laya.Handler.create(this, () => {
                              return;
                          }), 7);
                      }
                      else {
                          if (GameData.Inst.platform.getSwitch(6) && GameData.Inst.platform.videointerval == 0) {
                              console.log("强制看电影");
                              GameData.Inst.platform.videoAD(Laya.Handler.create(this, () => {
                                  let cent = Math.floor(this.getCent(3));
                                  GameData.Inst.addCent(cent);
                                  this.isShare = true;
                                  this.close();
                                  return;
                              }), Laya.Handler.create(this, () => {
                                  let cent = Math.floor(this.getCent(1));
                                  GameData.Inst.addCent(cent);
                                  this.close();
                                  return;
                              }), 7);
                          }
                          else {
                              console.log("直接关闭");
                              let cent = 0;
                              cent = Math.floor(this.getCent(1));
                              GameData.Inst.addCent(cent);
                              this.close();
                              return;
                          }
                      }
                      return;
                  }
                  let cent = 0;
                  if (this.img_selected.getComponent(Switch_default_check).isShow || this.img_selected.visible) {
                      GameData.Inst.platform.videoAD(Laya.Handler.create(this, () => {
                          cent = this.getCent(3);
                          GameData.Inst.addCent(cent);
                          this.isShare = true;
                          this.close();
                          return;
                      }), Laya.Handler.create(this, () => {
                          cent = this.getCent(1);
                          GameData.Inst.addCent(cent);
                          this.close();
                          return;
                      }), 7);
                  }
                  else {
                      if (GameData.Inst.platform.getSwitch(2)) {
                          GameData.Inst.platform.videoAD(Laya.Handler.create(this, () => {
                              cent = this.getCent(3);
                              GameData.Inst.addCent(cent);
                              this.isShare = true;
                              this.close();
                              return;
                          }), Laya.Handler.create(this, () => {
                              cent = this.getCent(1);
                              GameData.Inst.addCent(cent);
                              this.close();
                              return;
                          }), 7);
                      }
                      else {
                          cent = this.getCent(1);
                          GameData.Inst.addCent(cent);
                          this.close();
                          return;
                      }
                  }
              }
              else {
                  if (this.bannerState == 1)
                      return;
                  this.bannerState = 1;
                  Laya.timer.once(1500, this, () => {
                      this.getComponent(BannerScr).showOldBanner();
                      Laya.Tween.to(this.btn_gotoGame, { y: 1093 + (Laya.stage.height - 1334) / 2 }, 200);
                  });
                  Laya.timer.once(2500, this, () => {
                      this.bannerState = 2;
                  });
              }
          });
          this.box_select.on(Laya.Event.CLICK, this, () => {
              if (this.isshowindex == 0)
                  this.showCent();
              else
                  this.showCent1();
          });
      }
      onEnable() {
          if (GameData.Inst.platform.id == BaseConfig.pid_oppo)
              GameData.Inst.platform.interADPanel.y = Laya.stage.height - 1334;
          Laya.timer.once(100, this, this.showCent2);
          this.isShare = false;
          if (GameData.Inst.platform.id == BaseConfig.pid_qq)
              this.box_select.visible = false;
      }
      showCent2() {
          if (this.img_selected.visible) {
              if (this.isshowindex == 0)
                  this.txt_get_cent.text = "" + Math.floor(this.getCent(3));
              else
                  this.txt_get_cent.text = "" + Math.floor(this.getCent(1));
          }
          else {
              if (this.isshowindex == 0)
                  this.txt_get_cent.text = "" + Math.floor(this.getCent(1));
              else
                  this.txt_get_cent.text = "" + Math.floor(this.getCent(3));
          }
      }
      showCent1() {
          if (this.img_selected.visible) {
              this.img_selected.visible = false;
              this.txt_get_cent.text = "" + Math.floor(this.getCent(3));
          }
          else {
              this.img_selected.visible = true;
              this.txt_get_cent.text = "" + Math.floor(this.getCent(1));
          }
      }
      showCent() {
          if (this.img_selected.visible) {
              this.img_selected.visible = false;
              this.txt_get_cent.text = "" + Math.floor(this.getCent(1));
          }
          else {
              this.img_selected.visible = true;
              this.txt_get_cent.text = "" + Math.floor(this.getCent(3));
          }
      }
      getCent(rate) {
          return rate * GameStage.Inst.countCent;
      }
      kongzhi() {
          if (GameData.Inst.platform.getSwitch(1))
              Laya.timer.once(2000, this, () => {
                  this.btn_gotoGame.visible = true;
                  this.btn_gotoGame.y = 1033 + (Laya.stage.height - 1334) / 2;
              });
          else {
              this.btn_gotoGame.visible = true;
              this.btn_gotoGame.y = 1033 + (Laya.stage.height - 1334) / 2;
          }
      }
      popup() {
          this.txt_get_cent.text = "0";
          if (GameWinVideo.Inst.completeRate >= 0.9) {
              this.img_star_0.disabled = false;
              this.img_star_1.disabled = false;
              this.img_star_2.disabled = false;
              SoundManager.zhengDongLong();
          }
          else if (GameWinVideo.Inst.completeRate >= 0.8) {
              this.img_star_0.disabled = false;
              this.img_star_1.disabled = false;
              this.img_star_2.disabled = true;
          }
          else if (GameWinVideo.Inst.completeRate >= 0.6) {
              this.img_star_0.disabled = false;
              this.img_star_1.disabled = true;
              this.img_star_2.disabled = true;
          }
          else {
              this.img_star_0.disabled = true;
              this.img_star_1.disabled = true;
              this.img_star_2.disabled = true;
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_wx) {
              JumpPage1.Inst.popup();
              JumpPage1.Inst.callback = Laya.Handler.create(this, () => {
                  this.width = Laya.stage.width;
                  this.height = Laya.stage.height;
                  super.popup();
                  if (GameData.Inst.platform.id == BaseConfig.pid_wx) {
                      if (GameData.Inst.platform.getSwitch(17)) {
                          if (GameData.Inst.platform.id == BaseConfig.pid_wx)
                              this.btn_gotoGame.y = Laya.stage.height - 30;
                          Laya.timer.once(2000, this, () => {
                              Laya.Tween.to(this.btn_gotoGame, { y: 1100 + (Laya.stage.height - 1334) / 2 }, 200);
                              this.bannerState = 2;
                          });
                      }
                  }
                  else {
                      this.bannerState = 2;
                      this.btn_gotoGame.y = 1100 + (Laya.stage.height - 1334) / 2;
                      this.getComponent(BannerScr).showOldBanner();
                  }
              });
              return;
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_qq) {
              if (GameData.Inst.platform.getSwitch(18)) {
                  let stateSwitch = GameData.Inst.platform.gameSwitch.delay_egg_switch3;
                  if (GameData.Inst.platform.gameSwitch.delay_egg_switch3 == 3) {
                      stateSwitch = this.switchCount % 2 + 1;
                      this.switchCount++;
                  }
                  if (stateSwitch == 1) {
                      EggStartPanel.Inst.popup();
                      EggStartPanel.Inst.zhuantai = 3;
                      EggStartPanel.Inst.jumpHandler = Laya.Handler.create(this, () => {
                          this.btn_gotoGame.visible = false;
                          this.width = Laya.stage.width;
                          this.height = Laya.stage.height;
                          if (GameData.Inst.platform.id == BaseConfig.pid_qq)
                              this.kongzhi();
                          this.width = Laya.stage.width;
                          this.height = Laya.stage.height;
                          super.popup();
                      });
                  }
                  else if (stateSwitch == 2) {
                      EggEndQQPanel.Inst.popup();
                      EggEndQQPanel.Inst.zhuantai = 3;
                      EggEndQQPanel.Inst.jumpHandler = Laya.Handler.create(this, () => {
                          this.btn_gotoGame.visible = false;
                          this.width = Laya.stage.width;
                          this.height = Laya.stage.height;
                          if (GameData.Inst.platform.id == BaseConfig.pid_qq)
                              this.kongzhi();
                          this.width = Laya.stage.width;
                          this.height = Laya.stage.height;
                          super.popup();
                      });
                  }
                  else {
                      this.width = Laya.stage.width;
                      this.height = Laya.stage.height;
                      this.btn_gotoGame.visible = false;
                      if (GameData.Inst.platform.id == BaseConfig.pid_qq)
                          this.kongzhi();
                      this.width = Laya.stage.width;
                      this.height = Laya.stage.height;
                      super.popup();
                  }
              }
              else {
                  this.width = Laya.stage.width;
                  this.height = Laya.stage.height;
                  this.btn_gotoGame.visible = false;
                  if (GameData.Inst.platform.id == BaseConfig.pid_qq)
                      this.kongzhi();
                  this.width = Laya.stage.width;
                  this.height = Laya.stage.height;
                  super.popup();
              }
              return;
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_oppo) {
              if (GameData.Inst.platform.bannerADObj && !GameData.Inst.platform.getSwitch(8) && GameData.Inst.platform.getSwitch(1)) {
                  GameData.Inst.platform.bannerADObj.hide();
                  this.btn_gotoGame.y = Laya.stage.height - 30;
                  this.bannerState = 1;
                  Laya.timer.once(3000, this, () => {
                      GameData.Inst.platform.InterAD(null);
                      this.bannerState = 2;
                      Laya.Tween.to(this.btn_gotoGame, { y: 1030 + (Laya.stage.height - 1334) / 2 }, 200);
                  });
              }
              else {
                  GameData.Inst.platform.bannerADObj.hide();
                  GameData.Inst.platform.InterAD(null);
                  this.btn_gotoGame.y = 1030 + (Laya.stage.height - 1334) / 2;
                  this.bannerState = 2;
              }
              super.popup();
              return;
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_vivo) {
              if (GameData.Inst.platform.bannerADObj)
                  GameData.Inst.platform.bannerADObj.hide();
              GameData.Inst.platform.InterAD(null);
              this.btn_gotoGame.y = 1030 + (Laya.stage.height - 1334) / 2;
              this.bannerState = 2;
              if (GameData.Inst.platform.getSwitch(6)) {
                  this.box_select1.visible = false;
                  Laya.timer.once(3000, this, () => {
                      this.box_select1.visible = true;
                  });
              }
              super.popup();
              return;
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_dy) {
              this.bannerState = 2;
              if (GameData.Inst.platform.getSwitch(5)) {
                  EggEndTTPanel.Inst.popup();
                  EggEndTTPanel.Inst.jumpHandler = Laya.Handler.create(this, () => {
                      this.width = Laya.stage.width;
                      this.height = Laya.stage.height;
                      this.btn_gotoGame.y = 1030 + (Laya.stage.height - 1334) / 2;
                      console.log("准备popup");
                      super.popup();
                      vidioshare.Inst.popup();
                      console.log("popup  ok");
                      if (this.isshowindex == 0) {
                          this.box_select1.getChildByName("txt_select_0").text = "看视频3倍领取";
                      }
                      else {
                          this.box_select1.getChildByName("txt_select_0").text = "不看视频，不3倍领取";
                      }
                      if (!GameData.Inst.platform.getSwitch(7)) {
                          this.box_select1.visible = false;
                          this.isshowindex = 0;
                      }
                  });
                  return;
              }
              else {
                  this.width = Laya.stage.width;
                  this.height = Laya.stage.height;
                  this.btn_gotoGame.y = 1030 + (Laya.stage.height - 1334) / 2;
                  Laya.timer.once(300, this, () => {
                      super.popup();
                      vidioshare.Inst.popup();
                  });
                  if (this.isshowindex == 0) {
                      this.box_select1.getChildByName("txt_select_0").text = "看视频3倍领取";
                  }
                  else {
                      this.box_select1.getChildByName("txt_select_0").text = "不看视频，不3倍领取";
                  }
                  if (!GameData.Inst.platform.getSwitch(7)) {
                      this.box_select1.visible = false;
                      this.isshowindex = 0;
                  }
              }
          }
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
          Laya.timer.once(300, this, () => {
              super.popup();
          });
      }
      overHandler() {
          if (GameData.Inst.platform.id == BaseConfig.pid_qq) {
              if (GameData.Inst.platform.getSwitch(9)) {
                  let stateSwitch = GameData.Inst.platform.gameSwitch.delay_egg_switch4;
                  if (GameData.Inst.platform.gameSwitch.delay_egg_switch4 == 3) {
                      stateSwitch = BoxPanel.Inst.switchCount % 2 + 1;
                      BoxPanel.Inst.switchCount++;
                  }
                  if (stateSwitch == 1) {
                      EggStartPanel.Inst.popup();
                      EggStartPanel.Inst.zhuantai = 4;
                      EggStartPanel.Inst.jumpHandler = Laya.Handler.create(this, () => {
                          GameStage.Inst.showGameView();
                      });
                  }
                  else if (stateSwitch == 2) {
                      EggEndQQPanel.Inst.popup();
                      EggEndQQPanel.Inst.zhuantai = 4;
                      EggEndQQPanel.Inst.jumpHandler = Laya.Handler.create(this, () => {
                          GameStage.Inst.showGameView();
                      });
                  }
                  else {
                      GameStage.Inst.showGameView();
                  }
              }
              else {
                  GameStage.Inst.showGameView();
              }
          }
          else if (GameData.Inst.platform.id == BaseConfig.pid_wx) {
              JumpPage2.Inst.popup();
              JumpPage2.Inst.callback = Laya.Handler.create(this, () => {
                  GameStage.Inst.showGameView();
              });
          }
          else {
              GameStage.Inst.showGameView();
          }
      }
      close() {
          if (GameData.Inst.platform.id == BaseConfig.pid_dy) {
              GameData.Inst.platform.videointerval++;
              if (GameData.Inst.platform.videointerval > GameData.Inst.platform.gameSwitch.video_number)
                  GameData.Inst.platform.videointerval = 0;
          }
          console.log("强制看视频的冷却", GameData.Inst.platform.videointerval);
          this.isshowindex = this.isshowindex + 1;
          this.isshowindex = (this.isshowindex) % 2;
          this.bannerState = 0;
          super.close();
          console.log("到这里了");
          Laya.timer.clearAll(this);
          if (GameData.Inst.platform.id == BaseConfig.pid_oppo)
              GameData.Inst.platform.interADPanel.close();
          if (GameData.Inst.isTest) {
              GameStage.Inst.showGameView();
              return;
          }
          if (GameData.Inst.data.key >= 3 && GameData.Inst.platform.id != BaseConfig.pid_oppo) {
              BoxPanel.Inst.popup();
              BoxPanel.Inst.closeCallback = Laya.Handler.create(this, this.overHandler);
          }
          else {
              if (GameData.Inst.platform.getSwitch(5) && [BaseConfig.pid_qq, BaseConfig.pid_wx, BaseConfig.pid_dy].indexOf(GameData.Inst.platform.id) == -1) {
                  EggPanel.Inst.popup();
                  EggPanel.Inst.closeCallback = Laya.Handler.create(this, this.overHandler);
              }
              else {
                  GameStage.Inst.showGameView();
                  if (GameData.Inst.platform.id == BaseConfig.pid_vivo && GameData.Inst.platform.getSwitch(7) && !GameData.Inst.platform.getSwitch(8))
                      GameData.Inst.platform.InterAD(null);
              }
          }
      }
  }

  class BaseGameStage extends ui.view.GameStageUI {
      constructor() {
          super();
          this.isStart = false;
          this.isPause = false;
          this.isReset = false;
          this.isOver = false;
          this.countCent = 0;
      }
      onEnable() {
      }
      playerLose() {
          this.isOver = true;
          Laya.timer.once(1000, this, () => {
              SoundManager.playLose();
              SoundManager.zhengDongLong();
          });
          Laya.timer.once(2000, this, () => {
              Laya.timer.clearAll(this);
              GameData.Inst.platform.stopVideo();
          });
      }
      playerWin() {
          this.isOver = true;
          GameData.Inst.data.key++;
          GameData.Inst.updateLevel();
          Laya.timer.once(1000, this, () => {
              SoundManager.playWin();
              SoundManager.zhengDongLong();
          });
          Laya.timer.once(2000, this, () => {
              Laya.timer.clearAll(this);
              GameData.Inst.platform.stopVideo();
              GameWin.Inst.popup();
          });
      }
      getCent(cent) {
          this.countCent += cent;
      }
      showGameView() {
          GameData.Inst.updateLevelJSON();
          GameData.Inst.gameScene && Laya.Scene.open(GameData.Inst.gameScene);
      }
      startGame() {
          if (GameData.Inst.platform.bannerADObj)
              GameData.Inst.platform.bannerADObj.hide();
          if (GameData.Inst.data.level <= 1 && GameData.Inst.platform.id != BaseConfig.pid_qq) {
              GameStage.Inst.playGame();
          }
          else if (GameData.Inst.data.level >= 2 || GameData.Inst.platform.id == BaseConfig.pid_qq) {
              if (GameData.Inst.platform.getSwitch(14)) {
                  if (GameData.Inst.platform.id == BaseConfig.pid_qq) {
                      let stateSwitch = GameData.Inst.platform.gameSwitch.delay_egg_switch1;
                      if (GameData.Inst.platform.gameSwitch.delay_egg_switch1 == 3) {
                          stateSwitch = GameStage.switchCount % 2 + 1;
                          GameStage.switchCount++;
                      }
                      if (stateSwitch == 1) {
                          EggStartPanel.Inst.popup();
                          EggStartPanel.Inst.jumpHandler = Laya.Handler.create(this, () => {
                              this.playGame();
                          });
                          EggStartPanel.Inst.zhuantai = 1;
                      }
                      else if (stateSwitch == 2) {
                          EggEndQQPanel.Inst.popup();
                          EggEndQQPanel.Inst.jumpHandler = Laya.Handler.create(this, () => {
                              this.playGame();
                          });
                          EggEndQQPanel.Inst.zhuantai = 1;
                      }
                      else {
                          this.playGame();
                      }
                  }
                  else {
                      this.playGame();
                  }
              }
              else {
                  this.playGame();
              }
          }
          else {
              this.playGame();
          }
      }
      playGame() {
          this.isStart = true;
          this.event(Laya.Event.START);
          GameData.Inst.platform.sendLog(1008);
          GameData.Inst.platform.recordVideo(null, null);
      }
      get isPlaing() {
          if (!this.isStart)
              return false;
          if (this.isPause)
              return false;
          if (this.isReset)
              return false;
          if (this.isOver)
              return false;
          return true;
      }
      init() {
          this.isStart = false;
          this.isPause = false;
          this.isReset = false;
          this.isOver = false;
          this.countCent = 0;
      }
      onDisable() {
          super.onDisable();
          this.removeChildren();
          this.destroy();
      }
      destroy() {
          super.destroy();
          Laya.timer.clearAll(this);
      }
  }
  BaseGameStage.switchCount = 0;

  class GameStage extends BaseGameStage {
      constructor() {
          super();
          GameStage._inst = this;
      }
      static get Inst() {
          return GameStage._inst;
      }
      onEnable() {
          super.onEnable();
          ResManager.scene3d.input.multiTouchEnabled = false;
          ResManager.scene3d.mouseEnabled = false;
      }
      playerLose() {
          super.playerLose();
          GameInfo.Inst.off(Laya.Event.END, this, this.timeOver);
          GameInfo.Inst.clearTime();
      }
      playerWin() {
          this.getCent(GameData.Inst.levelItem.totalReward);
          GameInfo.Inst.off(Laya.Event.END, this, this.timeOver);
          GameInfo.Inst.clearTime();
          super.playerWin();
      }
      timeOver() {
          this.playerLose();
      }
      showGameView() {
          GameData.Inst.updateLevelJSON();
          GameData.Inst.gameScene && Laya.Scene.open(GameData.Inst.gameScene);
      }
      playGame() {
          super.playGame();
      }
      init() {
          super.init();
          GameInfo.Inst.visible = false;
          GameStage.Inst.on(Laya.Event.START, this, () => {
              console.log("GameStage.Inst.on  Laya.Event.START");
          });
      }
      onDisable() {
          super.onDisable();
          this.camera = null;
      }
      destroy() {
          super.destroy();
          this.camera = null;
      }
  }

  class JumpPage2 extends ui.ads.JumpPage2UI {
      constructor() {
          super();
          this.isBack = false;
          this.isBack2 = false;
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
      }
      static get Inst() {
          if (JumpPage2._inst == null)
              JumpPage2._inst = new JumpPage2();
          return JumpPage2._inst;
      }
      onAwake() {
          this.btn_close.on(Laya.Event.CLICK, this, () => {
              if (!GameData.Inst.platform.getSwitch(17)) {
                  this.close();
                  return;
              }
              if (this.bannerState == 2) {
                  this.close();
              }
              else {
                  if (this.bannerState == 1)
                      return;
                  this.bannerState = 1;
                  Laya.timer.once(1500, this, () => {
                      this.getComponent(BannerScr).showOldBanner();
                  });
                  Laya.timer.once(2500, this, () => {
                      this.bannerState = 2;
                      this.getComponent(BannerScr).onDisable();
                  });
              }
          });
      }
      onEnable() {
          this.bannerState = 0;
          this.btn_close.y = Laya.stage.height - 100 / 2 - 80;
          this.list_ad.height = Laya.stage.height - this.list_ad.x - 80;
      }
      onDisable() {
      }
      popup() {
          if (GameData.Inst.platform.id != BaseConfig.pid_wx) {
              this.visible = false;
              return;
          }
          let id = "1005";
          if (GameData.Inst.platform.gameList && GameData.Inst.platform.gameList.length > 0) {
              let list = GameData.Inst.platform.getGameList(id);
              if (list.length > 0) {
                  this.list_ad.array = list;
              }
              else {
                  this.list_ad.array = [];
              }
              let list2 = GameData.Inst.platform.getGameList(id);
              if (list2.length > 0) {
                  this.list_ad2.array = list2;
              }
              else {
                  this.list_ad2.array = [];
              }
          }
          else {
              this.list_ad.array = [];
          }
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
          this.img_bg.width = Laya.stage.width;
          this.img_bg.height = Laya.stage.height;
          if (GameStage.Inst.isOver && GameData.Inst.platform.getSwitch(5)) {
              EggPanel.Inst.popup();
              EggPanel.Inst.closeCallback = Laya.Handler.create(this, () => {
                  if (this.list_ad.array.length <= 0) {
                      if (this.callback)
                          this.callback.run();
                      return;
                  }
                  super.popup();
                  this.list_ad.refresh();
                  this.list_ad2.refresh();
              });
          }
          else {
              if (this.list_ad.array.length <= 0) {
                  if (this.callback)
                      this.callback.run();
                  return;
              }
              super.popup();
              this.list_ad.refresh();
              this.list_ad2.refresh();
          }
      }
      close() {
          super.close();
          Laya.timer.clearAll(this);
          if (this.callback) {
              this.callback.run();
              this, this.callback = null;
          }
      }
  }

  class ADSList extends Laya.Script {
      constructor() {
          super();
          this.showType = 0;
          this.clickList = [];
          this.isBack = false;
      }
      onAwake() {
          if (GameData.Inst.platform.id == BaseConfig.pid_dy && GameData.Inst.platform.proxy.getSystemInfoSync().platform == "ios") {
              this.list_ad = this.owner;
              this.list_ad.visible = false;
              return;
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_vivo)
              return;
          this.list_ad = this.owner;
          this.list_ad.selectEnable = true;
          this.list_ad.selectHandler = Laya.Handler.create(this, (index) => {
              if (index >= 0) {
                  let data = this.list_ad.selectedItem;
                  let gameList = [];
                  if (this.clickList.indexOf(data.appid) == -1) {
                      this.clickList.push(data.appid);
                  }
                  else {
                      for (let i = 0; i < this.list_ad.length; i++) {
                          if (this.clickList.indexOf(this.list_ad.array[i].appid) == -1) {
                              data = this.list_ad.array[i];
                              this.clickList.push(this.list_ad.array[i].appid);
                              break;
                          }
                          if (i == this.list_ad.array.length - 1)
                              this.clickList = [];
                      }
                  }
                  gameList[0] = { appId: data.appid, query: data.toLinks, pkgname: data.pkgname, posid: data.id };
                  GameData.Inst.platform.openApp(gameList, Laya.Handler.create(this, () => {
                      if (this.showType == 1)
                          JumpPage2.Inst.popup();
                  }));
                  console.log("GameList", gameList[0]);
                  this.list_ad.selectedIndex = -1;
              }
          }, [], false);
          this.list_ad.renderHandler = Laya.Handler.create(this, (cell, index) => {
              let data = cell.dataSource;
              if (cell.img_icon)
                  cell.img_icon.skin = data.param;
              if (cell.txt_name)
                  cell.txt_name.text = (data.name + "").replace("dy", "");
          }, [], false);
      }
      onDisable() {
          Laya.timer.clearAll(this);
      }
      onEnable() {
          if (GameData.Inst.platform.id == BaseConfig.pid_dy && GameData.Inst.platform.proxy.getSystemInfoSync().platform == "ios") {
              this.list_ad = this.owner;
              this.list_ad.visible = false;
              return;
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_vivo)
              return;
          this.list_ad.scrollTo(0);
          this.isBack = false;
          Laya.timer.loop(1000 / 60, this, () => {
              if (this.list_ad.scrollBar.value <= 0) {
                  this.isBack = false;
              }
              else if (this.list_ad.scrollBar.value >= this.list_ad.scrollBar.max - 10) {
                  this.isBack = true;
              }
              if (this.isBack) {
                  this.list_ad.scrollBar.value -= 3;
              }
              else {
                  this.list_ad.scrollBar.value += 3;
              }
          });
      }
  }

  class JumpPageGame extends ui.ads.JumpPageGameUI {
      constructor() {
          super();
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
          this.btn_click.clickHandler = Laya.Handler.create(this, () => {
              Laya.Tween.to(this.box_list, { left: -421 }, 250);
              this.btn_click.visible = false;
              this.btn_click2.visible = false;
          }, [], false);
          this.btn_click2.clickHandler = Laya.Handler.create(this, () => {
              Laya.Tween.to(this.box_list, { left: 0 }, 250);
              this.btn_click.visible = false;
              this.btn_click2.visible = false;
          }, [], false);
      }
      static get Inst() {
          if (JumpPageGame._inst == null)
              JumpPageGame._inst = new JumpPageGame();
          return JumpPageGame._inst;
      }
      onAwake() {
          this.btn_close.on(Laya.Event.CLICK, this, () => {
              JumpPage2.Inst.popup();
              JumpPage2.Inst.callback = null;
          });
      }
      onEnable() {
          if (GameData.Inst.platform.id != BaseConfig.pid_wx) {
              this.visible = false;
              return;
          }
          this.box_list.visible = false;
          let id = "1006";
          if (GameData.Inst.platform.gameList && GameData.Inst.platform.gameList.length > 0) {
              let list = GameData.Inst.platform.getGameList(id);
              if (list.length > 0) {
                  this.list_ad.array = list;
              }
              else {
                  this.list_ad.array = [];
              }
          }
          else {
              this.list_ad.array = [];
          }
          this.btn_close.visible = GameData.Inst.platform.getSwitch(0);
          this.btn_click2.clickHandler.run();
      }
      onDisable() {
          Laya.timer.clearAll(this);
      }
  }

  class BtnSoundScript extends Laya.Script {
      onAwake() {
          this.btn = this.owner;
      }
      onMouseUp() {
      }
      onMouseDown() {
          SoundManager.playButton();
      }
      onMouseOut() {
      }
  }

  class BlockAdScr extends Laya.Script {
      constructor() {
          super();
          this.showType = 0;
          this.showHV = 0;
          this.showNum = 2;
          this.isInit = false;
      }
      onAwake() {
          if (GameData.Inst.platform.id != BaseConfig.pid_qq)
              return;
          this.proxy = GameData.Inst.platform.proxy;
      }
      onEnable() {
          this.showBanner();
      }
      showBanner() {
          this.isInit = false;
          if (GameData.Inst.platform.id != BaseConfig.pid_qq)
              return;
          if (this.proxy.createBlockAd == null)
              return;
          if (!GameData.Inst.platform.getSwitch(16))
              return;
          if (this.blockAdObj)
              this.blockAdObj.destroy();
          this.blockAdObj = this.proxy.createBlockAd({
              adUnitId: "47552167d7af408bf1bcf9f305ba0ed9",
              size: this.showNum,
              orientation: (this.showHV == 0 ? "vertical" : "landscape"),
              style: {
                  left: 20,
                  top: 200
              }
          });
          this.blockAdObj.onError((err) => {
              console.log("blockAdObj 加载失败", err);
          });
          this.blockAdObj.onLoad(() => {
              console.log("blockAdObj 显示成功");
          });
          this.blockAdObj.onResize((size) => {
              let systemInfo = this.proxy.getSystemInfoSync();
              console.log("blockAdObj setSize", size.width, size.height, systemInfo);
              let windowWidth = systemInfo.windowWidth;
              let windowHeight = systemInfo.windowHeight;
              if (this.showType == 0) {
                  this.blockAdObj.style.left = 10;
              }
              else if (this.showType == 1) {
                  this.blockAdObj.style.left = windowWidth - 10;
              }
              else {
                  this.blockAdObj.style.left = (windowWidth - size.width) / 2;
              }
              this.blockAdObj.style.top = (windowHeight - size.height) / 2 - this.showNum * 50;
              this.isInit = true;
              this.blockAdObj.show();
          });
      }
      refreshBanner() {
          if (this.isInit) {
              this.showBanner();
          }
      }
      onDisable() {
          if (this.isInit) {
              if (this.blockAdObj)
                  this.blockAdObj.destroy();
          }
          this.isInit = false;
          Laya.timer.clearAll(this);
      }
      onDestroy() {
          if (this.blockAdObj)
              this.blockAdObj.destroy();
          this.isInit = false;
          Laya.timer.clearAll(this);
      }
  }

  class GameList extends Laya.Script {
      constructor() {
          super();
          this.posid = "1002";
          this.clickList = [];
          this.isBack = false;
      }
      onAwake() {
          if (GameData.Inst.platform.id == BaseConfig.pid_dy && GameData.Inst.platform.proxy.getSystemInfoSync().platform == "ios") {
              this.list = this.owner;
              this.bg = this.list.getChildByName("bg");
              this.bg.visible = true;
              this.list.visible = false;
          }
          this.list = this.owner;
          this.bg = this.list.getChildByName("bg");
          if (this.bg) {
              this.bg.on(Laya.Event.CLICK, this, (event) => {
                  console.log("GameList bg", event);
                  if (GameData.Inst.platform.id == BaseConfig.pid_qq) {
                      if (!GameData.Inst.platform.getSwitch(13))
                          return;
                      if (this.appBox)
                          this.appBox.destroy();
                      this.appBox = GameData.Inst.platform.proxy.createAppBox({ adUnitId: "9f928d9c98d3da353c1e9836a4adbf72" });
                      this.appBox.onClose(() => {
                          this.appBox.destroy();
                          this.appBox = null;
                      });
                      this.appBox.load().then(() => {
                          console.log("AppBox 显示成功");
                          this.appBox.show();
                      });
                  }
              });
          }
          this.list.selectEnable = true;
          this.list.selectHandler = Laya.Handler.create(this, (index) => {
              if (index >= 0) {
                  let data = this.list.selectedItem;
                  let gameList = [];
                  if (this.clickList.indexOf(data.appid) == -1) {
                      this.clickList.push(data.appid);
                  }
                  else {
                      for (let i = 0; i < this.data.length; i++) {
                          if (this.clickList.indexOf(data.appid) == -1) {
                              data = this.data[i];
                              break;
                          }
                          if (i == this.data.length - 1)
                              this.clickList = [];
                      }
                  }
                  gameList[0] = { appId: data.appid, query: data.toLinks, pkgname: data.pkgname, posid: data.id };
                  GameData.Inst.platform.openApp(gameList, null);
                  console.log("GameList", gameList[0]);
                  this.list.selectedIndex = -1;
              }
          }, [], false);
          this.list.renderHandler = Laya.Handler.create(this, (cell, index) => {
              let data = cell.dataSource;
              cell.img_icon.skin = data.param;
              cell.txt_name.text = (data.name + "").replace("dy", "");
          }, [], false);
      }
      onDisable() {
          Laya.timer.clearAll(this);
      }
      onEnable() {
          this.clickList = [];
          if (GameData.Inst.platform.id == BaseConfig.pid_wx) {
              this.bg.visible = false;
              this.list.visible = true;
          }
          else if (GameData.Inst.platform.id == BaseConfig.pid_oppo) {
              if (GameData.Inst.platform.getSwitch(4)) {
                  this.bg.visible = false;
                  this.list.visible = true;
              }
              else {
                  this.bg.visible = true;
                  this.list.visible = false;
                  return;
              }
          }
          else if (GameData.Inst.platform.id == BaseConfig.pid_dy) {
              this.bg.visible = false;
              this.list.visible = true;
              if (GameData.Inst.platform.id == BaseConfig.pid_dy && GameData.Inst.platform.proxy.getSystemInfoSync().platform == "ios") {
                  this.bg.visible = true;
                  this.list.visible = false;
              }
          }
          else {
              if (this.bg)
                  this.bg.visible = true;
              if (!GameData.Inst.platform.getSwitch(4)) {
                  this.list.array = [];
                  return;
              }
          }
          if (GameData.Inst.platform.gameList && GameData.Inst.platform.gameList.length > 0) {
              if (this.data == null) {
                  let list = [];
                  if (GameData.Inst.platform.id == BaseConfig.pid_wx) {
                      this.data = GameData.Inst.platform.getGameList("1007");
                  }
                  else {
                      for (let i = 0; i < GameData.Inst.platform.gameList.length; i++) {
                          {
                              list.push(GameData.Inst.platform.gameList[i]);
                          }
                      }
                      for (let i = 0; i < GameData.Inst.platform.gameList.length; i++) {
                          {
                              list.push(GameData.Inst.platform.gameList[i]);
                          }
                      }
                      list = list.sort((item0, item1) => {
                          return Math.random() ? -1 : 1;
                      });
                      this.data = list;
                  }
              }
              if (this.data) {
                  this.list.array = this.data;
                  if (this.bg)
                      this.bg.visible = false;
                  if (GameData.Inst.platform.id == BaseConfig.pid_wx || GameData.Inst.platform.id == BaseConfig.pid_oppo || GameData.Inst.platform.id == BaseConfig.pid_dy) {
                      this.list.scrollTo(0);
                      this.isBack = false;
                      Laya.timer.loop(1000 / 60, this, () => {
                          if (this.list.scrollBar.value <= 0) {
                              this.isBack = false;
                          }
                          else if (this.list.scrollBar.value >= this.list.scrollBar.max - 10) {
                              this.isBack = true;
                          }
                          if (this.isBack) {
                              this.list.scrollBar.value -= 3;
                          }
                          else {
                              this.list.scrollBar.value += 3;
                          }
                      });
                  }
              }
              else {
                  this.list.array = [];
              }
          }
          else {
              this.list.array = [];
          }
      }
  }

  class GameADAni extends Laya.Script {
      constructor() {
          super();
          this.posid = 0;
      }
      onAwake() {
          if (GameData.Inst.platform.id == BaseConfig.pid_dy && GameData.Inst.platform.proxy.getSystemInfoSync().platform == "ios") {
              this.item = this.owner;
              this.item.visible = false;
              return;
          }
          this.item = this.owner;
          if (GameData.Inst.platform.id == BaseConfig.pid_vivo)
              return;
          this.item.btn_click.on(Laya.Event.CLICK, this, () => {
              if (this.data == null)
                  return;
              let gameList = [];
              gameList[0] = { appId: this.data.appid, query: this.data.toLinks, pkgname: this.data.pkgname, posid: this.data.id };
              GameData.Inst.platform.openApp(gameList, Laya.Handler.create(this, () => {
                  JumpPage2.Inst.popup();
              }));
          });
      }
      show(isAni = false) {
          if (isAni) {
              Laya.timer.once(2000, this, this.show, [false], false);
              Laya.Tween.to(this.item.btn_click, { rotation: -25 }, 250);
              Laya.Tween.to(this.item.btn_click, { rotation: 0 }, 250, null, null, 250);
              Laya.Tween.to(this.item.btn_click, { rotation: 25 }, 250, null, null, 500);
              Laya.Tween.to(this.item.btn_click, { rotation: 0 }, 250, null, null, 750);
          }
          else {
              this.data = this.gameList[this.index];
              this.item.img_icon.skin = this.data.param;
              this.item.txt_name.text = (this.data.name + "").replace("dy", "");
              this.index++;
              this.index = this.index % this.gameList.length;
              Laya.timer.once(2000, this, this.show, [true], false);
          }
      }
      onDisable() {
          Laya.timer.clearAll(this);
          Laya.Tween.clearAll(this.item.btn_click);
      }
      onEnable() {
          if (GameData.Inst.platform.id == BaseConfig.pid_dy && GameData.Inst.platform.proxy.getSystemInfoSync().platform == "ios") {
              this.item = this.owner;
              this.item.visible = false;
              return;
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_vivo) {
              this.item.visible = false;
              return;
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_wx) {
          }
          else {
          }
          if (GameData.Inst.platform.gameList && GameData.Inst.platform.gameList.length > 0) {
              if (this.gameList == null) {
                  let list = [];
                  if (GameData.Inst.platform.id == BaseConfig.pid_wx) {
                      for (let i = 0; i < GameData.Inst.platform.gameList.length; i++) {
                          if (GameData.Inst.platform.gameList[i].position == "1002") {
                              list.push(GameData.Inst.platform.gameList[i]);
                          }
                      }
                  }
                  else {
                      for (let i = 0; i < GameData.Inst.platform.gameList.length; i++) {
                          list.push(GameData.Inst.platform.gameList[i]);
                      }
                  }
                  list = list.sort((item0, item1) => {
                      return Math.random() ? -1 : 1;
                  });
                  this.gameList = list;
              }
              if (this.gameList && this.gameList.length > 0) {
                  this.item.btn_click.scaleX = this.item.btn_click.scaleY = 1;
                  this.item.visible = true;
                  this.index = this.posid == -1 ? 0 : Math.floor(Math.random() * this.gameList.length);
                  this.show();
              }
              else {
                  this.item.visible = false;
              }
          }
          else {
              this.item.visible = false;
          }
      }
  }

  class isshow extends Laya.Script {
      onEnable() {
          this.item = this.owner;
          GameView.Inst.on(Laya.Event.START, this, this.yingchang);
          GameView.Inst.on(Laya.Event.CHANGE, this, this.xianshi);
      }
      xianshi() {
          if (GameData.Inst.platform.id == BaseConfig.pid_vivo)
              this.item.visible = true;
      }
      yingchang() {
          if (GameData.Inst.platform.id == BaseConfig.pid_vivo)
              this.item.visible = false;
      }
  }

  class JumpPageMain extends ui.ads.JumpPageMainUI {
      constructor() {
          super();
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
      }
      static get Inst() {
          if (JumpPageMain._inst == null)
              JumpPageMain._inst = new JumpPageMain();
          return JumpPageMain._inst;
      }
      onAwake() {
          this.btn_close.on(Laya.Event.CLICK, this, () => {
              this.close();
          });
      }
      onEnable() {
      }
      onDisable() {
      }
      popup() {
          if (GameData.Inst.platform.id != BaseConfig.pid_wx) {
              this.visible = false;
              return;
          }
          if (GameView.Inst.box_bottom.visible) {
              GameView.Inst.event(Laya.Event.START);
          }
          let id = "1003";
          if (GameData.Inst.platform.gameList && GameData.Inst.platform.gameList.length > 0) {
              let list = GameData.Inst.platform.getGameList(id);
              if (list.length > 0) {
                  this.list_ad.array = list;
              }
              else {
                  this.list_ad.array = [];
              }
          }
          else {
              this.list_ad.array = [];
          }
          if (this.list_ad.array.length <= 0)
              return;
          Laya.timer.once(500, this, () => {
              this.width = Laya.stage.width;
              this.height = Laya.stage.height;
              this.list_ad.refresh();
              super.popup();
          });
      }
      close() {
          super.close();
          Laya.timer.clearAll(this);
          if (GameView.Inst.box_bottom.visible) {
              GameView.Inst.event(Laya.Event.CHANGE);
          }
      }
  }

  class GameMore extends Laya.Script {
      constructor() {
          super();
          this.posid = 0;
          this.isshow = false;
      }
      onAwake() {
          if (GameData.Inst.platform.id == BaseConfig.pid_dy && GameData.Inst.platform.proxy.getSystemInfoSync().platform == "ios") {
              this.item = this.owner;
              this.item.visible = false;
              return;
          }
          this.item = this.owner;
          if (GameData.Inst.platform.id == BaseConfig.pid_vivo)
              return;
          this.item.btn_click.on(Laya.Event.CLICK, this, () => {
              if (GameData.Inst.platform.id == BaseConfig.pid_wx) {
                  JumpPageMain.Inst.popup();
                  return;
              }
              if (GameData.Inst.platform.id == BaseConfig.pid_qq) {
                  if (this.appBox)
                      this.appBox.destroy();
                  this.appBox = GameData.Inst.platform.proxy.createAppBox({ adUnitId: "815449bea27d1ca778150d43eb9687fa" });
                  this.appBox.onClose(() => {
                      this.appBox.destroy();
                      this.appBox = null;
                  });
                  this.appBox.load().then(() => {
                      console.log("AppBox 显示成功");
                      this.appBox.show();
                  });
                  return;
              }
              if ([BaseConfig.pid_dy, BaseConfig.pid_oppo, BaseConfig.pid_test].indexOf(GameData.Inst.platform.id) != -1) {
                  if (!this.isshow) {
                      this.isshow = true;
                      this.owner.getChildByName("drawer").getChildByName("list_oppo").array = this.data;
                      let sprint = this.owner.getChildByName("drawer");
                      Laya.Tween.to(this.owner, { x: 270 }, 250);
                      Laya.stage.zOrder;
                  }
                  else {
                      let sprint = this.owner.getChildByName("drawer");
                      Laya.Tween.to(this.owner, { x: -9 }, 250);
                      this.isshow = false;
                  }
                  return;
              }
              if (this.data == null)
                  return;
          });
      }
      xianshi() {
          this.item.visible = true;
      }
      yingchang() {
          this.item.visible = false;
      }
      onEnable() {
          if (GameData.Inst.platform.id == BaseConfig.pid_dy && GameData.Inst.platform.proxy.getSystemInfoSync().platform == "ios") {
              return;
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_wx) {
              this.item.visible = true;
              return;
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_qq) {
              this.item.visible = true;
              return;
          }
          if (GameData.Inst.platform.id == BaseConfig.pid_vivo) {
              this.item.visible = false;
              return;
          }
          GameView.Inst.on(Laya.Event.START, this, this.yingchang);
          GameView.Inst.on(Laya.Event.CHANGE, this, this.xianshi);
          if (GameData.Inst.platform.gameList && GameData.Inst.platform.gameList.length > 0) {
              if (this.data == null) {
                  let list = [];
                  for (let i = 0; i < GameData.Inst.platform.gameList.length; i++) {
                      list.push(GameData.Inst.platform.gameList[i]);
                  }
                  for (let i = 0; i < GameData.Inst.platform.gameList.length; i++) {
                      list.push(GameData.Inst.platform.gameList[i]);
                  }
                  list = list.sort((item0, item1) => {
                      return Math.random() ? -1 : 1;
                  });
                  this.data = list;
              }
              if (this.data) {
                  this.item.visible = true;
              }
              else {
                  this.item.visible = false;
              }
          }
          else {
              this.item.visible = false;
          }
      }
  }

  class BannerScr$1 extends Laya.Script {
      constructor() {
          super();
          this.showType = 0;
          this.isInit = false;
      }
      onAwake() {
          if ([BaseConfig.pid_qq, BaseConfig.pid_oppo, BaseConfig.pid_vivo].indexOf(GameData.Inst.platform.id) == -1)
              return;
          GameStage.Inst.on(Laya.Event.START, this, this.showBanner);
          GameStage.Inst.on(Laya.Event.STOPPED, this, this.onDisable);
          this.proxy = GameData.Inst.platform.proxy;
      }
      onEnable() {
      }
      showBanner() {
          if (GameData.Inst.platform.id == BaseConfig.pid_vivo) {
              Laya.timer.once(3000, this, () => {
                  this.isInit = false;
                  if ([BaseConfig.pid_qq, BaseConfig.pid_oppo, BaseConfig.pid_vivo].indexOf(GameData.Inst.platform.id) == -1)
                      return;
                  if (!GameData.Inst.platform.getSwitch(12) && GameData.Inst.platform.id == BaseConfig.pid_qq)
                      return;
                  GameData.Inst.platform.bannerAD(Laya.Handler.create(this, () => {
                      this.isInit = true;
                      GameData.Inst.platform.bannerADObj.show();
                  }));
              });
              return;
          }
          this.isInit = false;
          if ([BaseConfig.pid_qq, BaseConfig.pid_oppo, BaseConfig.pid_vivo].indexOf(GameData.Inst.platform.id) == -1)
              return;
          if (!GameData.Inst.platform.getSwitch(12) && GameData.Inst.platform.id == BaseConfig.pid_qq)
              return;
          GameData.Inst.platform.bannerAD(Laya.Handler.create(this, () => {
              this.isInit = true;
              GameData.Inst.platform.bannerADObj.show();
          }));
      }
      refreshBanner() {
          if (this.isInit) {
              if (GameData.Inst.platform.bannerADObj) {
                  GameData.Inst.platform.bannerADObj.destroy();
                  if (GameData.Inst.platform.id == BaseConfig.pid_qq)
                      GameData.Inst.platform.bannerADObj.offResize();
                  GameData.Inst.platform.bannerADObj.offLoad();
                  GameData.Inst.platform.bannerADObj = null;
              }
              this.showBanner();
          }
      }
      onDisable() {
          if (this.isInit) {
              if (GameData.Inst.platform.bannerADObj)
                  GameData.Inst.platform.bannerADObj.hide();
          }
          this.isInit = false;
          Laya.timer.clearAll(this);
      }
      onDestroy() {
          if (GameData.Inst.platform.bannerADObj)
              GameData.Inst.platform.bannerADObj.hide();
          this.isInit = false;
          Laya.timer.clearAll(this);
      }
  }

  class BannerMainScr extends Laya.Script {
      constructor() {
          super();
          this.showType = 0;
          this.isInit = false;
      }
      onAwake() {
          if ([BaseConfig.pid_qq, BaseConfig.pid_wx, BaseConfig.pid_oppo, BaseConfig.pid_vivo, BaseConfig.pid_dy].indexOf(GameData.Inst.platform.id) == -1)
              return;
          GameView.Inst.on(Laya.Event.START, this, this.onDisable);
          GameView.Inst.on(Laya.Event.CHANGE, this, this.showBanner);
          this.proxy = GameData.Inst.platform.proxy;
      }
      onEnable() {
          if ([BaseConfig.pid_qq, BaseConfig.pid_wx, BaseConfig.pid_oppo, BaseConfig.pid_vivo, BaseConfig.pid_dy].indexOf(GameData.Inst.platform.id) == -1)
              return;
          if (!this.isInit)
              this.showBanner();
      }
      showBanner() {
          this.isInit = false;
          if ([BaseConfig.pid_qq, BaseConfig.pid_oppo, BaseConfig.pid_vivo, BaseConfig.pid_dy].indexOf(GameData.Inst.platform.id) == -1)
              return;
          console.log("显示banner");
          if (GameData.Inst.platform.bannerADObj && GameData.Inst.platform.id == BaseConfig.pid_vivo) {
              if (GameData.Inst.platform.id == BaseConfig.pid_vivo)
                  Laya.timer.once(2500, this, () => {
                      let bool = GameData.Inst.platform.bannerADObj.show();
                      this.isInit = true;
                      console.log(bool);
                      console.log("显示老banner");
                  });
          }
          else {
              console.log("创建banner");
              GameData.Inst.platform.bannerAD(Laya.Handler.create(this, () => {
                  this.isInit = true;
                  GameData.Inst.platform.bannerADObj.show();
              }));
          }
      }
      refreshBanner() {
          if (this.isInit) {
              if (GameData.Inst.platform.bannerADObj) {
                  GameData.Inst.platform.bannerADObj.destroy();
                  GameData.Inst.platform.bannerADObj.offLoad();
                  GameData.Inst.platform.bannerADObj = null;
              }
              this.showBanner();
          }
      }
      onDisable() {
          if (this.isInit) {
              console.log("隐藏老banner");
              if (GameData.Inst.platform.bannerADObj)
                  GameData.Inst.platform.bannerADObj.hide();
          }
          this.isInit = false;
          Laya.timer.clearAll(this);
      }
      onDestroy() {
          if (GameData.Inst.platform.bannerADObj) {
              console.log("销毁banner");
              if (GameData.Inst.platform.id != BaseConfig.pid_vivo)
                  GameData.Inst.platform.bannerADObj.destroy();
          }
          this.isInit = false;
          Laya.timer.clearAll(this);
      }
  }

  class BlockAdGameScr extends Laya.Script {
      constructor() {
          super();
          this.showType = 0;
          this.showHV = 0;
          this.showNum = 5;
          this.isInit = false;
      }
      onAwake() {
          if (GameData.Inst.platform.id != BaseConfig.pid_qq)
              return;
          GameStage.Inst.on(Laya.Event.START, this, this.showBanner);
          GameStage.Inst.on(Laya.Event.STOPPED, this, this.onDisable);
          this.proxy = GameData.Inst.platform.proxy;
      }
      onEnable() {
      }
      showBanner() {
          this.isInit = false;
          if (GameData.Inst.platform.id != BaseConfig.pid_qq)
              return;
          if (this.proxy.createBlockAd == null)
              return;
          if (!GameData.Inst.platform.getSwitch(16))
              return;
          if (this.blockAdObj)
              this.blockAdObj.destroy();
          this.blockAdObj = this.proxy.createBlockAd({
              adUnitId: "47552167d7af408bf1bcf9f305ba0ed9",
              size: this.showNum,
              orientation: (this.showHV == 0 ? "vertical" : "landscape"),
              style: {
                  left: 20,
                  top: 200
              }
          });
          this.blockAdObj.onError((err) => {
              console.log("blockAdObj 加载失败", err);
          });
          this.blockAdObj.onLoad(() => {
              console.log("blockAdObj 显示成功");
          });
          this.blockAdObj.onResize((size) => {
              let systemInfo = this.proxy.getSystemInfoSync();
              console.log("blockAdObj setSize", size.width, size.height, systemInfo);
              let windowWidth = systemInfo.windowWidth;
              let windowHeight = systemInfo.windowHeight;
              if (this.showType == 0) {
                  this.blockAdObj.style.left = 10;
              }
              else if (this.showType == 1) {
                  this.blockAdObj.style.left = windowWidth - 10;
              }
              else {
                  this.blockAdObj.style.left = (windowWidth - size.width) / 2;
              }
              this.blockAdObj.style.top = (windowHeight - size.height) / 2 - this.showNum * 50;
              this.isInit = true;
              this.blockAdObj.show();
              let bannerRefreshTime = GameData.Inst.platform.gameSwitch.Refresh_time2;
              if (!isNaN(bannerRefreshTime) && bannerRefreshTime > 0) {
                  Laya.timer.once(bannerRefreshTime * 1000, this, this.refreshBanner);
              }
          });
      }
      refreshBanner() {
          if (this.isInit) {
              this.showBanner();
          }
      }
      onDisable() {
          if (this.isInit) {
              if (this.blockAdObj) {
                  this.blockAdObj.hide();
                  this.blockAdObj.destroy();
                  this.blockAdObj.offResize();
                  this.blockAdObj.offLoad();
                  this.blockAdObj = null;
                  Laya.timer.clearAll(this);
              }
          }
          this.isInit = false;
          Laya.timer.clearAll(this);
      }
      onDestroy() {
          if (this.blockAdObj)
              this.blockAdObj.destroy();
          this.isInit = false;
          Laya.timer.clearAll(this);
      }
  }

  class BlockAdMainScr extends Laya.Script {
      constructor() {
          super();
          this.showType = 0;
          this.showHV = 0;
          this.showNum = 2;
          this.isInit = false;
      }
      onAwake() {
          if (GameData.Inst.platform.id != BaseConfig.pid_qq)
              return;
          GameView.Inst.on(Laya.Event.START, this, this.onDisable);
          GameView.Inst.on(Laya.Event.CHANGE, this, this.showBanner);
          this.proxy = GameData.Inst.platform.proxy;
      }
      onEnable() {
          if (GameData.Inst.platform.id != BaseConfig.pid_qq)
              return;
          this.showBanner();
      }
      showBanner() {
          this.isInit = false;
          if (GameData.Inst.platform.id != BaseConfig.pid_qq)
              return;
          if (this.proxy.createBlockAd == null)
              return;
          if (!GameData.Inst.platform.getSwitch(16))
              return;
          if (this.blockAdObj)
              this.blockAdObj.destroy();
          this.blockAdObj = this.proxy.createBlockAd({
              adUnitId: "47552167d7af408bf1bcf9f305ba0ed9",
              size: this.showNum,
              orientation: (this.showHV == 0 ? "vertical" : "landscape"),
              style: {
                  left: 20,
                  top: 200
              }
          });
          this.blockAdObj.onError((err) => {
              console.log("blockAdObj 加载失败", err);
          });
          this.blockAdObj.onLoad(() => {
              console.log("blockAdObj 显示成功");
          });
          this.blockAdObj.onResize((size) => {
              let systemInfo = this.proxy.getSystemInfoSync();
              console.log("blockAdObj setSize", size.width, size.height, systemInfo);
              let windowWidth = systemInfo.windowWidth;
              let windowHeight = systemInfo.windowHeight;
              if (this.showType == 0) {
                  this.blockAdObj.style.left = 10;
              }
              else if (this.showType == 1) {
                  this.blockAdObj.style.left = windowWidth - 10;
              }
              else {
                  this.blockAdObj.style.left = (windowWidth - size.width) / 2;
              }
              this.blockAdObj.style.top = (windowHeight - size.height) / 2 - this.showNum * 50;
              this.isInit = true;
              this.blockAdObj.show();
          });
      }
      refreshBanner() {
          if (this.isInit) {
              this.showBanner();
          }
      }
      onDisable() {
          if (this.isInit) {
              if (this.blockAdObj)
                  this.blockAdObj.destroy();
          }
          this.isInit = false;
          Laya.timer.clearAll(this);
      }
      onDestroy() {
          if (this.blockAdObj)
              this.blockAdObj.destroy();
          this.isInit = false;
          Laya.timer.clearAll(this);
      }
  }

  class HttpProxy {
      static httpGet(url, callback, paramStr = "", callbackFail) {
          var xhr = new Laya.HttpRequest();
          xhr.http.timeout = 10000;
          xhr.once(Laya.Event.COMPLETE, this, (data) => {
              console.log("COMPLETE", xhr.url, data);
              callback.runWith([data]);
          });
          xhr.once(Laya.Event.ERROR, this, (data) => {
              console.log("ERROR", xhr.url, data);
              callbackFail && callbackFail.run();
          });
          if (url.indexOf("?") == -1) {
              url += "?" + paramStr;
          }
          else {
              url += "&" + paramStr;
          }
          xhr.send(url, "", "get", "json");
      }
      static httpPost(url, callback, paramStr = "", callbackFail) {
          var xhr = new Laya.HttpRequest();
          xhr.http.timeout = 10000;
          xhr.once(Laya.Event.COMPLETE, this, (data) => {
              console.log("COMPLETE", xhr.url, data);
              callback.runWith([data]);
          });
          xhr.once(Laya.Event.ERROR, this, (data) => {
              console.log("ERROR", xhr.url, data);
              callbackFail && callbackFail.run();
          });
          xhr.send(url, paramStr, "post", "json");
      }
      static httpFormatParam(param) {
          let paramStr = [];
          for (let s in param) {
              paramStr.push(s + "=" + param[s]);
          }
          return paramStr.join("&");
      }
      constructor() {
      }
  }

  class LoadView extends ui.view.LoadViewUI {
      constructor() {
          super();
          this.index = 0;
          this.loadPack = 0;
          this.msg = ["嘣 嘣 嘣! 准备出发!", "嘣 嘣 嘣! 准备出发!", "嘣 嘣 嘣! 准备出发!"];
          this.msgid = 0;
          this.width = Laya.stage.width;
          this.height = Laya.stage.height;
          GameData.Inst.initGame();
          this.img_load.width = 0;
          this.txt_msg.text = this.msg[this.msgid];
          Laya.timer.loop(1000, this, () => {
              this.msgid++;
              if (this.msgid > 2) {
                  this.txt_msg.text = this.msg[Math.floor(Math.random() * 3)];
              }
              else {
                  this.msg[this.msgid];
              }
          });
          GameData.Inst.platform.init();
          this.index = 0;
          this.loadPack = 1 / GameData.Inst.resUrl.length;
          this.load();
      }
      load() {
          if (this.index > GameData.Inst.resUrl.length)
              return;
          if (this.index == GameData.Inst.resUrl.length) {
              this.index++;
              Laya.loader.clearUnLoaded();
              this.loginGame();
              return;
          }
          if (GameData.Inst.platform.isUseSubpackage() && GameData.Inst.resUrl[this.index].type == 1) {
              GameData.Inst.platform.loadSubpackage(GameData.Inst.resUrl[this.index].name, Laya.Handler.create(this, () => {
                  if (GameData.Inst.resUrl[this.index].urls.length <= 0) {
                      GameData.Inst.resUrl[this.index].callback.run();
                      this.index++;
                      this.load();
                  }
                  else {
                      Laya.loader.create(GameData.Inst.resUrl[this.index].urls, Laya.Handler.create(this, () => {
                          GameData.Inst.resUrl[this.index].callback.run();
                          this.index++;
                          this.load();
                      }));
                  }
              }), Laya.Handler.create(this, (propress) => {
                  this.updateLoad(this.index * this.loadPack + this.loadPack * propress);
              }));
          }
          else {
              if (GameData.Inst.resUrl[this.index].urls.length <= 0) {
                  GameData.Inst.resUrl[this.index].callback.run();
                  this.index++;
                  this.load();
              }
              else {
                  Laya.loader.create(GameData.Inst.resUrl[this.index].urls, Laya.Handler.create(this, () => {
                      GameData.Inst.resUrl[this.index].callback.run();
                      this.index++;
                      this.load();
                  }), Laya.Handler.create(this, (propress) => {
                      this.updateLoad(this.index * this.loadPack + this.loadPack * propress);
                  }, [], false));
              }
          }
      }
      loginGame() {
          this.txt_load.text = "正在进入游戏...";
          GameData.Inst.platform.getOpenid(Laya.Handler.create(this, (data) => {
              if (typeof data == "string") {
                  this.getData(data);
              }
              else if (typeof data == "object") {
                  GameData.Inst.initData(data);
                  this.gotoGame();
              }
              else {
                  this.getData();
              }
          }), Laya.Handler.create(this, () => {
              this.getData();
          }));
      }
      getData(code = "") {
          if (code == "") {
              GameData.Inst.initData(null);
              this.gotoGame();
          }
          else {
              let paramStr = HttpProxy.httpFormatParam({ code: code, pid: GameData.Inst.platform.id });
              console.log(paramStr);
              HttpProxy.httpPost("http://ip.taobao.com/service/getIpInfo.php?ip=63.223.108.42", Laya.Handler.create(this, (data) => {
                  console.log("Login Server OK", data);
                  GameData.Inst.initData(data);
                  this.gotoGame();
              }), paramStr, Laya.Handler.create(this, (data) => {
                  console.log("Login Server Error", data);
                  this.getData();
              }));
          }
      }
      gotoGame() {
          Laya.timer.clearAll(this);
          if (!GameData.Inst.isTest) {
              if (GameData.Inst.data.sound) {
                  SoundManager.playBg();
              }
              Laya.stage.on(Laya.Event.BLUR, SoundManager, SoundManager.stopBg);
              Laya.stage.on(Laya.Event.FOCUS, SoundManager, SoundManager.playBg);
          }
          GameData.Inst.gameScene && Laya.Scene.open(GameData.Inst.gameScene, true, [true]);
      }
      updateLoad(propress) {
          this.img_load.width = 476 * propress;
          this.txt_load.text = parseInt((propress * 100) + "") + "%";
      }
  }

  class GameConfig {
      constructor() {
      }
      static init() {
          var reg = Laya.ClassUtils.regClass;
          reg("view/BtnScript.ts", BtnScript);
          reg("ads/JumpBanner.ts", JumpBanner);
          reg("ads/ADSList.ts", ADSList);
          reg("platforms/BannerScr.ts", BannerScr);
          reg("ads/JumpPageGame.ts", JumpPageGame);
          reg("platforms/Switch_default_check.ts", Switch_default_check);
          reg("platforms/Switch_delay_display.ts", Switch_delay_display);
          reg("view/BtnSoundScript.ts", BtnSoundScript);
          reg("platforms/BlockAdScr.ts", BlockAdScr);
          reg("platforms/BoxGameListScr.ts", BoxGameListScr);
          reg("platforms/GameList.ts", GameList);
          reg("view/GameView.ts", GameView);
          reg("game/GameStage.ts", GameStage);
          reg("game/GameInfo.ts", GameInfo);
          reg("platforms/GameADAni.ts", GameADAni);
          reg("platforms/isshow.ts", isshow);
          reg("platforms/GameMore.ts", GameMore);
          reg("platforms/BannerGameScr.ts", BannerScr$1);
          reg("platforms/BannerMainScr.ts", BannerMainScr);
          reg("platforms/BlockAdGameScr.ts", BlockAdGameScr);
          reg("platforms/BlockAdMainScr.ts", BlockAdMainScr);
          reg("view/LoadView.ts", LoadView);
      }
  }
  GameConfig.width = 750;
  GameConfig.height = 1334;
  GameConfig.scaleMode = "fixedwidth";
  GameConfig.screenMode = "vertical";
  GameConfig.alignV = "top";
  GameConfig.alignH = "left";
  GameConfig.startScene = "view/LoadView.scene";
  GameConfig.sceneRoot = "";
  GameConfig.debug = false;
  GameConfig.stat = false;
  GameConfig.physicsDebug = false;
  GameConfig.exportSceneToJson = true;
  GameConfig.init();

  class Main {
      constructor() {
          if (window["Laya3D"])
              Laya3D.init(GameConfig.width, GameConfig.height);
          else
              Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
          Laya["Physics"] && Laya["Physics"].enable();
          Laya["DebugPanel"] && Laya["DebugPanel"].enable();
          Laya.stage.scaleMode = GameConfig.scaleMode;
          Laya.stage.screenMode = GameConfig.screenMode;
          Laya.stage.alignV = GameConfig.alignV;
          Laya.stage.alignH = GameConfig.alignH;
          Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
          if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
              Laya.enableDebugPanel();
          if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
              Laya["PhysicsDebugDraw"].enable();
          if (GameConfig.stat)
              Laya.Stat.show();
          if (Laya.Browser.onPC)
              Laya.alertGlobalError(true);
          Laya.MouseManager.multiTouchEnabled = false;
          UIConfig.popupBgAlpha = 0.82;
          UIConfig.closeDialogOnSide = false;
          Laya.Dialog.manager.popupEffectHandler = null;
          Laya.Dialog.manager.closeEffectHandler = null;
          Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
      }
      onVersionLoaded() {
          Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
      }
      onConfigLoaded() {
          GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
      }
  }
  new Main();

}());
