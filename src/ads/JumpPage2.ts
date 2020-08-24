import { ui } from "./../ui/layaMaxUI";
import GameData from "../core/GameData";
import GameStage from "../game/GameStage";
import GameView from "../view/GameView";
import BaseConfig from "../core/BaseConfig";
import BannerScr from "../platforms/BannerScr";
import EggPanel from "../panels/EggPanel";

export default class JumpPage2 extends ui.ads.JumpPage2UI {
	private static _inst:JumpPage2;
	static get Inst():JumpPage2{
		if(JumpPage2._inst==null)JumpPage2._inst = new JumpPage2();
		return JumpPage2._inst;
	}

    constructor() {
		super();
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
	}
	onAwake(){
		this.btn_close.on(Laya.Event.CLICK, this, ()=>{
			if(!GameData.Inst.platform.getSwitch(17)){
				this.close();
				return;
			}
			if(this.bannerState==2){
				this.close();
			}else{
				if(this.bannerState==1)return;
				this.bannerState=1;
				Laya.timer.once(1500, this, ()=>{
					(this.getComponent(BannerScr) as BannerScr).showOldBanner();
				});
				Laya.timer.once(2500, this, ()=>{
					this.bannerState=2;
					(this.getComponent(BannerScr) as BannerScr).onDisable();
				});
			}
		});
		
	}
	isBack:boolean = false;
	isBack2:boolean = false;
	
	bannerState:number;
	onEnable(){
		this.bannerState = 0;
		this.btn_close.y = Laya.stage.height-100/2-80;
		this.list_ad.height = Laya.stage.height-this.list_ad.x-80;
	}
	onDisable(){
	}
	
	popup():void{
		if(GameData.Inst.platform.id != BaseConfig.pid_wx){
			this.visible = false;
			return
		}

		let id:string = "1005";//this.name;
		if(GameData.Inst.platform.gameList && GameData.Inst.platform.gameList.length>0){
			let list:any[] = GameData.Inst.platform.getGameList(id);
			if(list.length>0){
				this.list_ad.array = list;
			}else{
				this.list_ad.array = [];
			}
			///////////////////2222/////////////////////
			let list2:any[] =GameData.Inst.platform.getGameList(id);
			if(list2.length>0){
				this.list_ad2.array = list2;
			}else{
				this.list_ad2.array = [];
			}


		}else{
			this.list_ad.array = [];
		}

		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
		this.img_bg.width = Laya.stage.width;
			this.img_bg.height = Laya.stage.height;
		if(GameStage.Inst.isOver && GameData.Inst.platform.getSwitch(5)){
			EggPanel.Inst.popup();
			EggPanel.Inst.closeCallback = Laya.Handler.create(this, ()=>{
				if(this.list_ad.array.length<=0){
					if(this.callback)this.callback.run();
					return;
				}
				super.popup();
				this.list_ad.refresh();
				this.list_ad2.refresh();
			});
		}else{
			if(this.list_ad.array.length<=0){
				if(this.callback)this.callback.run();
				return;
			}
			super.popup();
			this.list_ad.refresh();
			this.list_ad2.refresh();
		}
	}

	callback:Laya.Handler;
	close():void{
		super.close();
		Laya.timer.clearAll(this);
		if(this.callback){this.callback.run();
			this,this.callback=null;
		}
	}
}