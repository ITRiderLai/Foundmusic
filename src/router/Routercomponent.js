class Routercomponent{
    constructor(){}
    Header(resolve){
        return require(['../views/Header/Header'],resolve)
    }
    Mine(resolve){
        return require(['../views/Mine/Mine'],resolve)
    }
    Musicmaster(resolve){
        return require(['../views/Musicmaster/Musicmaster'],resolve)
    }
    Found(resolve){
        return require(['../views/Found/Found'],resolve)
    }
    SheetList(resolve){
        return require(['../views/Songsheetlist/SheetList'],resolve)
    }
    AlbumList(resolve){
        return require(['../views/Album/AlbumList'],resolve)
    }
    SingerList(resolve){
        return require(['../views/Singer/SingerList'],resolve)
    }
    Play(resolve){
        return require(['../views/Play/Play'],resolve)
    }
    Login(resolve){
        return require(['../views/Login/Login'],resolve)
    }
}
export default new Routercomponent();