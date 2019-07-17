var AWS = require('aws-sdk');

const today = new Date();

AWS.config.update({region: 'us-east-2'});
s3 = new AWS.S3({apiVersion: '2006-03-01'});

s3.listBuckets(function(err, data) {
    if (err) {
        console.log("Error:", err);
    } else {
        for (i in  data.Buckets) {
            console.log(data.Buckets[i].Name);
            console.log(data.Buckets[i].CreationDate);
            let myBucketDate = new Date(data.Buckets[i].CreationDate);
            let result = today.getFullYear() - myBucketDate.getFullYear();
            console.log(result);
            if (result >= 1) {
                console.log("Its over a year old."); 
            } else {
                console.log("Its not that old.");
            }
        }
    }
});
