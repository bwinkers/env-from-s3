var AWS = require('aws-sdk');

var s3 = new AWS.S3();

module.exports = function envFromS3(bucket, key) {
  
  var params = {
    Bucket: bucket,
    Key: key
  };

  var s3file = s3.getObject(params).createReadStream();

  s3file
    .on('readable', function () {
      var obj;
      while (null !== (obj = s3file.read())) {
        try {
          var configs = JSON.parse(obj.toString('utf8'));

          var objectKeysArray = Object.keys(configs);

          objectKeysArray.forEach(function (objKey) {
            
            var objValue = configs[objKey];

            switch(typeof objValue) {
              case 'string':
              case 'boolean':
              case 'number':
                process.env[objKey] === objValue;
                break;
              default:
                break;
            }
          });
          return true;
        } catch (err) {
          return false;
        }
      }
    });
};
