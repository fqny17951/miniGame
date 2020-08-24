import GameData from "../core/GameData";
import { ui } from "./../ui/layaMaxUI";
import BaseConfig from "../core/BaseConfig";
/**
 * 单独游戏展示 脚本绑定ui.items.GameADUI上
 */
export default class GameAD extends Laya.Script {
    /** @prop {name: posid, tips:"位置ID",type:number, default:0} */
    posid:number = 0;

    item:ui.items.GameADUI;
    constructor(){
        super();
    }
    data:any;
    onAwake(){
        this.item = this.owner as ui.items.GameADUI;
        this.item.btn_click.on(Laya.Event.CLICK, this, ()=>{
            if(this.data==null)return;
            let gameList:any[] = [];
            // gameList[0] = {appId:this.data.appid, query:this.data.toLinks, pkgname:this.data.pkgname, posid:"1001"};
            gameList[0] = {appId:this.data.appid, query:this.data.toLinks, pkgname:this.data.pkgname, posid:this.data.id};
            GameData.Inst.platform.openApp(gameList, null);
        })
    }
    onEnable(){
        if(GameData.Inst.platform.id==BaseConfig.pid_oppo){
            this.item.visible = false;
            return;
        }
        if(!GameData.Inst.platform.getSwitch(4)){
            this.item.visible = false;
            return;
        }
        if(GameData.Inst.platform.gameList && GameData.Inst.platform.gameList.length>0){
            if(this.data==null){
                let list:any[] = []
                for(let i:number=0; i<GameData.Inst.platform.gameList.length; i++){
                    if(GameData.Inst.platform.gameList[i].position=="1001"){
                        list.push(GameData.Inst.platform.gameList[i]);
                    }
                }
                if(this.data==null)this.data = GameData.Inst.platform.gameList[this.posid];
                if(this.data==null)this.data = GameData.Inst.platform.gameList[0];
            }
            if(this.data){
                this.item.visible = true;
                this.item.img_icon.skin = this.data.param;
                this.item.txt_name.text = (this.data.name+"").replace("dy","");
            }else{
                this.item.visible = false;
            }

        }else{
            this.item.visible = false;
        }
    }

}