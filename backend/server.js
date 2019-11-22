var clientServer = require('socket.io').listen(4000).sockets;
var mongo = require('mongodb').MongoClient;
//connect to mongodb
mongo.connect('mongodb://127.0.0.1/chatroom',function(err,db){
    if(err){
        throw err;
    }
    console.log('mongodb connected');
    // send message to client

    //establish server connection
    clientServer.on('connection',function(socket){
        // socket.emit('test',testMessage);
         socket.on('input',(clientObj)=>{
        console.log(`message sent here is: ',${clientObj.clientMessage} from ${clientObj.clientName}`);
        // socket.emit('test',clientObj.clientMessage);
        //emit event to all connected sockets
        var testMessage={'message':clientObj.clientMessage,'name':clientObj.clientName}
        clientServer.emit('broadcast',testMessage);
    });

    });

});
