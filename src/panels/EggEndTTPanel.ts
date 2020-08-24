import { ui } from "./../ui/layaMaxUI";
import GameData from "../core/GameData";
import BannerScr from "../platforms/BannerScr";
import BaseConfig from "../core/BaseConfig";
import GameStage from "../game/GameStage";

export default class EggEndTTPanel extends ui.panels.EggEndTTUI {
	private static _inst:EggEndTTPanel;
	static get Inst():EggEndTTPanel{
		if(EggEndTTPanel._inst==null)EggEndTTPanel._inst = new EggEndTTPanel();
		return EggEndTTPanel._inst;
	}

    constructor() {
		super();
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
	}
	clickTime:number=0;
	isShowVAD:boolean = false;
	zhuantai: number = 0;

	onAwake(){
		this.box_select.on(Laya.Event.CLICK, this, ()=>{
            this.img_selected.visible=!this.img_selected.visible;
        });
		this.btn_get.on(Laya.Event.CLICK, this, ()=>{
			if(this.currPoint>=5){
				if(this.isvido)	this.updateJindu();
					return;}

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
	isvido:boolean=false;
	updateJindu():void{
		if(this.currPoint>=this.isShowIndex){
            if(this.img_selected.visible){
				this.isvido=false;
            GameData.Inst.platform.videoAD(Laya.Handler.create(this, ()=>{
				GameData.Inst.addCent(this.cent*2);
				this.close();
				console.log("金蛋看完了视频");
                return;
            }), Laya.Handler.create(this, ()=>{
				this.isvido=true;
				// GameData.Inst.addCent(this.cent);
				// this.close();
				// console.log("金蛋没有视频");
                // return;
            }), 7)
        }
		else {
			GameData.Inst.addCent(this.cent);	
			this.close();
		

		}
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
		});
	}
	
	close():void{
		this.isvido=false;
        if(this.jumpHandler){
			console.log("关闭金蛋有回调");
            this.jumpHandler.run();
            this.jumpHandler=null;
        }
		Laya.timer.clearAll(this);
		Laya.Tween.clearAll(this.img_jindu);
		super.close();
		
	}
}