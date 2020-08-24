import { ui } from "./../ui/layaMaxUI";
import ShiYong from "../view/ShiYong";
import GameStage from "../game/GameStage";
import GameData from "../core/GameData";
import BoxGameListScr from "../platforms/BoxGameListScr";

export default class EggStartPanel extends ui.panels.EggStartUI {
	private static _inst: EggStartPanel;
	static get Inst(): EggStartPanel {
		if (EggStartPanel._inst == null) EggStartPanel._inst = new EggStartPanel();
		return EggStartPanel._inst;
	}

	constructor() {
		super();
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
	}
	clickTime: number = 0;
	isShowVAD: boolean = false;
	zhuantai: number = 0;
	judgeswitch(zhuantai: number): boolean {
		switch (zhuantai) {
			case 1:
				if (GameData.Inst.platform.gameSwitch.video_display1 == 3 || (GameData.Inst.platform.gameSwitch.video_display1 == 1)) return true;
				else return false;
			case 2:
				if (GameData.Inst.platform.gameSwitch.video_display2 == 3 || (GameData.Inst.platform.gameSwitch.video_display2 == 1)) return true;
				else return false;
			case 3:
				if (GameData.Inst.platform.gameSwitch.video_display3 == 3 || (GameData.Inst.platform.gameSwitch.video_display3 == 1)) return true;
				else return false;
			case 4:
				if (GameData.Inst.platform.gameSwitch.video_display4 == 3 || (GameData.Inst.platform.gameSwitch.video_display4 == 1)) return true;
				else return false;


		}

		return false;
	}

	onAwake() {
		this.btn_get.on(Laya.Event.CLICK, this, () => {
			if (this.currPoint >= 10) return;

			if (!this.isShowVAD && Laya.Browser.now() - this.clickTime <= 1500) {
				this.isShowVAD = true;
				if (this.judgeswitch(this.zhuantai)) {
					GameData.Inst.platform.videoAD(Laya.Handler.create(this, () => {

					}), Laya.Handler.create(this, () => {

					}), 8);
				}
			}
			this.clickTime = Laya.Browser.now();

			Laya.Tween.clearAll(this.img_jindu);
			this.currPoint++;

			if (this.currPoint > 5) this.currPoint = 5;
			this.updateJindu();
			this.egg.scale(0.8, 0.8);
			// //this.img_chuizi.rotation = -20; 
			Laya.timer.once(100, this, ()=>{
				 this.egg.scale(1.0, 1.0);
				// this.img_chuizi.rotation = 30; 
			})

			Laya.timer.clear(this, this.updateZore);
			if (this.currPoint > 0 && this.currPoint < 5) {
				Laya.timer.loop(500, this, this.pointzoom);
				Laya.timer.loop(500, this, this.updateZore);
			}

			if (this.currPoint >= 10) {
				// this.close();
			}
		});


	}
	pointzoom(): void {
		Laya.Tween.to(this.btn_get, { scaleX: 0.8, scaleY: 0.8 }, 250);
		Laya.timer.once(250, this, () => {

			Laya.Tween.to(this.btn_get, { scaleX: 1.0, scaleY: 1.0 }, 250);
		});
	}

	updateZore(): void {
		this.currPoint--;
		if (this.currPoint < 0) {
			this.currPoint = 0;
		}
		this.updateJindu();
	}
	updateJindu(): void {
		if (!this.isShowBanner && this.currPoint == this.isShowIndex) {
			this.isShowBanner = true;
			(this.getComponent(BoxGameListScr) as BoxGameListScr).showBanner();

			Laya.timer.once(1500, this, () => {
				this.close();
			});
		}
		Laya.Tween.to(this.img_jindu, { width: this.currPoint * this.widthLen / 10 }, 200);
	}

	cent: number = 100;
	isShowBanner: boolean = false;
	widthLen: number = 421;
	currPoint: number = 0;
	isShowIndex: number = 5;
	onEnable() {
		this.currPoint = 0;
		this.img_jindu.width = 0;
		this.txt_msg.text = `砸开金蛋获得${this.cent}金币`;

	}

	jumpHandler: Laya.Handler;
	popup(): void {
		this.width = Laya.stage.width;
		this.height = Laya.stage.height;
		this.isShowVAD = false;
		this.clickTime = 0;
		Laya.timer.once(300, this, () => {
			this.isShowBanner = false;
			this.isShowIndex = 5;
			super.popup();
			Laya.timer.loop(500, this, this.pointzoom);
		});

	}

	close(): void {
		super.close();
		Laya.timer.clearAll(this);
		// GameWinVideo.Inst.popup();
		if (this.jumpHandler) this.jumpHandler.run();

		Laya.Tween.clearAll(this.img_jindu);
	
		GameData.Inst.addCent(this.cent);
	}
}