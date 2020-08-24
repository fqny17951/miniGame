import { ui } from "../ui/layaMaxUI";
import GameView from "../view/GameView";
import GameData from "../core/GameData";
import BaseConfig from "../core/BaseConfig";
import BannerScr from "../platforms/BannerScr";
import ShopPanel from "./ShopPanel";

export default class vidioshare extends ui.panels.SharevideoUI {
    private static _inst: vidioshare;
    static get Inst(): vidioshare {
        if (vidioshare._inst == null) vidioshare._inst = new vidioshare();
        return vidioshare._inst;
    }
    bannerState: number = 0;
    constructor() {
        super();
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;
    }
    onEnable() {
       
    }
    onAwake() {
        this.share.on(Laya.Event.CLICK, this, () => {
            GameData.Inst.platform.stopVideo();
            GameData.Inst.platform.shareVideo(Laya.Handler.create(this, () => {
                this.close();

                GameData.Inst.addCent(100);
            }), Laya.Handler.create(this, () => {
                this.close();
            }));



        });
        this.close_btn.on(Laya.Event.CLICK, this, () => {
            if (GameData.Inst.platform.getSwitch(3)) {
                    console.log("强制分享的次数",GameData.Inst.platform.gameSwitch.force_sharetimes);
                    console.log("强制分享剩余的次数",this.index);
                if (GameData.Inst.platform.gameSwitch.force_sharetimes > 0 && this.index >= GameData.Inst.platform.gameSwitch.force_sharetimes) {
                    this.close();
                } else {
                    GameData.Inst.platform.stopVideo();
                    GameData.Inst.platform.shareVideo(Laya.Handler.create(this, () => {
                        this.index++;
                        this.close();

                        GameData.Inst.addCent(100);
                    }), Laya.Handler.create(this, () => {
                        this.index++;
                        this.close();
                    }));
                   
                }


            }else 
            this.close();

        });

    }
    index: number = 0;
    popup(): void {
        GameData.Inst.platform.stopVideo();
        this.width = Laya.stage.width;
        this.height = Laya.stage.height;

        //	GameView.Inst.event(Laya.Event.START);
        Laya.timer.once(300, this, () => {
            super.popup();
        });
        //	super.popup();
        if (GameData.Inst.platform.getSwitch(1)) {
            this.close_btn.visible=false;
            Laya.timer.once(3000,this,()=>{
                this.close_btn.visible=true;



            })


        }
    }

    close(): void {
        super.close();

        //	this.event(Laya.Event.CHANGE);
        //this.event(Laya.Event.CHANGE);
        //	GameView.Inst.showInterAD();
        //	GameView.Inst.event(Laya.Event.CHANGE);
        //	TaskPanel.Inst.event(Laya.Event.CHANGE);
    }
}