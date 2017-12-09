import Server from './Server'
import Client from './Client'

class ServerAppInterface {
    constructor(
        private appID:string, 
        private server:Server
    ){}
    /**
     * 
     * @param name 
     * @param handler 
     */
    public onRestCall(name:string, handler:Function){
        this.server.onRestCall(this.appID, name, handler);
    }
    /**
     * 
     * @param name 
     * @param handler 
     */
    public onSocketCall(name:string, handler:Function){
        this.server.onSocketCall(this.appID, name, handler);
    }
    /**
     * 
     * @param client 
     */
    public onConnect(client:Client){
        this.server.onConnect(this.appID, client);
    }
    /**
     * 
     * @param client 
     */
    public onDisconnect(client:Client){
        this.server.onDisconnect(this.appID, client);
    }
    /**
     * 
     * @param client 
     */
    public acceptConnection(client:Client){
        this.server.acceptConnection(this.appID, client);
    }
    /**
     * 
     * @param client 
     */
    public rejectConnection(client:Client){
        this.server.rejectConnection(this.appID, client);
    }
    /**
     * 
     * @param client 
     */
    public kick(client:Client){
        this.server.kick(this.appID, client);
    }
}
export default ServerAppInterface