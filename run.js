// vim: set ts=2 sts=2 sw=2 et:

var index = require("./index");

var event = {
  url: 'http://www.yahoo.co.jp',
  bucket: 'files-skybrain.ekispert.jp',
  key: 'test.png'
};

var context = {
  done: function() {
  }
};

index.handler(event, context);
