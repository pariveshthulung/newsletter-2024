const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    console.log(fname+" "+lname + " " + email);
   
    // const data = {
    //     email_address: email,
    //     status: "Subscribed",
    //     merge_fields: {
    //       FNAME: fname,
    //       LNAME: lname
    //     }
    //   };
    const data = {
        members : [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME : fname,
                    LNAME : lname 
                }
            }
        ]
    }; 
    
    const JsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/058be39e44";
    
    const options = {
        method: "POST",
        auth: "parivesh:db2c97c05f6121f6408c2d4ff6105ac7"
    };
    
    // const apiKey = "db2c97c05f6121f6408c2d4ff6105ac7-us21";
    
    const post_request = https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
    });
    
    post_request.write(JsonData);
    post_request.end();
    
    
});
    app.listen(3000,function(){
        console.log("server is listening in port 3000");
    });