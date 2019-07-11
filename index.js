var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// database
mongoose.connect("mongodb+srv://hyuntn0724:msk040528@cluster0-dnbrp.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true });
var db = mongoose.connection;
db.once("open", function(){
    console.log("DB connected!");
});
db.on("error", function(err){
    console.log("DB ERROR :", err);
});

// view engine
app.set("view engine", 'ejs');

// middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(session({secret:'MySecret'}));

// passport
var passport = require('./config/passport')
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/', require('./routes/home'));
app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users'));

// start server
var port = process.env.PORT || 1000;
app.listen(port, function(){
    console.log('Server On!');
});