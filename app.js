var express= require('express');
var app= express();
var bodyParser= require("body-parser");
var nodemailer = require('nodemailer');
var validator = require("email-validator");




app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



// var success="Message Successful! Thank you";
// var failure="Message Failed! Enter a real E-mail";
app.set("view engine", "ejs");

// transporter.verify(function(error, success) {
//   if (error) {
//         console.log(error);
//   } else {
//         console.log('Server is ready to take our messages');
//   }
// });


app.post("/contact.html",function(req,res){
    
var transporter = nodemailer.createTransport({
 
  service: "Gmail",
  host: "smtp.gmail.com",
  auth: {
    user: 'hodiete@gmail.com',
    pass: 'henryodiete'
  }
});
var mailOptions = {
  from:`${req.body.name} <${req.body.email}>`,
  to:'henryodiete@yahoo.co.uk, hodiete@gmail.com',
  subject: 'Message for HODIETE DESIGNS from '+ req.body.name,
  priority:"high",
  text: req.body.message+"\n"+"Person's Email: "+ req.body.email,
  
};
var mail= {
  from:'hodiete@gmail.com',
  to:`${req.body.name} <${req.body.email}>`,
  priority:"high",
  subject: "Thank you for your email",
  text: "This is confirmation that i have recieved your email. I will respond as soon as i can. \n Thank you \n HODIETE DESIGNS"
  
  
};
if (validator.validate(req.body.email)&& req.body.name!==""){


transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  res.render("failure");
  } else {
    console.log('Email sent: ' + info.response);
      res.render("success");
      transporter.sendMail(mail, function (error,info){
        if (error){
         console.log("There was an error");
        }
        console.log('Email sent: ' + info.response);
        
      });
        
        

  }
});
}else{
    res.render("failure");
}




// res.send('/contact.html');
});


// app.get("*",function (req,res){
  
//   res.render("");
  
  
// });
app.listen(process.env.PORT,process.env.IP, function(){
    
    console.log("App has Started");
})