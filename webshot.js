// vim: set ts=2 sts=2 sw=2 et:

process.env.TZ = 'Asia/Tokyo';
var tmp_file_path = '/tmp/1.png';

var webshot = require('webshot');
var fs = require('fs');
var aws = require('aws-sdk');

var url     = process.argv[2];  // 例: "https://skybrain.ekispert.jp/signage/id/1?index=0"
var bucket  = process.argv[3];  // 例: "files-skybrain.ekispert.jp"
var key     = process.argv[4];  // 例: "1.png"
var sw      = process.argv[5] ? parseInt(process.argv[5]) : 1080;
var sh      = process.argv[6] ? parseInt(process.argv[6]) : 1920;

var options = {
  renderDelay: 2000,
  defaultWhiteBackground: true,
  screenSize: {
    width: sw,
    height: sh
  },
  shotSize: {
    width: sw,
    height: sh
  }
};

webshot(url, tmp_file_path, options, function(err) {
  if (err) {
    console.log("error", err);
    process.exit(1);
  }

  // /tmp/screen.pngをS3にアップロード
  var params = {Bucket: bucket, Key: key, Body: fs.createReadStream(tmp_file_path)};
  new aws.S3().upload(params, function(err, data) {
    if (err) {
      console.log("error", err);
      process.exit(2);
    }
    console.log("Upload success");
  });
});
