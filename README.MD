The Telegram library can be used by from many languages including javascript. 
There are no pre-build files provided, the building instructions can be found here:
https://github.com/tdlib/td

The library failed to bulild on the raspberry pi 3b+, but I found the solution (added link_libraries(atomic) int the cmake file) bug report: 
https://github.com/tdlib/td/issues/646

The Aigram library/wrapper can be used interface with the Telegram library:
https://github.com/airgram/airgram

Example:
APP_ID=[APP_ID] APP_HASH=[APP_HASH= TDLIB_COMMAND=ibtdjson.so node test.js

test.js:

const { Airgram, Auth, prompt, toObject } = require('airgram')
fs = require('fs');
const os = require('os');
const http = require('http')

const airgram = new Airgram({
  apiId: process.env.APP_ID,
  apiHash: process.env.APP_HASH,
  command: process.env.TDLIB_COMMAND,
  logVerbosityLevel: 1
})

airgram.use(new Auth({
  code: () => prompt('Please enter the secret code:\n'),
  phoneNumber: () => prompt('Please enter your phone number:\n')
}))

// Getting new messages
airgram.on('updateNewMessage', async ({ update }) => {
  const { message } = update
  console.log('[new message]', message)

  // Write message to a file
  var jsonString = JSON.stringify(message);
  console.log("json:", jsonString);
  fs.appendFile("messages.txt", jsonString+os.EOL, function (err) {
    if (err) return console.log(err);
  });

// Make post request (to Node-Red for example)
var data = new TextEncoder().encode(jsonString);

var options = {
   hostname: 'localhost',
   port: 1880,
   path: '/test',
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
  };

  var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  //console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

  req.on('error', error => {
    console.error(error)
  })

  req.write(data);
  req.end();
})
