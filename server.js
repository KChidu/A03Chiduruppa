var path = require("path")
var express = require("express")
var logger = require("morgan")
var bodyParser = require("body-parser") // simplifies access to request body

var app = express()  // make express app
var http = require('http').Server(app)  // inject app into the server


app.use(express.static(__dirname + '/assets'))
// Listen for an application request on port 8081

// 1 set up the view engine
app.set("views",__dirname, '/assets') // path to views
app.set("view engine", "ejs") // specify our view engine

// 2 create an array to manage our entries
var entries = []
app.locals.entries = entries // now entries can be accessed in .ejs files

// 3 set up an http request logger to log every request automagically
app.use(logger("dev"))     // app.use() establishes middleware functions
app.use(bodyParser.urlencoded({ extended: false }))
// 4 handle http GET requests (default & /new-entry)
app.get("/guestbook", function (request, response) {
  response.render("assets/index")
})
app.get("/account", function (request, response) {
  response.sendFile(__dirname+"/assets/account.html")
})
app.get("/index", function (request, response) {
  response.sendFile(__dirname+"/assets/index.html")
})
app.get("/contact", function (request, response) {
  response.sendFile(__dirname+"/assets/contact.html")
})
app.get("/", function (request, response) {
  response.sendFile(__dirname+"/assets/index.html")
})
app.get("/fees", function (request, response) {
  response.sendFile(__dirname+"/assets/fees.html")
})
app.get("/new-entry", function (request, response) {
  response.render("assets/new-entry")
})
app.post("/contact",function(req,res){
  var api_key = 'key-996548fce4c8ac3213409d943b8103a8';
  var domain = 'sandbox49ee407331264641bd785703a9c37925.mailgun.org';
  var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
   
  var data = {
    from: 'Keerthi <postmaster@sandbox49ee407331264641bd785703a9c37925.mailgun.org>',
    to: 's530711@nwmissouri.edu',
    subject: req.body.your_name,
    //text: req.body.your_email
    html: "<b>Questions: </b>" + req.body.your_enquiry + "<b>    From: </b>" + req.body.your_email
  };
   
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
    if(!error)
    res.send("Mail sent");
    else
    res.send("Mail not sent");
  });
}),
// 5 handle an http POST request to the new-entry URI 
app.post("/new-entry", function (request, response) {
  if (!request.body.title || !request.body.body) {
    response.status(400).send("Entries must have a title and a body.")
    return;
  }
  entries.push({  // store it
    title: request.body.title,
    content: request.body.body,
    published: new Date()
  })
  response.redirect("/guestbook")  // where to go next? Let's go to the home page :)
})
// if we get a 404 status, render our 404.ejs view
app.use(function (request, response) {
  response.status(404).render("404")
})

// Listen for an application request on port 8081 & notify the developer
//http.listen(8081, function () {
//console.log('Guestbook app listening on http://127.0.0.1:8081/')
//})
http.listen(8081, function () {
  console.log('Guestbook app listening on http://127.0.0.1:8081/')
})