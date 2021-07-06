The Telegram library can be used by from many languages including javascript. 
There are no pre-build files provided, the building instructions can be found here:
https://github.com/tdlib/td

The library failed to build on the raspberry pi 3b+, but I found the solution (added "link_libraries(atomic)" in the cmake file): 
https://github.com/tdlib/td/issues/646

The Telegram application needs to be registered:
https://core.telegram.org/api/obtaining_api_id

The example code used the Aigram library/wrapper to interface with the Telegram library:
https://github.com/airgram/airgram

See test.js for example script.

Run test.js:
APP_ID=[APP_ID] APP_HASH=[APP_HASH] TDLIB_COMMAND=libtdjson.so node test.js

Installation:
Get/build the tldib library
Install Airgram package (install node js, npm, etc).
Register Telegram app
