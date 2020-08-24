import GameData from "../core/GameData";
import { ui } from "../ui/layaMaxUI";
import BaseConfig from "../core/BaseConfig";
/**
 * 结算界面，脚本绑定List上
 */
export default class GameList extends Laya.Script {
    list:Laya.List;
    bg:Laya.Sprite;
    constructor(){
        super();
    }
    
    appBox:any;

    data:any;
    posid:string ="1002";
    onAwake(){
        if(GameData.Inst.platform.id==BaseConfig.pid_dy&&GameData.Inst.platform.proxy.getSystemInfoSync().platform == "ios"){
            this.list = this.owner as Laya.List;
            this.bg = this.list.getChildByName("bg") as Laya.Sprite;
        
            this.bg.visible=true;
            this.list.visible=false;
                }
        this.list = this.owner as Laya.List;
        this.bg = this.list.getChildByName("bg") as Laya.Sprite;
        if(this.bg){
            this.bg.on(Laya.Event.CLICK, this, (event:Laya.Event)=>{
                console.log("GameList bg", event);
                if(GameData.Inst.platform.id==BaseConfig.pid_qq){
                    if(!GameData.Inst.platform.getSwitch(13))return;

                    if(this.appBox)this.appBox.destroy();
                    this.appBox = GameData.Inst.platform.proxy.createAppBox({adUnitId:"9f928d9c98d3da353c1e9836a4adbf72"});
                    this.appBox.onClose(()=>{
                        this.appBox.destroy();
                        this.appBox=null;
                    });
                    this.appBox.load().then(() => {
                        console.log("AppBox 显示成功");
                        this.appBox.show();
                    })
                }
            });
        }

        this.list.selectEnable = true;
        this.list.selectHandler = Laya.Handler.create(this, (index:number)=>{
            if(index>=0){
                let data:any=this.list.selectedItem;
                let gameList:any[] = [];


                if(this.clickList.indexOf(data.appid)==-1){
                    this.clickList.push(data.appid);
                }else{
                    for(let i:number=0; i<this.data.length; i++){
                        if(this.clickList.indexOf(data.appid)==-1){
                            data = this.data[i];
                            break;
                        }
                        if(i==this.data.length-1) this.clickList=[];
                    }
                }
               
                gameList[0] = {appId:data.appid, query:data.toLinks, pkgname:data.pkgname, posid:data.id};
                GameData.Inst.platform.openApp(gameList, null);
                console.log("GameList", gameList[0]);
                this.list.selectedIndex = -1;
            }
            
        }, [], false);

        this.list.renderHandler = Laya.Handler.create(this, (cell:ui.items.GameADItemUI, index:number)=>{
            let data:any = cell.dataSource;
            cell.img_icon.skin = data.param;
            cell.txt_name.text = (data.name+"").replace("dy","");
        }, [], false);

    }

    clickList:string[] = [];
	isBack:boolean = false;
    
	onDisable(){
		Laya.timer.clearAll(this);
	}
    
    onEnable(){

        this.clickList=[];
        if(GameData.Inst.platform.id==BaseConfig.pid_wx){
            this.bg.visible=false;
            this.list.visible=true;
        }else if(GameData.Inst.platform.id==BaseConfig.pid_oppo){
            if(GameData.Inst.platform.getSwitch(4)){
            this.bg.visible=false;
            this.list.visible=true;
            }else {
                this.bg.visible=true;
                this.list.visible=false;
                return;
            }
        }  else if(GameData.Inst.platform.id==BaseConfig.pid_dy){
            this.bg.visible=false;
            this.list.visible=true;
if(GameData.Inst.platform.id==BaseConfig.pid_dy&&GameData.Inst.platform.proxy.getSystemInfoSync().platform == "ios"){
    this.bg.visible=true;
    this.list.visible=false;
        }

        } 
        else {
            if(this.bg)this.bg.visible = true;
            if(!GameData.Inst.platform.getSwitch(4)){
                this.list.array = [];
                return;
            }
        }
        if(GameData.Inst.platform.gameList && GameData.Inst.platform.gameList.length>0){
            if(this.data==null){
                let list:any[] = []
                if(GameData.Inst.platform.id==BaseConfig.pid_wx){
                    this.data = GameData.Inst.platform.getGameList("1007");
                }else{
                    for(let i:number=0; i<GameData.Inst.platform.gameList.length; i++){
                        // if(GameData.Inst.platform.gameList[i].position=="1002")
                        {
                            list.push(GameData.Inst.platform.gameList[i]);
                        }
                    }
                    for(let i:number=0; i<GameData.Inst.platform.gameList.length; i++){
                        // if(GameData.Inst.platform.gameList[i].position=="1002")
                        {
                            list.push(GameData.Inst.platform.gameList[i]);
                        }
                    }
                    list = list.sort((item0, item1)=>{
                        return Math.random()?-1:1;
                    });
                    this.data = list;
                }
               
            }
            if(this.data){
                // this.list.visible = true;
                this.list.array = this.data;
                if(this.bg)this.bg.visible = false;
                if(GameData.Inst.platform.id==BaseConfig.pid_wx||GameData.Inst.platform.id==BaseConfig.pid_oppo||GameData.Inst.platform.id==BaseConfig.pid_dy){
                    this.list.scrollTo(0);
                    this.isBack = false;
                    
                    Laya.timer.loop(1000/60, this, ()=>{
                        if(this.list.scrollBar.value<=0){
                            this.isBack = false;
                        }else if(this.list.scrollBar.value>=this.list.scrollBar.max-10){
                            this.isBack = true;
                        }
                        if(this.isBack){
                            this.list.scrollBar.value-=3;
                        }else{
                            this.list.scrollBar.value+=3;
                        }
                    });
                }
            }else{
                this.list.array = [];
            }

        }else{
            this.list.array = [];
        }
    }

}