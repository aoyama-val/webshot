// vim: set ts=2 sts=2 sw=2 et:

process.env.TZ = 'Asia/Tokyo';
var tmp_file_path = '/tmp/1.png';

var webshot = require('webshot');
var fs = require('fs');
var aws = require('aws-sdk');

var options = {
    renderDelay: 2000,
    screenSize: {
        width: 1080,
        height: 1920
    },
    shotSize: {
        width: 1080,
        height: 'all'
    }
};

var url     = process.argv[2];  // 例: "https://skybrain.ekispert.jp/signage/id/1?index=0"
var bucket  = process.argv[3];  // 例: "files-skybrain.ekispert.jp"
var key     = process.argv[4];  // 例: "1.png"

webshot(url, tmp_file_path, options, function(err) {
  if (err) {
    console.log("error", err);
    return;
  }

  // /tmp/screen.pngをS3にアップロード
  var params = {Bucket: bucket, Key: key, Body: fs.createReadStream(tmp_file_path)};
  new aws.S3().upload(params, function(err, data) {
    if (err) {
      console.log("error", err);
      return;
    }
    console.log("Upload success");
  });
});
