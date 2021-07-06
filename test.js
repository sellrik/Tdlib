
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

void (async function () {
})()

// Getting new messages
airgram.on('updateNewMessage', async ({ update }) => {
  const { message } = update
  console.log('[new message]', message)

  // Append message to file
  var jsonString = JSON.stringify(message);
  console.log("json:", jsonString);
  fs.appendFile("messages.txt", jsonString + os.EOL, function (err) {
    if (err) return console.log(err);
  });


  // Make http request
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

  var req = http.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode);
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
