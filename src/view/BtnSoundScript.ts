import SoundManager from "../core/SoundManager";

export default class BtnSoundScript extends Laya.Script{
    btn:Laya.Button
    onAwake():void{
        this.btn = this.owner as Laya.Button;
    }
    onMouseUp():void{
    }
    onMouseDown():void{
        SoundManager.playButton();
    }
    onMouseOut():void{
    }
}