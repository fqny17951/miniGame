import { ui } from "./../ui/layaMaxUI";
import GameData from "../core/GameData";
import GameStage from "../game/GameStage";
import GameWinVideo from "./GameWinVideo";
import BaseConfig from "../core/BaseConfig";
import Switch_default_check from "../platforms/Switch_default_check";
import BoxPanel from "../panels/BoxPanel";
import EggPanel from "../panels/EggPanel";
import JumpPage2 from "../ads/JumpPage2";
import JumpPage1 from "../ads/JumpPage1";
import SoundManager from "../core/SoundManager";
import BannerScr from "../platforms/BannerScr";
import EggEndQQPanel from "../panels/EggEndQQPanel";
import EggStartPanel from "../panels/EggStartPanel";
import EggEndTTPanel from "../panels/EggEndTTPanel";
import vidioshare from "../panels/vidioshare";

export default class GameWin extends ui.panels.GameWinUI {
	private static _inst:GameWin;
	static get Inst():GameWin{
		if(GameWin._inst==null)GameWin._inst = new GameWin();
		return GameWin._inst;
	}

    constructor() {
		super();
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
	}
	onAwake(){
		this.btn_get.on(Laya.Event.CLICK, this, ()=>{
			let cent:number = 0;
			GameData.Inst.platform.videoAD(Laya.Handler.create(this, ()=>{
				cent = this.getCent(3);
				GameData.Inst.addCent(cent);
				this.isShare = true;
				this.close();
			}), Laya.Handler.create(this, ()=>{

			}), 7)
		});
		this.btn_gotoGame.on(Laya.Event.CLICK, this, ()=>{
			// if(!GameData.Inst.platform.getSwitch(17)){
			// 	this.close();
			// 	return;
			// }
			if([BaseConfig.pid_qq,BaseConfig.pid_dy].indexOf(GameData.Inst.platform.id) != -1)this.bannerState=2;
			if(this.bannerState==2){

				if([BaseConfig.pid_qq, BaseConfig.pid_wx].indexOf(GameData.Inst.platform.id) !=-1){
					{
						console.log("qq wx 直接删除");
						let cent:number = 0;
						cent = Math.floor(this.getCent(1));
						GameData.Inst.addCent(cent);
						this.close();
						return;
					}

				}
				if(GameData.Inst.platform.id==BaseConfig.pid_dy){
					console.log("dy继续判断");
					if((this.img_selected.visible&&this.isshowindex==0)||(!this.img_selected.visible&&this.isshowindex==1)){
						//if()
						console.log("需要看电影");
						GameData.Inst.platform.videoAD(Laya.Handler.create(this, ()=>{
						let	cent = Math.floor(this.getCent(3));
							GameData.Inst.addCent(cent);			
							this.isShare = true;
							this.close();
							return;
						}), Laya.Handler.create(this, ()=>{
							// let	cent = Math.floor(this.getCent(1));
							// GameData.Inst.addCent(cent);
							// this.close();
							return;
						}), 7)

					}else {
						if(GameData.Inst.platform.getSwitch(6)&&GameData.Inst.platform.videointerval==0){
							console.log("强制看电影");
							GameData.Inst.platform.videoAD(Laya.Handler.create(this, ()=>{
								let	cent =Math.floor( this.getCent(3));
								GameData.Inst.addCent(cent);			
								this.isShare = true;
								this.close();
								return;
							}), Laya.Handler.create(this, ()=>{
								let	cent = Math.floor(this.getCent(1));
								GameData.Inst.addCent(cent);
								this.close();
								return;
							}), 7)
						
						}else{
							console.log("直接关闭");
						let cent:number = 0;
						cent = Math.floor(this.getCent(1));
						GameData.Inst.addCent(cent);
						this.close();
						return;
						}
					}


					return;
				}
				let cent:number = 0;
				if(this.img_selected.getComponent(Switch_default_check).isShow||this.img_selected.visible){
					GameData.Inst.platform.videoAD(Laya.Handler.create(this, ()=>{
						cent = this.getCent(3);
						GameData.Inst.addCent(cent);
						
						this.isShare = true;
						this.close();
						return;
					}), Laya.Handler.create(this, ()=>{
						cent = this.getCent(1);
						GameData.Inst.addCent(cent);
						this.close();
						return;
					}), 7)
				}else{
					if(GameData.Inst.platform.getSwitch(2)){
						GameData.Inst.platform.videoAD(Laya.Handler.create(this, ()=>{
							cent = this.getCent(3);
							GameData.Inst.addCent(cent);
							this.isShare = true;
							this.close();
							return;
						}), Laya.Handler.create(this, ()=>{
							cent = this.getCent(1);
							GameData.Inst.addCent(cent);
							this.close();
							return;
						}), 7)
					}else{
						cent = this.getCent(1);
						GameData.Inst.addCent(cent);
						this.close();
						return;
					}
				}
			
			}else{
				if(this.bannerState==1)return;
				this.bannerState=1;
			
		
				Laya.timer.once(1500, this, ()=>{
					(this.getComponent(BannerScr) as BannerScr).showOldBanner();
					Laya.Tween.to(this.btn_gotoGame, {y:1093+(Laya.stage.height-1334)/2}, 200);
		
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
	isShare:boolean;
	bannerState:number;
	onEnable(){
	if(GameData.Inst.platform.id==BaseConfig.pid_oppo)	GameData.Inst.platform.interADPanel.y=Laya.stage.height-1334;
		Laya.timer.once(100, this, this.showCent2);
		this.isShare = false;
		if(GameData.Inst.platform.id==BaseConfig.pid_qq)this.box_select.visible=false;

		/*for(let i:number=0; i<3; i++){
			let keyImg:Laya.Image = this['img_key_'+i];
			keyImg.disabled = i+1>GameData.Inst.data.key
		}*/
	}
	showCent2():void{
		if(this.img_selected.visible){
			if(this.isshowindex==0)	this.txt_get_cent.text = ""+Math.floor(this.getCent(3));
			else 
			this.txt_get_cent.text = ""+Math.floor(this.getCent(1));
		}else{
			if(this.isshowindex==0)	this.txt_get_cent.text = ""+Math.floor(this.getCent(1));
			else 
			this.txt_get_cent.text = ""+Math.floor(this.getCent(3));
		}
		
	}
	showCent1():void{
		if(this.img_selected.visible){
			this.img_selected.visible=false;
			this.txt_get_cent.text = ""+Math.floor(this.getCent(3));
		}else{
			this.img_selected.visible=true;
			this.txt_get_cent.text = ""+Math.floor(this.getCent(1));
		}
		
	}
	showCent():void{
		if(this.img_selected.visible){
			this.img_selected.visible=false;
			this.txt_get_cent.text = ""+Math.floor(this.getCent(1));
		}else{
			this.img_selected.visible=true;
			this.txt_get_cent.text = ""+Math.floor(this.getCent(3));
		}
		
	}
	getCent(rate:number):number{
		return rate*GameStage.Inst.countCent;
	}

	kongzhi() {
		if (GameData.Inst.platform.getSwitch(1)) Laya.timer.once(2000, this, () => {
			this.btn_gotoGame.visible = true;
			this.btn_gotoGame.y = 1033+(Laya.stage.height-1334)/2;
		});
		else {
			this.btn_gotoGame.visible = true;
			this.btn_gotoGame.y = 1033+(Laya.stage.height-1334)/2;
		}

	}
	switchCount: number = 0;
	popup():void{
		this.txt_get_cent.text = "0";
		if(GameWinVideo.Inst.completeRate>=0.9){
			this.img_star_0.disabled = false;
			this.img_star_1.disabled = false;
			this.img_star_2.disabled = false;
			SoundManager.zhengDongLong();
		}else if(GameWinVideo.Inst.completeRate>=0.8){
			this.img_star_0.disabled = false;
			this.img_star_1.disabled = false;
			this.img_star_2.disabled = true;
		}else if(GameWinVideo.Inst.completeRate>=0.6){
			this.img_star_0.disabled = false;
			this.img_star_1.disabled = true;
			this.img_star_2.disabled = true;
		}else{
			this.img_star_0.disabled = true;
			this.img_star_1.disabled = true;
			this.img_star_2.disabled = true;
		}
		//this.btn_gotoGame.y=1280+(Laya.stage.height-1334)/2;
		
		if(GameData.Inst.platform.id == BaseConfig.pid_wx){
			JumpPage1.Inst.popup();
			JumpPage1.Inst.callback = Laya.Handler.create(this, ()=>{
				this.width = Laya.stage.width;
				this.height = Laya.stage.height;
				
				super.popup();
				if(GameData.Inst.platform.id==BaseConfig.pid_wx){
					if(GameData.Inst.platform.getSwitch(17)){
						if(GameData.Inst.platform.id==BaseConfig.pid_wx)	this.btn_gotoGame.y=Laya.stage.height-30;
					Laya.timer.once(2000,this,()=>{
					
						Laya.Tween.to(this.btn_gotoGame, {y:1100+(Laya.stage.height-1334)/2}, 200);
						this.bannerState=2;
					})
				}
			} else{
				this.bannerState=2;
				this.btn_gotoGame.y=1100+(Laya.stage.height-1334)/2;
				(this.getComponent(BannerScr) as BannerScr).showOldBanner();

			}
			});
			return;
		}
		if (GameData.Inst.platform.id == BaseConfig.pid_qq) {
			if (GameData.Inst.platform.getSwitch(18)) {
				let stateSwitch: number = GameData.Inst.platform.gameSwitch.delay_egg_switch3;
				if (GameData.Inst.platform.gameSwitch.delay_egg_switch3 == 3) {
					stateSwitch = this.switchCount % 2 + 1;
					this.switchCount++;
				}
				if (stateSwitch == 1) {
					EggStartPanel.Inst.popup();
					EggStartPanel.Inst.zhuantai = 3;
					EggStartPanel.Inst.jumpHandler = Laya.Handler.create(this, () => {
						this.btn_gotoGame.visible = false;	
						this.width = Laya.stage.width;
						this.height = Laya.stage.height;
						if (GameData.Inst.platform.id == BaseConfig.pid_qq) this.kongzhi();
						//	this.getComponent(BannerScr).showType=1;
						this.width = Laya.stage.width;
						this.height = Laya.stage.height;
					
						super.popup();
					});
				} else if (stateSwitch == 2) {
					EggEndQQPanel.Inst.popup();
					EggEndQQPanel.Inst.zhuantai = 3;
				
					EggEndQQPanel.Inst.jumpHandler = Laya.Handler.create(this, () => {
						this.btn_gotoGame.visible = false;
						this.width = Laya.stage.width;
						this.height = Laya.stage.height;
						if (GameData.Inst.platform.id == BaseConfig.pid_qq) this.kongzhi();
						this.width = Laya.stage.width;
						this.height = Laya.stage.height;
					
						super.popup();
					});
				} else {
					this.width = Laya.stage.width;
					this.height = Laya.stage.height;
					this.btn_gotoGame.visible = false;	
					if (GameData.Inst.platform.id == BaseConfig.pid_qq) this.kongzhi();
					this.width = Laya.stage.width;
					this.height = Laya.stage.height;
				
					super.popup();
				}
			} else {
				this.width = Laya.stage.width;
				this.height = Laya.stage.height;
				this.btn_gotoGame.visible = false;	
				if (GameData.Inst.platform.id == BaseConfig.pid_qq) this.kongzhi();
				//	this.getComponent(BannerScr).showType=1;
				this.width = Laya.stage.width;
				this.height = Laya.stage.height;
			
				super.popup();
			}
			return;
		}	
		if(GameData.Inst.platform.id==BaseConfig.pid_oppo){
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
		
			if(GameData.Inst.platform.bannerADObj)		GameData.Inst.platform.bannerADObj.hide();
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
		if(GameData.Inst.platform.id==BaseConfig.pid_dy){
		//	console.log("头条",GameData.Inst.platform.getSwitch(5));
				this.bannerState=2;
			if(GameData.Inst.platform.getSwitch(5)){
				EggEndTTPanel.Inst.popup();		
				EggEndTTPanel.Inst.jumpHandler = Laya.Handler.create(this, () => {
					this.width = Laya.stage.width;
					this.height = Laya.stage.height;
					//this.btn_gotoGame.visible=true;
					this.btn_gotoGame.y=1030+(Laya.stage.height-1334)/2;
						console.log("准备popup");
						super.popup();
						vidioshare.Inst.popup();
						console.log("popup  ok");
					if(this.isshowindex==0){
					(this.box_select1.getChildByName("txt_select_0") as Laya.Text).text="看视频3倍领取";

					}else {
						(this.box_select1.getChildByName("txt_select_0") as Laya.Text).text="不看视频，不3倍领取";
					}
					if(!GameData.Inst.platform.getSwitch(7)){	this.box_select1.visible=false;
						this.isshowindex=0;
					}

				});
				return;
			}	else{
				this.width = Laya.stage.width;
				this.height = Laya.stage.height;
				//this.btn_gotoGame.visible=true;
				this.btn_gotoGame.y=1030+(Laya.stage.height-1334)/2;
				Laya.timer.once(300, this, ()=>{
					super.popup();
					vidioshare.Inst.popup();
				});
				if(this.isshowindex==0){
				(this.box_select1.getChildByName("txt_select_0") as Laya.Text).text="看视频3倍领取";

				}else {
					(this.box_select1.getChildByName("txt_select_0") as Laya.Text).text="不看视频，不3倍领取";
				}
				if(!GameData.Inst.platform.getSwitch(7)){	this.box_select1.visible=false;
					this.isshowindex=0;
				}
			}
		}

		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
		//this.btn_gotoGame.visible=true;
		Laya.timer.once(300, this, ()=>{
			super.popup();
		});
	}
	isshowindex:number=0;
	overHandler():void{
		if (GameData.Inst.platform.id == BaseConfig.pid_qq) {
			if (GameData.Inst.platform.getSwitch(9)) {
				let stateSwitch: number = GameData.Inst.platform.gameSwitch.delay_egg_switch4;
				if (GameData.Inst.platform.gameSwitch.delay_egg_switch4 == 3) {
					stateSwitch = 	BoxPanel.Inst.switchCount % 2 + 1;
					BoxPanel.Inst.switchCount++;
				}
				if (stateSwitch == 1) {
					EggStartPanel.Inst.popup();
					EggStartPanel.Inst.zhuantai = 4;
					EggStartPanel.Inst.jumpHandler = Laya.Handler.create(this, () => {
						GameStage.Inst.showGameView();
					});
				} else if (stateSwitch == 2) {
					EggEndQQPanel.Inst.popup();
					EggEndQQPanel.Inst.zhuantai = 4;
					EggEndQQPanel.Inst.jumpHandler = Laya.Handler.create(this, () => {
						GameStage.Inst.showGameView();
					});
				} else {
					GameStage.Inst.showGameView();
				}
			} else {
				GameStage.Inst.showGameView();
			}
		} else 	if(GameData.Inst.platform.id == BaseConfig.pid_wx){
			JumpPage2.Inst.popup();
			JumpPage2.Inst.callback = Laya.Handler.create(this, ()=>{
				GameStage.Inst.showGameView();
			});
		}else{
			GameStage.Inst.showGameView();
		}
	}
	close():void{
		if(GameData.Inst.platform.id==BaseConfig.pid_dy){
			GameData.Inst.platform.videointerval++;
			if(GameData.Inst.platform.videointerval>GameData.Inst.platform.gameSwitch.video_number)GameData.Inst.platform.videointerval=0;

		}
		console.log("强制看视频的冷却",GameData.Inst.platform.videointerval);
		this.isshowindex=this.isshowindex+1;
		this.isshowindex=(this.isshowindex)%2;
		this.bannerState=0;
		super.close();
		console.log("到这里了");
		Laya.timer.clearAll(this);
		if(GameData.Inst.platform.id==BaseConfig.pid_oppo)GameData.Inst.platform.interADPanel.close();
		if(GameData.Inst.isTest){
			GameStage.Inst.showGameView();
			return;
		}

		if(GameData.Inst.data.key>=3&&GameData.Inst.platform.id!=BaseConfig.pid_oppo){
			BoxPanel.Inst.popup();
			BoxPanel.Inst.closeCallback = Laya.Handler.create(this, this.overHandler);
		}else{
			if(GameData.Inst.platform.getSwitch(5)&&[BaseConfig.pid_qq, BaseConfig.pid_wx,BaseConfig.pid_dy].indexOf(GameData.Inst.platform.id) == -1){
				EggPanel.Inst.popup();
				EggPanel.Inst.closeCallback = Laya.Handler.create(this, this.overHandler);
			}else{
				GameStage.Inst.showGameView();
				if(GameData.Inst.platform.id==BaseConfig.pid_vivo&&GameData.Inst.platform.getSwitch(7)&&!GameData.Inst.platform.getSwitch(8))	GameData.Inst.platform.InterAD(null);
			}
		}
	}
}