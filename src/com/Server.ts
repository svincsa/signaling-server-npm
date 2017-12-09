import * as restify from 'restify'

import Client from './Client'
import ServerAppInterface from './ServerAppInterface'

/**
 * 
 */
class Server {
    /**
     * 
     */
    private socket:any
    /**
     * 
     */
    private serverInterface:ServerAppInterface
    /**
     * 
     */
    private apps:Object = {}
    /**
     * 
     */
    private insts:Object = {}
    /**
     * 
     */
    private restCalls:Object = {}
    /**
     * 
     */
    private socketCalls:Object = {}

    constructor (private name:string, private port:number){
        this.setup()
    }

    // ----- PUBLIC Main

    /**
     * 
     * @param type 
     * @param app 
     */
    public addApp(type:string, app:any):void{
        this.apps[type] = app;
        
        //@TODO - test dev
        var id:string = type+'mytest';
        this.insts[id] = new app(type, 'mytest', 
            new ServerAppInterface(id, this)
        );
    }

    // ------ PUBLIC ServerAppInterface

    /**
     * 
     * @param appID 
     * @param name 
     * @param handler 
     */
    public onRestCall(appID:string, name:string, handler:Function){
        console.log(`app(${appID}) subscribe for REST call(${name})`)

        this.restCalls[appID+name] = [appID, name, handler];
    }
    /**
     * 
     * @param appID 
     * @param name 
     * @param handler 
     */
    public onSocketCall(appID:string, name:string, handler:Function){
        this.socketCalls[appID+name] = [appID, name, handler];
    }
    /**
     * 
     * @param appID 
     * @param client 
     */
    public onConnect(appID:string, client:Client){

    }
    /**
     * 
     * @param appID 
     * @param client 
     */
    public onDisconnect(appID:string, client:Client){

    }
    /**
     * 
     * @param appID 
     * @param client 
     */
    public acceptConnection(appID:string, client:Client){

    }
    /**
     * 
     * @param appID 
     * @param client 
     */
    public rejectConnection(appID:string, client:Client){

    }
    /**
     * 
     * @param appID 
     * @param client 
     */
    public kick(appID:string, client:Client){
        
    }

    // ----- PRIVATE 

    /**
     * 
     */
    private setup(){
        var self:Server = this;

        this.socket = restify.createServer({name: this.name})
        this.socket.use(restify.plugins.queryParser());
        /**
         * map /<APP NAME>/<INSTANCE NAME>/<METHOD>/[?PARAMS]
         */
        this.socket.get(/([^\/]+)\/([^\/]+)\/([^\/])+\/(\?.+)?/, function (req, res, next){
            self.restApiParser(req, res, next);
        })
        this.socket.listen(this.port, (err) => {
            if (err) {
                return console.log(err)
            }
            return console.log(
                `server ${self.name} is listening on ${self.port}`
            )
        })
    }
    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    private restApiParser(req, res, next){
        console.info(req.url.split("/"));

        let spl = req.url.split("/");
        let appID = (spl[0] ? spl[0] : spl[1]);
        let instID = (spl[0] ? spl[1] : spl[2]);
        let method = (spl[0] ? spl[2] : spl[3]);

        if(this.restCalls[appID+instID+method]){
            this.restCalls[appID+instID+method][2](req, res, next);
        }else{
            res.send(404, {
                errno: 404,
                message: 'bad request'
            });
            next();
        }
    }
}
export default Server