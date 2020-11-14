const express = require('express'),
app = express(),
mongoose = require('mongoose'), 
config = require('./server/config'),
controller = require('./server/controller/controllers'),
apiControllers = require('./server/controller/apiController'),
path = require('path'),
port = process.env.PORT || 5000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', "ejs");
app.use('/assets', express.static(__dirname + '/build'));
        //////////////  HTML file ////////
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'build', '/index.html'));
});

mongoose.connect(config.getDB_Connection_URL(), { autoIndex: false, useNewUrlParser: true }, (err, db) => {
    if(err) throw err;
    console.log('Connected to Database');
    db.collection('posts').insertOne(controller.Post , (err, records) => {
        if(err) throw err;
        console.log('Record added !!');
    });
});
controller(app);
apiControllers(app);

app.listen(port);