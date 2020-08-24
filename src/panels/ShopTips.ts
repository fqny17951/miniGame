import { ui } from "../ui/layaMaxUI";
import GameView from "../view/GameView";
import GameData from "../core/GameData";
import BaseConfig from "../core/BaseConfig";
import BannerScr from "../platforms/BannerScr";
import ShopPanel from "./ShopPanel";

export default class ShopTips extends ui.panels.ShopTipsUI {
    private static _inst:ShopTips;
	static get Inst():ShopTips{
		if(ShopTips._inst==null)ShopTips._inst = new ShopTips();
		return ShopTips._inst;
	}
    bannerState:number=0;
    constructor() {
		super();
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
	}
    onEnable(){

        this.bannerState=0;
        if(GameData.Inst.platform.id==BaseConfig.pid_oppo){
            this.btn_close.visible=true;
            if(GameData.Inst.platform.bannerADObj&&GameData.Inst.platform.getSwitch(1))
            {		
                console.log("到这里");
                GameData.Inst.platform.bannerADObj.hide();
                (this.getComponent(BannerScr) as BannerScr).showOldBanner();
                this.btn_close.y=Laya.stage.height-50;
                this.btn_close.visible=true;
                this.bannerState=1;
                Laya.timer.once(3000,this,()=>{
                
                
                    this.bannerState=2;
            
                    Laya.Tween.to(this.btn_close, {y:1000+(Laya.stage.height-1334)/2}, 200);
                });
            }else {
            //	GameData.Inst.platform.bannerADObj.hide();
            console.log("到这里1");
                this.btn_close.y=1000+(Laya.stage.height-1334)/2;
                this.bannerState=2;
            }
        
        }
        this.btn_close.on(Laya.Event.CLICK, this, ()=>{
            if(GameData.Inst.platform.id!=BaseConfig.pid_oppo)this.bannerState=2;
            if(this.bannerState==2){
                this.close();
         
                return;
              }
              if(this.bannerState==1)return;
              this. bannerState=1;
            //this.centListPanel.close();
        });
        this.btn_video.on(Laya.Event.CLICK, this, ()=>{
            GameData.Inst.platform.videoAD(Laya.Handler.create(this, ()=>{
                if(this.btn_video.visible){
                    if(GameData.Inst.data.skinVideo[ShopPanel.Inst.list_item.selectedItem.id]==null)GameData.Inst.data.skinVideo[ShopPanel.Inst.list_item.selectedItem.id]=0;
                    GameData.Inst.data.skinVideo[ShopPanel.Inst.list_item.selectedItem.id]+=1;
    
                    if(ShopPanel.Inst.list_item.selectedItem.video<=GameData.Inst.data.skinVideo[ShopPanel.Inst.list_item.selectedItem.id]){
                        GameData.Inst.data.skin.push(ShopPanel.Inst.list_item.selectedItem.id);
                        ShopPanel.Inst.useSkin();
                    }
                }else{
                    GameData.Inst.data.skin.push(ShopPanel.Inst.list_item.selectedItem.id);
                    ShopPanel.Inst.useSkin();
                }

                GameData.Inst.addCent(0);
                ShopPanel.Inst.list_item.refresh();

                this.close();
            }), Laya.Handler.create(this, ()=>{

            }), 2)
            
        });

    }
    onAwake(){


    }

    popup():void{
		this.width = Laya.stage.width;
        this.height = Laya.stage.height;
        console.log("到这里2");
        if(GameData.Inst.platform.id==BaseConfig.pid_dy)this.btn_close.y=1016+(Laya.stage.height-1334)/2;
	//	GameView.Inst.event(Laya.Event.START);
		Laya.timer.once(300, this, ()=>{
			super.popup();
        });
        this.btn_close.visible=false;
        if(GameData.Inst.platform.getSwitch(1)){
            this.btn_close.visible=false;
            Laya.timer.once(3000,this,()=>{
                this.btn_close.visible=true;
    
                })
        }else 	this.btn_close.visible=true;
	//	super.popup();
    }
    
    close():void{
        this.bannerState=0;
        this.btn_close.y=Laya.stage.height-200;
        super.close();
     
	//	this.event(Laya.Event.CHANGE);
		//this.event(Laya.Event.CHANGE);
	//	GameView.Inst.showInterAD();
	//	GameView.Inst.event(Laya.Event.CHANGE);
	//	TaskPanel.Inst.event(Laya.Event.CHANGE);
	}
}