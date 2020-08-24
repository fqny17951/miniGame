import SoundManager from "../core/SoundManager";

export default class BtnScript extends Laya.Script{
    btn:Laya.Button
    onAwake():void{
        this.btn = this.owner as Laya.Button;
    }
    onMouseUp():void{
        Laya.Tween.to(this.btn, {scaleX:1, scaleY:1}, 150);
    }
    onMouseDown():void{
        SoundManager.playButton();
        Laya.Tween.to(this.btn, {scaleX:0.85, scaleY:0.85}, 150);
    }
    onMouseOut():void{
        this.onMouseUp();
    }
}