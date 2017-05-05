var express=require('express');
var nodemailer = require("nodemailer");
var mysql = require('mysql');
var app=express();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'emal'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "sankalp.raj@numbertheory.ai",
        pass: "sdsd3030"
    }
});



app.get('/send',function(req,res){

	var jobID = "NumberTheory.ai";
	var recepient = "";

	var messaget = "";

	connection.query('SELECT Emails FROM `jobemail` WHERE `JobID` = ?', [jobID], function (error, results, fields) {

			if(error)
			{
				console.log(error);
			}

			else
			{
				setrecipients(results[0].Emails);
			}
  
		});

function setmessagev()
{
	connection.query('SELECT Message FROM `message` WHERE `JobID` = ?', [jobID], function (error, results, fields) {

			if(error)
			{
				console.log(error);
			}

			else
			{
				setmessage(results[0].Message);
			}
  
		});
}

	function setrecipients(value) 
	{
  			recepient = value;
  			console.log(JSON.stringify(recepient));
  			setmessagev();
	}

	function setmessage(value) 
	{
  			messaget = value;
  			console.log(JSON.stringify(messaget));
  			calln();
	}


	
function calln()
{

	while(recepient === "" || messaget === "")
	{
		
	}

    var mailDetails={
        to : recepient,
        text : messaget
    };

    console.log(mailDetails);
    transporter.sendMail(mailDetails, (error, info) => {
    if (error) 
    {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
	});

    //Query for updating status as completed

    /*connection.query('UPDATE message SET status = ? WHERE `JobID` = ?', ["Completed",jobID], function (error, results, fields) {

			if(error)
			{
				console.log(error);
			}

			else
			{
				setmessage(results[0].Message);
			}
  
		});*/

}});



app.listen(3000,function(){
    console.log("Express Started on Port 3000");
});