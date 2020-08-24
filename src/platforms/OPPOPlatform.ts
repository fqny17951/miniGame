import BasePlatform from "../core/BasePlatform";
import { ptgcspsdk } from "./ptgcspsdk";
import GameData from "../core/GameData";
import { ui } from "../ui/layaMaxUI";
import SoundManager from "../core/SoundManager";
import GameView from "../view/GameView";

export default class OPPOPlatform extends BasePlatform {
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
    isUseSubpackage():boolean{
        return false;
    }
    loadSubpackage(name:string, callback:Laya.Handler, callbackLoad:Laya.Handler):void{
        let subTask:any = this.proxy.loadSubpackage({
            // manifest.json中配置的子包包名
            name:name,
            // 子包加载成功回调
            success:function(){
                console.log(name, "子包加载成功");
                callback.run();
            }
        })
        subTask.onProgressUpdate(function(res){
            // 加载进度百分比
            let progress = res["progress"];
            console.log(name, "子包加载...", progress);
            callbackLoad.runWith(progress);
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
        this.proxy = Laya.Browser.window.qg;
        
        this.proxy.onShow((res: any) => {
            Laya.stage.event(Laya.Event.FOCUS);
        });

        this.proxy.onHide((res: any) => {
            Laya.stage.event(Laya.Event.BLUR);
        });

        if(callback)callback.run();
        
        this.getGameConfig();

        this.proxy.onAudioInterruptionBegin(()=>{
            SoundManager.stopBg();
        });
        this.proxy.onAudioInterruptionEnd(()=>{
            if(GameData.Inst.data.sound)SoundManager.playBg();
        });

    }
    
    zhengDongShort():void{
        this.proxy.vibrateShort();
    }
    zhengDongLong():void{
        this.proxy.vibrateLong();
    }

        
    getGameConfig():void{
        this.cid = 0;
        this.bad_id = "201842";
        this.iad_id = "";//187039
        this.vad_id = "201846";
        this.initBannerAD();
        this.initVideoAD();
        this.initInterAD();

        let $this = this;
        ptgcspsdk.getGameSwitch((res)=>{
            console.log("getGameSwitch", res);
            if(typeof res == "string"){
                res = JSON.parse(res)
            }
            $this.gameSwitch = res.data;

            if($this.getSwitch(9)){
                Laya.timer.loop(25000, $this, ()=>{
               //     $this.InterAD3();
                });
            }
            if(this.getSwitch(11)){
                ptgcspsdk.probability((data)=>{
                    console.log("interADPanel probability", data);
                    $this.InterADClickRate=data;
                });
            }
        });
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
       // if(this.gameSwitch.local_switch==2)return true;//区域开关  local_switch值为1关，local_switch值为2开
        
        switch(id){
            case 0://默认勾选	default_check
                return this.gameSwitch.default_check==1;
                break;
            case 1://延迟显示（文字、按钮）	delay_display
                return this.gameSwitch.delay_txt_switch==1;
                break;
            case 2://强制调起视频	force_video
                return this.gameSwitch.force_video==1;
                break;
            case 3://强制调起录屏分享	force_share
                return this.gameSwitch.force_share==1;
                break;
            case 4://导出位开关	screen_switch
                return this.gameSwitch.export_marquee==1;
                break;
            case 5://砸金蛋开关	delay_egg_switch
                return this.gameSwitch.delay_egg_switch==1;
                break;
            case 6://原生广告左/右上角关闭按钮	ptg_native_limit_city
                return this.gameSwitch.ptg_native_limit_city==1;
                break;
            case 7://下一关/重新开始原生广告	ptg_native_limit
                return this.gameSwitch.ptg_native_limit==1;
                break;
            case 8://原生广告区域开关	原生广告屏蔽省份	 ptg_native_province	湖南省,湖北省  原生广告屏蔽城市	ptg_native_city	北京市,深圳市
            if(this.gameSwitch.ptg_native_province==1)return true;
            if(this.gameSwitch.ptg_native_city==1)return true;
                break;
            case 9://banner、激励视频城市屏蔽		 ignore_province	湖南省,湖北省  原生广告屏蔽城市	ignore_city	北京市,深圳市
            // if(this.gameSwitch.ignore_province==1)return true;
            // if(this.gameSwitch.ignore_city==1)return true;
            if(this.gameSwitch.local_switch==2)return true;//区域开关  local_switch值为1关，local_switch值为2开
                break;
            case 10://原生广告开启误触按钮文字	ptg_native_btn_text
                return this.gameSwitch.ptg_native_btn_text==1;
                break;
            case 11://阀值开关	ptg_threshold
                return this.gameSwitch.ptg_threshold==1;
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
                console.log(`login调用成功${data.data.token} `);
                GameData.Inst.platform.openid = "";
                ptgcspsdk.getOppoOpenid(data.data.token, (res)=>{
                    console.log(res);
                    if(GameData.Inst.platform.openid != "")return;
                    // callback.run();
                    // if(res.openid==null)res.openid="10001";
                    // if(res.anonymous_openid==null)res.anonymous_openid="10001";
                    // if(res.session_key==null)res.session_key="10001";
                    GameData.Inst.platform.openid = res.userId;
                    GameData.Inst.platform.anonymous_openid = res.userId;
                    GameData.Inst.platform.session_key = res.userId;
                    GameData.Inst.platform.sendLog(1005);

                });
                Laya.timer.once(5000, this, ()=>{
                    if(GameData.Inst.platform.openid != "")return;
                    // callback.run();
                    GameData.Inst.platform.openid = "10000";
                    GameData.Inst.platform.anonymous_openid = "10000";
                    GameData.Inst.platform.session_key = "10000";
                    GameData.Inst.platform.sendLog(1005);
                })
                // callback.runWith(null);
            },
            fail(res) {
                console.log(`login调用失败`);
                callbackFail.run();
            }
        });
          
    }

    
    /**
     * 分享接口
     * @param callback 
     * @param callbackFail 
     */
    share(callback:Laya.Handler, callbackFail:Laya.Handler, type:number=0):void{
        return;
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
            this.vad_id = ["201846","201847"][Math.floor(Math.random()*1)];
            this.videoADObj = this.proxy.createRewardedVideoAd({adUnitId:this.vad_id});
            this.videoADObj.onError((err)=>{
                console.log("video err:",err);
                // $this.videoADObj.load();
                if($this.callbackFailVideoAD){
                    $this.showMessage("暂无视频")
                    $this.callbackFailVideoAD.run();
                }
                $this.callbackVideoAD = null;
                $this.callbackFailVideoAD = null;
            });
            this.videoADObj.onClose((res)=>{
                console.log("onClose", $this.currVADType);
                // $this.videoADObj.load();
                console.log("onClose 0");
                if (res.isEnded) {
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
                if(GameData.Inst.data.sound)SoundManager.playBg();
                
            });
            this.videoADObj.onLoad(()=> {
                console.log("显示视频");
                $this.videoADObj.show();
            });
            
            // this.videoADObj.load();
            console.log("initVideoAD");
        }
    }
    /**
     * 视频广告接口
     * @param callback 
     * @param callbackFail 
     */
    videoAD(callback:Laya.Handler, callbackFail:Laya.Handler, type:number=0):void{
        if(this.videoADObj==null)return;
        if(this.callbackVideoAD!=null)return;

        this.currVADType = type;
        this.callbackVideoAD = callback;
        this.callbackFailVideoAD = callbackFail;
        this.sendLog(1010, type);
        this.videoADObj.load();
        console.log("videoAD 0");
        // this.videoADObj.show();
        // this.videoADObj.show().then(() => {
        //     console.log("videoAD广告显示成功");
        // }).catch(err => {
        //     console.log("广告组件出现问题", err);
        //     // 可以手动加载一次
        //     this.videoADObj.load().then(() => {
        //         console.log("手动加载成功");
        //         // 加载成功后需要再显示广告
        //         this.videoADObj.show();
        //     });
        // });
        console.log("videoAD 1");
    }

    
    initBannerAD():void{
        if(!this.proxy.createBannerAd)return;
        if(this.bannerADObj!=null){
            this.bannerADObj.destroy();
            // this.bannerADObj.offResize();
            // this.bannerADObj.offLoad();
            // this.bannerADObj.offError(); 
            Laya.timer.once(2000,this,()=>{
                this.bannerADObj=null; 
                this.initBannerAD();
                this.bannerADObj.show(); 
            });
        //   this.bannerADObj=null; 
         //   return;
        }
        if(this.bannerADObj==null){
            this.bad_id = ["201842","201843"][Math.floor(Math.random()*1)];
            console.log("显示广告id",this.bad_id); 
            this.bannerADObj = this.proxy.createBannerAd({
                adUnitId: this.bad_id,
                style: {
                    top: 300,
                    left: 0,
                    width: GameData.Inst.platform.proxy.getSystemInfoSync().windowWidth, 
                    height: 300
                  }
                // adIntervals: 30
            }); 
            this.bannerADObj.onLoad(()=> {
                console.log("initBannerAD广告显示成功");
               // this.bannerADObj.show(); 
                // if(this.bannerCallbacak)this.bannerCallbacak.run();
                // this.bannerCallbacak=null;

            });
        //    console.log("创建报错")
            this.bannerADObj.onError((err)=>{
                console.log("报错了！");
                console.log(err); 
            })
            // this.bannerADObj.show().then(()=>{ 
            //     console.log('banner广告展示完成');
            //   }).catch((err)=>{
            //     console.log('banner广告展示失败', JSON.stringify(err));  
            // })
            this.bannerADObj.onResize((size:any) => {
                console.log("setSize", size.width, size.height);
                let systemInfo:any =this.proxy.getSystemInfoSync();  
                let windowWidth = systemInfo.windowWidth;
                let windowHeight = systemInfo.windowHeight; 
             //   good
                this.bannerADObj.style.top = windowHeight - size.height;
                this.bannerADObj.style.left = (windowWidth - size.width) / 2;
                
             //   bad，会触发死循环
             //   bannerAd.style.width++;
            });
            console.log("initBannerAD");
        }
    }

    bannerCallbacak:Laya.Handler = null;
    /**
     * Banner广告接口
     * @param callback 
     */
    bannerAD(callback:Laya.Handler):void{
        this.bannerCallbacak = callback;
        this.initBannerAD();
        // callback.run();
        // this.bannerADObj.show();
        console.log("bannerAD");
    }

    iad_id2:string = '201845';
    iad_id_curr:string = "";
    interADPanel:ui.panels.InterADUI;
    initInterAD():void{
        /*if(!this.proxy.createNativeAd)return;
        if(this.interADObj==null){
            this.interADObj = this.proxy.createNativeAd({
                adUnitId: this.iad_id
            });

            this.interADObj.onError(err => {
                console.log("暂无InterAD");
            });
            this.interADObj.onLoad(()=> {
                console.log("initInterAD广告显示成功");
            });
            console.log("initInterAD");
        }*/
//
        this.interADPanel = new ui.panels.InterADUI();
        
        let $this = this;
        this.interADPanel.onAwake = ()=>{
            this.interADPanel.btn_click.on(Laya.Event.CLICK, this, ()=>{
                ptgcspsdk.collection(1051, this.openid, (data)=>{});
                if(this.getSwitch(11)){
                    ptgcspsdk.probability((data)=>{
                        console.log("interADPanel probability", data);
                        $this.InterADClickRate=data;
                    });
                }
              //  this.interADPanel.close();
                this.interADObj.reportAdClick({
                    adId: this.iad_id_curr
                })
            });
            this.interADPanel.btn_click2.on(Laya.Event.CLICK, this, ()=>{
                ptgcspsdk.collection(1051, this.openid, (data)=>{});
                if(this.getSwitch(11)){
                    ptgcspsdk.probability((data)=>{
                        console.log("interADPanel probability", data);
                        $this.InterADClickRate=data;
                    });
                }

               // this.interADPanel.close();
                this.interADObj.reportAdClick({
                    adId: this.iad_id_curr
                })
            });
            this.interADPanel.btn_close.on(Laya.Event.CLICK, this, ()=>{
               // this.interADPanel.close();
            });
        };
        this.interADPanel.onEnable = ()=>{
            /*this.interADObj.reportAdShow({
                adId: this.iad_id_curr
            });
            ptgcspsdk.collection(1050, this.openid, (data)=>{});*/
            console.log("interADPanel.onEnable", this.getSwitch(6));
        };
    }
    InterADClickRate:number = 0;
    InterAD(callback:Laya.Handler):void{
        console.log("准备执行");
        console.log(callback);
        console.log(this.getSwitch(7));
        if(callback!=null){
            if(!this.getSwitch(7))return;
        }
        this.InterAD3();
    }
    InterAD3():void{
        console.log("ad3");
        console.log(this.getSwitch(8));
        console.log(this.proxy.createNativeAd);
      //  if(this.getSwitch(8))return;
        if(!this.proxy.createNativeAd)return;

        let $this = this;
        if(this.interADObj)this.interADObj.destroy();
        this.iad_id ="201844";
        this.interADObj = this.proxy.createNativeAd({
            adUnitId: this.iad_id
        });

        this.interADObj.onError(err => {
            console.log("暂无InterAD");
            $this.InterAD2();
        });
        this.interADObj.onLoad((res)=> {
            console.log("initInterAD广告显示成功", res);
            $this.iad_id_curr = res.adList[0].adId;
            
            this.interADObj.reportAdShow({
                adId: this.iad_id_curr
            })
            ptgcspsdk.collection(1050, this.openid, (data)=>{});
            if(this.InterADClickRate==1){
                if(this.getSwitch(11)){
                    ptgcspsdk.probability((data)=>{
                        console.log("interADPanel probability", data);
                        $this.InterADClickRate=data;
                    });
                }
                return;
            }

            $this.interADPanel.txt_ad.text = res.adList[0].desc;
            // $this.interADPanel.txt_btn.text = res.adList[0].clickBtnTxt;
            $this.interADPanel.txt_btn.text = this.getSwitch(10)?"点击查看":"查看广告";
            let imgURL:string = res.adList[0].imgUrlList[0];
            // if(imgURL.indexOf("?")!=-1)imgURL = imgURL.substring(0, imgURL.indexOf("?"));
            $this.interADPanel.img_ad.skin = imgURL;
            $this.interADPanel.show();
            $this.interADPanel.y=Laya.stage.height-1334;
            console.log( $this.interADPanel.y);
            console.log("他的坐标");
            if( this.getSwitch(6)){
                this.interADPanel.btn_close.visible = false;
                Laya.timer.once(3000, this, ()=>{
                    this.interADPanel.btn_close.visible = false;
                });
                console.log("interADPanel.onEnable 1");
            }else{
                this.interADPanel.btn_close.visible = false;
                console.log("interADPanel.onEnable 0");
            }
            console.log(this.interADPanel.btn_close.visible);
        });
        this.interADObj.load();
        console.log("InterAD");
    }
    InterAD2():void{
        // if(!this.getSwitch(7))return;
      //  if(this.getSwitch(8))return;
        if(!this.proxy.createNativeAd)return;

        let $this = this;
        if(this.interADObj)this.interADObj.destroy();

        this.interADObj = this.proxy.createNativeAd({
            adUnitId: this.iad_id2
        });

        this.interADObj.onError(err => {
            console.log("暂无InterAD");
            $this.InterAD3();
        });
        this.interADObj.onLoad((res)=> {
            console.log("initInterAD广告显示成功", res);
            $this.iad_id_curr = res.adList[0].adId;

            this.interADObj.reportAdShow({
                adId: this.iad_id_curr
            })
            ptgcspsdk.collection(1050, this.openid, (data)=>{});
            if(this.InterADClickRate==1){
                if(this.getSwitch(11)){
                    ptgcspsdk.probability((data)=>{
                        console.log("interADPanel probability", data);
                        $this.InterADClickRate=data;
                    });
                }
                return;
            }
          //  top
            $this.interADPanel.txt_ad.text = res.adList[0].desc;
            // $this.interADPanel.txt_btn.text = res.adList[0].clickBtnTxt;
            $this.interADPanel.txt_btn.text = this.getSwitch(10)?"点击查看":"查看广告";
            let imgURL:string = res.adList[0].imgUrlList[0];
            // if(imgURL.indexOf("?")!=-1)imgURL = imgURL.substring(0, imgURL.indexOf("?"));
            $this.interADPanel.img_ad.skin = imgURL;
            $this.interADPanel.show();
            $this.interADPanel.y=Laya.stage.height-1334;
            if( this.getSwitch(6) ){
                this.interADPanel.btn_close.visible = false;
                Laya.timer.once(3000, this, ()=>{
                    this.interADPanel.btn_close.visible = false;
                });
                console.log("interADPanel.onEnable 1");
            }else{
                this.interADPanel.btn_close.visible = false;
                console.log("interADPanel.onEnable 0");
            }
        });
        this.interADObj.load();
        console.log("InterAD");
    }

    
    /**
     * 跳转其它APP接口
     * @param callback 
     * @param callbackFail 
     */
    openApp(appInfo:any, callback:Laya.Handler):void{
        console.log("openApp", appInfo);
        if(!this.proxy.navigateToMiniGame)return;

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