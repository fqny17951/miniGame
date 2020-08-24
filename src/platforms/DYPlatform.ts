import BasePlatform from "../core/BasePlatform";
import { ptgcspsdk } from "./ptgcspsdk";
import GameData from "../core/GameData";
import JSONManager from "../core/JSONManager";
import BaseConfig from "../core/BaseConfig";

export default class DYPlatform extends BasePlatform {
    constructor(){
        super();
    }
    public showMessage(mes: string) {
        console.log("showMessage", mes);
        if (this.proxy) {
            let obj = {};
            obj["title"] = mes;
            this.proxy.showToast(obj);
        }
    }
    /**
     * 
     * @param callback 初始化平台
     */
    init(callback?:Laya.Handler):void{
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
            }
        });

        let menuObj = this.proxy.getMenuButtonBoundingClientRect();
        if (menuObj) {
            // WxPlatform.menuObj = menuObj;
        }
        var info = this.proxy.getSystemInfoSync();
        if (info) {
            // this.SetSystemInfo(info);
        }
        let launch = this.proxy.getLaunchOptionsSync();
        if (launch) {//从微信小游戏启动获取信息
            if (launch.referrerInfo && launch.referrerInfo.appId) {
                // ServerData.fromAppid = launch.referrerInfo.appId;
            }
            if (launch.query) {
                if (launch.query.channel) {
                    // ServerData.channelId = Number(launch.query.channel);
                }
                if (launch.query.inviteId) {
                    // ServerData.shareId = launch.query.inviteId;
                }
                if (launch.query.id) {
                    // ServerData.shareImgId = launch.query.id;
                }
                if (launch.query.inviteId) {
                    var userId = launch.query["inviteId"];
                    if (userId != undefined || userId != null) {
                        // ServerData.inviteId = userId;
                    }
                }
            }
        }

        
        this.proxy.onShow((res: any) => {
            Laya.stage.event(Laya.Event.FOCUS);

            if (res.query != undefined) {
                if (res.query.inviteId) {
                    var userId = res.query["inviteId"];
                    if (userId != undefined || userId != null) {
                        // ServerData.inviteId = userId;
                    }
                }
                if (res.query.openGroup) {//点击群分享进入则关闭所有操作直接进群排行
                }
                if (res.scene == 1104) {//户是从我的小程序进入游戏的 请求 小程序礼包
                }
            }
            /*if (this.shareState == 2) {
                if (Laya.Browser.now() - this.stime > 3000) {
                    this.shareState = 3;
                    Laya.timer.once(500, this, this.funShareSucc);
                } else {
                    this.funShareFail();
                }
            }*/
        });

        this.proxy.onHide((res: any) => {
            Laya.stage.event(Laya.Event.BLUR);

            /*if (this.shareState == 1) {
                this.stime = Laya.Browser.now();
                this.shareState = 2;
            }*/
        });

        if(callback)callback.run();
        
        this.getGameConfig();

    }

    /**
     * 打开客服
     */
    public openService() {
        this.proxy.openCustomerServiceConversation();
    }
    
    zhengDongShort():void{
        this.proxy.vibrateShort();
    }
    zhengDongLong():void{
        this.proxy.vibrateLong();
    }

    videointerval=0;   
    getGameConfig():void{
        this.cid = 0;
        this.bad_id = "55pcpi7hetc5o9h60f";
        this.iad_id = "alqc7949jckc88gibl";
        this.vad_id = "19b9icik0bkn24a94g";
        this.initBannerAD();
        this.initVideoAD();
       // this.initInterAD();
      let $this = this;
        ptgcspsdk.getGameSwitch((res)=>{
            console.log("getGameSwitch", res);
            if(typeof res == "string"){
                res = JSON.parse(res)
            }
            $this.gameSwitch = res.data;
        });
        $this.gameList = [];
        console.log("准备获得游戏list");
        
        ptgcspsdk.getJumpGameList((res)=>{
            console.log("getJumpGameList", res);
            if(typeof res == "string"){
                res = JSON.parse(res)
            }
            $this.gameList = res;
        });
        
           this.gameList=JSONManager.gameList;
        // for(var i=0;i<gameList.lenth;i++){
        //     this.gameList.push({
        //         appId: gameList[i].appid,
        //         query: "channel=" + gameList.appid,
        //         extraData: {}
        //     })

        // }
       // var appid:any=[];
  
}
appid:any=[];
    getUseAPI(apiId:number):boolean{
        return true;
    }
    /**
     * 0://默认勾选	default_check
     * 1://延迟显示（文字、按钮）	delay_display
     * 2://强制调起视频	force_video
     * 3://强制调起录屏分享	force_share
     * 4://导出位开关	screen_switch
     * @param id 
     */
    getSwitch(id:number):boolean{
        console.log("进来了");
        if(this.gameSwitch==null)return false;
        //  0关闭/1 开启
        if(this.gameSwitch.version==0)return false;//总开关
        if(this.gameSwitch.local_switch==1)return false;//区域开关  local_switch值为1关，local_switch值为2开

       // this.gameSwitch.video_number=1;
        switch(id){
            case 0://默认勾选	default_check
            if(this.gameSwitch.ignore_check==0)return false;
                return this.gameSwitch.default_check==1;
                break;
            case 1://延迟显示（文字、按钮）	delay_display
      
                return this.gameSwitch.delay_display==1;
                break;
            case 2://强制调起视频（开始游戏）	force_video1
        
                return this.gameSwitch.force_video1==1;
                break;
            case 3://强制调起录屏分享	force_share
         
              
                return this.gameSwitch.force_share==1;
                break;
            case 4://导出位开关	screen_switch
                let systemInfo = this.proxy.getSystemInfoSync();
                // iOS 不支持，建议先检测再使用
                if (systemInfo.platform == "ios")return false;
                return this.gameSwitch.screen_switch==1;
                break;
            case 5://砸金蛋开关	delay_egg_switch
  
                return this.gameSwitch.delay_egg_switch==1;
                break;
                case 6://强制调起视频（胜利界面）	force_video2
     
                    return this.gameSwitch.force_video2==1;
                    break;  
                    case 7://隐藏对象（勾选栏）	ignore_check
                    console.log("进来了");
                if(this.gameSwitch.ignore_check==1)
                        return true;
                        break;
                        case 8://强制调起视频（失败界面）	force_video3
                
                            return this.gameSwitch.force_video3==1;
                            break;
                      
                          case 9://    //强制调起视频间隔	video_number      
                            return this.gameSwitch.video_number>=1;
                            break;
                         
                            case 10://    //强行分享的次数
                              return this.gameSwitch.force_sharetimes>=1;
                                break;
        }
        return false;

    }
    /**
     * Login:1005,  //登录    Authority:1006,//授权     Start:1008,  //开始游戏    Share:1009,  //用户分享 
     * Video:1010,  //点击观看视频    VideoSuccess:1011, //观看完视频    Jump:1007, //点击跳出 JumpSuccess:1017 //成功跳出
     * @param aid 
     * @param type 
     */
    sendLog(aid:number, type:number=0, uid:string="", toAppid:string=""):void{
        switch(aid){
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


    getOpenid(callback:Laya.Handler, callbackFail:Laya.Handler):void{
        callbackFail.run();
        GameData.Inst.platform.openid = "10000";
        GameData.Inst.platform.anonymous_openid = "10000";
        GameData.Inst.platform.session_key = "10000";

        this.isLogined = false;
    }

    isLogined:boolean;
    /**
     * 登录接口
     * @param callback 
     * @param callbackFail 
     */
    login(callback:Laya.Handler, callbackFail:Laya.Handler):void{
        if(this.isLogined){
            if(callback)callback.run();
            return};
        this.isLogined = true;
        this.proxy.login({
            success(data) {
                console.log(`login调用成功${data.code} ${data.anonymousCode}`);
                ptgcspsdk.getTouTiaoOpenid(data.code, data.anonymousCode, (res)=>{
                    console.log("上传成功");
                    
                    if(callback)callback.run();
                    if(res.openid==null)res.openid="10001";
                    if(res.anonymous_openid==null)res.anonymous_openid="10001";
                    if(res.session_key==null)res.session_key="10001";
                    GameData.Inst.platform.openid = res.openid;
                    GameData.Inst.platform.anonymous_openid = res.anonymous_openid;
                    GameData.Inst.platform.session_key = res.session_key;
                    GameData.Inst.platform.sendLog(1005);

                });
            },
            fail(res) {
                console.log(`login调用失败`);
                if(callbackFail)callbackFail.run();
            }
        });
          
    }

    
    /**
     * 分享接口
     * @param callback 
     * @param callbackFail 
     */
    share(callback:Laya.Handler, callbackFail:Laya.Handler, type:number=0):void{
        this.sendLog(1009, type);
        this.proxy.shareAppMessage({
            templateId:"6j07k6lnjlr6cuabgt",
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
    
    /**
     * 分享视频接口
     * @param callback 
     * @param callbackFail 
     */
    shareVideo(callback:Laya.Handler, callbackFail:Laya.Handler):void{
        console.log("调用了分享视频");
        let $this = this;
        this.proxy.shareAppMessage({
            // templateId:"6j07k6lnjlr6cuabgt",
            channel: "video",
            extra: {
                videoPath: $this.recorderPath, // 可替换成录屏得到的视频地址
                // videoTopics: ["话题1", "话题2"]
            },
            success() {
                callback.run();
                $this.showMessage("分享成功");
            },
            fail(res) {
                callbackFail.run();
                console.log("分享失败");

                if ($this.proxy.getSystemInfoSync().appName == 'Toutiao') { //头条版
                    if ($this.proxy.getSystemInfoSync().platform == "ios") { //苹果手机 安卓手机为 android
                        if (res.errMsg == 'shareAppMessage:fail video duration is too short') {
                            $this.showMessage('录屏时间短于3s不能分享哦~~')
                        } else {
                            if (res.errMsg.split('shareAppMessage:fail video file is too short')[0] == '') {
                                $this.showMessage('录屏时长少于3秒，无法分享');
                            } else {
                                $this.showMessage('发布取消');
                                // fail && fail()
                            }
                        }
                    } else {
                        let msg = res.errMsg.split(',')[0]
                        console.log('msg', msg)
                        if (msg == 'shareAppMessage:fail video file is too short') {
                            $this.showMessage('录屏时间短于3s不能分享哦~~')
                        } else {
                            if (res.errMsg.split('shareAppMessage:fail video file is too short')[0] == '') {
                                $this.showMessage('录屏时长少于3秒，无法分享');
                            } else {
                                $this.showMessage('发布取消');
                                // fail && fail()
                            }
                        }
                    }
                } else if ($this.proxy.getSystemInfoSync().appName == 'news_article_lite') { //头条极速版
                    if ($this.proxy.getSystemInfoSync().platform == "ios") { //苹果手机 安卓手机为 android
                        if (res.errMsg == 'shareAppMessage:fail video duration is too short') {
                            $this.showMessage('录屏时间短于3s不能分享哦~~')
                        } else {
                            if (res.errMsg.split('shareAppMessage:fail video file is too short')[0] == '') {
                                $this.showMessage('录屏时长少于3秒，无法分享');
                            } else {
                                $this.showMessage('发布取消');
                                // fail && fail()
                            }
                        }
                    } else {
                        let msg = res.errMsg.split(',')[0]
                        console.log('msg', msg)
                        if (msg == 'shareAppMessage:fail video file is too short') {
                            $this.showMessage('录屏时间短于3s不能分享哦~~')
                        } else {
                            if (res.errMsg.split('shareAppMessage:fail video file is too short')[0] == '') {
                                $this.showMessage('录屏时长少于3秒，无法分享');
                            } else {
                                $this.showMessage('发布取消');
                                // fail && fail()
                            }
                        }
                    }
                } else if ($this.proxy.getSystemInfoSync().appName == 'Douyin') {
                    if ($this.proxy.getSystemInfoSync().platform == "ios") { //苹果手机 安卓手机为 android
                        if (res.errMsg == 'shareAppMessage:fail video duration is too short') {
                            $this.showMessage('录屏时间短于3s不能分享哦~~')
                        } else {
                            if (res.errMsg.split('shareAppMessage:fail video file is too short')[0] == '') {
                                $this.showMessage('录屏时长少于3秒，无法分享');
                            } else {
                                $this.showMessage('发布取消');
                                // fail && fail()
                            }
                        }
                    } else {
                        let msg = res.errMsg.split(',')[0]
                        console.log('msg', msg)
                        if (msg == 'shareAppMessageDirectly:fail') {
                            $this.showMessage('录屏时间短于3s不能分享哦~~')
                        } else {
                            if (res.errMsg.split('shareAppMessage:fail video file is too short')[0] == '') {
                                $this.showMessage('录屏时长少于3秒，无法分享');
                            } else {
                                $this.showMessage('发布取消');
                                // fail && fail()
                            }
                        }
                    }
                } else {
                    if (res.errMsg.split('shareAppMessage:fail video file is too short')[0] == '') {
                        $this.showMessage('录屏时长少于3秒，无法分享');
                    } else {
                        $this.showMessage('发布取消');
                        // fail && fail()
                    }
                }
            }
          });
    }



    callbackVideoAD:Laya.Handler;
    callbackFailVideoAD:Laya.Handler
    currVADType:number;
    initVideoAD():void{
        if(!this.proxy.createRewardedVideoAd)return;
        if(this.videoADObj==null){
            this.videoADObj = this.proxy.createRewardedVideoAd({adUnitId:this.vad_id});
            this.videoADObj.onError(err => {
                if(this.callbackFailVideoAD){
                    console.log("没有视频但是有回调");
                    this.showMessage("暂无视频")
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
                    // 给予奖励
                  if(this.callbackVideoAD)  this.callbackVideoAD.run();
                    this.sendLog(1011, this.currVADType);
                }else{
                    console.log("调用回调");
                    console.log( this.callbackFailVideoAD);
                    if(this.callbackFailVideoAD)      this.callbackFailVideoAD.run();
                    this.showMessage("关闭视频")
                  
                    
                }
                
                this.callbackVideoAD = null;
                this.callbackFailVideoAD = null;
            });

            
            
            console.log("initVideoAD");
        }
    }
    /**
     * 视频广告接口
     * @param callback 
     * @param callbackFail 
     */
    videoAD(callback:Laya.Handler, callbackFail:Laya.Handler, type:number=0):void{
        console.log("准备看电影");
        if(this.videoADObj==null)return;
        if(this.callbackVideoAD!=null)return;
        console.log("有电影");
        if(this.proxy.getSystemInfoSync().appName == 'Douyin'&&GameData.Inst.platform.proxy.getSystemInfoSync().platform == "ios"){
            if(callbackFail)callbackFail.run();
            this.showMessage("暂无视频")
           // callbackFail=null;
            return;}
        this.currVADType = type;
        this.callbackVideoAD = callback;
        this.callbackFailVideoAD = callbackFail;
        this.sendLog(1010, type);

        this.videoADObj.show().then(() => {
            console.log("videoAD广告显示成功");
        }).catch(err => {
            console.log("广告组件出现问题", err);
            // 可以手动加载一次
            this.videoADObj.load().then(() => {
                console.log("手动加载成功");
                // 加载成功后需要再显示广告
                this.videoADObj.show();
            });
        });
        
        console.log("videoAD");
    }

    
    initBannerAD():void{
        if(this.proxy.getSystemInfoSync().appName == 'Douyin')return;
        if(!this.proxy.createBannerAd)return;
        if(this.bannerADObj==null){
            this.bannerADObj = this.proxy.createBannerAd({
                adUnitId: this.bad_id,
                adIntervals: 30,
                style:{
                    left:0,
                    top:-800,
                    width:100,

                    
                },
            });
            this.bannerADObj.onLoad(()=> {
                console.log("initBannerAD广告显示成功");
            });
            this.bannerADObj.onResize((size:any) => {
                console.log("setSize", size.width, size.height);
                let systemInfo:any =this.proxy.getSystemInfoSync();
                let windowWidth = systemInfo.windowWidth;
                let windowHeight = systemInfo.windowHeight;
                // good
                this.bannerADObj.style.top = windowHeight - size.height;
                this.bannerADObj.style.left = (windowWidth - size.width) / 2;
                
                // bad，会触发死循环
                // bannerAd.style.width++;
            });
            console.log("initBannerAD");
        }
    }
    /**
     * Banner广告接口
     * @param callback 
     */
    bannerAD(callback:Laya.Handler):void{
        console.log("是否为抖音",this.proxy.getSystemInfoSync().appName );
        if(this.proxy.getSystemInfoSync().appName == 'Douyin')return;
        if(!this.proxy.createBannerAd)return;
        console.log(this.bannerADObj);
        if(this.bannerADObj){
          if(this.proxy.getSystemInfoSync().appName != 'XiGua'){
            this.bannerADObj.hide();
          this.bannerADObj.offLoad();
          this.bannerADObj.offResize();
        }
          this.bannerADObj.destroy();
          this.bannerADObj=null;
            }
            this.bannerADObj = this.proxy.createBannerAd({
                adUnitId: this.bad_id,
                adIntervals: 30,
                style:{
                    left:0,
                    top:-800,
                    width:100,

                }
            });
            this.bannerADObj.onError((err)=> {
                console.log("banner广告加载失败", err);
                // this.showMessage("banner失败"+err.errCode);
                this.bannerADObj = null;
            });
            this.bannerADObj.onLoad(()=> {
                console.log("initBannerAD广告显示成功");
                this.bannerADObj.style.top = this.proxy.getSystemInfoSync().windowHeight - this.bannerADObj.height;
                this.bannerADObj.style.left = (this.proxy.getSystemInfoSync().windowWidth - this.bannerADObj.width) / 2;
               callback.run();
              
                  });
      
            this.bannerADObj.onResize((size:any) => {
                console.log("setSize", size.width, size.height);
                let systemInfo:any =this.proxy.getSystemInfoSync();
                let windowWidth = systemInfo.windowWidth;
                let windowHeight = systemInfo.windowHeight;
                // good
                this.bannerADObj.style.top = windowHeight - size.height;
                this.bannerADObj.style.left = (windowWidth - size.width) / 2;
                callback.run();
                // bad，会触发死循环
                // bannerAd.style.width++;
            });
            //console.log("initBannerAD");
        
      
        console.log("bannerAD");
    }

    initInterAD():void{
        if(!this.proxy.createInterstitialAd)return;
        if(this.interADObj==null){
            this.interADObj = this.proxy.createInterstitialAd({
                adUnitId: this.iad_id
            });
            this.interADObj.onError(err => {
                console.log("暂无InterAD");
            });
            this.interADObj.onLoad(()=> {
                console.log("initInterAD广告显示成功");
            });
            console.log("initInterAD");
        }
    }
    InterAD(callback:Laya.Handler):void{
        if(this.interADObj==null)return;
        this.interADObj.show().then(() => {
            console.log("InterAD广告显示成功");
        }).catch(err => {
            console.log("InterAD问题", err);
            // 可以手动加载一次
            this.interADObj.load().then(() => {
                console.log("手动InterAD成功");
                // 加载成功后需要再显示广告
                this.interADObj.show();
            });
        });
        console.log("InterAD");
    }

    
    /**
     * 跳转其它APP接口
     * @param callback 
     * @param callbackFail 
     */
    openApp(appInfo:any, callback:Laya.Handler):void{
        console.log("openApp", appInfo);
        if(!this.proxy.showMoreGamesModal)return;
        let systemInfo = this.proxy.getSystemInfoSync();
        // iOS 不支持，建议先检测再使用
        if (systemInfo.platform == "ios")return;
       
        for(var i=0;i< this.gameList.length;i++){
            this.appid.push({
                appId: JSONManager.gameList[i].appid,
                query: "channel=" +JSONManager.gameList.appid,
                extraData: {}
            })
     //    console.log("获得的游戏list",this.gameList);
     }
     console.log("获得的游戏list",this.appid);
        /*appLaunchOptions: [
            {
                appId: appInfo.appid,
                query: appInfo.toLinks,
                extraData: appInfo.ext
            }
              // {...}
            ],*/
    
        this.proxy.showMoreGamesModal({
            appLaunchOptions: this.appid,
            success(res) {
                console.log("openApp success", res, res.errMsg);
                GameData.Inst.platform.sendLog(1017, 0, appInfo[0].posid, appInfo[0].appId)
            },
            fail(res) {
                console.log("openApp fail", res, res.errMsg);
            }
        });
        console.log("openApp");
    }

    
    recorder:any;
    recorderPath:string;
    /**
     * 录制游戏视频接口
     * @param callback 
     * @param callbackFail 
     */
    recordVideo(callback:Laya.Handler, callbackFail:Laya.Handler):void{
        if(this.recorderPath)this.recorderPath=null;
        this.recorder = this.proxy.getGameRecorderManager();
        this.recorder.start({ duration: 30 });
        this.recorder.onStop(res => {
            console.log("视频链接地址",res.videoPath);
            this.recorderPath = res.videoPath;
        });
    }
    stopVideo(){
        if(this.recorder != null){
            this.recorder.stop();
            this.recorder = null;
        }
    }

}