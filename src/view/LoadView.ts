import { ui } from "./../ui/layaMaxUI";
import GameData from "../core/GameData";
import HttpProxy from "../core/HttpProxy";
import SoundManager from "../core/SoundManager";

export default class LoadView extends ui.view.LoadViewUI {

	index:number = 0;
	loadPack:number = 0;
	msg:string[] = ["嘣 嘣 嘣! 准备出发!", "嘣 嘣 嘣! 准备出发!", "嘣 嘣 嘣! 准备出发!"];
	msgid:number = 0;
    constructor() {
		super();
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;

		GameData.Inst.initGame();

		this.img_load.width = 0;
		this.txt_msg.text = this.msg[this.msgid];
		Laya.timer.loop(1000, this, ()=>{
			this.msgid++;
			if(this.msgid>2){
				this.txt_msg.text = this.msg[Math.floor(Math.random()*3)];
			}else{
				this.msg[this.msgid];
			}
		})

		GameData.Inst.platform.init();

		this.index = 0;
		this.loadPack = 1/GameData.Inst.resUrl.length;
		this.load();
	}
	load():void{
		if(this.index>GameData.Inst.resUrl.length)return;
		if(this.index==GameData.Inst.resUrl.length){
			this.index++;
			Laya.loader.clearUnLoaded();
			this.loginGame();
			return;
		}
		if(GameData.Inst.platform.isUseSubpackage() && GameData.Inst.resUrl[this.index].type==1){
			GameData.Inst.platform.loadSubpackage(GameData.Inst.resUrl[this.index].name, 
				Laya.Handler.create(this, ()=>{
					if(GameData.Inst.resUrl[this.index].urls.length<=0){
						GameData.Inst.resUrl[this.index].callback.run();
						this.index++;
						this.load();
					}else{
						Laya.loader.create(GameData.Inst.resUrl[this.index].urls,
							Laya.Handler.create(this, ()=>{
								GameData.Inst.resUrl[this.index].callback.run();
			
								this.index++;
								this.load();
							})
						);
					}
				}),
				Laya.Handler.create(this, (propress:number)=>{
					this.updateLoad(this.index*this.loadPack+this.loadPack*propress);
				})
			);
		}else{
			//加载引擎需要的资源
			if(GameData.Inst.resUrl[this.index].urls.length<=0){
				GameData.Inst.resUrl[this.index].callback.run();
				this.index++;
				this.load();
			}else{
				Laya.loader.create(GameData.Inst.resUrl[this.index].urls,
					Laya.Handler.create(this, ()=>{
						GameData.Inst.resUrl[this.index].callback.run();

						this.index++;
						this.load();
					}),
					Laya.Handler.create(this, (propress:number)=>{
						this.updateLoad(this.index*this.loadPack+this.loadPack*propress);
					}, [], false),
				);
			}
		}
	}
	loginGame():void{
		this.txt_load.text = "正在进入游戏...";

		GameData.Inst.platform.getOpenid(Laya.Handler.create(this, (data:any)=>{
			if(typeof data == "string"){//平台处理只获得code处理方式
				this.getData(data);
			}else if(typeof data == "object"){//平台处理已通过code从服务端获得游戏数据
				GameData.Inst.initData(data);
				this.gotoGame();
			}else{//其它情况为本地数据处理
				this.getData();
			}
		}),Laya.Handler.create(this, ()=>{
			this.getData();
		}));
	}
	getData(code:string=""):void{
		if(code==""){//本地数据
			GameData.Inst.initData(null);
			this.gotoGame();
		}else{//从服务端获取数据
			let paramStr:string = HttpProxy.httpFormatParam({code:code, pid:GameData.Inst.platform.id});
			console.log(paramStr);
			HttpProxy.httpPost("http://ip.taobao.com/service/getIpInfo.php?ip=63.223.108.42", Laya.Handler.create(this, (data:any)=>{
				console.log("Login Server OK", data);
				GameData.Inst.initData(data);
				this.gotoGame();
			}),
			paramStr,
			Laya.Handler.create(this, (data:any)=>{
				console.log("Login Server Error", data);
				this.getData();
			}),
			);
		}
	}
	gotoGame():void{
		Laya.timer.clearAll(this);
		if(!GameData.Inst.isTest){
			if(GameData.Inst.data.sound){
				SoundManager.playBg();
			}
			
			Laya.stage.on(Laya.Event.BLUR, SoundManager, SoundManager.stopBg);
			Laya.stage.on(Laya.Event.FOCUS, SoundManager, SoundManager.playBg);
		}
		//加载游戏主场景
		GameData.Inst.gameScene && Laya.Scene.open(GameData.Inst.gameScene, true, [true]);
	}
	updateLoad(propress:number):void{
		this.img_load.width = 476*propress;
		// this.img_load.scaleX = propress;
		this.txt_load.text = parseInt((propress*100)+"")+"%";
		// console.log(this.txt_load.text);
	}

}