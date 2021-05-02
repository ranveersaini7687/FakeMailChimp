//jshint esversion: 6
const express = require("express");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  // console.log(first+" "+last+" "+email);
  // 

  const data = {
    member: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us1.api.mailchimp.com/3.0/67d1bdbc16/members";

  const options = {
    method: "POST",
    auth: "ranveer:f7fb48b4d126e951ea9fefa575e33226-us1"
  };

  const request = https.request(url,options,function(response){
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});

app.listen(3000,function(){
  console.log("Ready To Go");
});

// 
// 