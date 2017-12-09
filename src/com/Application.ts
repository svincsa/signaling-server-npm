import ServerAppInterface from './ServerAppInterface'

class Application {

  constructor(
    private type:string, 
    private name:string, 
    private server:ServerAppInterface
  ){
    this.setup();
  }

  private setup(){
    var self:Application = this;

    console.log(`Up instance ${this.name} of app ${this.type}`);

    //@TODO - test dev
    this.server.onRestCall('mytestpage', function (req, res, next){
      self.onMyTestPage(req, res, next);
    })
  }
  private onMyTestPage(req, res, next){

    res.send(200, {
      code: 200,
      body: `App ${this.type}/${this.name} catch mytestpage req`
    })

    next();
  }
}
export default Application;