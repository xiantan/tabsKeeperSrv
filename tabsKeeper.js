var WebSocketServer = require('websocket').server;
var http = require('http');

var util = require('util');
var url = require('url');
var express = require('express');
var bodyParser = require('body-parser');
var app=express();

var userId= {};
var usePort = 3009;

/*var server = http.createServer(function(request, response) {
		    console.log((new Date()) + 'normal http request' + request.url);
		        response.writeHead(200);
		    //    response.write(util.inspect(request));
		        response.write(request.data);
		    //    response.write(util.inspect(url.parse(request.url,true).query));
		            response.end();
});*/
var server = http.createServer(app);
app.use(bodyParser.json());
app.post('/tabs/',function(request, response){
				console.log((new Date()) + 'normal http request' + request.url);
				/*console.log(request.ip+"///"+JSON.stringify(request.body));
				console.log(request.ip+"///"+request.body);
				console.log(request.ip+"///"+request.data);
				response.writeHead(200);
				//    response.write(util.inspect(request));
				//response.write(request.body[0].title);
				//    response.write(util.inspect(url.parse(request.url,true).query));
				response.end();*/
				var body = '';
				request.on('data', function (data) {
						body += data;

						// Too much POST data, kill the connection!
						if (body.length > 1e6)
						request.connection.destroy();
						});
				request.on('end', function () {
						var jsonData = JSON.parse(body);
						//console.log("??"+body+"!!");
						for(var i in jsonData){
								console.log(jsonData[i].title);
						}

						// use post['blah'], etc.
				                		                                });
				});

server.listen(usePort, function() {
		    console.log((new Date()) + 'run on port:' + usePort);
});

wsServer = new WebSocketServer({
		    httpServer: server,
		        autoAcceptConnections: false
});
wsServer.on('request', function(request) {
				/*if (!verifyRequest(request)) {
				request.reject();   
				console.log((new Date()) + 'reject connect,orgin is :' + request.origin);
				return;
				}*/

				var connection = request.accept('test', request.origin);
				
				
				//TODO put to send message
				var tmpJson = {title:"xtitle",message:(new Date())+"",notificationNum:15};
				connection.sendUTF(JSON.stringify(tmpJson));

				//
				console.log((new Date()) + 'connect accept,orgin is :' + request.origin);
				//setTimeout(function (){connection.close()},5000);

				/* ... */
				connection.on('message', function(message) {
						if (message.type == 'utf8') {
						//console.log((new Date()) + 'get text: ' + message.utf8Data);
						try{//test
								console.log(message.utf8Data.apple);
						}catch(e){}
						try{//test
						recObj = JSON.parse(message.utf8Data);
						console.log((new Date()) + 'JSON-get : ' + message.utf8Data);
						//TODO auth for user
						//test auth//
						//userId[]=connection;
						//test//

						}catch(e){
						console.log((new Date()) + 'NOTJSON-get text: ' + message.utf8Data);
						}
						/*handle text which received*/
						}
						});
				connection.on('close', function(reasonCode, description) {
						    console.log((new Date()) + 'connect close');
						        /*other close work*/ 
				});
				});
