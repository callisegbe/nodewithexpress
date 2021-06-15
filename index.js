var express = require('express');
var handlebars = require('express-handlebars');
//creating the App
var app = express();

var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple."
   ];

//creating the handlebars layout
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'main'
}));
app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);
//Home page rourting
app.get('/', function(req, res){
    res.render('home');
});
//About routing 
app.get('/about', function(req, res){
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {fortune: randomFortune});
});

//default page if page does not exist
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});

//Internal Server error
app.use(function(err, req, res, next){
    console.error(err.stack)
    res.status(500)
    res.render('500')
})

app.listen(app.get('port'), function(){console.log('app runing on Port' + app.get('port'))})