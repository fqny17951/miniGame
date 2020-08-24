import { ui } from "./../ui/layaMaxUI";
import GameData from "../core/GameData";
import JSONManager from "../core/JSONManager";
import Switch_default_check from "../platforms/Switch_default_check";
import SystemTips from "./SystemTips";
import GameView from "../view/GameView";
import BaseConfig from "../core/BaseConfig";
import GetCentPanel from "./GetCentPanel";


/**
 * 签到
 */
export default class TaskPanel extends ui.panels.TaskUI {
	private static _inst:TaskPanel;
	static get Inst():TaskPanel{
		if(TaskPanel._inst==null)TaskPanel._inst = new TaskPanel();
		return TaskPanel._inst;
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

		this.btn_get.on(Laya.Event.CLICK, this, ()=>{
			//获得皮肤
			if(this.taskList[this.index].rewardType==2){
				GameData.Inst.data.skin.push(this.skinID);
				// GameData.Inst.getData();
				SystemTips.Inst.showMsg("获得一个皮肤")
				this.getCent(0);
				return;
			}

			//获得金币
			if(this.img_selected.visible){
				GameData.Inst.platform.videoAD(Laya.Handler.create(this, ()=>{
					if(GameData.Inst.platform.id==BaseConfig.pid_dy){
						GetCentPanel.Inst.isdouble=1;
						GetCentPanel.Inst.getCent=this.taskList[this.index].rewardNum*2;
						GetCentPanel.Inst.popup();
						let itemUI:ui.items.TaskItemUI = this['ui_task_'+this.index];
						itemUI.spr_item.alpha = 0.5;
						itemUI.spr_geted.visible = true;					
						GameData.Inst.data.qiaoDao+=1;
						GameData.Inst.data.qiaoDaoTag=1;	
						this.btn_geted.visible =  GameData.Inst.data.qiaoDaoTag==1;
						this.btn_get.visible = !this.btn_geted.visible;
						this.box_select.visible = this.btn_get.visible;
				
					}
					else 
					this.getCent(2);
				}), Laya.Handler.create(this, ()=>{

				}))
			}else{
				if(GameData.Inst.platform.id==BaseConfig.pid_dy){
					GetCentPanel.Inst.getCent=this.taskList[this.index].rewardNum;
					GetCentPanel.Inst.isdouble=1;
					GetCentPanel.Inst.popup();
					let itemUI:ui.items.TaskItemUI = this['ui_task_'+this.index];
					itemUI.spr_item.alpha = 0.5;
					itemUI.spr_geted.visible = true;					
					GameData.Inst.data.qiaoDao+=1;
					GameData.Inst.data.qiaoDaoTag=1;	
					this.btn_geted.visible =  GameData.Inst.data.qiaoDaoTag==1;
					this.btn_get.visible = !this.btn_geted.visible;
					this.box_select.visible = this.btn_get.visible;
				
				}
			else 	this.getCent(1);
			}
		});
	}
	getCent(rate:number=1):void{
		let itemUI:ui.items.TaskItemUI = this['ui_task_'+this.index];
		itemUI.spr_item.alpha = 0.5;
		itemUI.spr_geted.visible = true;
		
		GameData.Inst.data.qiaoDao+=1;
		GameData.Inst.data.qiaoDaoTag=1;
		if(this.taskList[this.index].rewardType==2){

		}else{
			GameData.Inst.addCent(this.taskList[this.index].rewardNum*rate);
		}
		
		this.btn_geted.visible =  GameData.Inst.data.qiaoDaoTag==1;
		this.btn_get.visible = !this.btn_geted.visible;
		this.box_select.visible = this.btn_get.visible;
	}
	taskList:any[];
	index:number;
	skinID:number = -1;
	Checkornot:boolean=true;
	onEnable(){
		this.img_selected.visible=false;
		this.Checkornot=false;
	


		if(GameData.Inst.data.qiaoDao<7){
			this.taskList = JSONManager.task.slice(0,7);
		}else{
			this.taskList = JSONManager.task.slice(7,14);
		}

		this.index = GameData.Inst.data.qiaoDao%7;
		this.btn_geted.visible =  GameData.Inst.data.qiaoDaoTag==1;
		this.btn_get.visible = !this.btn_geted.visible;
		this.box_select.visible = this.btn_get.visible;
		
		let dayName:string[] = ["一", "二", "三", "四", "五", "六", "七"];
		for(let i:number=0; i<7; i++){
			let itemUI:ui.items.TaskItemUI = this['ui_task_'+i];
			itemUI.spr_curr.visible = i==this.index;
			if(i<=5)itemUI.txt_desc.text = "第"+dayName[i]+"天";
			if(this.taskList[i].rewardType==2){
				let skinItem:any = GameData.Inst.getSkinData();
				if(skinItem==null){
					this.taskList[i].rewardType==1;
					this.taskList[i].icon = "jinbi_2.png";
				}else{
					this.skinID = skinItem.id;
					itemUI.txt_cent.text = "景点";
				}
			}
			if(this.taskList[i].rewardType==1){
				itemUI.txt_cent.text = ""+this.taskList[i].text;
			}
			itemUI.img_icon.skin = "task/"+this.taskList[i].icon;

			if(i==this.index && this.taskList[i].rewardType==2){
				this.box_select.visible = false;
			}
			
			if(i<this.index){
				itemUI.spr_item.alpha = 0.5;
				itemUI.spr_geted.visible = true;
			}else{
				itemUI.spr_item.alpha = 1;
				itemUI.spr_geted.visible = false;
			}
		}
	}
	popup():void{
		this.btn_select.on(Laya.Event.CLICK, this, ()=>{
			console.log("点击事件");
		
			   this.img_selected.visible=!this.img_selected.visible;
	   
		
		   });
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
	if(GameData.Inst.platform.id!=BaseConfig.pid_vivo)	GameView.Inst.event(Laya.Event.START);
		Laya.timer.once(300, this, ()=>{
			super.popup();
		});
	if(GameData.Inst.platform.id==BaseConfig.pid_oppo){
		GameData.Inst.platform.bannerADObj.hide();
		GameData.Inst.platform.InterAD(null);

	}

	if(GameData.Inst.platform.id==BaseConfig.pid_dy){
		this.btn_close.visible=false;
		if(GameData.Inst.platform.getSwitch(1)){
			Laya.timer.once(3000,this,()=>{
				this.btn_close.visible=true;

			})

		}else 	this.btn_close.visible=true;

	}
	}
	close():void{
		super.close();
		GameView.Inst.showInterAD();
		if(GameData.Inst.platform.id==BaseConfig.pid_oppo)GameData.Inst.platform.interADPanel.close();
		if(GameData.Inst.platform.id!=BaseConfig.pid_vivo)	GameView.Inst.event(Laya.Event.CHANGE);
		this.event(Laya.Event.CHANGE);
		this.btn_select.offAll();
		
	}
}