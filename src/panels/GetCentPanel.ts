import { ui } from "./../ui/layaMaxUI";
import GameData from "../core/GameData";
import GameView from "../view/GameView";
import TaskPanel from "./TaskPanel";
import BaseConfig from "../core/BaseConfig";
import BannerScr from "../platforms/BannerScr";

export default class GetCentPanel extends ui.panels.GetCentUI {
	private static _inst:GetCentPanel;
	static get Inst():GetCentPanel{
		if(GetCentPanel._inst==null)GetCentPanel._inst = new GetCentPanel();
		return GetCentPanel._inst;
	}

    constructor() {
		super();
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
	}
	onAwake(){
		this.btn_get.on(Laya.Event.CLICK, this, ()=>{
			GameData.Inst.platform.videoAD(Laya.Handler.create(this, ()=>{
				if(GameData.Inst.platform.id==BaseConfig.pid_dy){
					this.addCent(3)
				this.close();
				}
				else {
				this.addCent(3)
				this.close();
				}
			}), Laya.Handler.create(this, ()=>{

			}), 6)
		});
		this.btn_close.on(Laya.Event.CLICK, this, ()=>{
			  this.addCent(1);
			  this.close();
		});
		
		
	}
	getCent:number=0;
	callback:Laya.Handler;
	rate:number=0;
	setCent(cent:number, rate:number=3, callback:Laya.Handler=null):void{
		this.getCent = cent;
		this.callback = callback;
		this.rate = rate;
	}
	addCent(rate:number=1):void{
		if(this.callback)this.callback.run();
		GameData.Inst.addCent(this.getCent*rate);
	}
	bannerState:number;
	onEnable(){
		this.txt_get_cent.text = ""+this.getCent;
		
	}
	
	popup():void{
		//this.isdouble=0;
		// console.log("banner廣告的開關",GameData.Inst.platform.getSwitch(4));
        // console.log(GameData.Inst.platform.gameSwitch.local_switch);
        // console.log(GameData.Inst.platform.gameSwitch.ptg_native_city);
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
		Laya.timer.once(300, this, ()=>{
			super.popup();
		});
		if(GameData.Inst.platform.id==BaseConfig.pid_vivo){
		//	console.log("區域開口",GameData.Inst.platform.gameSwitch.local_switch);
			if(GameData.Inst.platform.bannerADObj&&GameData.Inst.platform.getSwitch(1)&&GameData.Inst.platform.getSwitch(4))
			{
				if(GameData.Inst.platform.bannerADObj)	GameData.Inst.platform.bannerADObj.hide();
				(this.getComponent(BannerScr) as BannerScr).showOldBanner();
				this.btn_close.y=Laya.stage.height-30;
				this.bannerState=1;
				Laya.timer.once(3000,this,()=>{
				
						this.bannerState=2;
						Laya.Tween.to(this.btn_close, {y:1014+(Laya.stage.height-1334)/2}, 200);
				
				
				});
			}else {
				// if(GameData.Inst.platform.bannerADObj)	GameData.Inst.platform.bannerADObj.hide();
				// (this.getComponent(BannerScr) as BannerScr).showOldBanner();
				this.btn_close.y=1014+(Laya.stage.height-1334)/2;
				this.bannerState=2;
			}
			return;

		}
		if(GameData.Inst.platform.id==BaseConfig.pid_oppo){
			// console.log(GameData.Inst.platform.bannerADObj);
			// console.log(GameData.Inst.platform.getSwitch(9));
			// console.log(GameData.Inst.platform.getSwitch(1));
			// console.log(GameData.Inst.platform.gameSwitch.version);
			// console.log(GameData.Inst.platform.gameSwitch.ignore_city);
			if(GameData.Inst.platform.bannerADObj&&GameData.Inst.platform.getSwitch(9)&&GameData.Inst.platform.getSwitch(1))
			{
				GameData.Inst.platform.bannerADObj.hide();
				(this.getComponent(BannerScr) as BannerScr).showOldBanner();
				this.btn_close.y=Laya.stage.height-30;
				this.bannerState=1;
				Laya.timer.once(3000,this,()=>{
				
						this.bannerState=2;
						Laya.Tween.to(this.btn_close, {y:1014+(Laya.stage.height-1334)/2}, 200);
				
				
				});
			}else {
			//	GameData.Inst.platform.bannerADObj.hide();
				(this.getComponent(BannerScr) as BannerScr).showOldBanner();
				this.btn_close.y=1014+(Laya.stage.height-1334)/2;
				this.bannerState=2;
			}
			return;

		}
		if(GameView.Inst.box_bottom.visible&&GameData.Inst.platform.id==BaseConfig.pid_qq){
			GameView.Inst.event(Laya.Event.START);
		this.btn_close.y=1310+(Laya.stage.height-1334)/2;	
			if(GameData.Inst.platform.getSwitch(1)){
				this.btn_close.visible=false;
			Laya.timer.once(2000, this, ()=>{
				this.btn_close.y = 1049+(Laya.stage.height-1334)/2;
				this.btn_close.visible=true;
			})
		}
		return;
		}
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

if(GameData.Inst.platform.id==BaseConfig.pid_dy){
	console.log("调出获得金币",this.isdouble);
	this.btn_close.visible=false;
	if(GameData.Inst.platform.getSwitch(1)){
		this.btn_close.visible=false;
		Laya.timer.once(3000,this,()=>{
			this.btn_close.visible=true;

			})
	}else 	this.btn_close.visible=true;

	this.btn_close.y=1014+(Laya.stage.height-1334)/2;
	this.bannerState=2;
}
//	this.btn_close.visible=true;


//	console.log("舞台高度%d",Laya.stage.height);
//	console.log("屏幕高度%d",GameData.Inst.platform.proxy.getSystemInfoSync().windowHeight);
}
isdouble=0;
	close():void{
		this.isdouble=0;
		this.bannerState=0;
		Laya.timer.clearAll(this);
		super.close();
		if(GameView.Inst.box_bottom.visible&&GameData.Inst.platform.getSwitch(1)){
			GameView.Inst.event(Laya.Event.CHANGE);
			TaskPanel.Inst.event(Laya.Event.CHANGE);
		}
	}
}