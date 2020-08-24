import { ui } from "./../ui/layaMaxUI";
import GameData from "../core/GameData";
import BannerScr from "../platforms/BannerScr";

export default class EggPanel extends ui.panels.EggUI {
	private static _inst:EggPanel;
	static get Inst():EggPanel{
		if(EggPanel._inst==null)EggPanel._inst = new EggPanel();
		return EggPanel._inst;
	}

    constructor() {
		super();
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
	}
	onAwake(){
		this.btn_get.on(Laya.Event.CLICK, this, ()=>{
			if(this.currPoint>=10)return;

			Laya.Tween.clearAll(this.img_jindu);
			this.currPoint++;
			if(this.isShowBanner && this.currPoint>=5 && Math.random()>0.95){
				this.currPoint=10;
			}
			if(this.currPoint>10)this.currPoint=10;
			this.updateJindu();
		
			Laya.timer.clear(this, this.updateZore);
			if(this.currPoint>0 && this.currPoint<10){
				Laya.timer.loop(200, this, this.updateZore);
			}

			if(this.currPoint>=10){
				// this.close();
			}
		});


	}
	cent:number = 100;

	widthLen:number = 421;
	currPoint:number=0;
	onEnable(){
		this.currPoint = 0;
		this.img_jindu.width=0;
		this.txt_msg.text = `砸开金蛋获得${this.cent}金币`;
		
	}
	updateZore():void{
		this.currPoint--;
		if(this.currPoint<0){
			this.currPoint=0;
		}
		this.updateJindu();
	}
	updateJindu():void{
		if(!this.isShowBanner && this.currPoint==this.isShowIndex){
			this.isShowBanner = true;
			(this.getComponent(BannerScr) as BannerScr).showBanner();
			Laya.timer.once(1500, this, ()=>{
				this.btn_get.y = Laya.stage.height-100/2-80-200;
				Laya.timer.once(1000, this, ()=>{
					this.close();
				});
			});
		}
		Laya.Tween.to(this.img_jindu, {width:this.currPoint*this.widthLen/10}, 200);
	}
	
	isShowBanner:boolean = false;
	isShowIndex:number = 5;
	closeCallback:Laya.Handler;
	popup():void{
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
		
		Laya.timer.once(300, this, ()=>{
			super.popup();
			this.isShowBanner = false;
			this.isShowIndex = 2+Math.floor(Math.random()*2);
			this.btn_get.y = Laya.stage.height-100/2-80;
		});
	}
	

	close():void{
		Laya.timer.clearAll(this);
		if(this.closeCallback)this.closeCallback.run();

		Laya.Tween.clearAll(this.img_jindu);
		super.close();
		GameData.Inst.addCent(this.cent);
	}
}