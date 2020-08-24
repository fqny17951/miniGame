import { ui } from "./../ui/layaMaxUI";
import GameData from "../core/GameData";
import BaseConfig from "../core/BaseConfig";
import GameStage from "../game/GameStage";
import BannerScr from "../platforms/BannerScr";

export default class ShiYong extends ui.panels.ShiYongUI {
	private static _inst:ShiYong;
	static get Inst():ShiYong{
		if(ShiYong._inst==null)ShiYong._inst = new ShiYong();
		return ShiYong._inst;
	}

    constructor() {
		super();
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
	}
	bannerState:number;
	onAwake(){
		this.bannerState = 0;
		this.btn_video.on(Laya.Event.CLICK, this, ()=>{
			GameData.Inst.platform.videoAD(Laya.Handler.create(this, ()=>{
				GameData.Inst.trySkinID = this.skinID;
				this.close();
				if(this.closeCallback)this.closeCallback.run();
			}), Laya.Handler.create(this, ()=>{

			}), 5)
		});
		
		this.btn_close.on(Laya.Event.CLICK, this, ()=>{
			if(!GameData.Inst.platform.getSwitch(17))this.bannerState=2;
			if(GameData.Inst.platform.id==BaseConfig.pid_qq)this.bannerState=2;
            if(this.bannerState==2){
              //  if(this.closeCallback)this.closeCallback.run();
				this.close()
				return;
            }
            if(this.bannerState==1)return;
            this.bannerState=1;
			Laya.timer.clearAll(this);
			Laya.timer.once(1500, this, ()=>{
				Laya.Tween.to(this.btn_close, {y:1114+(Laya.stage.height-1334)/2}, 200);
				(this.getComponent(BannerScr) as BannerScr).showOldBanner();
			});
			Laya.timer.once(2500, this, ()=>{
				this.bannerState=2;
	
			});
		});
	}
	onEnable(){

	}
	
	skinID:number=0;
	popup():void{
	
		this.bannerState=0;
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
	
		if(GameData.Inst.platform.getSwitch(17)&&GameData.Inst.platform.id != BaseConfig.pid_qq)
		this.btn_close.y=1310+(Laya.stage.height-1334)/2;
		//else if(GameData.Inst.platform.id != BaseConfig.pid_qq)	this.btn_close.y=1100;
		let skinItem:any = GameData.Inst.getSkinData(true);
		this.skinID = skinItem.id;
		this.btn_close.visible=true;
		GameData.Inst.trySkinID = -1;
		this.img_icon.skin = "shop/"+skinItem.model;
		if(GameData.Inst.platform.id == BaseConfig.pid_qq){
			this.btn_close.visible = false;
			if(GameData.Inst.platform.getSwitch(1))
			Laya.timer.once(2000, this, ()=>{
				this.btn_close.y = 1100+(Laya.stage.height-1334)/2;
				this.btn_close.visible = true;
            })
			else  { this.btn_close.y = 1100+(Laya.stage.height-1334)/2;
				this.btn_close.visible = true;
			}

		}
		Laya.timer.once(300, this, ()=>{
			super.popup();
		});

		if(GameData.Inst.platform.id==BaseConfig.pid_wx){
			if(GameData.Inst.platform.getSwitch(17)){
				if(GameData.Inst.platform.id==BaseConfig.pid_wx)	this.btn_close.y=Laya.stage.height-30;
			Laya.timer.once(2000,this,()=>{
				(this.getComponent(BannerScr) as BannerScr).showOldBanner();
				Laya.Tween.to(this.btn_close, {y:1014+(Laya.stage.height-1334)/2}, 200);
				this.bannerState=2;
			})
		}else {
			this.bannerState=2;
			this.btn_close.y=1014+(Laya.stage.height-1334)/2;
			(this.getComponent(BannerScr) as BannerScr).showOldBanner();

		}
	}
	
	}
	closeCallback:Laya.Handler;
	close():void{
		super.close();
		Laya.timer.clearAll(this);
		Laya.timer.once(500, this, ()=>{
			GameStage.Inst.playGame();
		});
	}
}