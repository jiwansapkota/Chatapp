const express = require('express');
const mongoose = require('mongoose');
const io= require('socket.io').listen(4000).sockets;
const app= express();
const port= 5000;


//creating database schema for room and messages
var Schema= mongoose.Schema();
var MessageSchema = new Schema({
  from: { type: Schema.Types.ObjectId, required: true },
  to: { type: Schema.Types.ObjectId, required: true },
  body: { type: String, required: true },
  time:{type:String,required:true}
});

var roomSchema = new Schema({
  roomName:{type:String,required:true},
  password:{type:String,required:true},
  chatData:{type:moongoose.Schema.Types.ObjectId, required:true}
});

var MessageSchema= mongoose.model("MessageSchema",MessageSchema);
var Room =mongoose.model("Room",roomSchema);

//creating api for room data
app.get('/api/room',(req,res)=>{

});

//establish connection with mongodb using mongoose
mongoose.connect("mongodb+srv://jiwansapkota:jiwansapkota@message-8x1qu.mongodb.net/test?retryWrites=true&w=majority",
{useNewUrlParser:true},
(err)=>{
  //check error
  if(err){ console.log(err)}
  //socket connection established only if database connection is established
  else{
    console.log("database connected");

    var senderClient,messageFromCLient={},dateTime;
    //establish server connection
    io.on('connection',function(socket){

      Chats.find({}, function (err,data) {
        if(err){console.log("error retriving data from database");}
        senderClient= data.senderName;
        messageFromCLient=data.messages;
        dateTime=data.messageTime;
        io.emit('broadcast',{'message':messageFromCLient,'name':senderClient,'Time':dateTime});
    });

       socket.on('input',(clientObj)=>{
            console.log(`message sent here is: ',${clientObj.clientMessage} from ${clientObj.clientName}`);
            senderClient=clientObj.clientName;
            messageFromCLient=clientObj.clientMessage;
            dateTime=clientObj.dateTime;
            Chats.create({
                  senderName:senderClient,
                  messages:messageFromCLient,
                  messageTime:dateTime
                },(err,data)=>{
                                  if(err){
                                            console.log('error occured adding content to collection');
                                            console.log(err);}
                                             else(console.log('content successfully added to the collection:',data))
                                               }
                      );


      //emit event to all connected sockets
      var testMessage={'message':clientObj.clientMessage,'name':clientObj.clientName}
      clientServer.emit('broadcast',testMessage);
  });

  });
  
  
 }
});

app.listen(port,()=>{console.log(`listning from port:${port}`)});


