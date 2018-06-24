var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

var apiKey = "thewdb";

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"));
app.set("view engine","ejs");

app.get('/', function(req,res){
	var movie = {};
	res.render("home",{movie:movie});
});

app.post('/searchMovie',function(req,res){
	var movie = req.body.movieName;
	var apiLink = "http://www.omdbapi.com/?t="+movie+"&apikey="+apiKey;
	request(apiLink, function (error, response, body) {
 	if(error){
		console.log('error:', error); // Print the error if one occurred
	}else{
		var parsedData = JSON.parse(body);
		res.render("home",{movie:parsedData});
	}
	});
});

app.get('/list', function(req,res){
	var movie = {};
	res.render("movieList",{movies:movie});
});

app.post('/searchMovieList',function(req,res){
	var movie = req.body.movieName;
	var apiLink = "http://www.omdbapi.com/?s="+movie+"&apikey="+apiKey;
	console.log(apiLink);
	request(apiLink, function (error, response, body) {
 	if(error){
		console.log('error:', error); // Print the error if one occurred
	}else{
		var parsedData = JSON.parse(body);
		res.render("movieList",{movies:parsedData});
	}
	});
});

app.get('*',function(req,res){
	res.render('error');
});

app.listen(3000, function(){
	console.log("Server running on port 3000...");
});

