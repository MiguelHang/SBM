
class User{
    constructor(u,c,e,n,h,p){
        this.user=u;
        this.pass=c; 
        this.email=e;
        this.name=n;
        this.hechos=h;
        this.pendientes=p;
    };
    toString(){
        return '(${this.user}-${this.pass}-${this.email})';
    };
    toObject(){
        return this;
    };
};
class Truco{
    constructor(n,t){
        this.nombre=n;
        this.tipo=t;
    };
    toString(){
        return '(${this.nombre}-${this.pass})';
    };
    toObjet(){
      return this;  
    };
};
