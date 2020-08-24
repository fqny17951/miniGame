import { ui } from "./../ui/layaMaxUI";
import GameData from "../core/GameData";
import JumpPage2 from "./JumpPage2";
import BaseConfig from "../core/BaseConfig";

export default class JumpPageGame extends ui.ads.JumpPageGameUI {
	private static _inst:JumpPageGame;
	static get Inst():JumpPageGame{
		if(JumpPageGame._inst==null)JumpPageGame._inst = new JumpPageGame();
		return JumpPageGame._inst;
	}

    constructor() {
		super();
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;


		this.btn_click.clickHandler = Laya.Handler.create(this, ()=>{
			Laya.Tween.to(this.box_list, {left:-421}, 250);
			this.btn_click.visible = false;
			this.btn_click2.visible = false;
		}, [], false);
		this.btn_click2.clickHandler = Laya.Handler.create(this, ()=>{
			Laya.Tween.to(this.box_list, {left:0}, 250);
			this.btn_click.visible = false;
			this.btn_click2.visible = false;
		}, [], false);
	}
	onAwake(){
		this.btn_close.on(Laya.Event.CLICK, this, ()=>{
			JumpPage2.Inst.popup();
			JumpPage2.Inst.callback = null;
		});
		
	}
	
	onEnable(){
		if(GameData.Inst.platform.id != BaseConfig.pid_wx){
			this.visible = false;
			return
		}
		this.box_list.visible=false;
		let id:string = "1006";//this.name;
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

		this.btn_close.visible = GameData.Inst.platform.getSwitch(0);
		this.btn_click2.clickHandler.run();
		
	}
	onDisable(){
		Laya.timer.clearAll(this);
	}

}