import GameData from "../core/GameData";
import { ui } from "../ui/layaMaxUI";
import BaseConfig from "../core/BaseConfig";
import JumpPage2 from "./JumpPage2";
/**
 * 结算界面，脚本绑定List上
 */
export default class ADSList extends Laya.Script {
       /** @prop {name: showType, tips:"是否弹出",type:number, default:0} */
       showType:number = 0;
    list_ad:Laya.List;
    constructor(){
        super();
    }
    clickList:string[] = [];
    onAwake(){
        if(GameData.Inst.platform.id==BaseConfig.pid_dy&&GameData.Inst.platform.proxy.getSystemInfoSync().platform == "ios"){
            this.list_ad = this.owner as Laya.List;
            this.list_ad.visible=false;
            return;

        }
        if(GameData.Inst.platform.id==BaseConfig.pid_vivo)return;
        this.list_ad = this.owner as Laya.List;

        this.list_ad.selectEnable = true;
		this.list_ad.selectHandler = Laya.Handler.create(this, (index:number)=>{
			if(index>=0){
				let data:any=this.list_ad.selectedItem;
                let gameList:any[] = [];
                if(this.clickList.indexOf(data.appid)==-1){
                    this.clickList.push(data.appid);
                }else{
                    for(let i:number=0; i<this.list_ad.length; i++){
                        if(this.clickList.indexOf(this.list_ad.array[i].appid)==-1){
                            data = this.list_ad.array[i];
                            this.clickList.push(this.list_ad.array[i].appid);
                            break;
                        }
                        if(i==this.list_ad.array.length-1) this.clickList=[];
                    }
                }
				// gameList[0] = {appId:data.appid, query:data.toLinks, pkgname:data.pkgname, posid:"1002"};
				gameList[0] = {appId:data.appid, query:data.toLinks, pkgname:data.pkgname, posid:data.id};
				GameData.Inst.platform.openApp(gameList,Laya.Handler.create(this,()=>{
                    if(this.showType==1)JumpPage2.Inst.popup();


                })
                
                );
				console.log("GameList", gameList[0]);
				this.list_ad.selectedIndex = -1;
			}
        }, [], false);
        
        this.list_ad.renderHandler = Laya.Handler.create(this, (cell:any, index:number)=>{
			let data:any = cell.dataSource;
			if(cell.img_icon)cell.img_icon.skin = data.param;
			if(cell.txt_name)cell.txt_name.text = (data.name+"").replace("dy","");
		}, [], false);
    }
	isBack:boolean = false;
	onDisable(){
		Laya.timer.clearAll(this);
	}
    onEnable(){
        if(GameData.Inst.platform.id==BaseConfig.pid_dy&&GameData.Inst.platform.proxy.getSystemInfoSync().platform == "ios"){
            this.list_ad = this.owner as Laya.List;
            this.list_ad.visible=false;
            return;

        }
        if(GameData.Inst.platform.id==BaseConfig.pid_vivo)return;
		this.list_ad.scrollTo(0);
        this.isBack = false;
        
        Laya.timer.loop(1000/60, this, ()=>{
            if(this.list_ad.scrollBar.value<=0){
                this.isBack = false;
            }else if(this.list_ad.scrollBar.value>=this.list_ad.scrollBar.max-10){
                this.isBack = true;
            }
            if(this.isBack){
                this.list_ad.scrollBar.value-=3;
            }else{
                this.list_ad.scrollBar.value+=3;
            }
        });
    }

}