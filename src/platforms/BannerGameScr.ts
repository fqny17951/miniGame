import GameData from "../core/GameData";
import BaseConfig from "../core/BaseConfig";
import GameStage from "../game/GameStage";

/**
 * Banner脚本绑定Box上
 */
export default class BannerScr extends Laya.Script {
    /** @prop {name: showType, tips:"出现方式",type:number, default:0} */
    showType:number = 0;

    proxy:any;
    constructor(){
        super();
    }
    onAwake(){
        if([BaseConfig.pid_qq, BaseConfig.pid_oppo,BaseConfig.pid_vivo].indexOf(GameData.Inst.platform.id) == -1)return;
        GameStage.Inst.on(Laya.Event.START, this, this.showBanner);
        GameStage.Inst.on(Laya.Event.STOPPED, this, this.onDisable);
        this.proxy = GameData.Inst.platform.proxy;
    }
    isInit:boolean = false;
    onEnable(){
        /*if(GameData.Inst.platform.id != BaseConfig.pid_qq){
            this.onDisable();
        }*/
    }
    showBanner():void{
        if(GameData.Inst.platform.id==BaseConfig.pid_vivo){
            Laya.timer.once(3000,this,()=>{
            this.isInit = false;
            if([BaseConfig.pid_qq, BaseConfig.pid_oppo,BaseConfig.pid_vivo].indexOf(GameData.Inst.platform.id) == -1)return;
            if(!GameData.Inst.platform.getSwitch(12)&&GameData.Inst.platform.id==BaseConfig.pid_qq)return;
            GameData.Inst.platform.bannerAD(Laya.Handler.create(this, ()=>{
                this.isInit = true;
                // GameData.Inst.platform.bannerADObj.style.left=0;
                // if(GameData.Inst.platform.id==BaseConfig.pid_vivo)GameData.Inst.platform.bannerADObj.style.width = GameData.Inst.platform.proxy.getSystemInfoSync().screenHeight;
                // else    GameData.Inst.platform.bannerADObj.style.width = GameData.Inst.platform.proxy.getSystemInfoSync().windowWidth;
                GameData.Inst.platform.bannerADObj.show();
    
                // let bannerRefreshTime:number = GameData.Inst.platform.gameSwitch.Refresh_time1;
                // if(!isNaN(bannerRefreshTime) && bannerRefreshTime>0){
                //     Laya.timer.once(bannerRefreshTime*1000, this, this.refreshBanner);
                // }
            })); 
            
        });
        return;
    }
        this.isInit = false;
        if([BaseConfig.pid_qq, BaseConfig.pid_oppo,BaseConfig.pid_vivo].indexOf(GameData.Inst.platform.id) == -1)return;
        if(!GameData.Inst.platform.getSwitch(12)&&GameData.Inst.platform.id==BaseConfig.pid_qq)return;
        GameData.Inst.platform.bannerAD(Laya.Handler.create(this, ()=>{
            this.isInit = true;
            // GameData.Inst.platform.bannerADObj.style.left=0;
            // if(GameData.Inst.platform.id==BaseConfig.pid_vivo)GameData.Inst.platform.bannerADObj.style.width = GameData.Inst.platform.proxy.getSystemInfoSync().screenHeight;
            // else    GameData.Inst.platform.bannerADObj.style.width = GameData.Inst.platform.proxy.getSystemInfoSync().windowWidth;
            GameData.Inst.platform.bannerADObj.show();

            // let bannerRefreshTime:number = GameData.Inst.platform.gameSwitch.Refresh_time1;
            // if(!isNaN(bannerRefreshTime) && bannerRefreshTime>0){
            //     Laya.timer.once(bannerRefreshTime*1000, this, this.refreshBanner);
            // }
        }));
        
  
    }
    refreshBanner():void{
        if(this.isInit){
            if(  GameData.Inst.platform.bannerADObj){

                GameData.Inst.platform.bannerADObj.destroy();
         if(GameData.Inst.platform.id==BaseConfig.pid_qq)       GameData.Inst.platform.bannerADObj.offResize();
                GameData.Inst.platform.bannerADObj.offLoad();
                GameData.Inst.platform.bannerADObj=null;
            }
            this.showBanner();
        }
    }
    onDisable(){
        if(this.isInit){
            if(GameData.Inst.platform.bannerADObj)GameData.Inst.platform.bannerADObj.hide();
        }
        this.isInit = false;
        Laya.timer.clearAll(this);
    }
    onDestroy(){
        if(GameData.Inst.platform.bannerADObj)GameData.Inst.platform.bannerADObj.hide();
        this.isInit = false;
        Laya.timer.clearAll(this);
    }
}