import { ui } from "./../ui/layaMaxUI";

export default class SystemTips{
	private static _inst:SystemTips;
	static get Inst():SystemTips{
		if(SystemTips._inst==null)SystemTips._inst = new SystemTips();
		return SystemTips._inst;
	}

    constructor() {
	}
	showMsg(msg:string):void{
		let tips:ui.panels.SystemTipsUI = new ui.panels.SystemTipsUI();
		tips.width = Laya.stage.width;
		tips.height = Laya.stage.height;
		tips.onAwake = ()=>{tips.txt_msg.text = msg;};
		tips.show();
		Laya.timer.once(1000, this, ()=>{
			tips.closeEffect = null;
			tips.close();
		});
	}
}