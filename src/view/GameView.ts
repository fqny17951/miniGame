import { ui } from "./../ui/layaMaxUI";
import GameData from "../core/GameData";
import GameStage from "../game/GameStage";
import SoundManager from "../core/SoundManager";
import BaseConfig from "../core/BaseConfig";
import Switch_default_check from "../platforms/Switch_default_check";
import GameInfo from "../game/GameInfo";
import TaskPanel from "../panels/TaskPanel";
import GetCentPanel from "../panels/GetCentPanel";
import ShopPanel from "../panels/ShopPanel";
import JumpPageMain from "../ads/JumpPageMain";
import JumpPage1 from "../ads/JumpPage1";
import { config } from "../platforms/config";

export default class GameView extends ui.view.GameViewUI {
	private static _inst:GameView;
	static get Inst():GameView{
		return GameView._inst;
	}
	timelLimit:number;
	isvodio:boolean;
	Checkornot:boolean=false;
    constructor() {
		super();
		GameView._inst = this;

		this.width = Laya.stage.width;
		this.height = Laya.stage.height;

		///////////////设置//////////////////
		this.box_setting.visible = false;
		this.btn_setting.on(Laya.Event.CLICK, this, ()=>{
			this.box_setting.visible = !this.box_setting.visible;
		});
		this.btn_sound.on(Laya.Event.CLICK, this, ()=>{
			GameData.Inst.data.sound = !GameData.Inst.data.sound;
			this.btn_sound.skin = GameData.Inst.data.sound?"main/p_i_music.png":"main/p_i_music_off.png";
			if(GameData.Inst.data.sound){
				SoundManager.playBg();
			}else{
				SoundManager.stopBg();
			}
			GameData.Inst.getData();
		});
		this.btn_zhangdong.on(Laya.Event.CLICK, this, ()=>{
			GameData.Inst.data.zhengdong = !GameData.Inst.data.zhengdong;
			this.btn_zhangdong.skin = GameData.Inst.data.zhengdong?"main/p_i_zd.png":"main/p_i_zd_off.png";
			GameData.Inst.getData();
		});
		///////////////左右按钮//////////////////
		this.btn_qiandao.on(Laya.Event.CLICK, this, ()=>{
			if(Laya.Browser.now()-GameView.Inst.timelLimit<=2000)return;
			GameView.Inst.timelLimit=Laya.Browser.now();
		//	GameView.Inst.event(Laya.Event.TRAIL_FILTER_CHANGE);
			TaskPanel.Inst.popup();
		});
		if(GameData.Inst.platform.id!=BaseConfig.pid_vivo)this.AddDesktop.visible=false;
		this.AddDesktop.on(Laya.Event.CLICK, this, ()=>{
		
			this.createdesktop();

			});
		this.btn_time.clickHandler = Laya.Handler.create(this, ()=>{
			if(Laya.Browser.now()-GameView.Inst.timelLimit<=2000)return;
			GameView.Inst.timelLimit=Laya.Browser.now();
			if(GameData.Inst.data.offlineTime<=0){
				return;
			}
			if(GameData.Inst.isTest){
				GameData.Inst.addCent(this.getTimeReward(GameData.Inst.data.offlineTime));
				GameData.Inst.data.offlineTime = 0;
				this.playTime();
			}else{
				GetCentPanel.Inst.setCent(this.getTimeReward(GameData.Inst.data.offlineTime), 5, Laya.Handler.create(this, ()=>{
					GameData.Inst.data.offlineTime = 0;
					this.playTime();
				}))
				GetCentPanel.Inst.popup();
			}
		}, [], false);
		this.btn_skin.on(Laya.Event.CLICK, this, ()=>{
			if(Laya.Browser.now()-GameView.Inst.timelLimit<=2000)return;
			GameView.Inst.timelLimit=Laya.Browser.now();
			GameView.Inst.event(Laya.Event.TRAIL_FILTER_CHANGE);
			ShopPanel.Inst.popup();
			
		});
		this.btn_select.on(Laya.Event.CLICK, this, ()=>{
			console.log("点击事件");
			if(this.Checkornot){
			   this.Checkornot=false;
			   this.img_selected.visible=false;
	   
			}
			else {
			   this.Checkornot=true;
			   this.img_selected.visible=true;
	   
			}
		   });
		Laya.Browser.window.test = (msg:string)=>{
			console.log("test :", msg);
		}
		///////////////开始游戏//////////////////
		this.btn_start.on(Laya.Event.MOUSE_UP, this, ()=>{
			console.log("开始登录~~~~~~~~~~~~~~");  
			GameData.Inst.platform.login(Laya.Handler.create(this, ()=>{
			this.loginstartgame();
			}), 
			Laya.Handler.create(this, ()=>{
				console.log("失败~~~~~~~~~~~~~~"); 
				this.loginstartgame();
			}));
			console.log("登录完了");
			
	//	if(GameData.Inst.platform.id==BaseConfig.pid_wx)	JumpPage1.Inst.popup();
		});

		Laya.stage.on(Laya.Event.CHANGE, this, ()=>{
			this.txt_cent.text = ""+GameData.Inst.data.cent;
		});
		// this.img_mouse.visible = false;
	}
	 loginstartgame(){

		GameData.Inst.gameCentRate = 1; 
				GameView.Inst.isvodio=false;
				if(this.img_selected.visible&&[BaseConfig.pid_qq, BaseConfig.pid_oppo,BaseConfig.pid_vivo,BaseConfig.pid_dy].indexOf(GameData.Inst.platform.id) == -1){
					console.log("看电影准备开始");
					//this.box_select.getComponent(Switch_default_check).isShow
					GameData.Inst.platform.videoAD(Laya.Handler.create(this, ()=>{
						GameData.Inst.gameCentRate = 2;
						GameView.Inst.isvodio=true;
						this.playGame();
					}), Laya.Handler.create(this, ()=>{
						this.playGame();
					}))
				}else{
					GameData.Inst.gameCentRate = 1; 
			GameView.Inst.isvodio=false;
			if(this.img_selected.visible&&[BaseConfig.pid_qq, BaseConfig.pid_oppo,BaseConfig.pid_vivo,BaseConfig.pid_dy].indexOf(GameData.Inst.platform.id) == -1){
				console.log("看电影准备开始");
				//this.box_select.getComponent(Switch_default_check).isShow
				GameData.Inst.platform.videoAD(Laya.Handler.create(this, ()=>{
					GameData.Inst.gameCentRate = 2;
					GameView.Inst.isvodio=true;
					this.playGame();
				}), Laya.Handler.create(this, ()=>{
					this.playGame();
				}))
			}else{
				console.log("不等于不看电影准备开始");
				
				this.playGame();
			}
					
					this.playGame();
				}
	 }
	createdesktop(){
		Laya.Browser.window.qg.hasShortcutInstalled({
			success: function(res) {
			  // 判断图标未存在时，创建图标
			  if (res == false) {
				Laya.Browser.window.qg.installShortcut({
				  success: function() {
					// 执行用户创建图标奖励
					GameData.Inst.platform.showMessage("没有桌面图标");
				  },
				  fail: function(err) {

					GameData.Inst.platform.showMessage("创建频繁2分钟后恢复");
				  },
				  complete: function() {
					GameData.Inst.platform.showMessage("取消创建");

				  }
				})
			  }else {
				GameData.Inst.platform.showMessage("已有桌面图标");

			  }
			},
			fail: function(err) {},
			complete: function() {}
		  })

	}
	playGame():void{
		if(!GameStage.Inst.isStart){
			// this.ui.visible = false;
			this.event(Laya.Event.START);
			this.box_bottom.visible = false;
			//this.box_left.visible = false;
			this.btn_qiandao.visible=false;
			this.box_right.visible = false;
			
			this.ui_adbanner.visible = false;

			GameInfo.Inst.visible = true;
			Laya.timer.once(500,this, ()=>{
				if(GameData.Inst.platform.getSwitch(2)&&!GameView.Inst.isvodio&&GameData.Inst.platform.id!=BaseConfig.pid_wx&&GameData.Inst.platform.videointerval==0){
					GameData.Inst.platform.videoAD(Laya.Handler.create(this, ()=>{
						GameStage.Inst.startGame();
					}), Laya.Handler.create(this, ()=>{
						GameStage.Inst.startGame();
					}));
				}else{
					GameStage.Inst.startGame();
				}
			});
		}
	}
	playTime(isAdd:boolean=false, time:number=1):void{
		if(isAdd){
			GameData.Inst.data.offlineTime+=time;
		}
		this.txt_time_cent.text = ""+this.getTimeReward(GameData.Inst.data.offlineTime);
		Laya.Tween.clearAll(this.img_time_jindu);
		if(GameData.Inst.data.offlineTime>=60){
			this.img_time_jindu.width=93;
			return;
		}
		this.img_time_jindu.width = 0;
		Laya.Tween.to(this.img_time_jindu, {width:93}, 5000, null, Laya.Handler.create(this, this.playTime, [true]));
	}
	getTimeReward(count:number):number{
		return Math.floor(count*5);
	}
	onOpened(isFrist:boolean=false){
		if(GameData.Inst.isTest)return;
		if(isFrist){//第一次打开处理
			console.log("Laya.Stat.FPS", Laya.Stat.FPS);
			if(Laya.Stat.FPS>70){
				Laya.stage.frameRate = Laya.Stage.FRAME_SLOW;
			}
			//离线
			if(GameData.Inst.platform.id != BaseConfig.pid_oppo && GameData.Inst.platform.id != BaseConfig.pid_vivo){
				Laya.timer.once(500, this.btn_time.clickHandler, this.btn_time.clickHandler.run);
			}
			// this.btn_time.clickHandler.run();
		}else{
			SoundManager.playBg();
			if(GameData.Inst.platform.id == BaseConfig.pid_oppo || GameData.Inst.platform.id == BaseConfig.pid_vivo){
				// GameData.Inst.platform.InterAD(null);
			}else{
				this.showInterAD();
			}
		}

	//	JumpPageMain.Inst.popup();
	}
	showInterAD():void{
		if(GameData.Inst.platform.id == BaseConfig.pid_oppo || GameData.Inst.platform.id == BaseConfig.pid_vivo){
		}else{
			if(Math.random()>0.5)GameData.Inst.platform.InterAD(null);
		}
		// GameData.Inst.platform.InterAD(null);
		
	//	JumpPageMain.Inst.popup();
	}
	onDisable(){
		this.removeChildren();
		Laya.stage.offAllCaller(this);
		Laya.timer.clearAll(this);
		this.btn_select.offAll();
	}
	onDestroy():void{
		Laya.stage.offAllCaller(this);
		Laya.timer.clearAll(this);
		this.btn_select.offAll();
	}

	hideTime:number;
	onAwake(){
		Laya.stage.on(Laya.Event.FOCUS, this, ()=>{
			if(!this.visible)return;
			let timeCha:number = Laya.Browser.now()-this.hideTime;
			let time:number = Math.floor(timeCha/5000);
			if(time>0)this.playTime(true, time);
		});
		Laya.stage.on(Laya.Event.BLUR, this, ()=>{
			this.hideTime = Laya.Browser.now();
		});

		this.btn_sound.skin = GameData.Inst.data.sound?"main/p_i_music.png":"main/p_i_music_off.png";
		this.btn_zhangdong.skin = GameData.Inst.data.zhengdong?"main/p_i_zd.png":"main/p_i_zd_off.png";
		
		this.txt_cent.text = ""+GameData.Inst.data.cent;
		this.txt_level.value = ""+GameData.Inst.data.level;	

		// this.txt_share_cent.text = ""+JSONManager.gameinit.shareCent;
		// this.img_share_cent.visible = GameData.Inst.data.shareCount<JSONManager.gameinit.shareMax;
		// this.btn_share.visible = GameData.Inst.platform.getUseAPI(0);

		GameStage.Inst.init();
		this.ui.visible = true;
		this.box_setting.visible = false;
		
		GameInfo.Inst.visible = false;
		this.Checkornot=this.img_selected.visible=GameData.Inst.platform.getSwitch(0);
		this.playTime();

		/*
		Laya.timer.once(2000, this, ()=>{
			let textImg:Laya.Image = new Laya.Image();
			textImg.width = textImg.height = 350;

			textImg.texture = GameStage.Inst.drawToTexture(Laya.stage.width, Laya.stage.height, 0, 0) as Laya.Texture;
			this.addChild(textImg);

		});
		*/
	}
}