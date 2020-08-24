import BasePlatform from "../core/BasePlatform";
import { ptgcspsdk } from "./ptgcspsdk";
import GameData from "../core/GameData";
import SoundManager from "../core/SoundManager";

export default class WXPlatform extends BasePlatform {
    constructor(){
        super();
    }
    showMessage(mes: string) {
        console.log("showMessage", mes);
        if (this.proxy) {
            let obj = {};
            obj["title"] = mes;
            this.proxy.showToast(obj);
        }
    }
    isUseSubpackage():boolean{
        return true;
    }
    loadSubpackage(name:string, callback:Laya.Handler, callbackLoad:Laya.Handler):void{
        let $this = this;
        let subTask:any = this.proxy.loadSubpackage({
            // manifest.json中配置的子包包名
            name:name,
            // 子包加载成功回调
            success:function(){
                console.log(name, "子包加载成功");
                callback.run();
            },
            fail(res) {
                $this.showMessage("加载分包错误");
            }
        })
        subTask.onProgressUpdate(function(res){
            console.log(name, "子包加载...", res, res.progress);
            // 加载进度百分比
            let progress = res.progress;
            if(progress==null)progress=0;
            callbackLoad.runWith(progress/100);
            // 下载数据
            // let totalBytesWritten = res["totalBytesWritten"];
            // 总长度
            // let totalBytesExpectedToWrite = res["totalBytesExpectedToWrite"];
        })
    }
    /**
     * 
     * @param callback 初始化平台
     */
    init(callback?:Laya.Handler):void{
        this.proxy = Laya.Browser.window.wx;

        this.proxy.showShareMenu({
            withShareTicket: true
          })
        this.proxy.onShareAppMessage(() => ({
            title: '拍照我最强，等你来挑战!',
            imageUrl: 'https://hotupdate.hnpingtouge.com/gameshare/fxt.png'
        }))

        this.proxy.onShow((res: any) => {
            Laya.stage.event(Laya.Event.FOCUS);
            Laya.timer.once(100, this, ()=>{
                // if(this.isShowVAD)SoundManager.stopBg();
            });
        });

        this.proxy.onHide((res: any) => {
            Laya.stage.event(Laya.Event.BLUR);
        });

        if(callback)callback.run();

        let wxData:any = this.proxy.getLaunchOptionsSync();
        if(wxData && wxData.query){
            if(wxData.query.channel){
                this.cid=wxData.query.channel; 
            } 
        }   
        
        this.getGameConfig();
    }
    
    zhengDongShort():void{
        this.proxy.vibrateShort();
    }
    zhengDongLong():void{
        this.proxy.vibrateLong();
    }

        
    getGameConfig():void{
        this.cid = 0;
        this.bad_id = Math.random()>0.5?"adunit-0bc7200af6664d69":"adunit-95cacaf83d3e65db";
        this.iad_id = "adunit-ef65baecdd4efc6d";
        this.vad_id = Math.random()>0.5?"adunit-c7dddb7d238fabf5":"adunit-ca9e25b08f00bcb3";
        /**
         * 
盒子广告位ID：9f928d9c98d3da353c1e9836a4adbf72
积木广告位ID：f8118d229abb61c615dccb75a3045d9f
         */
         this.initBannerAD();
         this.initVideoAD();
      //   this.initInterAD();

        let $this = this;
        ptgcspsdk.getGameSwitch((res)=>{
            console.log("getGameSwitch", res);
            if(typeof res == "string"){
                res = JSON.parse(res)
            }
            $this.gameSwitch = res.data;

        });

        $this.gameList = [];
        ptgcspsdk.getJumpGameList((res)=>{
            console.log("getJumpGameList", res);
            if(typeof res == "string"){
                res = JSON.parse(res)
            }
            $this.gameList = res;
        });

        
        
    }
    setGameList(list:any):void{
    }

    getUseAPI(apiId:number):boolean{
        switch(apiId){
            case 0://分享
                return false;
                break;
            case 10://插屏
                return false;
                break;
            case 20://录屏
                return false;
                break;
        }
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
        if(this.gameSwitch==null)return false;
        //  0关闭/1 开启
        if(this.gameSwitch.version==0)return false;//总开关
        if(this.gameSwitch.local_switch==1)return false;//区域开关  local_switch值为1关，local_switch值为2开
        if(this.gameSwitch.delay_turn==1)return true;
       // return false;

        switch(id){
            case 0://默认勾选	default_check
                return this.gameSwitch.ignore_check==1;
                break;
            case 1://延迟显示（文字、按钮）	delay_display
                return this.gameSwitch.delay_display==1;
                break;
            case 2://强制调起视频	force_video
                return this.gameSwitch.force_video==1;
                break;
            case 3://强制调起录屏分享	force_share
                return this.gameSwitch.force_share==1;
                break;
            case 4://看视频连升3级	video_update
                return this.gameSwitch.video_update==1;
                break;
            case 5://砸金蛋开关	delay_egg_switch
                return this.gameSwitch.delay_egg_switch==1;
                break;
            /*case 6://原生广告左/右上角关闭按钮	ptg_native_limit_city
                return this.gameSwitch.ptg_native_limit_city==1;
                break;
            case 7://下一关/重新开始原生广告	ptg_native_limit
                return this.gameSwitch.ptg_native_limit==1;
                break;
            case 8://原生广告区域开关	原生广告屏蔽省份	 ptg_native_province	湖南省,湖北省  原生广告屏蔽城市	ptg_native_city	北京市,深圳市
                if(this.gameSwitch.ptg_native_province==0)return true;
                if(this.gameSwitch.ptg_native_city==0)return true;
                break;
            case 9://原生广告xxx秒开关	ptg_yuansheng_limit
                return this.gameSwitch.ptg_yuansheng_limit==1;
                break;
            case 10://原生广告开启误触按钮文字	ptg_native_btn_text
                return this.gameSwitch.ptg_native_btn_text==1;
                break;
            case 11://阀值开关	ptg_threshold
                return this.gameSwitch.ptg_threshold==1;
                break;
            
            case 12://游戏中的banner广告显示	banner_display
               return this.gameSwitch.banner_display==1;
               break;
            case 13://盒子广告开关	screen_ad_switch
               return this.gameSwitch.screen_ad_switch==1;
               break;
            case 14://砸金蛋开关1	delay_egg_switch1
               return this.gameSwitch.delay_egg_switch1>=1;
               break;
            case 15://砸金蛋开关2	delay_egg_switch2
                return this.gameSwitch.delay_egg_switch2>=1;
                break;
            case 16://积木	blocks_show
                return this.gameSwitch.blocks_show==1;
                break;*/
            case 17://banner广告误点处理
                return this.gameSwitch.delay_turn==1;
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
        console.log("sendLog", aid);
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
    
    isLogined:boolean;
    /**
     * 登录接口
     * @param callback 
     * @param callbackFail 
     */
    login(callback:Laya.Handler, callbackFail:Laya.Handler):void{
        if(this.isLogined)return;
        this.isLogined = true;
        this.proxy.login({
            success(data) {
                console.log(`login调用成功${data.code}`);
                ptgcspsdk.getWxOpenid(data.code, data.code, (res)=>{
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
        // /*this.sendLog(1009, type);
        this.proxy.shareAppMessage({
            title: '',
            imageUrl: ''
        });
        if(callback)callback.run();
    }
    
    /**
     * 分享视频接口
     * @param callback 
     * @param callbackFail 
     */
    shareVideo(callback:Laya.Handler, callbackFail:Laya.Handler):void{
        return;
    }



    callbackVideoAD:Laya.Handler;
    callbackFailVideoAD:Laya.Handler
    currVADType:number;
    initVideoAD():void{
        if(!this.proxy.createRewardedVideoAd)return;
        if(this.videoADObj==null){
            let $this = this;

            this.videoADObj = this.proxy.createRewardedVideoAd({adUnitId:this.vad_id});
            this.videoADObj.onError((err)=>{
                // $this.videoADObj.load();
                if($this.callbackFailVideoAD){
                    $this.showMessage("暂无视频")
                    $this.callbackFailVideoAD.run();
                }
                $this.callbackVideoAD = null;
                $this.callbackFailVideoAD = null;
                console.log("onError end");
                this.showVADTime = Laya.Browser.now();
                this.isShowVAD = false;
            });
            this.videoADObj.onClose((res)=>{
                console.log("onClose", $this.currVADType);
                // $this.videoADObj.load();
                if(GameData.Inst.data.sound)SoundManager.playBg();
                console.log("onClose 0");
                if (res && res.isEnded) {
		            GameData.Inst.data.taskType4VAD++;
                    // 给予奖励
                    $this.callbackVideoAD.run();
                    $this.sendLog(1011, this.currVADType);
                    console.log("onClose 1");
                }else{
                    $this.callbackFailVideoAD.run();
                    $this.showMessage("关闭视频")
                }
                
                $this.callbackVideoAD = null;
                $this.callbackFailVideoAD = null;
                
                console.log("onClose end");
                this.showVADTime = Laya.Browser.now();
                this.isShowVAD = false;
            });
            this.videoADObj.onLoad(()=> {
                console.log("加载成功");
                // SoundManager.stopBg();
                this.isShowVAD = true;
                /*if($this.callbackVideoAD){
                    $this.videoADObj.show().then(()=>{ 
                        console.log('激励视频广告展示完成');
                        // SoundManager.stopBg();
                        this.isShowVAD = true;
                    }).catch((err)=>{
                        console.log('激励视频广告展示失败', JSON.stringify(err));
                    })
                }*/
            });
            
            // this.videoADObj.load();
            console.log("initVideoAD");
        }
    }

    showVADTime:number = 0;
    isShowVAD:boolean = false;
    /**
     * 视频广告接口
     * @param callback 
     * @param callbackFail 
     */
    videoAD(callback:Laya.Handler, callbackFail:Laya.Handler, type:number=0):void{
       // if(callback)callback.run();
       // this.showMessage("暂未开通");
     //   return;
        this.isShowVAD = false;

        if(this.videoADObj==null)return;
        if(this.callbackVideoAD!=null)return;
        /*let time:number = Math.floor((Laya.Browser.now()-this.showVADTime)/1000);
        if(time<60){
            this.showMessage((60-time)+"秒后再观看视频");
            return;
        }*/

        this.currVADType = type;
        this.callbackVideoAD = callback;
        this.callbackFailVideoAD = callbackFail;
        this.sendLog(1010, type);

        console.log("videoAD 0");
        // this.videoADObj.show();
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
        console.log("videoAD 1");
    }

    
    initBannerAD():void{
        if(!this.proxy.createBannerAd)return;
        if(this.bannerADObj)this.bannerADObj.destroy();

        this.bad_id = "adunit-"+["0bc7200af6664d69","95cacaf83d3e65db","579ca33fd0ab5f77","420880b28b3f38e8","bed9b430c793eb41","a0b9b94d1fbf2753"][Math.floor(Math.random()*6)];
        this.bannerADObj = this.proxy.createBannerAd({
            adUnitId: this.bad_id,
            adIntervals:30,
            style:{
                left:0,
                top:0,
                width:320,
                height:90
            }
        });
        this.bannerADObj.onError((err)=> {
            console.log("banner广告加载失败", err);
            // this.showMessage("banner失败"+err.errCode);
            this.bannerADObj = null;
        });
        this.bannerADObj.onLoad(()=> {
            console.log("initBannerAD广告显示成功");
            if(this.bannerCallbacak)this.bannerCallbacak.run();
            this.bannerCallbacak=null;
        });
        
        this.bannerADObj.onResize((size:any) => {
            let systemInfo:any =this.proxy.getSystemInfoSync();
            let windowWidth = systemInfo.windowWidth;
            let windowHeight = systemInfo.windowHeight;
            console.log("setSize", size.width, size.height);
            
            // good
            this.bannerADObj.style.top = windowHeight - size.height;
            this.bannerADObj.style.left = (windowWidth - size.width) / 2;

            if(size.width>300){
                this.bannerADObj.style.width=300;
              }
            
            console.log("setSize", windowWidth, "  ", size.width, this.bannerADObj.style.left);
            
            // bad，会触发死循环
            // bannerAd.style.width++;
        });

    }

    


    bannerCount:number=0;
    bannerTime:number=0;
    bannerUpdate(isInit:boolean=true):void{
        if(this.bannerTime==0){
            this.bannerTime = Laya.Browser.now();
        }
        if(this.bannerTime+10000<Laya.Browser.now()){
            this.bannerTime = 0;
            if(this.bannerADObj)this.bannerADObj.destroy();
            this.bannerADObj=null;
        }

        // this.bannerADObj.show();
        if(this.bannerCount>=10){
            if(this.bannerADObj)this.bannerADObj.destroy();
            this.bannerADObj=null;
            this.bannerCount=0;
        }
        if(this.bannerADObj==null){
            this.bannerCallbacak = null;
            this.initBannerAD();
        }
    }

    bannerCallbacak:Laya.Handler = null;
    /**
     * Banner广告接口
     * @param callback 
     */
    bannerAD(callback:Laya.Handler):void{
     //   return;
         this.bannerCallbacak = callback;
         this.initBannerAD();
        this.bannerUpdate(false);

        if(this.bannerADObj){
            callback.run();
            // this.bannerCount++;
        }else{
            this.bannerCallbacak = callback;
            this.initBannerAD();
        }
        console.log("bannerAD");
    }


    initInterAD():void{
        if(!this.proxy.createInterstitialAd)return;
        this.interADObj = this.proxy.createInterstitialAd({ adUnitId: this.iad_id });
    }
    InterAD(callback:Laya.Handler):void{
        if(!this.proxy.createInterstitialAd)return;
        if(!this.interADObj)return;
        this.interADObj.show().catch((err) => { console.log(err); });
    }
    
    /**
     * 跳转其它APP接口
     * @param callback 
     * @param callbackFail 
     */
    openApp(appInfo:any, callback:Laya.Handler):void{
        console.log("openApp", appInfo);
        if(!this.proxy.navigateToMiniProgram)return;

            // path: appInfo[0].query,
            // extraData: {},
            // release
            // envVersion : "develop",
        let $this = this;
        this.proxy.navigateToMiniProgram({
            appId: appInfo[0].appId,
            path: appInfo[0].query,
            success(res) {
                console.log("openApp success", res, res.errMsg);
                $this.clickList.push(appInfo[0].appId)
                $this.sendLog(1017, 0, appInfo[0].posid, appInfo[0].appId)
            },
            fail(res) {
                console.log("openApp fail", res, res.errMsg);
                if(callback)callback.run();
                $this.showMessage("未打开应用");
            }
        });
        console.log("openApp");
        $this.sendLog(1007, 0, appInfo[0].posid, appInfo[0].appId)
    }
}