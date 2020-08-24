import GameView from "../view/GameView";
import GameData from "../core/GameData";
import BaseConfig from "../core/BaseConfig";

export default class isshow extends Laya.Script {
    item:Laya.Button;
    onEnable(){
        this.item = this.owner as Laya.Button;
        GameView.Inst.on(Laya.Event.START, this, this.yingchang);
        GameView.Inst.on(Laya.Event.CHANGE, this, this.xianshi);
    }


    xianshi(){
     if(GameData.Inst.platform.id==BaseConfig.pid_vivo)   this.item.visible = true;

    }

    yingchang(){

        if(GameData.Inst.platform.id==BaseConfig.pid_vivo)       this.item.visible = false;
    }




    
}