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

let ageBucketObjects = (data) => {

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