import GameData from "../core/GameData";
import BaseConfig from "../core/BaseConfig";
import TaskPanel from "../panels/TaskPanel";

/**
 * QQ游戏盒子
 */
export default class BoxGameListScr extends Laya.Script {
    /** @prop {name: showType, tips:"出现方式",type:number, default:0} */
    showType:number = 0;
    constructor(){
        super();
    }
    onAwake(){
    }
    isInit:boolean = false;
    appBox:any;
    onEnable(){
       // ShopPanel.Inst.on(Laya.Event.CHANGE, this, this.showBanner);
       this.appBox=null;
        TaskPanel.Inst.on(Laya.Event.CHANGE, this, this.showBanner);
        this.isInit = false;
        if(GameData.Inst.platform.id != BaseConfig.pid_qq)return;
        if(!GameData.Inst.platform.getSwitch(13))return;
        
        if(this.showType==1){
            Laya.timer.once(500, this,  this.showBanner);
        }else if(this.showType==2){
        }else{
            this.showBanner();
        }
    }
    Promise:boolean=false;
    showBanner():void{
        if(GameData.Inst.platform.id != BaseConfig.pid_qq)return;
        if(!GameData.Inst.platform.getSwitch(13))return;
        if(this.isInit)return;
        this.isInit = true;
        console.log("AppBox show" );
        if(this.appBox){            
       this.Promise=this.appBox.destroy();
        this.appBox=null;
            Laya.timer.loop(100,this,()=>{
                if(this.Promise){
                    Laya.timer.clearAll(this);
                    this.Promise=false;
                    this.appBox = GameData.Inst.platform.proxy.createAppBox({adUnitId:"815449bea27d1ca778150d43eb9687fa"});
                    this.appBox.onClose(()=>{
                        this.appBox.destroy();
                        this.appBox=null;
                        this.isInit = false;
                    });
                    this.appBox.load().then(() => {
                        console.log("AppBox 显示成功");
                        this.appBox.show();
                    })
                    
                }


            })

        }else {
        this.appBox = GameData.Inst.platform.proxy.createAppBox({adUnitId:"815449bea27d1ca778150d43eb9687fa"});
            
        this.appBox.load().then(() => {
            console.log("AppBox 显示成功");
            this.appBox.show();
              this.appBox.onClose(()=>{
                this.appBox.destroy();
                this.appBox=null;
                this.isInit = false;
            });
        })

    }
    }
    onDisable(){
        //console.log(hezi)
        this.isInit = false;
        if(this.appBox){this.appBox.destroy();
            this.appBox=null;
            this.Promise=false;
        }
        Laya.timer.clearAll(this);
    }
    onDestroy(){
        if(this.appBox){this.appBox.destroy();
            this.appBox=null;
            this.Promise=false;
        }
        this.isInit = false;
        Laya.timer.clearAll(this);
    }
}