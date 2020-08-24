import GameData from "../core/GameData";
import BaseConfig from "../core/BaseConfig";

/**
 * 默认勾选
 */
export default class Switch_default_check extends Laya.Script {
    target:Laya.Sprite;
    constructor(){
        super();
    }
    onAwake(){
        this.target  = this.owner as Laya.Sprite;
    }
    Checkornot:boolean=true;
    onEnable(){
        console.log("默认勾选",GameData.Inst.platform.getSwitch(0));
     if(GameData.Inst.platform.id!=BaseConfig.pid_wx)   this.target.visible = GameData.Inst.platform.getSwitch(0);
     else this.target.visible =false;
  
    }
}