
export default class HttpProxy {
    static httpGet(url:string, callback:Laya.Handler, paramStr:string="", callbackFail?:Laya.Handler):void{
        var xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.http.timeout = 10000;//设置超时时间；
        xhr.once(Laya.Event.COMPLETE, this, (data:any)=>{
            console.log("COMPLETE", xhr.url, data);
            callback.runWith([data]);
        });
        xhr.once(Laya.Event.ERROR, this, (data:any)=>{
            console.log("ERROR", xhr.url, data);
            callbackFail && callbackFail.run();
        });
        if(url.indexOf("?")==-1){
            url+="?"+paramStr;
        }else{
            url+="&"+paramStr;
        }
        xhr.send(url, "", "get", "json");
    }
    static httpPost(url:string, callback:Laya.Handler, paramStr:string="", callbackFail?:Laya.Handler):void{
        var xhr: Laya.HttpRequest = new Laya.HttpRequest();
        xhr.http.timeout = 10000;//设置超时时间；
        xhr.once(Laya.Event.COMPLETE, this, (data:any)=>{
            console.log("COMPLETE", xhr.url, data);
            callback.runWith([data]);
        });
        xhr.once(Laya.Event.ERROR, this, (data:any)=>{
            console.log("ERROR", xhr.url, data);
            callbackFail && callbackFail.run();
        });
        xhr.send(url, paramStr, "post", "json");
    }
    static httpFormatParam(param:any):string{
        let paramStr:string[] = [];
        for(let s in param){
            paramStr.push(s+"="+param[s]);
        }

        return paramStr.join("&");
    }


    /**
     * 构造方法
     */
    constructor(){
        
    }



}