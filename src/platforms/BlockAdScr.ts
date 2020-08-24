import GameData from "../core/GameData";
import BaseConfig from "../core/BaseConfig";
import GameView from "../view/GameView";

/**
 * Banner脚本绑定Box上
 */
export default class BlockAdScr extends Laya.Script {
    /** @prop {name: showType, tips:"出现方式0左，1右，2中",type:number, default:0} */
    showType:number = 0;
    /** @prop {name: showHV, tips:"显示0竖1横",type:number, default:0} */
    showHV:number = 0;
    /** @prop {name: showNum, tips:"显示数量",type:number, default:2} */
    showNum:number = 2;

    blockAdObj:any;
    proxy:any;
    constructor(){
        super();
    }
    onAwake(){
        if(GameData.Inst.platform.id != BaseConfig.pid_qq)return;
        this.proxy = GameData.Inst.platform.proxy;

    }
    isInit:boolean = false;
    onEnable(){
        // Laya.timer.once(300, this, this.showBanner);
        this.showBanner();
    }
    showBanner():void{
        this.isInit = false;
        if(GameData.Inst.platform.id != BaseConfig.pid_qq)return;
        if(this.proxy.createBlockAd==null)return;
        if(!GameData.Inst.platform.getSwitch(16))return;

        if(this.blockAdObj)this.blockAdObj.destroy();
        this.blockAdObj = this.proxy.createBlockAd({
            adUnitId: "47552167d7af408bf1bcf9f305ba0ed9",
            size: this.showNum,
            orientation:(this.showHV==0?"vertical":"landscape"),//积木广告横向展示或者竖向展示",landscape 或者 vertical，积木广告横向展示或者竖向展示
            style:{
                left:20,
                top:200
            }
        });
        this.blockAdObj.onError((err)=> {
            console.log("blockAdObj 加载失败", err);
            // this.showMessage("banner失败"+err.errCode);
        });
        this.blockAdObj.onLoad(()=> {
            console.log("blockAdObj 显示成功");
        });
        
        this.blockAdObj.onResize((size:any) => {
            let systemInfo:any =this.proxy.getSystemInfoSync();
            console.log("blockAdObj setSize", size.width, size.height, systemInfo);
            let windowWidth = systemInfo.windowWidth;//*systemInfo.pixelRatio;
            let windowHeight = systemInfo.windowHeight;//*systemInfo.pixelRatio;
            
            // good
            if(this.showType==0){
                this.blockAdObj.style.left = 10;
            }else if(this.showType==1){
                this.blockAdObj.style.left = windowWidth-10;
            }else{
                this.blockAdObj.style.left = (windowWidth - size.width)/2;
            }
            this.blockAdObj.style.top = (windowHeight - size.height)/2-this.showNum*50;
            
            // bad，会触发死循环
            // bannerAd.style.width++;
            this.isInit = true;
            this.blockAdObj.show();
            // let bannerRefreshTime:number = GameData.Inst.platform.gameSwitch.Refresh_time2;
            // if(!isNaN(bannerRefreshTime) && bannerRefreshTime>0){
            //     Laya.timer.once(bannerRefreshTime*1000, this, this.refreshBanner);
            
            // }
        });

    }
    refreshBanner():void{
        if(this.isInit){
            this.showBanner();
        }
    }
    onDisable(){
        if(this.isInit){
            if(this.blockAdObj)this.blockAdObj.destroy();
        }
        this.isInit = false;
        Laya.timer.clearAll(this);
    }
    onDestroy(){
        if(this.blockAdObj)this.blockAdObj.destroy();
        this.isInit = false;
        Laya.timer.clearAll(this);
    }
}