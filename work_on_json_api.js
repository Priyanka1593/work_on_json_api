var express=require('express');
var bodyParser=require('body-parser');
var jsonQuery = require('json-query')
var app=express();
app.use(bodyParser.json());

var mydata=[{
  "name":"priya",
  "age":23,
  "joiningDate":"0310/2016",
  "salary":30000,
  "location": "Pune"
},
{
  "name":"sagar",
  "age":24,
  "joiningDate":"04/10/2016",
  "salary":20000,
  "location": "Mumbai"
},
{
  "name":"sarita",
  "age":25,
  "joiningDate":"12/15/2016",
  "salary":16000,
  "location": "Solapur"
},
{
  "name":"kiran",
  "age":23,
  "joiningDate":"03/11/2017",
  "salary":10000,
  "location": "Pune"
},
{
  "name":"Rohan",
  "age":23,
  "joiningDate":"07/22/2017",
  "salary":25000,
  "location": "Pune"
},
{
  "name":"Omkar",
  "age":23,
  "joiningDate":"10/05/2016",
  "salary":17000,
  "location": "Pune"
},
{
  "name":"Kedar",
  "age":30,
  "joiningDate":"10/04/2017",
  "salary":30000,
  "location": "Pune"
}];


var myarr=[];

// Find users salary between 15k to 18k and update it by 10%
app.put('/getUserAndUpdate',(req,res)=>{
    var dataInfo=mydata;
    var len=dataInfo.length;
    for(i=0;i<len;i++)
    {
        if((dataInfo[i].salary > 15000) && (dataInfo[i].salary < 18000))
        {  
            dataInfo[i].salary=dataInfo[i].salary + (dataInfo[i].salary * 10 ) / 100;
        }
    }
   res.send(dataInfo);
});

// Get users Not in Pune
app.get('/getUserNotInPune',(req,res)=>{
    var dataInfo=mydata;
    var len=dataInfo.length;
    for(i=0;i<len;i++)
    {
        if(dataInfo[i].location!="Pune")
        {  var myObj={};
            myObj=dataInfo[i];
            console.log(myObj);
            myarr.push(myObj);
        }
    }
 res.send(myarr);    
});

// Get uses whose joing date is in between dates
app.get('/getUserBetweenJoiningDate',(req,res)=>{
    var dataInfo=mydata;
    var len=dataInfo.length;
    var dateFrom=new Date("09/01/2016");
    var dateTo=new Date("08/01/2017");
    var from = Date.parse(dateFrom);
    var to   = Date.parse(dateTo);

    for(i=0;i<len;i++)
    {
        var check=Date.parse(dataInfo[i].joiningDate);
        
        if((check <= dateTo && check >= dateFrom)) 
        {  var myObj={};
            myObj.name=dataInfo[i];           
            myarr.push(myObj);
        }
    }
    res.send(myarr);
});
// delete users whosw salary is greater than 25k 
app.delete('/deleteUser',(req,res)=>{
    var dataInfo=mydata;
    var len=dataInfo.length;
    for(i=0;i<len;i++)
    {
        if(dataInfo[i].salary > 25000)
        { 
            delete dataInfo[i];
      
        }
    }
  
    res.send(dataInfo);    
});

app.listen(3000,()=>{
    console.log(`Started up at port 3000`);
})