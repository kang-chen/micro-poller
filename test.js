//first assertion that the server has a connection
const poller = require('./index');
const express = require('express')
const app = express();
const assert = require('assert');

const newPoller = poller(app, '/pollURL', '/sseURL');

describe('Micro poller', function() {
    it('The app will use router', function() {

    });
});

//second assertion that the server has a connection