var AWS = require('aws-sdk');

let ageBuckets = (data) => {
    for (i in data.Buckets) {
        let myBucketDate = new Date(data.Buckets[i].CreationDate);
        let result = today.getFullYear() - myBucketDate.getFullYear();
        // console.log(data);
        if (result >= maxBucketAge) {
            console.log(`${data.Buckets[i].Name} is over ${maxBucketAge} year old.`); 
        } else {
            // debug
            console.log(`${data.Buckets[i].Name} is NOT over ${maxBucketAge} year old.`);
        }
    }
}

let evaluateObjects = (data) => {

}

let ageBucketObjects = (data) => {
    var params = {
        Bucket: data.Buckets[0].Name,   //Index 0 for now.
        // Delimiter: 'STRING_VALUE',  // using '/' would be interesting
        MaxKeys: '1000',
        // StartAfter: 'STRING_VALUE'  // subsequent calls cursor perhaps?
    };
    s3.listObjectsV2(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            evaluateObjects(data);
        }
    });
}

var processBuckets = function() {
    s3.listBuckets(function(err, data) {
        if (err) {
            console.log("Error:", err);
        } else {
            ageBuckets(data);
            ageBucketObjects(data);
        }
    })
}

// -- main -- //
const today = new Date();
const maxBucketAge = 1;
const maxObjectAge = 3;
s3 = new AWS.S3({region: 'us-east-2', apiVersion: '2006-03-01'});

processBuckets();