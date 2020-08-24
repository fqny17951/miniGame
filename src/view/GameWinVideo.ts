import { ui } from "./../ui/layaMaxUI";
import GameData from "../core/GameData";
import GameStage from "../game/GameStage";
import BaseConfig from "../core/BaseConfig";
import GameWin from "./GameWin";
import GameLose from "./GameLose";
import GameFufuo from "./GameFufuo";
import SoundManager from "../core/SoundManager";
import BannerScr from "../platforms/BannerScr";

export default class GameWinVideo extends ui.panels.GameWinVideoUI {
	private static _inst:GameWinVideo;
	static get Inst():GameWinVideo{
		if(GameWinVideo._inst==null)GameWinVideo._inst = new GameWinVideo();
		return GameWinVideo._inst;
	}

    constructor() {
		super();
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
	}
	onAwake(){
		this.btn_get.on(Laya.Event.CLICK, this, ()=>{
			GameData.Inst.platform.shareVideo(Laya.Handler.create(this, ()=>{
				this.close();

				GameData.Inst.addCent(this.getCent);
			}), Laya.Handler.create(this, ()=>{
				
			}));
		});
		this.btn_close.on(Laya.Event.CLICK, this, ()=>{
			console.log(this.bannerState);
		//	if(!GameData.Inst.platform.getSwitch(17))this.bannerState=2;
			if([BaseConfig.pid_qq,BaseConfig.pid_dy].indexOf(GameData.Inst.platform.id) != -1)this.bannerState=2;
		//	if(GameData.Inst.platform.id==BaseConfig.pid_oppo&&!GameData.Inst.platform.getSwitch(1))this.bannerState=2;
            if(this.bannerState==2){
              //  if(this.closeCallback)this.closeCallback.run();
				this.close();
				return;
            }
            if(this.bannerState==1)return;
            this.bannerState=1;
			Laya.timer.clearAll(this);
			Laya.timer.once(1500, this, ()=>{
				Laya.Tween.to(this.btn_close, {y:1080+(Laya.stage.height-1334)/2}, 200);
				(this.getComponent(BannerScr) as BannerScr).showOldBanner();
			});
			Laya.timer.once(2500, this, ()=>{
				this.bannerState=2;
	
			});
		});
	}
	getCent:number = 0;
	bannerState:number=0;
	onEnable(){
		this.getCent = 100;//Math.floor(GameData.Inst.levelItem.basicReward*1.5);
		this.txt_get_cent.text = ""+this.getCent;
		
		this.btn_get.visible = GameData.Inst.platform.getUseAPI(20);
		this.btn_get.visible=false;
		this.spr_get_cent.visible = this.btn_get.visible;
	
	}
	
	photoBgID:number;
	photoRate:number;
	photoX:number;
	photoY:number;
	completeRate:number;

	targetP:Laya.Point = new Laya.Point();
	popup():void{
		this.bannerState=0;
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
	
		// if(GameData.Inst.platform.id == BaseConfig.pid_oppo || GameData.Inst.platform.id == BaseConfig.pid_vivo){
		// 	GameData.Inst.platform.InterAD(Laya.Handler.create(this, ()=>{}));
		// }
		
		this.completeRate = 0;
		if(this.photoBgID==GameData.Inst.levelItem.bgID){
			this.completeRate = 30;
		}
		let chaTime:number = Math.abs(this.photoRate-GameData.Inst.levelItem.time);
		if(chaTime<=0.02){
			this.completeRate += 40;
		}else{
			if(40-chaTime*100>0){
				this.completeRate += 40-chaTime*100;
			}
		}
		this.targetP.x = GameData.Inst.levelItem.x;
		this.targetP.y = GameData.Inst.levelItem.y;
		let chaXY:number = this.targetP.distance(this.photoX, this.photoY);
		if(30-(chaXY-5)/3>0){
			this.completeRate += 30-(chaXY-5)/3;
		}
		this.completeRate /= 100;
		if(this.completeRate>=0.85)this.completeRate+=0.025;
		if(this.completeRate>1)this.completeRate=1;

		// this.completeRate = 0.93;
		this.txt_desc.text = "相似度"+Math.floor(this.completeRate*100)+"%";
		this.img_line.width = 534*this.completeRate;
		this.img_title.skin = this.completeRate<0.6?"game/zaijiezaili.png":"game/tiaozhanchenggong.png";
		this.img_target.skin = "res/level/"+GameData.Inst.levelItem.photo;
		Laya.timer.once(300, this, ()=>{
			super.popup();
		});

		if(GameData.Inst.platform.id == BaseConfig.pid_qq){
			if(GameData.Inst.platform.getSwitch(1)){
				this.btn_close.visible=false;
			Laya.timer.once(2000, this, ()=>{
				this.btn_close.y = 1124+(Laya.stage.height-1334)/2;
				this.btn_close.visible=true;
			})
		}
			else   this.btn_close.y = 1124+(Laya.stage.height-1334)/2;
	}

		if(GameData.Inst.platform.id==BaseConfig.pid_wx){
			if(GameData.Inst.platform.getSwitch(17)){
				if(GameData.Inst.platform.id==BaseConfig.pid_wx)	this.btn_close.y=Laya.stage.height-30;
			Laya.timer.once(2000,this,()=>{
				(this.getComponent(BannerScr) as BannerScr).showOldBanner();
				Laya.Tween.to(this.btn_close, {y:1124+(Laya.stage.height-1334)/2}, 200);
				this.bannerState=2;
			})
		}else {
			this.bannerState=2;
			this.btn_close.y=1124+(Laya.stage.height-1334)/2;
			(this.getComponent(BannerScr) as BannerScr).showOldBanner();


		}
	
	}
	if(GameData.Inst.platform.id==BaseConfig.pid_oppo){
		if(GameData.Inst.platform.bannerADObj&&GameData.Inst.platform.getSwitch(9)&&GameData.Inst.platform.getSwitch(1))
		{
			GameData.Inst.platform.bannerADObj.hide();
			(this.getComponent(BannerScr) as BannerScr).showOldBanner();
			this.btn_close.y=Laya.stage.height-30;
			this.bannerState=1;
			Laya.timer.once(3000,this,()=>{
			
					this.bannerState=2;
			
				Laya.Tween.to(this.btn_close, {y:1124+(Laya.stage.height-1334)/2}, 200);
			});
		}else {
		//	GameData.Inst.platform.bannerADObj.hide();
			(this.getComponent(BannerScr) as BannerScr).showOldBanner();
			this.btn_close.y=1124+(Laya.stage.height-1334)/2;
			this.bannerState=2;
		}
		
		return;
	}
	if(GameData.Inst.platform.id==BaseConfig.pid_vivo){
		console.log("区域开关",GameData.Inst.platform.gameSwitch.local_switch);
		console.log(GameData.Inst.platform.getSwitch(4));
		console.log(GameData.Inst.platform.getSwitch(4));
		if(GameData.Inst.platform.getSwitch(1)&&GameData.Inst.platform.getSwitch(4))
		{
		//	if(GameData.Inst.platform.bannerADObj)	GameData.Inst.platform.bannerADObj.hide();
			(this.getComponent(BannerScr) as BannerScr).showOldBanner();
			this.btn_close.y=Laya.stage.height-30;
			this.bannerState=1;
			Laya.timer.once(3000,this,()=>{
			
					this.bannerState=2;
			
				Laya.Tween.to(this.btn_close, {y:1124+(Laya.stage.height-1334)/2}, 200);
			});
		}else {
		//	if(GameData.Inst.platform.bannerADObj)	GameData.Inst.platform.bannerADObj.hide();
			(this.getComponent(BannerScr) as BannerScr).showOldBanner();
			this.btn_close.y=1124+(Laya.stage.height-1334)/2;
			this.bannerState=2;
		}
		
		return;
	}
	if(GameData.Inst.platform.id==BaseConfig.pid_dy){
		this.btn_close.y=1124+(Laya.stage.height-1334)/2;


	}
	}
	close():void{
		super.close();
		this.bannerState=0;
		Laya.timer.clearAll(this);
		if(this.completeRate<0.6){
			console.log("复活界面pop");
		
			
			GameFufuo.Inst.closeCallback = Laya.Handler.create(this, ()=>{
				console.log("调用回掉pop失败界面");
				GameStage.Inst.countCent = 5
				SoundManager.playLose();
				GameStage.Inst.event(Laya.Event.STOPPED);
				GameLose.Inst.popup();
			});

			GameFufuo.Inst.callback = Laya.Handler.create(this, ()=>{
				GameStage.Inst.countCent = 30;
				this.completeRate = 1;
				SoundManager.playWin();
				SoundManager.playWin1();
				GameStage.Inst.event(Laya.Event.STOPPED);
				GameWin.Inst.popup();
				GameData.Inst.updateLevel();
			});
			GameFufuo.Inst.popup();
		}else{
			if(this.completeRate>=0.9){
				GameStage.Inst.countCent = 30;
				SoundManager.playWin();
				SoundManager.playWin1();
			}else if(this.completeRate>=0.8){
				GameStage.Inst.countCent = 20;
				SoundManager.playWin();
			}else{
				GameStage.Inst.countCent = 10;
				SoundManager.playWin();
			}
			GameStage.Inst.event(Laya.Event.STOPPED);
			GameWin.Inst.popup();
			GameData.Inst.updateLevel();
		}
	}
}