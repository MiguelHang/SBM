
class User{
    constructor(u,c,e,n,h,p,t="usuario"){
        this.user=u;
        this.pass=c; 
        this.email=e;
        this.name=n;
        this.hechos=h;
        this.pendientes=p;
        this.tipo=t;
    };
    toString(){
        return '(${this.user}-${this.pass}-${this.email})';
    };
    toObject(){
        return this;
    };
};
class Truco{
    constructor(n,e){
        this.nombre=n;
        this.link=e;
    };
    toString(){
        return '(${this.nombre}-${this.pass})';
    };
    toObjet(){
      return this;  
    };
};
