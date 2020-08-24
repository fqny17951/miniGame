import { ui } from "./../ui/layaMaxUI";
import GameData from "../core/GameData";
import GameStage from "../game/GameStage";
import BaseConfig from "../core/BaseConfig";

export default class JumpBanner extends ui.ads.JumpBannerUI {
    constructor() {
		super();
	}
	onAwake(){
	}
	
	onEnable(){
		if(GameData.Inst.platform.id != BaseConfig.pid_wx){
			this.visible = false;
			return
		}
		// this.visible = true;
		let id:string = this.name;
		if(GameData.Inst.platform.gameList && GameData.Inst.platform.gameList.length>0){
			let list:any[] = GameData.Inst.platform.getGameList(id,2);

            if(list.length>0){
				this.visible = true;
				this.list_ad.array = list;
            }else{
				this.visible = false;
                this.list_ad.array = [];
            }

        }else{
			this.visible = false;
			this.list_ad.array = [];
		}
		
	}
	onDisable(){
		this.list_ad.array = []
		this.visible = false;
		Laya.timer.clearAll(this);
	}
	
}