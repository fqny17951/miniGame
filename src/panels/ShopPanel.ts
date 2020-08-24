import { ui } from "./../ui/layaMaxUI";
import GameData from "../core/GameData";
import JSONManager from "../core/JSONManager";
import ResManager from "../core/ResManager";
import GameView from "../view/GameView";
import TaskPanel from "./TaskPanel";
import BaseConfig from "../core/BaseConfig";
import BannerScr from "../platforms/BannerScr";
import ShopTips from "./ShopTips";

export default class ShopPanel extends ui.panels.ShopUI {
	private static _inst:ShopPanel;
	static get Inst():ShopPanel{
		if(ShopPanel._inst==null)ShopPanel._inst = new ShopPanel();
		return ShopPanel._inst;
	}
	//centListPanel:ui.panels.ShopTipsUI;
    constructor() {
		super();
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
	}
	onAwake(){
	//	this.centListPanel = new ui.panels.ShopTipsUI();
		// this.centListPanel.onEnable = ()=>{
		// 	//var bannerState=0;
		// 	this.centListPanel.bannerState=0;

		// }
		// this.centListPanel.onAwake = ()=>{
		
		// }
		
		this.btn_close.on(Laya.Event.CLICK, this, ()=>{
			this.close();
		});
		
		//下方按钮处理
		this.btn_use.on(Laya.Event.CLICK, this, ()=>{
			console.log("btn_use index : ", this.list_item.selectedItem);

			this.useSkin();
			
			this.showModel();

			this.list_item.refresh();
		});
		this.btn_buy.on(Laya.Event.CLICK, this, ()=>{
			console.log("btn_buy index : ", this.list_item.selectedItem);
			if(GameData.Inst.checkCent(this.list_item.selectedItem.coin)){
				GameData.Inst.data.skin.push(this.list_item.selectedItem.id);
				this.useSkin();

				this.list_item.refresh();
				GameData.Inst.addCent(-this.list_item.selectedItem.coin);
			}else{
				ShopTips.Inst.popup();
			}
		});
		this.btn_video.on(Laya.Event.CLICK, this, ()=>{
			console.log("btn_video index : ", this.list_item.selectedItem);
			GameData.Inst.platform.videoAD(Laya.Handler.create(this, ()=>{
				if(GameData.Inst.data.skinVideo[this.list_item.selectedItem.id]==null)GameData.Inst.data.skinVideo[this.list_item.selectedItem.id]=0;
				GameData.Inst.data.skinVideo[this.list_item.selectedItem.id]+=1;

				if(this.list_item.selectedItem.video<=GameData.Inst.data.skinVideo[this.list_item.selectedItem.id]){
					GameData.Inst.data.skin.push(this.list_item.selectedItem.id);
					this.useSkin();
				}
				this.list_item.refresh();
			}), Laya.Handler.create(this, ()=>{

			}), 2)
			
			
		});

		//列表处理
		this.list_item.selectEnable = true;
		this.list_item.on(Laya.Event.CLICK, this, (event:Laya.Event)=>{
			if(event.target instanceof Laya.Button){
				// console.log("list select index : ", this.list_item.selectedIndex);
				this.selectID = this.list_item.selectedIndex;//this.list_item.selectedItem.id;
				this.list_item.refresh();
			}
		})
		this.list_item.renderHandler = Laya.Handler.create(this, (cell:ui.items.ShopItemUI, index:number)=>{
			let data:any = cell.dataSource;
			
			// console.log("cell index : ", index);data.id==GameData.Inst.data.skinFaxing || 
			/*if(data.id==GameData.Inst.data.skinYifu){//当前使用
				cell.img_show.visible = true;
				cell.img_lock.visible = false;

				cell.img_use.visible = true;
				cell.img_select.visible = false;
				if(this.list_item.selectedIndex==index){
					this.btn_use.visible = false;
					this.btn_used.visible = true;
					this.btn_buy.visible = false;
					this.btn_video.visible = false;
				}
			}else */
			if(GameData.Inst.data.skin.indexOf(data.id)!=-1){//已解锁
				cell.img_show.visible = true;
				cell.img_lock.visible = false;

				cell.img_use.visible = false;
				if(this.list_item.selectedIndex==index){
					this.btn_use.visible = true;
					this.btn_used.visible = false;
					this.btn_buy.visible = false;
					this.btn_video.visible = false;
				}
			}else{//未解锁
				cell.img_show.visible = true;
				cell.img_lock.visible = true;
				
				cell.img_use.visible = false;
				cell.img_select.visible = false;
				if(this.list_item.selectedIndex==index){
					this.btn_use.visible = false;
					this.btn_used.visible = false;
					this.btn_buy.visible = data.coin>0;
					this.txt_buy_cent.value = data.coin;
					this.btn_video.visible = data.video>0;
					if(GameData.Inst.data.skinVideo[data.id]==null)GameData.Inst.data.skinVideo[data.id]=0;
					this.txt_video_num.value = GameData.Inst.data.skinVideo[data.id]+"/"+data.video;
					if(this.btn_buy.visible && this.btn_video.visible){
						this.btn_buy.x = 198;
						this.btn_video.x = 552;
					}else{
						if(this.btn_buy.visible)this.btn_buy.x = this.btn_use.x;
						if(this.btn_video.visible)this.btn_video.x = this.btn_use.x;
					}
				}
			}
			// let icon:string = JSONManager.getItemByID(data.id, JSONManager.shop).icon;
			cell.img_icon.skin = "shop/"+data.icon;
			
			cell.img_use.visible = false;
			this.btn_use.visible = false;

			cell.img_select.visible = index==this.selectID;
			if(cell.img_select.visible){
				this.img_show.skin = "shop/"+data.model;
			}

			if(cell.img_select.visible){
				this.showSelectModel(data);
			}
		}, [], false);

		//更新金币
		Laya.stage.on(Laya.Event.CHANGE, this, ()=>{
			this.txt_cent.text = ""+GameData.Inst.data.cent;
		});

	}
	useSkin():void{
		GameData.Inst.data.skinYifu = this.list_item.selectedItem.id;
		GameData.Inst.getData();
	}

	
	selectID:number = -1
	onEnable(){
		this.selectID = -1;
		this.skinData = [];
		for(let i:number=0; i<JSONManager.shop.length; i++){
			// if(JSONManager.shop[i].type==2)
			{
				if(GameData.Inst.data.skinYifu==JSONManager.shop[i].id)this.selectID = this.skinData.length;
				this.skinData.push(JSONManager.shop[i]);
			}
		}
		
		this.txt_cent.text = ""+GameData.Inst.data.cent;

		this.btn_use.visible = false;
		this.btn_used.visible = false;
		this.btn_buy.visible = false;
		this.btn_video.visible = false;

		this.list_item.array = this.skinData;
		this.list_item.selectedIndex = this.selectID;
		// this.showModel();
	}
	popup():void{
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
			// if(GameData.Inst.platform.getSwitch(1)){
			// 	this.btn_close.visible=false;
			// 	Laya.timer.once(3000,this,()=>{
			// 		this.btn_close.visible=true;


			// 	});



			// }


		}
	//	super.popup();
	}
	showSelectModel(data:any):void{
		this.useSkinID = data.id;
		this.showModel();
	}
	skinData:any[];
	useSkinID:number;
	showModel():void{
		this.useSkinID

	}

	close():void{
		super.close();
		if(GameData.Inst.platform.id==BaseConfig.pid_oppo)GameData.Inst.platform.interADPanel.close();
		this.event(Laya.Event.CHANGE);
		//this.event(Laya.Event.CHANGE);
		GameView.Inst.showInterAD();
		if(GameData.Inst.platform.id!=BaseConfig.pid_vivo)	GameView.Inst.event(Laya.Event.CHANGE);
				TaskPanel.Inst.event(Laya.Event.CHANGE);
	}
}