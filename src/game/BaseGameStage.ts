import { ui } from "./../ui/layaMaxUI";

import GameData from "../core/GameData";
import NewPlayerTips from "../view/NewPlayerTips";
import GameWin from "../view/GameWin";
import GameLose from "../view/GameLose";
import SoundManager from "../core/SoundManager";
import ShiYong from "../view/ShiYong";
import BaseConfig from "../core/BaseConfig";
import GameStage from "./GameStage";
import EggStartPanel from "../panels/EggStartPanel";
import EggEndQQPanel from "../panels/EggEndQQPanel";

export default class BaseGameStage extends ui.view.GameStageUI {

	isStart:boolean = false;
	isPause:boolean = false;
	isReset:boolean = false;
	isOver:boolean = false;

    constructor() {
		super();
	}
	onEnable(){

	}
	
	playerLose():void{
		this.isOver = true;

		Laya.timer.once(1000, this, ()=>{
			SoundManager.playLose();
			SoundManager.zhengDongLong();
		})
		Laya.timer.once(2000, this, ()=>{
			Laya.timer.clearAll(this);
			GameData.Inst.platform.stopVideo();
			//GameLose.Inst.popup();
		})
	}
	playerWin():void{
		this.isOver = true;

		//胜利
		GameData.Inst.data.key++;
		GameData.Inst.updateLevel();
			
		Laya.timer.once(1000, this, ()=>{
			SoundManager.playWin();
			SoundManager.zhengDongLong();
		})
		Laya.timer.once(2000, this, ()=>{
			Laya.timer.clearAll(this);
			GameData.Inst.platform.stopVideo();
			GameWin.Inst.popup();
		})
	}

	countCent:number=0;
	getCent(cent:number):void{
		this.countCent+=cent;
	}
	
	showGameView():void{
		GameData.Inst.updateLevelJSON();
		//加载游戏主场景
		GameData.Inst.gameScene && Laya.Scene.open(GameData.Inst.gameScene);
	}
	static switchCount:number=0;
	startGame():void{
		if(GameData.Inst.platform.bannerADObj)GameData.Inst.platform.bannerADObj.hide();
		if(GameData.Inst.data.level<=1&&GameData.Inst.platform.id!=BaseConfig.pid_qq){
			// NewPlayerTips.Inst.popup();
			// NewPlayerTips.Inst.jumpHandler = Laya.Handler.create(this, ()=>{
				GameStage.Inst.playGame();
		
		}else if(GameData.Inst.data.level>=2||GameData.Inst.platform.id==BaseConfig.pid_qq){
			if(GameData.Inst.platform.getSwitch(14)){
				if(GameData.Inst.platform.id==BaseConfig.pid_qq){
					let stateSwitch:number = GameData.Inst.platform.gameSwitch.delay_egg_switch1;
					if(GameData.Inst.platform.gameSwitch.delay_egg_switch1==3){
						stateSwitch = GameStage.switchCount%2+1;
						GameStage.switchCount++;
					}
					
					if(stateSwitch==1){
						EggStartPanel.Inst.popup();
						EggStartPanel.Inst.jumpHandler = Laya.Handler.create(this,()=>{

							this.playGame();

						});
						EggStartPanel.Inst.zhuantai=1;
					}else if(stateSwitch==2){
						EggEndQQPanel.Inst.popup();
						EggEndQQPanel.Inst.jumpHandler = Laya.Handler.create(this,()=>{

							this.playGame();

						}
						
						);
						EggEndQQPanel.Inst.zhuantai=1;
					}else{
						this.playGame();
					}
				}else{
					this.playGame();
				}
			}else{
				this.playGame();
			}
		}else{
			this.playGame();
		}

	}
	playGame():void{
		this.isStart = true;
		this.event(Laya.Event.START);
		GameData.Inst.platform.sendLog(1008);
		GameData.Inst.platform.recordVideo(null, null);
	}
	/**
	 * 是否游戏中状态
	 */
	get isPlaing():boolean{
		if(!this.isStart)return false;
        if(this.isPause)return false;
        if(this.isReset)return false;
		if(this.isOver)return false;
		
		return true;
	}
	/**
	 * 重新游戏、开始游戏初始化
	 */
	init():void{
		this.isStart = false;
		this.isPause = false;
		this.isReset = false;
		this.isOver = false;

		this.countCent = 0;

	}
	
	onDisable(){
		super.onDisable();
		this.removeChildren();
		this.destroy();
	}
	destroy():void{
		super.destroy();
		Laya.timer.clearAll(this);
	}
	
}