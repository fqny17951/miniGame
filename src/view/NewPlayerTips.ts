import { ui } from "./../ui/layaMaxUI";
import GameData from "../core/GameData";
import GameStage from "../game/GameStage";

export default class NewPlayerTips extends ui.panels.NewPlayerTipsUI {
	private static _inst:NewPlayerTips;
	static get Inst():NewPlayerTips{
		if(NewPlayerTips._inst==null)NewPlayerTips._inst = new NewPlayerTips();
		return NewPlayerTips._inst;
	}

    constructor() {
		super();
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
		
	}
	onAwake(){
		
	}
	onEnable(){
		this.on(Laya.Event.MOUSE_DOWN, this, ()=>{
			this.close();
			this.offAll(Laya.Event.MOUSE_DOWN);
		});
	}
	popup():void{
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
		
		Laya.timer.once(300, this, ()=>{
			super.popup();
		});
	}
	jumpHandler:Laya.Handler;
	close():void{
		super.close();

		if(this.jumpHandler){
			this.jumpHandler.run();
			this.jumpHandler=null;
				}		// GameStage.Inst.playGame();
		// Laya.timer.once(500, this, ()=>{
		// 	GameStage.Inst.playGame();
		// });
	}
}