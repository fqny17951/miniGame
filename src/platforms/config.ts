export class config { 

    // 抖音
    // // //当前游戏版本号(必须填写，每次发布游戏版本往上迭代)
    static version:string="100";
    //当前小游戏appid 必须填
    static appid:string="ttd0d8a6654fe20b21";
    //vovo和oppo需要配置包名和appKey 必须填
    static pkgName:string="";
    //vovo和oppo 游戏上架时分配的Key 必须填
    static appKey:string="";


    // QQ
    // // //当前游戏版本号(必须填写，每次发布游戏版本往上迭代)
    // static version:string="101";
    // //当前小游戏appid 必须填
    // static appid:string="1110712048";
    // //vovo和oppo需要配置包名和appKey 必须填
    // static pkgName:string="";
    // //vovo和oppo 游戏上架时分配的Key 必须填
    // static appKey:string="";


    // // wx
    // //当前游戏版本号(必须填写，每次发布游戏版本往上迭代)
    // static version:string="100";
    // //当前小游戏appid 必须填
    // static appid:string="wxb37ed7948f05d1c5";
    // //vovo和oppo需要配置包名和appKey 必须填
    // static pkgName:string="";
    // //vovo和oppo 游戏上架时分配的Key 必须填
    // static appKey:string="";


    //  OPPO
    // //当前游戏版本号(必须填写，每次发布游戏版本往上迭代)
    // static version:string="100";
    // //当前小游戏appid 必须填
    // static appid:string="30309018";
    // //vovo和oppo需要配置包名和appKey 必须填
    // static pkgName:string="com.ptg.zxwzq.nearme.gamecenter";
    // //vovo和oppo 游戏上架时分配的Key 必须填
    // static appKey:string="6FDp9q6a9C4K8w00g840oOs8C";


    //  VIVO
    // static vivo:boolean = true;
    // //当前游戏版本号(必须填写，每次发布游戏版本往上迭代)
    // static version:string="100";
    // //当前小游戏appid 必须填
    // static appid:string="100007847";
    // //vovo和oppo需要配置包名和appKey 必须填
    // static pkgName:string="com.ptg.zxwzq.vivominigame";
    // //vovo和oppo 游戏上架时分配的Key 必须填
    //  static appKey:string="369d4967c061bee49ea42d57c394ad71";

    //配置环境,开发模型下打印Log
    //正式release 如果有支付采用正式回调地址
    //开发develop 如果有支付采用沙箱回调地址，并能打印SDK日志  
    static env:string='release';
    //请求域名,确保做好解析和添加白名单
    static url :string= 'https://gmone.huiruui.com';
    static switchUrl:string='https://gmtwo.huiruui.com';
  
}