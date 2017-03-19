// vim: set ts=2 sts=2 sw=2 et:

process.env.TZ = 'Asia/Tokyo';

var exec = require('child_process').exec;
var sprintf = require('sprintf').sprintf

exports.handler = function(event, context) {
  var url       = event.url;
  var bucket    = event.bucket;
  var key       = event.key;
  var sw        = event.sw || 1080;
  var sh        = event.sh || 1920;

  console.log("Start");

  exec('cp -r skybrain_fontconfig /tmp; /tmp/skybrain_fontconfig/usr/bin/fc-cache -fs', function(error) {
    if (error) {
      context.done(error, 'done');
      return;
    }

    console.log("cp done.");

    // LD_LIBRARY_PATHを指定してwebshot.jsを別プロセス起動（URLを引数に渡す）
    var command = sprintf("LD_LIBRARY_PATH=/tmp/skybrain_fontconfig/usr/lib/ node webshot.js '%s' '%s' '%s' %s %s", url, bucket, key, sw, sh);
    exec(command, function(error) {
      console.log("node webshot.js done.");
      context.done(error, 'done');
    })
  });
};
