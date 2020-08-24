import GameStage from "./GameStage";

export default class Camera extends Laya.Script3D{
    camera:Laya.Camera;
    onAwake():void{
        this.camera = this.owner as Laya.Camera;
    }
    
    onUpdate():void{
    }
}