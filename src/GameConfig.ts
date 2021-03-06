/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import BtnScript from "./view/BtnScript"
import JumpBanner from "./ads/JumpBanner"
import ADSList from "./ads/ADSList"
import BannerScr from "./platforms/BannerScr"
import JumpPageGame from "./ads/JumpPageGame"
import Switch_default_check from "./platforms/Switch_default_check"
import Switch_delay_display from "./platforms/Switch_delay_display"
import BtnSoundScript from "./view/BtnSoundScript"
import BlockAdScr from "./platforms/BlockAdScr"
import BoxGameListScr from "./platforms/BoxGameListScr"
import GameList from "./platforms/GameList"
import GameView from "./view/GameView"
import GameStage from "./game/GameStage"
import GameInfo from "./game/GameInfo"
import GameADAni from "./platforms/GameADAni"
import isshow from "./platforms/isshow"
import GameMore from "./platforms/GameMore"
import BannerGameScr from "./platforms/BannerGameScr"
import BannerMainScr from "./platforms/BannerMainScr"
import BlockAdGameScr from "./platforms/BlockAdGameScr"
import BlockAdMainScr from "./platforms/BlockAdMainScr"
import LoadView from "./view/LoadView"
/*
* 游戏初始化配置;
*/
export default class GameConfig{
    static width:number=750;
    static height:number=1334;
    static scaleMode:string="fixedwidth";
    static screenMode:string="vertical";
    static alignV:string="top";
    static alignH:string="left";
    static startScene:any="view/LoadView.scene";
    static sceneRoot:string="";
    static debug:boolean=false;
    static stat:boolean=false;
    static physicsDebug:boolean=false;
    static exportSceneToJson:boolean=true;
    constructor(){}
    static init(){
        var reg: Function = Laya.ClassUtils.regClass;
        reg("view/BtnScript.ts",BtnScript);
        reg("ads/JumpBanner.ts",JumpBanner);
        reg("ads/ADSList.ts",ADSList);
        reg("platforms/BannerScr.ts",BannerScr);
        reg("ads/JumpPageGame.ts",JumpPageGame);
        reg("platforms/Switch_default_check.ts",Switch_default_check);
        reg("platforms/Switch_delay_display.ts",Switch_delay_display);
        reg("view/BtnSoundScript.ts",BtnSoundScript);
        reg("platforms/BlockAdScr.ts",BlockAdScr);
        reg("platforms/BoxGameListScr.ts",BoxGameListScr);
        reg("platforms/GameList.ts",GameList);
        reg("view/GameView.ts",GameView);
        reg("game/GameStage.ts",GameStage);
        reg("game/GameInfo.ts",GameInfo);
        reg("platforms/GameADAni.ts",GameADAni);
        reg("platforms/isshow.ts",isshow);
        reg("platforms/GameMore.ts",GameMore);
        reg("platforms/BannerGameScr.ts",BannerGameScr);
        reg("platforms/BannerMainScr.ts",BannerMainScr);
        reg("platforms/BlockAdGameScr.ts",BlockAdGameScr);
        reg("platforms/BlockAdMainScr.ts",BlockAdMainScr);
        reg("view/LoadView.ts",LoadView);
    }
}
GameConfig.init();