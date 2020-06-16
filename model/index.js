const {MongoClient, ObjectID} = require('mongodb')
const client = new MongoClient(process.env.URI, { useUnifiedTopology: true })
var db;
module.exports = {
  connect: function() {
    return client.connect().then(function(error) {
      console.log("conecto")
      db = client.db(process.env.DB_NAME);
    })
  },
  linkUser: function(userId, chatId) {
    return new Promise((resolve, reject) => {
      let id = '';
      try {
        id = ObjectID.createFromHexString(userId)
      } catch(exception) {
        reject("El id no es valido")
      }
      db.collection('user').findOneAndUpdate({_id: id}, {$set: {chat_id: chatId}}, {upsert: false, rawResult:true}, function(err,doc) {
        if (err) { reject(err) }
        else {resolve()}
      });  
    })
  },
  getChatId: function(userId) {
    return new Promise((resolve, reject) => {
      let id = '';
      try {
        id = ObjectID.createFromHexString(userId)
      } catch(exception) {
        reject("El id no es valido")
      }
      db.collection('user').findOne({_id: id}, function (err, user) {
        if(err){
          reject(err)
        }
        resolve(user)
      });
    })
  },
  getUserId: function(chatId) {
    return new Promise((resolve, reject) => {
      db.collection('user').findOne({chat_id: chatId}, function (err, user) {
        if(err){
          reject(err)
        }
        resolve(user)
      });
    })
  }
}
