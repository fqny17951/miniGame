import GameData from "./GameData";

/**
 * 管理声音
 */
export default class SoundManager {
    static zhengDongShort():void{
        if(GameData.Inst.data.zhengdong)GameData.Inst.platform.zhengDongShort();
    }
    static zhengDongLong():void{
        if(GameData.Inst.data.zhengdong)GameData.Inst.platform.zhengDongLong();
    }

    static playBg():void{
        if(GameData.Inst.data.sound)Laya.SoundManager.playMusic("sound/bgm.mp3", 0);
    }
    static stopBg():void{
        Laya.SoundManager.stopAll();
    }
    static playButton():void{
        if(GameData.Inst.data.sound)Laya.SoundManager.playSound("sound/button.mp3");
    }
    static playCoinn():void{
        if(GameData.Inst.data.sound)Laya.SoundManager.playSound("sound/coin.mp3");
    }


    static playShutter():void{
        if(GameData.Inst.data.sound)Laya.SoundManager.playSound("sound/shutter.mp3");
    }
    static playWin():void{
        if(GameData.Inst.data.sound)Laya.SoundManager.playSound("sound/win.mp3");
    }
    static playWin1():void{
        if(GameData.Inst.data.sound)Laya.SoundManager.playSound("sound/win1.mp3");
    }
    static playLose():void{
        if(GameData.Inst.data.sound)Laya.SoundManager.playSound("sound/lose.mp3");
    }

    /**
     * 构造方法
     */
    constructor(){
        
    }



}