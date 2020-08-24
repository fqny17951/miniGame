import { ui } from "./../ui/layaMaxUI";
import GameData from "../core/GameData";
import BaseConfig from "../core/BaseConfig";
import BannerScr from "../platforms/BannerScr";

export default class JumpPage1 extends ui.ads.JumpPage1UI {
	private static _inst:JumpPage1;
	static get Inst():JumpPage1{
		if(JumpPage1._inst==null)JumpPage1._inst = new JumpPage1();
		return JumpPage1._inst;
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
	bannerState:number;
	onEnable(){
		this.bannerState = 0;
		this.btn_close.y = Laya.stage.height-100/2-80;
		this.list_ad.height = Laya.stage.height-this.list_ad.x-80;
	}
	onDisable(){
	}
	callback:Laya.Handler;
	popup():void{
		if(GameData.Inst.platform.id != BaseConfig.pid_wx){
			this.visible = false;
			return
		}
		
		let id:string = "1004";//this.name;
		if(GameData.Inst.platform.gameList && GameData.Inst.platform.gameList.length>0){
			let list:any[] = GameData.Inst.platform.getGameList(id);

			if(list.length>0){
				this.list_ad.array = list;
			}else{
				this.list_ad.array = [];
			}

		}else{
			this.list_ad.array = [];
		}

		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
		this.callback = null;
		
		//if(this.list_ad.array.length<=0)return;
		
		Laya.timer.once(500, this, ()=>{
			this.width = Laya.stage.width;
			this.height = Laya.stage.height;
			this.img_bg.width = Laya.stage.width;
			this.img_bg.height = Laya.stage.height;
			this.list_ad.refresh();
			super.popup();
		});
	}
	close():void{
		super.close();
		Laya.timer.clearAll(this);
		if(this.callback){
			this.callback.run();
		}
		
		this.callback=null;
	}
}