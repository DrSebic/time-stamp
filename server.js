var http = require("http");
var url = require("url");
var returnObject = {
    "unix": null,
    "natural": null
};

var server = http.createServer(function (req, res) {
   
   var resultObject = url.parse(req.url, true); //parses the request url
   
   var readingDate = resultObject.pathname.slice(1).replace(/(%20)+/g, ""); //eliminates the first slash from the parameter, 
                                                                            //then eliminates the unnecessary spaces created by html
   determineTime(readingDate);
   
   res.writeHead(200, {"Content-type": "application/json"});
   res.end(JSON.stringify(returnObject));   
});

function createNaturalTime (t) { 
    var naturalTime = "";
    var monthNames = ["January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"];

    naturalTime += monthNames[t.getMonth()] + " " + t.getDate() + ", " + t.getFullYear();
    return naturalTime;
}//restyles the time into Month Day, Year


function determineTime(s) {
    
    var time;  //creates a time using the argument sent in the url names s
    
    if (parseInt(s, 10).isNaN) {// the time is not an integer in the UNIX format
        time = new Date(s);
        console.log(" Without parse, s = " + s + "  time = " + time);
    } else {
        time = new Date(parseInt(s, 10));
        console.log("In parse, s = " + s + "  time = " + time);
    }
 
   if (time == "Invalid Date") {//it is not the correct data
       
       console.log("Not valid date format:  "+ s + "   time = " + time);
       
       returnObject.unix = null;
       returnObject.natural = null;
      
    } else {
    
       returnObject.unix = time.getTime();
       returnObject.natural = createNaturalTime(time);
    
    }
}//logic steps to find whether the time is valid
server.listen(8080);