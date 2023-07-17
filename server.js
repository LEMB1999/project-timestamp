// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {

     //get the current date
     let date = new Date();
     if(req.params.date){ 

       const isNumeric = n => !!Number(n);

         
       if(isNumeric(req.params.date)){
         date = new Date(Number(req.params.date));
       }else{
         date = new Date(req.params.date);
       }

     }
  
     if(date == "Invalid Date"){
         return res.status(200).json({ error : "Invalid Date" })
     }
  
     return res.status(200).json({
        "unix":date.getTime(),
        "utc":date.toUTCString()
     });

  
  
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
