var express = require('express')
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


app.get('/', function (req, res) {
  /*MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("prueba");
    dbo.collection("prueba_collection").remove({"prueba_2": "Johncel Faller 2"}, function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });*/
  res.send('C:/Users/jofaller/Desktop/Angular/AnimeK-app-master/angular-node-express-api/login-expresslogin-express.component.html');

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
