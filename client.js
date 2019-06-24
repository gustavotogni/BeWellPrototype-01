var http = require('http');
var fs = require('fs');
var path = require('path');
var gzip = require('node-gzip');
var fossilDelta = require('fossil-delta');

var dataSourceDirectory = path.join(__dirname, 'data');
fs.readdir(dataSourceDirectory, function(err, files) {

    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    var prevFc;
    fs.writeFileSync('destination2', "");
    for (let i = 0; i < files.length; i++) {

      var currFc = fs.readFileSync('./data/' + files[i]);
      
      var dataToPush;
      //if (prevFc) {
        //dataToPush = fossilDelta.create(prevFc, currFc);
      //} else {
        dataToPush = currFc;
      //}

      prevFc = currFc;

      if (err) {
          console.log("err:" + err);
      } else {
        console.log("pushing +" + dataToPush.length);
        fs.appendFileSync('destination2', dataToPush);
      }
    }

    var Seven = require('node-7z');
 
    var reqBody;
    
    var mySevenStream = Seven.add('Files.7z', 'destination2', {
      recursive: true,
      $bin: 'C:\\Program Files\\7-Zip\\7z.exe'
    });

    
    mySevenStream.on('data', function (data) {
      reqBody = data;
      print(reqBody.length)
      // {
      //   file: 'path/of/the/file/in/the/archive',
      //   status: 'renamed|tested|updated|skipped|deleted|extracted',
      //   attributes: '....A', size: 9, sizeCompressed: 3, (only list command)
      //   hash: 'FEDC304F', size: 9 (only hash command)
      // }
    })
    reqBody = dataToPush;
      var clientServerOptions = {
          encoding: null,
          uri: 'http://localhost:3000',
          path: '/biodata',
          method: 'POST',
          port: 3000,
          body: reqBody
      }

      post_req = http.request(clientServerOptions, function(response) {

          console.log("Req body: " + clientServerOptions.body.length)
          console.log("Request sent. Response: " + response.statusCode);

          response.setEncoding('utf8');

          response.on('data', function(chunk) {
              console.log('Response: ', chunk);
          });

          response.on('end', function() {
              //callback();
          });
      });

      post_req.on('error', function(e) {
          console.log('problem with request: ' + e.message);
      });

      post_req.write(reqBody);
      post_req.end();

});