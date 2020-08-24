/**
 * 管理JSON配置
 */
export default class JSONManager {
    /**
     * 游戏初始值配置内容
     */
    static gameinit:any;

    /////////////////游戏 关卡 场景 怪物/////////////////////
    /**
     * 场景
     */
    static scene:any;
    /**
     * 怪物
     */
    static monster:any;
    /**
     * 关卡
     */
    static level:any;


    /////////////////UI/////////////////////
    /**
     * 任务
     */
    static task:any;
    /**
     * 商店
     */
    static shop:any;
    /**
     * 抽宝箱
     */
    static box:any;
    /**
     * 升级表
     */
    static grade:any;
    /**
     * 对话
     */
    static talk:any;
    ////////////////////////////////////
    static gameList:any;

    static getItemByID(id:number, items:any[]):any{
        for(let i:number=0; i<items.length; i++){
            if(items[i].id==id){
                return items[i];
            }
        }
        return items[items.length-1];
    }

    /**
     * 构造方法
     */
    constructor(){
        
    }



}