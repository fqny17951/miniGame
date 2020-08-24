import { ui } from "./../ui/layaMaxUI";
import GameData from "../core/GameData";
import JSONManager from "../core/JSONManager";
import Switch_delay_display from "../platforms/Switch_delay_display";

export default class BoxPanel extends ui.panels.BoxUI {
	private static _inst:BoxPanel;
	static get Inst():BoxPanel{
		if(BoxPanel._inst==null)BoxPanel._inst = new BoxPanel();
		return BoxPanel._inst;
	}

    constructor() {
		super();
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
	}
	switchCount: number = 0;
	onAwake(){
		this.btn_get.on(Laya.Event.CLICK, this, ()=>{
			GameData.Inst.platform.videoAD(Laya.Handler.create(this, ()=>{
				this.isGeted = true;
				this.initKey();
				this.box_key.visible = true;

				this.btn_get.visible = false;
				this.btn_close.visible = false;
				
				this.btn_gotoGame.visible = false;
				
			}), Laya.Handler.create(this, ()=>{

			}), 8)
		});
		this.btn_gotoGame.on(Laya.Event.CLICK, this, ()=>{
			this.close();
			GameData.Inst.data.key-=3;
			GameData.Inst.addCent(this.conutCent);
		});
		this.btn_close.on(Laya.Event.CLICK, this, ()=>{
			this.close();
			GameData.Inst.data.key-=3;
			GameData.Inst.addCent(this.conutCent);
		});

		

		this.on(Laya.Event.CLICK, this, (event:Laya.Event)=>{
			//if(this.keyCount<=0)return;
			if(event.target.parent instanceof ui.items.BoxItemUI){
				let boxItem:ui.items.BoxItemUI = event.target.parent;
				if(boxItem.img_video.visible){
					GameData.Inst.platform.videoAD(Laya.Handler.create(this, ()=>{
						this.openBoxStart(boxItem);
					}), Laya.Handler.create(this, ()=>{
		
					}), 8)
				}else if(this.keyCount>0){
					this.openBoxStart(boxItem);
				}
				
			}
		});
	}
	openBoxStart(boxItem:ui.items.BoxItemUI):void{
		if(!boxItem.img_video.visible){
			this.keyCount--;
			this['img_key_'+this.keyCount].disabled = true;
		}
		
		this.openBox(boxItem);
		if(this.keyCount<=0){
			// GameData.Inst.data.key-=3;
			// GameData.Inst.getData();
			
			this.box_key.visible = false;
			if(boxItem.img_video.visible)return;
			if(this.isGeted){
				this.btn_get.visible = false;
				this.btn_close.visible = false;
				this.btn_gotoGame.visible = true;
			}else{
				this.btn_get.visible = true;
				this.btn_close.visible = true;
				(this.btn_close.getComponent(Switch_delay_display) as Switch_delay_display).run();
			}
		}
	}
	openBox(boxItem:ui.items.BoxItemUI):void{
		boxItem.mouseEnabled = false;
		boxItem.btn_open.visible = false;
		let cent:number = Math.ceil(this.jsonData["box"+this.openIndex]*this.baseCent);
		boxItem.txt_cent.text = ""+cent;
		
		GameData.Inst.data.taskType3Box++;
		this.conutCent+=cent;
		/*
		if(cent>this.bestCent){
			this.ui_best_box.btn_open.visible = false;
			this.bestCent = cent;
			this.ui_best_box.txt_cent.text = ""+this.bestCent;
		}
		*/

		this.openIndex++;
	}
	conutCent:number=0;
	baseCent:number=10;
	
	keyCount:number=3;
	boxCount:number=9;
	openIndex:number=1;

	bestCent:number=0;
	jsonData:any;
	isGeted:boolean = false;
	onEnable(){
		this.box_key.visible = true;

		this.btn_get.visible = false;
		this.btn_close.visible = false;

		this.btn_gotoGame.visible = false;
		
		this.baseCent = 1;//GameData.Inst.levelItem.basicReward;
		this.conutCent = 0;
		this.bestCent = 0;
		this.openIndex = 1;
		this.jsonData = this.getRandBox();
		

		let videoADList:number[] = [];
		let videoADListTmp:number[] = [];
		for(let i:number=0; i<this.boxCount; i++){
			videoADListTmp.push(i);
		}
		videoADList.push(videoADListTmp.splice(Math.floor(Math.random()*videoADListTmp.length),1)[0]);
		videoADList.push(videoADListTmp.splice(Math.floor(Math.random()*videoADListTmp.length),1)[0]);
		videoADList.push(videoADListTmp.splice(Math.floor(Math.random()*videoADListTmp.length),1)[0]);

		for(let i:number=0; i<this.boxCount; i++){
			this['ui_box_'+i].mouseEnabled = true;
			this['ui_box_'+i].btn_open.visible = true;
			this['ui_box_'+i].img_video.visible = (videoADList.indexOf(i)!=-1);

			if(this.bestCent<this.jsonData["box"+(i+1)]){
				this.bestCent = this.jsonData["box"+(i+1)];
			}
		}

		this.keyCount = 3;
		for(let i:number=0; i<this.keyCount; i++){
			this['img_key_'+i].disabled = false;
		}
		this.isGeted = false;
		this.initKey();
	}
	initKey():void{
		this.keyCount = 3;
		for(let i:number=0; i<this.keyCount; i++){
			this['img_key_'+i].disabled = false;
		}
	}
	getRandBox():any{
		let data:any = JSONManager.box[0];
		let rand:number = Math.random();
		for(let i:number=0; i<JSONManager.box.length; i++){
			if(rand<=JSONManager.box[i].rate){
				data = JSONManager.box[i];
				break;
			}
		}
		return data;
	}
	
	popup():void{
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;

		
		Laya.timer.once(300, this, ()=>{
			super.popup();
		});
	}
	closeCallback:Laya.Handler;
	close():void{
		super.close();
		if(this.closeCallback)this.closeCallback.run();
	}
}