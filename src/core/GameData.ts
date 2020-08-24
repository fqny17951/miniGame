/**
 * 单例模式
 * 1、游戏存档数据，游戏运行过程中会修改，以便随时保存。
 * 2、记录游戏当前状态，以控制游戏
 * 3、平台对象
 * 4、资源路径配置
 */

import BasePlatform from "./BasePlatform";
import BaseConfig from "./BaseConfig";
import DYPlatform from "../platforms/DYPlatform";
import ResManager from "./ResManager";
import JSONManager from "./JSONManager";
import SoundManager from "./SoundManager";
import OPPOPlatform from "../platforms/OPPOPlatform";
import VIVOPlatform from "../platforms/VIVOPlatform";
import SystemTips from "../panels/SystemTips";
import QQPlatform from "../platforms/QQPlatform";
import WXPlatform from "../platforms/WXPlatform";

export default class GameData {
    private static _inst:GameData = null;

    static get Inst():GameData{
        if(GameData._inst==null){
            GameData._inst = new GameData();
        }
        return GameData._inst;
    }
    

    /**
     * 构造方法
     */
    constructor(){
        
    }



    ///////////游戏平台初始化/////资源路径配置//////////////////////////////////////////////////
    platform:BasePlatform = null;

    resUrl:any[] = [];
    /**
     * 初始化游戏代码，如平台、资源路径配置等
     */
    public initGame():void{
        let pid:string = BaseConfig.RunPlatformID;
        if(pid==BaseConfig.pid_qq){
            this.platform = new QQPlatform();
        }else if(pid==BaseConfig.pid_vivo){
            this.platform = new VIVOPlatform();
        }else if(pid==BaseConfig.pid_oppo){
            this.platform = new OPPOPlatform();
        }else if(pid==BaseConfig.pid_dy){
            this.platform = new DYPlatform();
        }else if(pid==BaseConfig.pid_wx){
            this.platform = new WXPlatform();
        }else{
            this.platform = new BasePlatform();
        }
        this.platform.id = pid;
        console.log("this.platform.id", pid, Laya.Browser.onPC, Laya.Browser.onQQMiniGame);

        this.resUrl[0] = {urls:[{url:"res/atlas/box.json",type:Laya.Loader.ATLAS},{url:"res/atlas/adgame.json",type:Laya.Loader.ATLAS},{url:"res/atlas/egg.json",type:Laya.Loader.ATLAS},{url:"res/atlas/task.json",type:Laya.Loader.ATLAS}, {url:"res/atlas/main.json",type:Laya.Loader.ATLAS}, {url:"res/atlas/game.json",type:Laya.Loader.ATLAS}, {url:"res/atlas/shop.json",type:Laya.Loader.ATLAS},"json/gameinit.json"], type:0, callback:Laya.Handler.create(this, ()=>{
            JSONManager.gameinit = Laya.loader.getRes("json/gameinit.json");
        })};
        this.resUrl[1] = {urls:["res3d/LayaScene_Game3D/Conventional/Game3D.ls", "res3d/LayaScene_Photo3D/Conventional/Photo3D.ls"], type:1,name:"res3d", callback:Laya.Handler.create(this, ()=>{
            ResManager.scene3dPhoto = Laya.loader.getRes("res3d/LayaScene_Photo3D/Conventional/Photo3D.ls");
            ResManager.cameraPhoto = ResManager.scene3dPhoto.getChildByName("Main Camera") as Laya.Camera;

            ResManager.scene3d = Laya.loader.getRes("res3d/LayaScene_Game3D/Conventional/Game3D.ls");
            ResManager.camera = ResManager.scene3d.getChildByName("Main Camera") as Laya.Camera;
            ResManager.light = ResManager.scene3d.getChildByName("Directional Light");
            
            ResManager.player = ResManager.scene3d.getChildByName("player") as Laya.Sprite3D;
            ResManager.scene3d.removeChild(ResManager.player);

            /*
            ResManager.road = scene3d.getChildByName("Road") as Laya.Sprite3D;
            ResManager.npc = scene3d.getChildByName("NPC") as Laya.Sprite3D;
            ResManager.eff = scene3d.getChildByName("Eff") as Laya.Sprite3D;
            ResManager.boss = scene3d.getChildByName("Boss") as Laya.Sprite3D;
            ResManager.npcPoint = scene3d.getChildByName("NPCPoint") as Laya.Sprite3D;
            ResManager.playerPoint = scene3d.getChildByName("PlayerPoint") as Laya.Sprite3D;
            ResManager.obstacle = scene3d.getChildByName("Obstacle") as Laya.Sprite3D;
            ResManager.head = scene3d.getChildByName("Skin") as Laya.Sprite3D;
            scene3d.removeChildren();
            */
        })};
        this.resUrl[2] = {urls:["json/update.json", "json/shop.json", "json/task.json","json/talk.json", "json/box.json",  "json/gamelist.json",  "json/monster.json", "json/scene.json", "json/stage.json"], type:0, callback:Laya.Handler.create(this, ()=>{
            JSONManager.grade = Laya.loader.getRes("json/update.json");
            JSONManager.shop = Laya.loader.getRes("json/shop.json");
            JSONManager.task = Laya.loader.getRes("json/task.json");
            JSONManager.talk = Laya.loader.getRes("json/talk.json");
            JSONManager.box = Laya.loader.getRes("json/box.json");
            
            JSONManager.gameList = Laya.loader.getRes("json/gamelist.json");
            GameData.Inst.platform.setGameList(JSONManager.gameList);
            
            JSONManager.monster = Laya.loader.getRes("json/monster.json");
            JSONManager.scene = Laya.loader.getRes("json/scene.json");
            JSONManager.level = Laya.loader.getRes("json/stage.json");
            
        })};
        if(GameData.Inst.platform.id!=BaseConfig.pid_vivo){
        this.resUrl[3] = {urls:[], type:1,name:"sound", callback:Laya.Handler.create(this, ()=>{
        })};
        this.resUrl[4] = {urls:[], type:1,name:"shop", callback:Laya.Handler.create(this, ()=>{
            
        })};

    }
    }
    /////////////////游戏临时数据///////////////////////////////////
    gameCentRate:number=0;

    playerNumItem:any;
    bombItem:any;
    offlineItem:any;

    sceneItem:any;
    monsterItem:any;
    levelItem:any;

    trySkinID:number=0;

    ///////////游戏存档数据/////游戏状态//////////////////////////////////////////////////////
    gameScene:string = "view/GameView.scene";
    gameID:string = "photo3d";
    isTest:boolean = false;

    checkCent(cent:number, isTips:boolean=true):boolean{
        let isMore:boolean = this.data.cent>=cent;
        if(isTips && !isMore)SystemTips.Inst.showMsg("金币不足");
        return isMore;
    }
    addCent(cent:number):number{
        cent = Math.floor(cent);
        this.data.cent+=cent;
        Laya.stage.event(Laya.Event.CHANGE);
        this.getData();
        if(cent>0){
            SystemTips.Inst.showMsg("获得金币:"+cent);
            SoundManager.playCoinn();
        }
        return this.data.cent;
    }
    updateLevel():void{
        this.data.level++;
        this.data.key++;
        this.getData();
    }
    updateLevelJSON():void{
        let id:number = GameData.Inst.data.level%JSONManager.level.length;
        if(GameData.Inst.data.level>=JSONManager.level.length)id+=1;

		this.levelItem = JSONManager.getItemByID(id, JSONManager.level);
		this.sceneItem = JSONManager.getItemByID(GameData.Inst.levelItem.sceneID, JSONManager.scene);
    }
    clearTaskLog(data:any):void{
        data.qiaoDaoTag = 0;
        /*if(data.qiaoDao>=6){
            // data.qiaoDao=0;
        }*/
    }
    getDefaultSkin():void{
        if(this.data.skin==null || this.data.skin.length<=0){
            this.data.skin = [];
            for(let i:number=0; i<JSONManager.shop.length; i++){
                if(JSONManager.shop[i].unlockType==1){
                    this.data.skin.push(JSONManager.shop[i].id);
                    if(JSONManager.shop[i].type==1){
                        this.data.skinFaxing = JSONManager.shop[i].id;
                    }else{
                        this.data.skinYifu = JSONManager.shop[i].id;
                    }
                }
            }
              
        }
    }
    getSkinData(isRand:boolean=false):any{
        let skinData:any[] = [];
		for(let i:number=0; i<JSONManager.shop.length; i++){
            if(this.data.skin.indexOf(JSONManager.shop[i].id)==-1){
                skinData.push(JSONManager.shop[i]);
            }
        }
        if(isRand){
            let index:number = Math.floor(skinData.length*Math.random());
            return skinData[index];
        }else{
            return skinData[0]
        }
    }
    getPlayerModel(skinID:number):Laya.Sprite3D{
        let id:number;
        let body:Laya.Sprite3D = ResManager.scene3d.addChild((ResManager.player.getChildAt(0).getChildAt(0) as Laya.Sprite3D).clone()) as Laya.Sprite3D;
        id = JSONManager.getItemByID(skinID, JSONManager.shop).model;
        let head:Laya.Sprite3D = (ResManager.head.getChildByName(""+id) as Laya.Sprite3D).clone() as Laya.Sprite3D;
        head.active = true;
        body.getChildByName("Bip001").getChildByName("Bip001 Pelvis").getChildByName("Bip001 Spine").getChildByName("Bip001 Spine1").getChildByName("Bip001 Spine2").getChildByName("Bip001 Neck").getChildByName("Bip001 Head").removeChildren();
        body.getChildByName("Bip001").getChildByName("Bip001 Pelvis").getChildByName("Bip001 Spine").getChildByName("Bip001 Spine1").getChildByName("Bip001 Spine2").getChildByName("Bip001 Neck").getChildByName("Bip001 Head").addChild(head);
        return body;
        
    }

    state:number = 0;
    data:any = {
        sound:true,
        zhengdong:true,
        
        date:0,
        offlineTime:0,
        shareCount:0,

        qiaoDaoTag:0,
        qiaoDao:0,

        skin:[],
        skinVideo:[],
        skinFaxing:1,
        skinYifu:1,

        key:0,

        cent:100,
        level:1,

        speed:1,
        jump:1,
        offline:1,
    };
    /**
     * 进入游戏处理初始游戏数据，恢复游戏存档，没有存档即初始化游戏数据
     * @param data 
     */
    initData(data:any=null):void{
        let date:Date = new Date();
        let datetime:number = date.getTime();
        if(data==null){
            
            let dataStr:string = Laya.LocalStorage.getItem(this.gameID);
            if(typeof dataStr == "string"){
                if(dataStr!=""){
                    data = JSON.parse(dataStr);
                }
            }
            
            // data = null;
            if(data==null || data==""){
                data = this.data;
                datetime = 0;
            }
        }
        //任务更新处理
        if(data.date==0){
            
        }else{
            let oldDate:Date = new Date(data.date);
            let oldNum:number = oldDate.getDate();
            let currNum:number = date.getDate();
            console.log("date", oldNum, currNum);
            if(oldNum!=currNum){
                this.clearTaskLog(data);
            }
        }

        //离线时间处理
        let time:number = Math.floor((datetime-data.date)/1000);
        if(time<0)time=0;
        if(time>300)time=300;
        data.offlineTime += time/5;
        if(data.offlineTime>60)data.offlineTime=60;
        if(data.offlineTime<0)data.offlineTime=0;

        if(data.shareCount==null)data.shareCount=0;

        data.date = date.getTime();

        //获取配置默认皮肤
        this.getDefaultSkin();

        // data.level = 3;
        this.data = data;
        this.getData();


        this.updateLevelJSON();
    }
    /**
     * 获取存档数据
     */
    getData():any{
        this.data.date = new Date().getTime();
        let dataStr:string = JSON.stringify(this.data);
        Laya.LocalStorage.setItem(this.gameID, dataStr);

        return this.data;
    }

}