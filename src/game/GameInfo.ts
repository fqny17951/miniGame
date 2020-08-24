import { ui } from "./../ui/layaMaxUI";

import GameData from "../core/GameData";
import GameStage from "./GameStage";
import JSONManager from "../core/JSONManager";
import GameView from "../view/GameView";
import ResManager from "../core/ResManager";
import GameWinVideo from "../view/GameWinVideo";
import SoundManager from "../core/SoundManager";

export default class GameInfo extends ui.view.GameInfoUI {
	private static _inst:GameInfo;
	static get Inst():GameInfo{
		return GameInfo._inst;
	}
    constructor() {
		super();
		GameInfo._inst = this;

	}
	
	onAwake(){
	}
	onEnable(){
	}

	time:number = 30;
	showTime():void{
		// this.txt_time.text = "00:" + (this.time<10 ? "0"+this.time : this.time);
	}
	timeChange():void{
		this.showTime();
		if(this.time<=0){
			this.event(Laya.Event.END);
			return;
		}
		this.time--;
		Laya.timer.once(1000, this, this.timeChange);
	}
	clearTime():void{
		Laya.timer.clearAll(this);
	}

	
	onDisable(){
		super.onDisable();
	}
	destroy():void{
		super.destroy();
	}

	
}