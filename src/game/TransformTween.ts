export default class TransformTween extends Laya.Script3D{
    proxy:Laya.Sprite3D;
    rigidbody:Laya.Rigidbody3D;

    onAwake():void{
        this.proxy = this.owner as Laya.Sprite3D;
    }

    get rotationX():number{
        return this.proxy.transform.localRotationEulerX;
    }
    set rotationX(value:number){
        this.proxy.transform.localRotationEulerX = value;
    }
    get rotationY():number{
        return this.proxy.transform.localRotationEulerY;
    }
    set rotationY(value:number){
        this.proxy.transform.localRotationEulerY = value;
    }
    get rotationZ():number{
        return this.proxy.transform.localRotationEulerZ;
    }
    set rotationZ(value:number){
        this.proxy.transform.localRotationEulerZ = value;
    }
    


    get x():number{
        return this.proxy.transform.localPositionX;
    }
    set x(value:number){
        this.proxy.transform.localPositionX = value;
    }
    get y():number{
        return this.proxy.transform.localPositionY;
    }
    set y(value:number){
        this.proxy.transform.localPositionY = value;
    }
    get z():number{
        return this.proxy.transform.localPositionZ;
    }
    set z(value:number){
        this.proxy.transform.localPositionZ= value;
    }
}