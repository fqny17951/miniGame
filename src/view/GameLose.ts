import { ui } from "./../ui/layaMaxUI";
import GameData from "../core/GameData";
import GameStage from "../game/GameStage";
import GameWinVideo from "./GameWinVideo";
import BaseConfig from "../core/BaseConfig";
import Switch_default_check from "../platforms/Switch_default_check";
import JumpPage2 from "../ads/JumpPage2";
import JumpPage1 from "../ads/JumpPage1";
import BannerScr from "../platforms/BannerScr";
import EggEndQQPanel from "../panels/EggEndQQPanel";
import EggStartPanel from "../panels/EggStartPanel";

export default class GameLose extends ui.panels.GameLoseUI {
	private static _inst:GameLose;
	static get Inst():GameLose{
		if(GameLose._inst==null)GameLose._inst = new GameLose();
		return GameLose._inst;
	}

    constructor() {
		super();
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
	}
	isshowindex:number=0;
	onAwake(){
		this.btn_get.on(Laya.Event.CLICK, this, ()=>{
			let cent:number = 0;
			GameData.Inst.platform.videoAD(Laya.Handler.create(this, ()=>{
				cent = this.getCent(3);
				GameData.Inst.addCent(cent);
				this.close();
			}), Laya.Handler.create(this, ()=>{

			}), 7)
		});
		this.btn_gotoGame.on(Laya.Event.CLICK, this, ()=>{
		//	this.close();
			// if(!GameData.Inst.platform.getSwitch(17)){
			// 	this.close();
			// 	return;
			// }
			if([BaseConfig.pid_qq,BaseConfig.pid_dy].indexOf(GameData.Inst.platform.id) != -1)this.bannerState=2;
			if(this.bannerState==2){
				if(GameData.Inst.platform.id==BaseConfig.pid_dy){
					if((!this.img_selected.visible&&this.isshowindex==0)||(this.img_selected.visible&&this.isshowindex==1)){

						GameData.Inst.platform.videoAD(Laya.Handler.create(this, ()=>{
						let	cent = this.getCent(3);
							GameData.Inst.addCent(cent);			
							//this.isShare = true;
							this.close();
							//return;
						}), Laya.Handler.create(this, ()=>{
							// console.log("第一个关闭");
							// let	cent = this.getCent(1);
							// console.log("第一个关闭2");
							// GameData.Inst.addCent(cent);
							// console.log("第一个关闭");
							
							// this.close();
							return;
						}), 6)

					}else {
						if(GameData.Inst.platform.getSwitch(8)&&GameData.Inst.platform.videointerval==0){
							GameData.Inst.platform.videoAD(Laya.Handler.create(this, ()=>{
								let	cent = this.getCent(3);
								GameData.Inst.addCent(cent);			
								//this.isShare = true;
								this.close();
								//return;
							}), Laya.Handler.create(this, ()=>{
								console.log("第二个关闭");
								let	cent = this.getCent(1);
								GameData.Inst.addCent(cent);
								console.log("第二个关闭");
								this.close();
							//	return;
							}), 6)

						}else {
						let cent:number = 0;
						cent = Math.floor(this.getCent(1));
						GameData.Inst.addCent(cent);
						this.close();
						}
					}


					return;
				}
				if([BaseConfig.pid_qq, BaseConfig.pid_wx].indexOf(GameData.Inst.platform.id) != -1){
					{
						let cent:number = 0;
						cent = Math.floor(this.getCent(1));
						GameData.Inst.addCent(cent);
						this.close();
						return;
					}

				}
				let cent:number = 0;
				if(this.img_selected.visible&&GameData.Inst.platform.id!=BaseConfig.pid_qq){
					GameData.Inst.platform.videoAD(Laya.Handler.create(this, ()=>{
						cent = Math.floor(this.getCent(3));
						GameData.Inst.addCent(cent);
						this.close();
			
					}), Laya.Handler.create(this, ()=>{
						cent = Math.floor(this.getCent(1));
						GameData.Inst.addCent(cent);
						this.close();
				
					}), 7)
				}else{
					if(GameData.Inst.platform.getSwitch(2)||this.img_selected.visible){
						GameData.Inst.platform.videoAD(Laya.Handler.create(this, ()=>{
							cent = Math.floor(this.getCent(3));
							GameData.Inst.addCent(cent);
							this.close();
					
						}), Laya.Handler.create(this, ()=>{
							cent = Math.floor(this.getCent(1));
							GameData.Inst.addCent(cent);
							this.close();
						
						}), 7)
					}else{
						cent = Math.floor(this.getCent(1));
						GameData.Inst.addCent(cent);
						this.close();
						return;
					}
				}
			}else{
				if(this.bannerState==1)return;
				this.bannerState=1;
				Laya.timer.clearAll(this);
			Laya.timer.once(1500, this, ()=>{
				Laya.Tween.to(this.btn_gotoGame, {y:1100+(Laya.stage.height-1334)/2}, 200);
				(this.getComponent(BannerScr) as BannerScr).showOldBanner();
			});
			Laya.timer.once(2500, this, ()=>{
				this.bannerState=2;
	
			});
			}
			
		});
		this.box_select.on(Laya.Event.CLICK, this, ()=>{
			if(this.isshowindex==0)this.showCent();
			else this.showCent1();
		})
	}
	bannerState:number;
	kongzhi(){
			if(GameData.Inst.platform.getSwitch(1))	{	
				this.btn_gotoGame.visible=false;
				Laya.timer.once(2000,this,()=>{
				this.btn_gotoGame.visible=true;
				this.btn_gotoGame.y=1050+(Laya.stage.height-1334)/2;
			});
		}
			else {	this.btn_gotoGame.visible=true;
				this.btn_gotoGame.y=1050+(Laya.stage.height-1334)/2;
			}
	
		}
	onEnable(){
	if(GameData.Inst.platform.id==BaseConfig.pid_oppo)	GameData.Inst.platform.interADPanel.y=Laya.stage.height-1334;
		Laya.timer.once(100, this, this.showCent2);

		if(GameData.Inst.platform.id==BaseConfig.pid_qq)this.testModel();
	}
	testModel():void{
		this.showCent1();
	//	this.box_select1.visible = false;
	}
	showCent2():void{
		if(this.img_selected.visible){
			if(this.isshowindex==0)	this.txt_get_cent.text = ""+Math.floor(this.getCent(1));
			else 
			this.txt_get_cent.text = ""+Math.floor(this.getCent(3));
		}else{
			if(this.isshowindex==0)	this.txt_get_cent.text = ""+Math.floor(this.getCent(3));
			else 
			this.txt_get_cent.text = ""+Math.floor(this.getCent(1));
		}
		
	}
	showCent1():void{
		if(this.img_selected.visible){
			this.img_selected.visible=false;
			this.txt_get_cent.text = ""+Math.floor(this.getCent(1));
		}else{
			this.img_selected.visible=true;
			this.txt_get_cent.text = ""+Math.floor(this.getCent(3));
		}
		
	}
	showCent():void{
		if(this.img_selected.visible){
			this.img_selected.visible=false;
			this.txt_get_cent.text = ""+Math.floor(this.getCent(3));
		}else{
			this.img_selected.visible=true;
			this.txt_get_cent.text = ""+Math.floor(this.getCent(1));
		}
		
	}
	getCent(rate:number):number{
		console.log("这里出问题了？");
		console.log(GameStage.Inst.countCent);
		console.log(rate);
		return rate*GameStage.Inst.countCent;
		console.log("这里出问题了？1");
	}
	switchCount:number=0;
	popup():void{
	//	 console.log("结算界面开始pop");
		if(GameData.Inst.platform.id == BaseConfig.pid_qq){
			if(GameData.Inst.platform.getSwitch(15)){
				let stateSwitch:number = GameData.Inst.platform.gameSwitch.delay_egg_switch2;
				if(GameData.Inst.platform.gameSwitch.delay_egg_switch2==3){
					stateSwitch = this.switchCount%2+1;
					this.switchCount++;
				}
				if(stateSwitch==1){
					EggStartPanel.Inst.popup();
					EggStartPanel.Inst.zhuantai=2;
					EggStartPanel.Inst.jumpHandler = Laya.Handler.create(this, ()=>{
						this.btn_gotoGame.visible=false;	
						this.width = Laya.stage.width;
						this.height = Laya.stage.height;
						if(GameData.Inst.platform.id == BaseConfig.pid_qq)this.kongzhi();
						this.width = Laya.stage.width;
						this.height = Laya.stage.height;
					
						super.popup();
					});
				}else if(stateSwitch==2){
					EggEndQQPanel.Inst.popup();
					EggEndQQPanel.Inst.zhuantai=2;
					EggEndQQPanel.Inst.jumpHandler = Laya.Handler.create(this, ()=>{
						this.width = Laya.stage.width;
						this.btn_gotoGame.visible=false;	
						this.height = Laya.stage.height;
						if(GameData.Inst.platform.id == BaseConfig.pid_qq)this.kongzhi();
						this.width = Laya.stage.width;
						this.height = Laya.stage.height;
			
						// if(GameData.Inst.platform.id == BaseConfig.pid_qq){
						// 	this.btn_gotoGame.visible=false;
						// }
						super.popup();
					});
				}else{
					this.width = Laya.stage.width;
					this.height = Laya.stage.height;
					this.btn_gotoGame.visible=false;	
					if(GameData.Inst.platform.id == BaseConfig.pid_qq)this.kongzhi();
					this.width = Laya.stage.width;
					this.height = Laya.stage.height;
			
					// if(GameData.Inst.platform.id == BaseConfig.pid_qq){
					// 	this.btn_gotoGame.visible=false;
					
					// }
					super.popup();
				}
			}else{
				this.width = Laya.stage.width;
				this.height = Laya.stage.height;
				this.btn_gotoGame.visible=false;	
				if(GameData.Inst.platform.id == BaseConfig.pid_qq)this.kongzhi();
				this.width = Laya.stage.width;
				this.height = Laya.stage.height;
			
				// if(GameData.Inst.platform.id == BaseConfig.pid_qq){
				// 	this.btn_gotoGame.visible=false;	
				// }
				super.popup();
			}
		}
		if(GameData.Inst.platform.id==BaseConfig.pid_oppo){
			console.log("8==",GameData.Inst.platform.getSwitch(8));
			console.log("9==",GameData.Inst.platform.getSwitch(9));
			console.log("this.gameSwitch.ptg_native_province==",GameData.Inst.platform.gameSwitch.ptg_native_province);
			console.log("this.gameSwitch.ptg_native_city==",GameData.Inst.platform.gameSwitch.ptg_native_city);
			console.log("this.gameSwitch.local_switch==",GameData.Inst.platform.gameSwitch.local_switch);
			if(GameData.Inst.platform.bannerADObj&&!GameData.Inst.platform.getSwitch(8)&&GameData.Inst.platform.getSwitch(1))
			{
				GameData.Inst.platform.bannerADObj.hide();
			
				this.btn_gotoGame.y=Laya.stage.height-30;
				this.bannerState=1;
				Laya.timer.once(3000,this,()=>{
					GameData.Inst.platform.InterAD(null);
				
						this.bannerState=2;
			
					Laya.Tween.to(this.btn_gotoGame, {y:1030+(Laya.stage.height-1334)/2}, 200);
				});
			}else {
				GameData.Inst.platform.bannerADObj.hide();
				GameData.Inst.platform.InterAD(null);
				this.btn_gotoGame.y=1030+(Laya.stage.height-1334)/2;
				this.bannerState=2;
			}
			super.popup();
			return;
		}
		if(GameData.Inst.platform.id==BaseConfig.pid_vivo){
	
			if(GameData.Inst.platform.bannerADObj)	GameData.Inst.platform.bannerADObj.hide();
				GameData.Inst.platform.InterAD(null);
				this.btn_gotoGame.y=1030+(Laya.stage.height-1334)/2;
				this.bannerState=2;
				if(GameData.Inst.platform.getSwitch(6)){
					this.box_select1.visible=false;
					Laya.timer.once(3000,this,()=>{
						this.box_select1.visible=true;
	
					})
	
				}
			super.popup();
			return;
		}
		if(GameData.Inst.platform.id == BaseConfig.pid_wx){
			JumpPage1.Inst.popup();
			JumpPage1.Inst.callback = Laya.Handler.create(this, ()=>{
				this.width = Laya.stage.width;
				this.height = Laya.stage.height;
				if(GameData.Inst.platform.id==BaseConfig.pid_wx)	this.btn_gotoGame.y=Laya.stage.height-30;
				this.btn_gotoGame.visible=true;
				super.popup();	
				
				if(GameData.Inst.platform.id==BaseConfig.pid_wx){
					if(GameData.Inst.platform.getSwitch(17)){
						if(GameData.Inst.platform.id==BaseConfig.pid_wx)	this.btn_gotoGame.y=Laya.stage.height-30;
					Laya.timer.once(2000,this,()=>{
						this.btn_gotoGame.visible=true;
						(this.getComponent(BannerScr) as BannerScr).showOldBanner();
						Laya.Tween.to(this.btn_gotoGame, {y:1014+(Laya.stage.height-1334)/2}, 200);
						this.bannerState=2;
					})
				}else {
					this.bannerState=2;
					this.btn_gotoGame.y=1014+(Laya.stage.height-1334)/2;
					(this.getComponent(BannerScr) as BannerScr).showOldBanner();
					this.btn_gotoGame.visible=true;
				}
			}
			});
		

			
		}
			if(GameData.Inst.platform.id==BaseConfig.pid_dy){
				this.bannerState=2;
				this.width = Laya.stage.width;
				this.height = Laya.stage.height;
				this.btn_gotoGame.y=1028+(Laya.stage.height-1334)/2;
				super.popup();
				if(this.isshowindex==0){
					(this.box_select1.getChildByName("txt_select_0") as Laya.Text).text="不看视频，不3倍领取";

					}else {
						(this.box_select1.getChildByName("txt_select_0") as Laya.Text).text="看视频3倍领取";
					}
					console.log("他的值为");
					console.log(GameData.Inst.platform.getSwitch(7));
					console.log(GameData.Inst.platform.gameSwitch.ignore_check);
				
					if(!GameData.Inst.platform.getSwitch(7)){	this.box_select1.visible=false;
						this.isshowindex=1;
					}

			}
		if(GameData.Inst.platform.id == BaseConfig.pid_test){
			this.width = Laya.stage.width;
			this.height = Laya.stage.height;
			this.btn_gotoGame.y=1310+(Laya.stage.height-1334)/2;
			super.popup();
		}
	}
	close():void{
		console.log("准备删除");
	
		if(GameData.Inst.platform.id==BaseConfig.pid_dy){
		
			GameData.Inst.platform.videointerval++;
		if(GameData.Inst.platform.videointerval>GameData.Inst.platform.gameSwitch.video_number)GameData.Inst.platform.videointerval=0;
		this.isshowindex=this.isshowindex+1;
		this.isshowindex=(this.isshowindex)%2;
		}
		console.log(GameData.Inst.platform.gameSwitch.video_number);
		this.bannerState=0;
		super.close();
		if(GameData.Inst.platform.id==BaseConfig.pid_oppo)GameData.Inst.platform.interADPanel.close();
		Laya.timer.clearAll(this);
		if(GameData.Inst.platform.id == BaseConfig.pid_wx){
			JumpPage2.Inst.popup();
			JumpPage2.Inst.callback = Laya.Handler.create(this, ()=>{
				GameStage.Inst.showGameView();
			});
		}else{
			
			GameStage.Inst.showGameView();
			if(GameData.Inst.platform.id==BaseConfig.pid_vivo&&GameData.Inst.platform.getSwitch(7)&&!GameData.Inst.platform.getSwitch(8))	GameData.Inst.platform.InterAD(null);
		}
	}
}