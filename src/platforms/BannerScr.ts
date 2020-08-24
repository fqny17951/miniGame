import GameData from "../core/GameData";
import BaseConfig from "../core/BaseConfig";

/**
 * Banner脚本绑定Box上
 */
export default class BannerScr extends Laya.Script {
    /** @prop {name: showType, tips:"出现所在窗口类型",type:number, default:0} */
    showType:number = 0;
    /** @prop {name: adType, tips:"出现方式类型，误点1，",type:number, default:0} */
    adType:number = 0;
    /** @prop {name: btnName, tips:"误点按钮名字，",type:string, default:""} */
    btnName:string = "";
    /** @prop {name: yTag, tips:"按钮在界面上Y的位置",type:number, default:0} */
    yTag:number = 0;
    constructor(){
        super();
    }

    btn:Laya.Button;
    onAwake(){
        if(this.btnName!=""){
            this.btn = (this.owner.getChildByName(this.btnName) as Laya.Button);
        }
    }
    isInit:boolean = false;
    onEnable(){
        if(GameData.Inst.platform.id == BaseConfig.pid_wx && GameData.Inst.platform.bannerADObj){
            GameData.Inst.platform.bannerADObj.hide();
        }
        if(GameData.Inst.platform.id == BaseConfig.pid_qq&&this.adType!=3){this.showBanner();
            this.isInit=false;
            return;
        }
        this.isInit = false;
        if(this.showType>0){
            if(this.showType==2){//结算界面处理
                if(GameData.Inst.platform.id == BaseConfig.pid_oppo || GameData.Inst.platform.id == BaseConfig.pid_vivo|| GameData.Inst.platform.id == BaseConfig.pid_dy){//OPPO vivo不显示
                    return;
                }
            }
        }

        if(this.adType<=0){
            if(GameData.Inst.platform.id==BaseConfig.pid_vivo)
             this.showOldBanner();
             else this.showBanner();
    
        }else{
            if(GameData.Inst.platform.id == BaseConfig.pid_wx){
                GameData.Inst.platform['bannerUpdate']();
            }
            if(this.adType==1){
                if(GameData.Inst.platform.id == BaseConfig.pid_wx && this.btn!=null && GameData.Inst.platform.getSwitch(17)){
                    this.btn.visible=true;
                    this.btn.y = Laya.stage.height-30;
                   this.btn.mouseEnabled = false;
                    Laya.timer.once(1500, this, this.showBanner);
                }else{
                     this.btn.y = Laya.stage.height-30;
                  //  this.showBanner();
                }
            }
        }
    }
    showOldBanner():void{
     
        if(GameData.Inst.platform.bannerADObj!=null){
            GameData.Inst.platform.bannerADObj.hide();
          Laya.timer.once(3000,this,()=>{
            console.log("显示原来的",this.owner.name);
            console.log(this.owner.name);
            console.log(this.owner);
            this.isInit = true;
            GameData.Inst.platform.bannerADObj.show();
            // let bannerRefreshTime:number = GameData.Inst.platform.gameSwitch.Refresh_time1;
            // if(!isNaN(bannerRefreshTime) && bannerRefreshTime>0){
            //     Laya.timer.once(bannerRefreshTime*1000, this, this.refreshBanner);
            // }
        });
    }else this.showBanner();
    }
    showBanner():void{
        console.log("新建一个",this.owner.name);
        console.log(this.owner.name);
        if(this.showType>0){
            if(this.showType==2){//结算界面处理
                // if(GameData.Inst.platform.id == BaseConfig.pid_oppo || GameData.Inst.platform.id == BaseConfig.pid_vivo){//OPPO vivo不显示
                //     return;
                // }
            }
        }
        GameData.Inst.platform.bannerAD(Laya.Handler.create(this, ()=>{
            this.isInit = true;
            if(GameData.Inst.platform.id != BaseConfig.pid_vivo){
                // if(GameData.Inst.platform.id==BaseConfig.pid_vivo)GameData.Inst.platform.bannerADObj.style.width = GameData.Inst.platform.proxy.getSystemInfoSync().screenHeight;
                // else    GameData.Inst.platform.bannerADObj.style.width = GameData.Inst.platform.proxy.getSystemInfoSync().windowWidth;
              //   GameData.Inst.platform.bannerADObj.style.left=0;
            //    GameData.Inst.platform.bannerADObj.style.width +=1;// GameData.Inst.platform.proxy.getSystemInfoSync().windowWidth;
            
                // let bannerRefreshTime:number = GameData.Inst.platform.gameSwitch.Refresh_time1;
                // if(!isNaN(bannerRefreshTime) && bannerRefreshTime>0){
                //     Laya.timer.once(bannerRefreshTime*1000, this, this.refreshBanner);
                // }
            }
            // Laya.timer.once(25000, this, this.onDisable);
            GameData.Inst.platform.bannerADObj.show();
            if(this.adType==1){
                if(GameData.Inst.platform.id == BaseConfig.pid_wx && this.btn!=null && GameData.Inst.platform.getSwitch(17)){
                  //  this.btn.mouseEnabled = true;
                  Laya.timer.once(1000, this, ()=>{

                    this.btn.mouseEnabled = true;
                  });
                    Laya.Tween.to(this.btn, {y:this.yTag+(Laya.stage.height-1334)/2}, 200);
                }
            }
            
        }));

    }

    refreshBanner():void{
        if(this.isInit){
            if(  GameData.Inst.platform.bannerADObj){

                GameData.Inst.platform.bannerADObj.destroy();
             //   GameData.Inst.platform.bannerADObj.offResize();
                GameData.Inst.platform.bannerADObj.offLoad();
                GameData.Inst.platform.bannerADObj=null;
            }
            this.showBanner();
        }
    }
    onDisable(){
        if(this.isInit && GameData.Inst.platform.bannerADObj){
            GameData.Inst.platform.bannerADObj.hide();
            // GameData.Inst.platform.bannerADObj.offResize(()=>{});
        console.log("隐藏老banner");
            
        }
        this.isInit = false;
        Laya.timer.clearAll(this);

    }
    onDestroy(){
        if(this.isInit && GameData.Inst.platform.bannerADObj){
       if(GameData.Inst.platform.id!=BaseConfig.pid_vivo)     GameData.Inst.platform.bannerADObj.hide();
           //  GameData.Inst.platform.bannerADObj.offResize(()=>{});
        }
        this.isInit = false;
        Laya.timer.clearAll(this);
   
    }

}