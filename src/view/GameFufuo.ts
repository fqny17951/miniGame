import { ui } from "./../ui/layaMaxUI";
import GameData from "../core/GameData";
import BannerScr from "../platforms/BannerScr";
import BaseConfig from "../core/BaseConfig";

export default class GameFufuo extends ui.panels.GameFuhuoUI {
	private static _inst:GameFufuo;
	static get Inst():GameFufuo{
		if(GameFufuo._inst==null)GameFufuo._inst = new GameFufuo();
		return GameFufuo._inst;
	}

    constructor() {
		super();
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
	}
	onAwake(){
		this.box_select.on(Laya.Event.CLICK, this, ()=>{
            this.img_selected.visible=!this.img_selected.visible;
        });
		this.btn_get.on(Laya.Event.CLICK, this, ()=>{
			Laya.timer.clearAll(this);
			GameData.Inst.platform.videoAD(Laya.Handler.create(this, ()=>{
				if(this.callback)this.callback.run();
				this.close();
			}), Laya.Handler.create(this, ()=>{
				this.updateTime();
				if(GameData.Inst.platform.getSwitch(1)&&GameData.Inst.platform.id!=BaseConfig.pid_dy)
				{
					this.btn_close.y=Laya.stage.height-30;
					this.bannerState=1;
					Laya.timer.once(3000,this,()=>{				
							this.bannerState=2;				
						Laya.Tween.to(this.btn_close, {y:1014+(Laya.stage.height-1334)/2}, 200);
					});
				}
			}), 6)
		});
		this.btn_close.on(Laya.Event.CLICK, this, ()=>{
			console.log("取消复活");
			// if(!GameData.Inst.platform.getSwitch(17)){
			// 	//console.log("进入回掉复活");
			// 	if(this.closeCallback)this.closeCallback.run();
			// 	this.close();
			// 	return;
			// }
			if([BaseConfig.pid_qq,BaseConfig.pid_dy].indexOf(GameData.Inst.platform.id) != -1)this.bannerState=2;
			if(this.bannerState==2){
				if(GameData.Inst.platform.id==BaseConfig.pid_dy){
					if((!this.img_selected.visible&&this.isshowindex==0)||(this.img_selected.visible&&this.isshowindex==1)){
					Laya.timer.clearAll(this);
					GameData.Inst.platform.videoAD(Laya.Handler.create(this, ()=>{
						if(this.callback)this.callback.run();
						this.close();
						return;
					}), Laya.Handler.create(this, ()=>{
						this.updateTime();
						return;
					}), 6)
				}else {
					if(this.closeCallback)this.closeCallback.run();	
					this.close();
					return;
				}

				}else {
			//	console.log("bannerState==2调用");
				if(this.closeCallback)this.closeCallback.run();
				
				this.close();
				return;
				}
			}else{
				if(this.bannerState==1)return;
				this.bannerState=1;
				Laya.timer.clearAll(this);
				Laya.timer.once(1500, this, ()=>{
					Laya.Tween.to(this.btn_close, {y:1250+(Laya.stage.height-1334)/2}, 200);
					(this.getComponent(BannerScr) as BannerScr).showOldBanner();
				});
				Laya.timer.once(2500, this, ()=>{
					this.bannerState=2;
		
				});
			}
		
		});
	}
	callback:Laya.Handler;
	bannerState:number;
	time:number=10;
	onEnable(){
	
		this.time = 10;
		this.updateTime();

		let id:string = "1006";
		if(GameData.Inst.platform.gameList && GameData.Inst.platform.gameList.length>0){
			let list:any[] = GameData.Inst.platform.getGameList(id,2);
            if(list.length>0){
				this.list_ad.array = list;
            }else{
                this.list_ad.array = [];
            }
        }else{
			this.list_ad.array = [];
		}
	}
	updateTime():void{
		if(this.time<=0){
		//	console.log("时间等于0的时候调用");
			if(this.closeCallback)this.closeCallback.run();
			this.close();
			return;
		}
		this.txt_time.value = ""+this.time;
		this.time--;
		Laya.timer.once(1000, this, this.updateTime);
	}
	
	popup():void{
	//	console.log("复活界面开始pop");
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
		this.bannerState=0;
	
	
		super.popup();
	
	//	console.log("复活界面pop完成");
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
			Laya.Tween.to(this.btn_close, {y:1014+(Laya.stage.height-1334)/2}, 200);
			this.bannerState=2;
		})
	}else {

		this.bannerState=2;
		this.btn_close.y=1014+(Laya.stage.height-1334)/2;
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
		
			Laya.Tween.to(this.btn_close, {y:1014+(Laya.stage.height-1334)/2}, 200);
		});
	}else {
		GameData.Inst.platform.bannerADObj.hide();
		(this.getComponent(BannerScr) as BannerScr).showOldBanner();
		this.btn_close.y=1014+(Laya.stage.height-1334)/2;
		this.bannerState=2;
	}
	
	return;
}

if(GameData.Inst.platform.id==BaseConfig.pid_vivo){
	if(GameData.Inst.platform.getSwitch(1)&&GameData.Inst.platform.getSwitch(4))
	{
//	if(GameData.Inst.platform.bannerADObj)	GameData.Inst.platform.bannerADObj.hide();
		(this.getComponent(BannerScr) as BannerScr).showOldBanner();
		this.btn_close.y=Laya.stage.height-30;
		this.bannerState=1;
		Laya.timer.once(3000,this,()=>{
		
				this.bannerState=2;
		
			Laya.Tween.to(this.btn_close, {y:1014+(Laya.stage.height-1334)/2}, 200);
		});
	}else {
	//	if(GameData.Inst.platform.bannerADObj)	GameData.Inst.platform.bannerADObj.hide();
		(this.getComponent(BannerScr) as BannerScr).showOldBanner();
		this.btn_close.y=1014+(Laya.stage.height-1334)/2;
		this.bannerState=2;
	}
	
	return;
}
if(GameData.Inst.platform.id==BaseConfig.pid_dy){
	this.btn_close.y=1014+(Laya.stage.height-1334)/2;
	this.box_select1.visible=true;
	if(this.isshowindex==0){
		(this.box_select1.getChildByName("txt_select_0") as Laya.Text).text="不看广告，放弃复活";

		}else {
			(this.box_select1.getChildByName("txt_select_0") as Laya.Text).text="观看广告，进行复活";
		}
		if(!GameData.Inst.platform.getSwitch(7)){	this.box_select1.visible=false;
			this.isshowindex=1;
		}
}else 	this.box_select1.visible=false;
	}
	closeCallback:Laya.Handler;
	isshowindex:number=0;
	close():void{
		this.isshowindex=this.isshowindex+1;
		this.isshowindex=(this.isshowindex)%2;
		console.log("复活界面的",this.isshowindex);
		this.bannerState=0;
		Laya.timer.clearAll(this);
		console.log("关闭复活界面");
		this.bannerState=0;
		this.time = 10;
		super.close();
		Laya.timer.clearAll(this);
		if(this.callback)this.callback=null;
		if(this.closeCallback)this.closeCallback=null;

	//	this.btn_close.offAll();
		
	}
}