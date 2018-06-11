/*
  Start with:  node example.js
  Telnet to:   telnet 127.0.0.1 1337
  Copy/paste:  180615424630,+46123456789,GPRMC,204420.000,A,5843.9394,N,01900.5889,E,1.09,234.35,110618,,,A*67,L,, imei:864493456724265,9,60.0,F:4.22V,1,138,50277,240,24,2AF9,4DDB
*/

var tk102 = require ('tk102');
var net = require ('net');

var gps = '180615424630,+46123456789,GPRMC,204420.000,A,5843.9394,N,01900.5889,E,1.09,234.35,110618,,,A*67,L,, imei:864493456724265,9,60.0,F:4.22V,1,138,50277,240,24,2AF9,4DDB';

// fancy console log
function output (data) {
  console.log ('\nIncoming GPS data:\n');
  console.dir (data, {
    colors: String (process.env.TERM) .match (/color$/)
  });
}

// report only track event to console
tk102.on ('track', output);

// wait for server to be ready
tk102.on ('listening', function (lst) {
  var client;

  console.log ('TK102 server is ready');

  // Send data with telnet
  client = net.connect (lst.port, function () {
    console.log ('Connected to TK102-2 server');
    console.log ('Sending GPS data string for processing');

    client.write (gps + '\r\n');
    client.end ();

    console.log ('CTRL+C to exit');
  });
});

// start server
tk102.createServer ({
  port: 1337
});
