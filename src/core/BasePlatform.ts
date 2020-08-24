import { ptgcspsdk } from "../platforms/ptgcspsdk";
import JSONManager from "./JSONManager";
import { ui } from "../ui/layaMaxUI";
import GameData from "./GameData";
import BaseConfig from "./BaseConfig";

export default class BasePlatform {
    /**
     * 平台ID
     */
    id:string = "test";
    /**
     * 代理平台API对象
     */
    proxy:any = null;

    constructor(){

    }
    bannerADObj:any;
    initBannerAD():void{

    }
    public showMessage(mes: string) {
     
    }
    videoADObj:any;
    initVideoAD():void{
        
    }
    interADObj:any;
    initInterAD():void{
        
    }
    isUseSubpackage():boolean{
        return false;
    }
    loadSubpackage(name:string, callback:Laya.Handler, callbackLoad:Laya.Handler):void{
        callback.run();
    }


    interADPanel:ui.panels.InterADUI;
    gameList:any[];
    gameSwitch:any;
    getGameConfig():void{
        ptgcspsdk.getGameSwitch((res)=>{
            console.log("getGameSwitch", res);
            if(typeof res == "string"){
                res = JSON.parse(res)
            }
            this.gameSwitch = res.data;
        });
        /*ptgcspsdk.getJumpGameList((res)=>{
            console.log("getJumpGameList", res);
            if(typeof res == "string"){
                res = JSON.parse(res)
            }
            this.gameList = res;
        });*/
    }
    setGameList(list:any):void{
        this.gameList = JSONManager.gameList;
    }
    videointerval=0;  
    clickList:string[] = [];
    getGameList(posid:string,count:number=3):any[]{
        let list:any[] = []
        if(this.gameList!=null && this.gameList.length>0){
            for(let i:number=0; i<this.gameList.length; i++){
                if(this.gameList[i].position==posid ){
                    list.push(this.gameList[i]);
                }
            }
            list = list.sort((item0, item1)=>{
                return Math.random()>0.5?-1:1;
            });
            let tmp:any[] = [];
            for(let j:number=0; j<count; j++){
                for(let i:number=0; i<list.length; i++){
                    tmp.push(list[i]);
                }
            }
            list = tmp;
        }
        return list;
    }
    getUseAPI(apiId:number):boolean{
        return false;
    }
    /**
     * 0://默认勾选	default_check
     * 1://延迟显示（文字、按钮）	delay_display
     * 2://强制调起视频	force_video
     * 3://强制调起录屏分享	force_share
     * 4://导出位开关	screen_switch
     * 5://砸金蛋开关
     * @param id 
     */
    getSwitch(id:number):boolean{
        return false;
    }

    // 插屏广告
    iad_id:string = "jkn5mmoqg1n4f065cq";
    // 激励式视频
    vad_id:string = "179c7bea95de9h44cg";
    // banner
    bad_id:string = "24jcf61dpjhf4rh41l";

    session_key:string = "10000";
    anonymous_openid:string = "10000";
    openid:string = "10000";
    cid:number = 0;
    get isNew():number{
        let data = Laya.LocalStorage.getJSON("isNew");
        if(data==null || data==""){
            Laya.LocalStorage.setJSON("isNew", {isNew:true});
            return 1;
        }
        return 0;
    }
    /**
     * Login:1005,  //登录    Authority:1006,//授权     Start:1008,  //开始游戏    Share:1009,  //用户分享 
     * Video:1010,  //点击观看视频    VideoSuccess:1011, //观看完视频    Jump:1007, //点击跳出 JumpSuccess:1017 //成功跳出
     * @param aid 
     * @param type 
     */
    sendLog(aid:number, type:number=0, posid:string="", toAppid:string=""):void{
    }
    /**
     * 
     * @param callback 初始化平台
     */
    init(callback?:Laya.Handler):void{
        if(callback)callback.run();
        this.getGameConfig();
    }
    zhengDongShort():void{

    }
    zhengDongLong():void{

    }
    /**
     * 打开客服
     */
    openService():void{

    }
    
    getOpenid(callback:Laya.Handler, callbackFail:Laya.Handler):void{
        callbackFail.run();
    }
    /**
     * 登录接口
     * @param callback 
     * @param callbackFail 
     */
    login(callback:Laya.Handler, callbackFail:Laya.Handler):void{
        callbackFail.run();
    }
    
    /**
     * 分享接口
     * @param callback 
     * @param callbackFail 
     */
    share(callback:Laya.Handler, callbackFail:Laya.Handler, type:number=0):void{
        callback.run();
    }
    
    /**
     * 分享视频接口
     * @param callback 
     * @param callbackFail 
     */
    shareVideo(callback:Laya.Handler, callbackFail:Laya.Handler):void{
       if(GameData.Inst.platform.id!=BaseConfig.pid_dy) callback.run();
    }

    
    /**
     * 视频广告接口
     * @param callback 
     * @param callbackFail 
     */
    videoAD(callback:Laya.Handler, callbackFail:Laya.Handler, type:number=0):void{
        callback.run();
    }

    /**
     * Banner广告接口
     * @param callback 
     */
    bannerAD(callback:Laya.Handler):void{

    }
    InterAD(callback:Laya.Handler):void{

    }

    /**
     * 跳转其它APP接口
     * @param callback 
     * @param callbackFail 
     */
    openApp(appInfo:any, callback:Laya.Handler):void{

    }

    
    /**
     * 录制游戏视频接口
     * @param callback 
     * @param callbackFail 
     */
    recordVideo(callback:Laya.Handler, callbackFail:Laya.Handler):void{

    }
    stopVideo(){
    }

}