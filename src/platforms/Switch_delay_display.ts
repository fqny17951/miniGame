import GameData from "../core/GameData";
import BaseConfig from "../core/BaseConfig";

/**
 * 延迟显示（文字、按钮）
 */
export default class Switch_delay_display extends Laya.Script {
    /** @prop {name: showType, tips:"出现方式",type:number, default:0} */
    showType:number = 0;

    target:Laya.Sprite;
    constructor(){
        super();
    }
    onAwake(){
        this.target  = this.owner as Laya.Sprite;
    }
    run():void{
        if(GameData.Inst.platform.getSwitch(1)){
            this.target.visible = false;
            Laya.timer.once(2000, this, ()=>{
                this.target.visible = true;
            })
        }else{
            this.target.visible = true;
        }
    }
    onEnable(){
        if(this.showType==0)this.run();
    }
}