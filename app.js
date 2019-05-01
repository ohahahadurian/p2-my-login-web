//jshint esversion:6

const express = require("express");
const bodyPaser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyPaser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;

  var data = {
    members: [
      {email_address: email,
       status: "subscribed",
       merge_fields: {
         FNAME:firstName,
         LNAME:lastName
       }
     }
   ]
 };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/0e1883699f",
    method: "POST",
    headers: {
      "Authorization": "Anna c5db095fa10a77254d3c2fd2a9619a72-us20"
    },
    body: jsonData
  };

  request(options, function(error, response, body){
    if(error){
      res.sendFile(__dirname + "/failure.html");
    }else{
      if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      }else{
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post("/failure", function(req, res){
  res.redirect("/");
});


app.listen(process.env.PORT || 5000, function(){
  console.log("Server is running on port 5000.");
});

// 0e1883699f
// c5db095fa10a77254d3c2fd2a9619a72-us20
