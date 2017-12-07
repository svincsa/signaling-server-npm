import * as restify from 'restify'

class Application {
  protected static servername:string = 'Unknown...';
  protected static serverport:number = 3000;

  protected static _inst:Application;

  public static inst():Application{
    if(!this._inst){
      this._inst = new Application();
    }
    return this._inst;
  }

  private engine:any;
  private apis:Object = {};

  constructor () {
    console.log('Application is init');

    this.setupServer()
  }
  public get name():string{
    return Application.servername;
  }
  /**
   * 
   * @param handlers 
   */
  public use(handlers:Function[] | Function):void{
      this.engine.use(handlers);
  }
  /**
   * 
   * @param name 
   * @param rule 
   * @param handler  
   */
  public registRestAPI(name:string, rule:RegExp, handler:Function):void{
    this.apis[name] = [rule, handler];

    this.engine.get(rule, handler);
  }
  /** 
   * @param port 
   * @param callback  
   */
  public listen (port:Number, callback:Function):void{
    this.engine.listen(port, callback)
  }
  /**
   * test opa
   */
  private setupServer ():void {
    this.engine = restify.createServer({name: Application.servername})

    this.engine.use(restify.plugins.queryParser());

    var self:Application = this;

    this.engine.listen(Application.serverport, (err) => {
      if (err) {
        return console.log(err)
      }
    
      return console.log(`server ${Application.servername} is listening on ${Application.serverport}`)
    })

    this.registRestAPI('index', /index/, (req, res, next):void => {
      let index:Array<string> = [];
       
      let p:string; for(p in self.apis){
        index.push(p);
      }
      res.send(200, {
        errno: 200, 
        message: index			
      });
      next();
    });
  }
}
export default Application.inst()
