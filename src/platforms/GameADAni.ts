import GameData from "../core/GameData";
import { ui } from "./../ui/layaMaxUI";
import BaseConfig from "../core/BaseConfig";
import JumpPage2 from "../ads/JumpPage2";
/**
 * 单独游戏展示，动画切换 脚本绑定ui.items.GameADUI上
 */
export default class GameADAni extends Laya.Script {
    /** @prop {name: posid, tips:"位置ID",type:number, default:0} */
    posid:number = 0;

    item:ui.items.GameADUI;
    gameList:any[];
    constructor(){
        super();
    }
    data:any;
    index:number;
    onAwake(){
        if(GameData.Inst.platform.id==BaseConfig.pid_dy&&GameData.Inst.platform.proxy.getSystemInfoSync().platform == "ios"){
            this.item = this.owner as ui.items.GameADUI;
            this.item.visible=false;
            return;
        }
        this.item = this.owner as ui.items.GameADUI;
        if(GameData.Inst.platform.id==BaseConfig.pid_vivo)return;
    
        this.item.btn_click.on(Laya.Event.CLICK, this, ()=>{
            if(this.data==null)return;
            let gameList:any[] = [];
            // gameList[0] = {appId:this.data.appid, query:this.data.toLinks, pkgname:this.data.pkgname, posid:"1001"};
            gameList[0] = {appId:this.data.appid, query:this.data.toLinks, pkgname:this.data.pkgname, posid:this.data.id};
            GameData.Inst.platform.openApp(gameList, Laya.Handler.create(this,()=>{
              JumpPage2.Inst.popup();


            }));
        })
    }
    show(isAni:boolean = false):void{
        if(isAni){
            Laya.timer.once(2000, this, this.show,[false],false);
            Laya.Tween.to(this.item.btn_click, {rotation:-25}, 250);
            Laya.Tween.to(this.item.btn_click, {rotation:0}, 250, null, null, 250);
            Laya.Tween.to(this.item.btn_click, {rotation:25}, 250, null, null, 500);
            Laya.Tween.to(this.item.btn_click, {rotation:0}, 250, null, null, 750);
        }else{
            this.data = this.gameList[this.index];
            this.item.img_icon.skin = this.data.param;
            this.item.txt_name.text = (this.data.name+"").replace("dy","");
            this.index++;
            this.index = this.index%this.gameList.length;
            Laya.timer.once(2000, this, this.show, [true],false);
        }
    }
    onDisable():void{
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this.item.btn_click);
    }
    onEnable(){
        if(GameData.Inst.platform.id==BaseConfig.pid_dy&&GameData.Inst.platform.proxy.getSystemInfoSync().platform == "ios"){
            this.item = this.owner as ui.items.GameADUI;
            this.item.visible=false;
            return;
        }
        if(GameData.Inst.platform.id==BaseConfig.pid_vivo){
            this.item.visible=false;
            return;}
        if(GameData.Inst.platform.id==BaseConfig.pid_wx){

        }else{
            // if(!GameData.Inst.platform.getSwitch(4)){
            //     this.item.visible = false;
            //     return;
            // }
        }
        if(GameData.Inst.platform.gameList && GameData.Inst.platform.gameList.length>0){
            if(this.gameList==null){
                let list:any[] = []
                if(GameData.Inst.platform.id==BaseConfig.pid_wx){
                    for(let i:number=0; i<GameData.Inst.platform.gameList.length; i++){
                        if(GameData.Inst.platform.gameList[i].position=="1002"){
                            list.push(GameData.Inst.platform.gameList[i]);
                        }
                    }
                }else{
                    for(let i:number=0; i<GameData.Inst.platform.gameList.length; i++){
                        //if(GameData.Inst.platform.gameList[i].position=="1001"){
                            list.push(GameData.Inst.platform.gameList[i]);
                       // }
                    }
                }
                list = list.sort((item0, item1)=>{
                    return Math.random()?-1:1;
                });
                this.gameList = list;
            }
            if(this.gameList && this.gameList.length>0){
                this.item.btn_click.scaleX = this.item.btn_click.scaleY = 1;
                this.item.visible = true;
                this.index = this.posid==-1?0:Math.floor(Math.random()*this.gameList.length);
                this.show();
            }else{
                this.item.visible = false;
            }

        }else{
            this.item.visible = false;
        }
    }

}