import Application from './com/Application'
import Server from './com/Server'

const server:Server = new Server('Unknown', 3000);

server.addApp('meeting', Application);
