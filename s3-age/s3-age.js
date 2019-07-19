var AWS = require('aws-sdk');

var ageBuckets = function(data) {
    for (i in data.Buckets) {
        let myBucketDate = new Date(data.Buckets[i].CreationDate);
        let result = today.getFullYear() - myBucketDate.getFullYear();
        // console.log(data);
        if (result >= maxAge) {
            console.log(`${data.Buckets[i].Name} is over ${maxAge} year old.`); 
        } else {
            // debug
            console.log(`${data.Buckets[i].Name} is NOT over ${maxAge} year old.`);
        }
    }
}

var processBuckets = function() {
    s3.listBuckets(function(err, data) {
        if (err) {
            console.log("Error:", err);
        } else {
            ageBuckets(data);
        }
    })
}

// -- main -- //
const today = new Date();
const maxAge = 1;
s3 = new AWS.S3({region: 'us-east-2', apiVersion: '2006-03-01'});

processBuckets();