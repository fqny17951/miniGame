import GameData from "../core/GameData";
import ResManager from "../core/ResManager";
import JSONManager from "../core/JSONManager";
import GameLose from "../view/GameLose";
import GameInfo from "./GameInfo";
import SoundManager from "../core/SoundManager";
import BaseGameStage from "./BaseGameStage";
import TransformTween from "./TransformTween";
import NewPlayerTips from "../view/NewPlayerTips";
import ShiYong from "../view/ShiYong";
import BaseConfig from "../core/BaseConfig";
import GameView from "../view/GameView";

export default class GameStage extends BaseGameStage {
	private static _inst:GameStage;
	static get Inst():GameStage{
		return GameStage._inst;
	}
	camera:Laya.Camera;
	
    constructor() {
		super();
		GameStage._inst = this;
	}
	onEnable(){
		super.onEnable();

		ResManager.scene3d.input.multiTouchEnabled = false;
		ResManager.scene3d.mouseEnabled = false;
		// ResManager.scene3d.removeChildren();

		// this.addChild(ResManager.scene3d);
	}
	playerLose():void{
		super.playerLose();

		GameInfo.Inst.off(Laya.Event.END, this, this.timeOver);
		GameInfo.Inst.clearTime();
	}
	playerWin():void{
		this.getCent(GameData.Inst.levelItem.totalReward);
		
		GameInfo.Inst.off(Laya.Event.END, this, this.timeOver);
		GameInfo.Inst.clearTime();
		super.playerWin();
	}

	timeOver():void{
		this.playerLose();
	}
	showGameView():void{
		GameData.Inst.updateLevelJSON();
		//加载游戏主场景
		GameData.Inst.gameScene && Laya.Scene.open(GameData.Inst.gameScene);
	}
	playGame():void{
		super.playGame();
		
		// GameInfo.Inst.on(Laya.Event.END, this, this.timeOver);
		// GameInfo.Inst.timeChange();
	}

	/**
	 * 重新游戏、开始游戏初始化
	 */
	init():void{
		super.init();

		// this.camera.transform.localPosition = this.cameraPos;
		// this.road0.transform.localPosition = this.road0Pos;
		// this.boss.transform.localPosition = this.road0Pos;
		// this.boss.transform.localPositionY = 1;

		// this.player.transform.localPosition = this.playerPos;
		GameInfo.Inst.visible = false;
		GameStage.Inst.on(Laya.Event.START, this, ()=>{
			console.log("GameStage.Inst.on  Laya.Event.START");
		})
	}
	
	onDisable(){
		super.onDisable();
		this.camera = null;
	}
	destroy():void{
		super.destroy();
		this.camera = null;
	}
	
}