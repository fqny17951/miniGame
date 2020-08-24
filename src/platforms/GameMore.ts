import GameData from "../core/GameData";
import { ui } from "../ui/layaMaxUI";
import GameView from "../view/GameView";
import BaseConfig from "../core/BaseConfig";
import JumpPageMain from "../ads/JumpPageMain";
/**
 * 更多游戏，脚本绑定按钮上
 */
export default class GameMore extends Laya.Script {
    /** @prop {name: posid, tips:"位置ID",type:number, default:0} */
    posid:number = 0;

    item:ui.items.GameMoreUI;
    gameList:ui.panels.GameListUI;
    constructor(){
        super();
    }
    data:any;

    appBox:any;
    isshow:boolean=false;
    onAwake(){
        if(GameData.Inst.platform.id==BaseConfig.pid_dy&&GameData.Inst.platform.proxy.getSystemInfoSync().platform == "ios"){
            this.item = this.owner as ui.items.GameADUI;
            this.item.visible=false;
            return;
        }
        this.item = this.owner as ui.items.GameADUI;
        if(GameData.Inst.platform.id==BaseConfig.pid_vivo)return;
       
        
        this.item.btn_click.on(Laya.Event.CLICK, this, ()=>{
            if(GameData.Inst.platform.id==BaseConfig.pid_wx){
                JumpPageMain.Inst.popup();
                return;
            }
            if(GameData.Inst.platform.id==BaseConfig.pid_qq){
                if(this.appBox)this.appBox.destroy();
                this.appBox = GameData.Inst.platform.proxy.createAppBox({adUnitId:"815449bea27d1ca778150d43eb9687fa"});
                this.appBox.onClose(()=>{
                    this.appBox.destroy();
                    this.appBox=null;
                });
                this.appBox.load().then(() => {
                    console.log("AppBox 显示成功");
                    this.appBox.show();
                })

                return;
            }
            if([BaseConfig.pid_dy,BaseConfig.pid_oppo,BaseConfig.pid_test].indexOf(GameData.Inst.platform.id) != -1){
                //this.list_oppo this.data;
                if(!this.isshow){
                    this.isshow=true;
                (this.owner.getChildByName("drawer").getChildByName("list_oppo") as Laya.List).array=this.data;
                let sprint=(this.owner.getChildByName("drawer") as Laya.Image);
                Laya.Tween.to(this.owner, {x:270}, 250);
                Laya.stage.zOrder
                }
                else {
                    let sprint=(this.owner.getChildByName("drawer") as Laya.Image);
                    Laya.Tween.to(this.owner, {x:-9}, 250);
                    this.isshow=false;
                }
                // if(this.gameList==null){
                //     this.gameList = new ui.panels.GameListUI();
                //     this.gameList.width = Laya.stage.width;
                //     this.gameList.height = Laya.stage.height;
                //     this.gameList.onAwake = ()=>{
                //         Laya.timer.callLater(this, ()=>{
                //             this.gameList.width = Laya.stage.width;
                //             this.gameList.height = Laya.stage.height;
                //         });

                //         this.gameList.btn_close.on(Laya.Event.CLICK, this, ()=>{
                //             this.gameList.close();
                //         });
                //     };
                //     this.gameList.onEnable = ()=>{
                //         Laya.timer.callLater(this, ()=>{
                //             this.gameList.width = Laya.stage.width;
                //             this.gameList.height = Laya.stage.height;
                //         });
                //     };
                // }
                // this.gameList.popup();
                return;
            }
            if(this.data==null)return;
            //let gameList:any[] = [];
            // gameList[0] = {appId:this.data.appid, query:this.data.toLinks, pkgname:this.data.pkgname, posid:"1001"};
            // GameData.Inst.platform.openApp(gameList, null);
        })
    }
    xianshi(){
        this.item.visible = true;

    }

    yingchang(){

        this.item.visible = false;
    }
    onEnable(){
        if(GameData.Inst.platform.id==BaseConfig.pid_dy&&GameData.Inst.platform.proxy.getSystemInfoSync().platform == "ios"){
            return;
        }
        if(GameData.Inst.platform.id==BaseConfig.pid_wx){
            this.item.visible = true;
            return;
        }
        if(GameData.Inst.platform.id==BaseConfig.pid_qq){
            this.item.visible = true;
            return;
        }
        if(GameData.Inst.platform.id==BaseConfig.pid_vivo){
            this.item.visible = false;
            return;
        }
        // if(!GameData.Inst.platform.getSwitch(4)){
        //     this.item.visible = false;
        //     return;
        // }
        GameView.Inst.on(Laya.Event.START, this, this.yingchang);
        GameView.Inst.on(Laya.Event.CHANGE, this, this.xianshi);
        if(GameData.Inst.platform.gameList && GameData.Inst.platform.gameList.length>0){
            if(this.data==null){
                let list:any[] = []
                for(let i:number=0; i<GameData.Inst.platform.gameList.length; i++){
                 //   if(GameData.Inst.platform.gameList[i].position=="1001"){
                        list.push(GameData.Inst.platform.gameList[i]);
                   // }
                }
                for(let i:number=0; i<GameData.Inst.platform.gameList.length; i++){
                    //   if(GameData.Inst.platform.gameList[i].position=="1001"){
                           list.push(GameData.Inst.platform.gameList[i]);
                      // }
                   }
                   list = list.sort((item0, item1)=>{
                    return Math.random()?-1:1;
                });
                this.data = list;
            }
            if(this.data){
                this.item.visible = true;
            }else{
                this.item.visible = false;
            }

        }else{
            this.item.visible = false;
        }
    }

}