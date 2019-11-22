var clientServer = require('socket.io').listen(4000).sockets;
var mongo = require('mongodb').MongoClient;
//connect to mongodb
mongo.connect('mongodb://127.0.0.1/chatroom',function(err,db){
    if(err){
        throw err;
    }
    console.log('mongodb connected');
    // send message to client
    var testMessage={'message':"hello hello message test!"}

    //establish server connection
    clientServer.on('connection',function(socket){
        // socket.emit('test',testMessage);
   

    socket.on('input',(clientObj)=>{
        console.log('message sent here is:',clientObj.clientMessage);
        socket.emit('test',clientObj.clientMessage);

         });

    });

});
