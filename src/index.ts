import Application from './Application'
import TestModule from './TestModule'

const port:Number = 3000

Application.registRestAPI('testpage(par1, par2)', /(testpage)\/(\?(.+))?/, (req, res, next) => {
  console.info(req.query);

  res.send(200, {
    errno: 200, 
    message: 'Test Rest API (testpage) is ok.'			
  });

  next();
})

console.log(TestModule.test())
