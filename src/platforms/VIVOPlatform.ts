import BasePlatform from "../core/BasePlatform";
import { ptgcspsdk } from "./ptgcspsdk";
import GameData from "../core/GameData";
import { ui } from "../ui/layaMaxUI";
import SoundManager from "../core/SoundManager";

export default class VIVOPlatform extends BasePlatform {
    constructor(){
        super();
    }
    public showMessage(mes: string) {
        console.log("showMessage", mes);
        if (this.proxy) {
            let obj = {};
            obj["message"] = mes;
            this.proxy.showToast(obj);
        }
    }
    isUseSubpackage():boolean{
        return true;
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
            Laya.timer.once(100, this, ()=>{
                if(this.isShowVAD)SoundManager.stopBg();
            });
        });

        this.proxy.onHide((res: any) => {
            Laya.stage.event(Laya.Event.BLUR);
        });

        if(callback)callback.run();
        
        this.getGameConfig();
        /*
        this.proxy.onAudioInterruptionBegin(()=>{
            SoundManager.stopBg();
        });
        this.proxy.onAudioInterruptionEnd(()=>{
            if(GameData.Inst.data.sound)SoundManager.playBg();
        });
        */
    }
    
    zhengDongShort():void{
        this.proxy.vibrateShort();
    }
    zhengDongLong():void{
        this.proxy.vibrateLong();
    }

        
    getGameConfig():void{
        this.cid = 0;
        this.bad_id = "d7b63eae2c0e4ddf9984c2b3aa190ea0";
        this.iad_id = "e963944a8e924338ae3a9032a35dfc79";//187039
        this.vad_id = "2754682acd784bca99d2117de2b7478b";
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

            if($this.getSwitch(9)&&!$this.getSwitch(8)){
                Laya.timer.loop(25000, $this, ()=>{
                    $this.InterAD(null);
                });
            }
            if(this.getSwitch(11)){
                ptgcspsdk.probability((data)=>{
                    console.log("interADPanel probability", data);
                    $this.InterADClickRate=data;
                });
            }
        });

        $this.gameList = [];
        /*ptgcspsdk.getJumpGameList((res)=>{
            console.log("getJumpGameList", res);
            if(typeof res == "string"){
                res = JSON.parse(res)
            }
            $this.gameList = res;
        });*/

        
        
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
      //  if(this.gameSwitch.local_switch==1)return false;//区域开关  local_switch值为1关，local_switch值为2开
        
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
            case 4://banner区域开关
             if(this.gameSwitch.local_switch==2)return true;
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
            case 9://原生广告xxx秒开关	ptg_yuansheng_limit
                return this.gameSwitch.ptg_yuansheng_limit==1;
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
        if(this.proxy.getSystemInfoSync().platformVersionCode < 1053)return;
        this.proxy.login().then((data) => {
            if (data.data.token!="") {
                // 使用token进行服务端对接
                console.log(`login调用成功${data.data.token} `);
                GameData.Inst.platform.openid = "";
                ptgcspsdk.getVivoOpenid(data.data.token, (res)=>{
                    // this.showMessage(JSON.stringify(res));
                    console.log(res, `login调用成功${data.data.token} `);
                    if(GameData.Inst.platform.openid != "")return;
                    // callback.run();
                    if(res.openId==null)res.openId="10001";
                    if(res.anonymous_openId==null)res.anonymous_openId="10001";
                    if(res.session_key==null)res.session_key="10001";
                    GameData.Inst.platform.openid = res.openId;
                    GameData.Inst.platform.anonymous_openid = res.openId;
                    GameData.Inst.platform.session_key = res.openId;
                    GameData.Inst.platform.sendLog(1005);

                });
                Laya.timer.once(5000, this, ()=>{
                    if(GameData.Inst.platform.openid != "")return;
                    callback.run();
                    GameData.Inst.platform.openid = "10000";
                    GameData.Inst.platform.anonymous_openid = "10000";
                    GameData.Inst.platform.session_key = "10000";
                    GameData.Inst.platform.sendLog(1005);
                })
            }else{
                console.log(`login调用失败`);
                callbackFail.run();
            }
        }, (err) => {
            console.log(`login调用失败`);
            callbackFail.run();
        });          
    }

    
    /**
     * 分享接口
     * @param callback 
     * @param callbackFail 
     */
    share(callback:Laya.Handler, callbackFail:Laya.Handler, type:number=0):void{
        
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
            this.vad_id = ["6ce9b2794a5e42a6ae0a0f04ec3d3461","71e7f2b1578f4f1d97cc1d1e7a01b87e"][Math.floor(Math.random()*1)];
            this.videoADObj = this.proxy.createRewardedVideoAd({posId:this.vad_id});
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
                if(GameData.Inst.data.sound)SoundManager.playBg();
                
                console.log("onClose end");
                this.showVADTime = Laya.Browser.now();
                this.isShowVAD = false;
            });
            this.videoADObj.onLoad(()=> {
                if($this.callbackVideoAD){
                    $this.videoADObj.show().then(()=>{ 
                        console.log('激励视频广告展示完成');
                        SoundManager.stopBg();
                        this.isShowVAD = true;
                    }).catch((err)=>{
                        console.log('激励视频广告展示失败', JSON.stringify(err));
                    })
                }
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
        this.isShowVAD = false;
        if(this.videoADObj==null)return;
        if(this.callbackVideoAD!=null)return;
        let time:number = Math.floor((Laya.Browser.now()-this.showVADTime)/1000);
        if(time<60){
            this.showMessage((60-time)+"秒后再观看视频");
            return;
        }

        this.currVADType = type;
        this.callbackVideoAD = callback;
        this.callbackFailVideoAD = callbackFail;
        this.sendLog(1010, type);

        console.log("videoAD 0");
        // this.videoADObj.show();
        this.videoADObj.load();
        console.log("videoAD 1");
    }

    
    initBannerAD():void{
        if(!this.proxy.createBannerAd)return;
        if(this.bannerADObj!=null){
            this.bannerADObj.destroy();
             this.bannerADObj.offResize();
             this.bannerADObj.offLoad();
             this.bannerADObj.offError(); 
            //  this.bannerADObj=null; 
              Laya.timer.once(4000,this,()=>{
                this.bannerADObj=null; 
              //  this.bannerAD(callback);
              //  this.bannerADObj.show(); 
              this.initBannerAD();
            });
            return;
        }
        let time:number = Math.floor((Laya.Browser.now()-this.showBADTime)/1000);
        if(time<10){
            // this.showMessage((60-time)+"秒后再观看视频");
            return;
        }
        this.bad_id = ["d7b63eae2c0e4ddf9984c2b3aa190ea0","493d71db70464f8ca9be426f38f83150"][Math.floor(Math.random()*1)];
        this.bannerADObj = this.proxy.createBannerAd({
            posId: this.bad_id,
            style: {}
      });
        this.bannerADObj.onError((err)=> {
            console.log("banner广告加载失败", err);
            // this.showMessage("banner失败"+err.errCode);
            this.showBADTime = Laya.Browser.now();
        });
        this.bannerADObj.onLoad(()=> {
            console.log("initBannerAD广告显示成功");
            // this.bannerADObj.show().then(()=>{ 
            //     console.log('banner广告展示完成');
            //    // callback.run();
            // }).catch((err)=>{
            //     console.log('banner广告展示失败', JSON.stringify(err));
            //     // this.showMessage("banne失败"+JSON.stringify(err));
            // })
        });
        this.bannerADObj.onClose(()=> {
            console.log("initBannerAD onClose");
            this.showBADTime = Laya.Browser.now();
        });
        
        if (this.proxy.getSystemInfoSync().platformVersionCode >= 1053){
            this.bannerADObj.onSize((size:any) => {
                console.log("setSize", size.width, size.height);
                let systemInfo:any =this.proxy.getSystemInfoSync();
                let windowWidth = systemInfo.screenWidth;
                let windowHeight = systemInfo.screenHeight;
                
                // good
                this.bannerADObj.style.top = windowHeight - size.height;
                this.bannerADObj.style.left = (windowWidth - size.width) / 2;
                
                // bad，会触发死循环
                // bannerAd.style.width++;
                this.showBADTime = Laya.Browser.now();
            });
        }
        
        this.showBADTime = Laya.Browser.now();
      
        console.log("bannerAD");
    }

    
    showBADTime:number = 0;
    showIADTime:number = 0;
    /**
     * Banner广告接口
     * @param callback 
     */
    bannerAD(callback:Laya.Handler):void{
        let time:number = Math.floor((Laya.Browser.now()-this.showBADTime)/1000);
        if(time<10){
            // this.showMessage((60-time)+"秒后再观看视频");
            return;
        }
        this.showBADTime = Laya.Browser.now();
        if(this.bannerADObj){
            this.initBannerAD();
        if(callback)callback.run();
    }
    }
    iad_id2:string = 'ca2be0596bbe4e72a8a2280c74c719a2';
    iad_id_curr:string = "";
    interADPanel:ui.panels.InterAD1UI;
    initInterAD():void{
        if (this.proxy.getSystemInfoSync().platformVersionCode < 1053)return;
        this.interADPanel = new ui.panels.InterAD1UI();
    
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
                this.interADPanel.close();
                this.interADPanel.dataSource.reportAdClick({
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

                this.interADPanel.close();
                this.interADPanel.dataSource.reportAdClick({
                    adId: this.iad_id_curr
                })
            });
            this.interADPanel.btn_close.on(Laya.Event.CLICK, this, ()=>{
             if(this.getSwitch(6)&&!this.getSwitch(8)) {
                ptgcspsdk.collection(1051, this.openid, (data)=>{});
                if(this.getSwitch(11)){
                    ptgcspsdk.probability((data)=>{
                        console.log("interADPanel probability", data);
                        $this.InterADClickRate=data;
                    });
                }

                this.interADPanel.close();
                this.interADPanel.dataSource.reportAdClick({
                    adId: this.iad_id_curr
                })

             }
             else    this.interADPanel.close();
            });
        };
        this.interADPanel.onEnable = ()=>{
            
        };
        // if(this.getSwitch(9)&&!this.getSwitch(8))Laya.timer.loop(20*1000,this,()=>{
        //     this.InterAD(null);

        // })
    }
    InterADClickRate:number = 0;

    InterAD(callback:Laya.Handler):void{
        if (this.proxy.getSystemInfoSync().platformVersionCode < 1053)return;
        if(callback==null){
         //   if(!this.getSwitch(7))return;
        }
        let time:number = Math.floor((Laya.Browser.now()-this.showIADTime)/1000);
        if(time<10){
            // this.showMessage((60-time)+"秒后再观看视频");
            return;
        }
        this.showIADTime = Laya.Browser.now();
        this.InterAD3();
    }
    InterAD3():void{
        if (this.proxy.getSystemInfoSync().platformVersionCode < 1053)return;
      //  if(!this.getSwitch(8))return;
        if(!this.proxy.createNativeAd)return;

        let $this = this;
        if(this.interADObj==null){
            this.iad_id = ["81fc7a1fb5bd4a939f83fee525f50ca7","c02c2a0095304c62accf715872f45f6c"][Math.floor(Math.random()*1)];
            this.interADObj = this.proxy.createNativeAd({
                adUnitId: this.iad_id
            });

            this.interADObj.onError(err => {
                console.log("暂无InterAD");
                $this.InterAD2();
            });
            this.interADObj.onLoad((res)=> {
                console.log("initInterAD广告显示成功", res);
                // for(var i=0;i<res.adList.length;i++){
                for(var i=0;i<1;i++){
                    // if(i==res.adList.length-1) { $this.interADPanel.img_ad.skin = res.adList[i].imgUrlList[0];
                    //     $this.iad_id_curr = res.adList[i].adId;
                    //     $this.interADPanel.txt_ad.text = res.adList[i].desc;
                    // }
                    // if(res.adList[i].imgUrlList[0].indexOf("?")!=-1)continue;
                    // this.img_srcAd.loadImage(data.adList[0].imgUrlList[0],Laya.Handler.create(this,()=>{
                    //     this.visible = true;}
                    // Laya.loader.load(res.adList[i].imgUrlList[0], Laya.Handler.create(this,()=>{
                    //     //     var t: Laya.Texture = Laya.loader.getRes(data.adList[0].imgUrlList[0]);
                    //     $this.interADPanel.img_ad.skin = Laya.loader.getRes(res.adList[i].imgUrlList[0]);
                    // }));
                    let url:string = res.adList[i].imgUrlList[0];
                    console.log("图片地址为",url);
                    Laya.loader.create([{url:url, type:Laya.Loader.IMAGE}],
                        Laya.Handler.create(this, ()=>{
                            $this.interADPanel.img_ad.texture = Laya.loader.getRes(url);
                        }),
                        Laya.Handler.create(this, (propress:number)=>{
                        }, [], false),
                    );
                    $this.iad_id_curr = res.adList[i].adId;
                    $this.interADPanel.txt_ad.text = res.adList[i].desc;
                }
               

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

              
                // $this.interADPanel.txt_btn.text = res.adList[0].clickBtnTxt;
                $this.interADPanel.txt_btn.text = (this.getSwitch(10)&&!this.getSwitch(8))?"点击查看":"查看广告";

                let imgURL:string = res.adList[0].imgUrlList[0];


                if(imgURL.indexOf("?")!=-1)imgURL = imgURL.substring(0, imgURL.indexOf("?"));

                // let texture:Laya.Texture = new Laya.Texture();
                // texture.load(imgURL);
                // $this.interADPanel.img_ad.source = new Laya.Texture();

               // $this.interADPanel.img_ad.skin = imgURL;
              //  console.log("图片地址为",imgURL);
                // this.showMessage(imgURL);

                $this.interADPanel.dataSource = this.interADObj;
                $this.interADPanel.show();
                if($this.getSwitch(6)&&!$this.getSwitch(8)){
                    $this.interADPanel.btn_close.visible = false;
                    Laya.timer.once(3000, this, ()=>{
                        $this.interADPanel.btn_close.visible = true;
                    });
                }else{
                    $this.interADPanel.btn_close.visible = true;
                }
            
            });
        }
        this.interADObj.load();
        console.log("InterAD");
    }
    interADObj2:any;
    InterAD2():void{
        if (this.proxy.getSystemInfoSync().platformVersionCode < 1053)return;
      //  if(!this.getSwitch(8))return;
        if(!this.proxy.createNativeAd)return;

        let $this = this;
        if(this.interADObj2==null){

            this.interADObj2 = this.proxy.createNativeAd({
                adUnitId: this.iad_id2
            });

            this.interADObj2.onError(err => {
                console.log("暂无InterAD");
                // $this.InterAD3();
            });
            this.interADObj2.onLoad((res)=> {
                console.log("initInterAD广告显示成功", res);
             
              for(var i=0;i<res.adList.length;i++){
                if(i==res.adList.length-1) { $this.interADPanel.img_ad.skin = res.adList[i].imgUrlList[0];
                    $this.iad_id_curr = res.adList[i].adId;
                    $this.interADPanel.txt_ad.text = res.adList[0].desc;
                }
                if(res.adList[i].imgUrlList[0].indexOf("?")!=-1)continue;
                $this.interADPanel.img_ad.skin = res.adList[i].imgUrlList[0];
                $this.iad_id_curr = res.adList[i].adId;
                $this.interADPanel.txt_ad.text = res.adList[0].desc;
            }
                this.interADObj2.reportAdShow({
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

               // $this.interADPanel.txt_ad.text = res.adList[0].desc;
                // $this.interADPanel.txt_btn.text = res.adList[0].clickBtnTxt;
                $this.interADPanel.txt_btn.text = (this.getSwitch(10)&&!this.getSwitch(8))?"点击查看":"查看广告";

                let imgURL:string = res.adList[0].imgUrlList[0];
                if(imgURL.indexOf("?")!=-1)imgURL = imgURL.substring(0, imgURL.indexOf("?"));
              //  $this.interADPanel.img_ad.skin = imgURL;
                console.log("图片地址为",imgURL);
                $this.interADPanel.dataSource = this.interADObj2;
                $this.interADPanel.show();
                if($this.getSwitch(6)&&!$this.getSwitch(8)){
                    $this.interADPanel.btn_close.visible = false;
                    Laya.timer.once(3000, this, ()=>{
                        $this.interADPanel.btn_close.visible = true;
                    });
                }else{
                    $this.interADPanel.btn_close.visible = true;
                }
            });
        }
        this.interADObj2.load();
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
        $this.sendLog(1017, 0, appInfo[0].posid, appInfo[0].appId)
    }
}