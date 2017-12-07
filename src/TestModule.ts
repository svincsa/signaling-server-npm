import Application from './Application'

class TestModule {

    constructor (){
        
    }
    public test():string{
        return Application.name;
    }
}

export default new TestModule