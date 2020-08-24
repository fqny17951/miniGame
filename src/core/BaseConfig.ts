import { config } from "../platforms/config";

export default class BaseConfig {
    static pid_test:string = "test";
    static pid_wx:string = "wx";
    static pid_dy:string = "dy";
    static pid_oppo:string = "oppo";
    static pid_vivo:string = "vivo";
    static pid_qq:string = "qq";
    /**
     * test 测试， wx 微信， dy 抖音
     */
    static get RunPlatformID():string{
        if(Laya.Browser.window.tt){
            return BaseConfig.pid_dy;
        }else if(Laya.Browser.window.qg){
            return config['vivo']? BaseConfig.pid_vivo:BaseConfig.pid_oppo;
        }else if(Laya.Browser.window.qq){
            return BaseConfig.pid_qq;
        }else if(Laya.Browser.window.wx){
            return BaseConfig.pid_wx;
        }else{
            return BaseConfig.pid_test;
        }
    }

    /**
     * 构造方法
     */
    constructor(){
        
    }



}