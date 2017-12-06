import * as restify from 'restify'

class Application {
  private engine;

  constructor () {
    this.setupServer()
  }
  public listen (port:Number, callback:Function):void{
    this.engine.listen(port, callback)
  }

  private setupServer ():void {
    this.engine = restify.createServer({
      name: 'Unknoun'
    })
  }
}

export default new Application()
