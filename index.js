const axios = require('axios');
const router = require('express').Router();

const poller = (app, pollURL, sseURL, pollTime = 5000, sseInterval = 5000) => {

    
   let data = null;
   // polling temperature api
   setInterval(() => {
    axios.get(pollURL)
    .then((response) => {
      data = response.data
    })
    .catch((error) => {
      console.log(error);
    })
  }, pollTime);
  
  function sseTemperatures(req, res) {
    let messageId = 0;
    const intervalId = setInterval(() => {
        res.write(`id: ${messageId}\n`);
        res.write(`data: ${data && JSON.stringify(data)}\n\n`);
        messageId += 1;
    }, sseInterval);
  
    req.on('close', () => {
        clearInterval(intervalId);
    });
  }

// setup SSE endpoint for persistent data connection

router.get(sseURL, (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });
    res.write('\n');

    sseTemperatures(req, res);
});

app.use(router)

}
export default poller