import { ui } from "./../ui/layaMaxUI";
import GameData from "../core/GameData";
import GameStage from "../game/GameStage";
import BaseConfig from "../core/BaseConfig";
import GameView from "../view/GameView";
import BannerScr from "../platforms/BannerScr";

export default class JumpPageMain extends ui.ads.JumpPageMainUI {
	private static _inst:JumpPageMain;
	static get Inst():JumpPageMain{
		if(JumpPageMain._inst==null)JumpPageMain._inst = new JumpPageMain();
		return JumpPageMain._inst;
	}

    constructor() {
		super();
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
	}
	onAwake(){
		this.btn_close.on(Laya.Event.CLICK, this, ()=>{
			this.close();
		});

	}
	onEnable(){
	}
	onDisable(){
	}
	
	popup():void{
		if(GameData.Inst.platform.id != BaseConfig.pid_wx){
			this.visible = false;
			return
		}
		if(GameView.Inst.box_bottom.visible){
			GameView.Inst.event(Laya.Event.START);
		}
		let id:string = "1003";//this.name;
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

		if(this.list_ad.array.length<=0)return;
		Laya.timer.once(500, this, ()=>{
			this.width = Laya.stage.width;
			this.height = Laya.stage.height;
			this.list_ad.refresh();
			super.popup();
		});
		
	}
	close():void{
		super.close();
		Laya.timer.clearAll(this);
		if(GameView.Inst.box_bottom.visible){
			GameView.Inst.event(Laya.Event.CHANGE);
		}
		
	}
}