import GameData from "../core/GameData";
import BaseConfig from "../core/BaseConfig";
import GameStage from "../game/GameStage";
import GameView from "../view/GameView";

/**
 * Banner脚本绑定Box上
 */
export default class BannerMainScr extends Laya.Script {
    /** @prop {name: showType, tips:"出现方式",type:number, default:0} */
    showType:number = 0;

    proxy:any;
    constructor(){
        super();
    }
    onAwake(){
        if([BaseConfig.pid_qq, BaseConfig.pid_wx,BaseConfig.pid_oppo,BaseConfig.pid_vivo,BaseConfig.pid_dy].indexOf(GameData.Inst.platform.id) == -1)return;
        GameView.Inst.on(Laya.Event.START, this, this.onDisable);
        GameView.Inst.on(Laya.Event.CHANGE, this, this.showBanner);
        this.proxy = GameData.Inst.platform.proxy;

        
    }
    isInit:boolean = false;
    onEnable(){
        if([BaseConfig.pid_qq, BaseConfig.pid_wx,BaseConfig.pid_oppo,BaseConfig.pid_vivo,BaseConfig.pid_dy].indexOf(GameData.Inst.platform.id) == -1)return;
        if(!this.isInit)  this.showBanner();
    }

    showBanner():void{
        this.isInit = false;
        if([BaseConfig.pid_qq, BaseConfig.pid_oppo,BaseConfig.pid_vivo,BaseConfig.pid_dy].indexOf(GameData.Inst.platform.id) == -1)return;
        console.log("显示banner");
     //   GameData.Inst.platform.initBannerAD();
      //  return;
        if(GameData.Inst.platform.bannerADObj&&GameData.Inst.platform.id==BaseConfig.pid_vivo){
          
             //   GameData.Inst.platform.bannerADObj.style.left=0;
            //     if(GameData.Inst.platform.id==BaseConfig.pid_vivo)GameData.Inst.platform.bannerADObj.style.width = GameData.Inst.platform.proxy.getSystemInfoSync().screenHeight;
            //  else    GameData.Inst.platform.bannerADObj.style.width = GameData.Inst.platform.proxy.getSystemInfoSync().windowWidth;
            if(GameData.Inst.platform.id==BaseConfig.pid_vivo)
            Laya.timer.once(2500,this,()=>{
                let bool= GameData.Inst.platform.bannerADObj.show();
                this.isInit = true;
                console.log(bool);
                console.log("显示老banner");


            })
               
       
        
            // console.log( GameData.Inst.platform.bannerADObj.style.top);
            // console.log( GameData.Inst.platform.bannerADObj.style.left);
            // console.log( GameData.Inst.platform.bannerADObj.style.width);
            // console.log( GameData.Inst.platform.bannerADObj.style.height);
            // console.log(GameData.Inst.platform.proxy.getSystemInfoSync().windowWidth);
            // console.log(GameData.Inst.platform.proxy.getSystemInfoSync().windowHeight);
            // let bannerRefreshTime:number = GameData.Inst.platform.gameSwitch.Refresh_time1;
            // if(!isNaN(bannerRefreshTime) && bannerRefreshTime>0){
            //     Laya.timer.once(bannerRefreshTime*1000, this, this.refreshBanner);
            // }
        }
        else {
          console.log("创建banner");
        GameData.Inst.platform.bannerAD(Laya.Handler.create(this, ()=>{
            this.isInit = true;
            // GameData.Inst.platform.bannerADObj.style.left=0;
            // if(GameData.Inst.platform.id==BaseConfig.pid_vivo)GameData.Inst.platform.bannerADObj.style.width = GameData.Inst.platform.proxy.getSystemInfoSync().screenHeight;
            // else    GameData.Inst.platform.bannerADObj.style.width = GameData.Inst.platform.proxy.getSystemInfoSync().windowWidth;
        //    GameData.Inst.platform.bannerADObj.style.width +=1;// GameData.Inst.platform.proxy.getSystemInfoSync().windowWidth;
            GameData.Inst.platform.bannerADObj.show();
            // let bannerRefreshTime:number = GameData.Inst.platform.gameSwitch.Refresh_time1;
            // if(!isNaN(bannerRefreshTime) && bannerRefreshTime>0){
            //     Laya.timer.once(bannerRefreshTime*1000, this, this.refreshBanner);
            // }
        }));
    }
}
refreshBanner():void{
    if(this.isInit){
        if(  GameData.Inst.platform.bannerADObj){

            GameData.Inst.platform.bannerADObj.destroy();
      //      GameData.Inst.platform.bannerADObj.offResize();
            GameData.Inst.platform.bannerADObj.offLoad();
            GameData.Inst.platform.bannerADObj=null;
        }
        this.showBanner();
    }
}
    onDisable(){
        if(this.isInit){
            console.log("隐藏老banner");
            if(GameData.Inst.platform.bannerADObj)GameData.Inst.platform.bannerADObj.hide();
        }
        this.isInit = false;
        Laya.timer.clearAll(this);
    }
    onDestroy(){
       if(GameData.Inst.platform.bannerADObj){
        console.log("销毁banner");
        if(GameData.Inst.platform.id!=BaseConfig.pid_vivo)     GameData.Inst.platform.bannerADObj.destroy();
    }
        this.isInit = false;
        Laya.timer.clearAll(this);
    }
}