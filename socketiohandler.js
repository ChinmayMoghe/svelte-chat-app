import {Server} from 'socket.io';

export default function injectSocketIO(server) {
  const io = new Server(server);
  const connectionHandler = (socket)=> {
    const username = `User ${Math.round(Math.random()*99999)}`;
    socket.emit('name',username);
    const messageHandler = (message) =>{
      io.emit('message',{
        from:username,
        message,
        time:Date.now(),
      });
    }
    socket.on('message',messageHandler);
  };
  io.on('connection',connectionHandler);
}
