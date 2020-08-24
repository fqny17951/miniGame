import { ui } from "./../ui/layaMaxUI";
import GameData from "../core/GameData";
import BannerScr from "../platforms/BannerScr";
import BaseConfig from "../core/BaseConfig";
import GameStage from "../game/GameStage";

export default class EggEndQQPanel extends ui.panels.EggEndQQUI {
	private static _inst:EggEndQQPanel;
	static get Inst():EggEndQQPanel{
		if(EggEndQQPanel._inst==null)EggEndQQPanel._inst = new EggEndQQPanel();
		return EggEndQQPanel._inst;
	}

    constructor() {
		super();
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
	}
	clickTime:number=0;
	isShowVAD:boolean = false;
	zhuantai: number = 0;
	judgeswitch(zhuantai: number): boolean {
		switch (zhuantai) {
			case 1:
				if(GameData.Inst.platform.gameSwitch.video_display1==3||(GameData.Inst.platform.gameSwitch.video_display1==2)) return true;
				else return false;
		
			case 2:
				if(GameData.Inst.platform.gameSwitch.video_display2==3||(GameData.Inst.platform.gameSwitch.video_display2==2)) return true;
				else return false;
				 case 3:
					if(GameData.Inst.platform.gameSwitch.video_display3==3||(GameData.Inst.platform.gameSwitch.video_display3==2)) return true;
				else return false;
			     case 4:
				if(GameData.Inst.platform.gameSwitch.video_display4==3||(GameData.Inst.platform.gameSwitch.video_display4==2)) return true;
				else return false;

		}

		return false;
	}
	onAwake(){
		this.btn_get.on(Laya.Event.CLICK, this, ()=>{
			if(this.currPoint>=5)return;
			
			if(!this.isShowVAD && Laya.Browser.now()-this.clickTime<=1500){
				this.isShowVAD = true;
				if(this.judgeswitch(this.zhuantai)){
					GameData.Inst.platform.videoAD(Laya.Handler.create(this, ()=>{

					}), Laya.Handler.create(this, ()=>{

					}), 8);
				}
			}
			this.clickTime = Laya.Browser.now();

			// this.img_egg.scale(1.2, 1.2);
			// this.img_chuizi.rotation = -20; 
			// Laya.timer.once(100, this, ()=>{
			// 	this.img_egg.scale(1.5, 1.5);
			// 	this.img_chuizi.rotation = 30; 
			// })
			this.egg.scale(0.8, 0.8);
			// //this.img_chuizi.rotation = -20; 
			Laya.timer.once(100, this, ()=>{
				 this.egg.scale(1.0, 1.0);
				// this.img_chuizi.rotation = 30; 
			})

			Laya.Tween.clearAll(this.img_jindu);
			this.currPoint++;
			if(this.isShowBanner && this.currPoint>=5 && Math.random()>0.95){
				this.currPoint=5;
			}
			if(this.currPoint>5)this.currPoint=5;
			this.updateJindu();

			Laya.timer.clear(this, this.updateZore);
			if(this.currPoint>0 && this.currPoint<5){
				Laya.timer.loop(500, this, this.updateZore);
			}

			if(this.currPoint>=5){
				// this.close();
			}
		});


	}

	updateZore():void{
		this.currPoint--;
		if(this.currPoint<0){
			this.currPoint=0;
		}
		this.updateJindu();
	}
	updateJindu():void{
		if(!this.isShowBanner && this.currPoint==this.isShowIndex&&this.isShowVAD){
			this.isShowBanner = true;
			if(GameData.Inst.platform.id==BaseConfig.pid_qq){
				console.log(	(this.getComponent(BannerScr) as BannerScr));
				(this.getComponent(BannerScr) as BannerScr).showOldBanner();
			}else{
				(this.getComponent(BannerScr) as BannerScr).showBanner();
			}
			Laya.timer.once(100, this, ()=>{
			//	this.btn_get.y = Laya.stage.height-100/2-50-200;
				Laya.timer.once(1000, this, ()=>{
					this.close();
				});
			});
		}
		Laya.Tween.to(this.img_jindu, {width:this.currPoint*this.widthLen/10}, 200);
	}
	
	isShowBanner:boolean = false;
	isShowIndex:number = 5;
	jumpHandler:Laya.Handler;
	cent:number = 100;

	widthLen:number = 421;
	currPoint:number=0;
	onEnable(){
		this.currPoint = 0;
		this.img_jindu.width=0;
		this.txt_msg.text = `砸开金蛋获得${this.cent}金币`;
		
	}

	
	popup():void{
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;

		this.isShowVAD = false;
		this.clickTime = 0;
		
		Laya.timer.once(300, this, ()=>{
			super.popup();
			this.isShowBanner = false;
			this.isShowIndex = 5;
			this.btn_get.y =Laya.stage.height-90;
		});
	}
	
	close():void{
		Laya.timer.clearAll(this);
		// ShiYong.Inst.popup();
		if(this.jumpHandler)this.jumpHandler.run();

		Laya.Tween.clearAll(this.img_jindu);
		super.close();
		GameData.Inst.addCent(this.cent);
	}
}