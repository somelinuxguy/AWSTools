var AWS = require('aws-sdk');

// evaluate buckets to determine age and report old ones
let ageBuckets = (data) => {
    console.log(`Evaluating age of your buckets...`)
    for (i in data.Buckets) {
        let myBucketDate = new Date(data.Buckets[i].CreationDate);
        let result = today.getFullYear() - myBucketDate.getFullYear();
        // console.log(data);
        if (result >= maxBucketAge) console.log(`${data.Buckets[i].Name} \t is over ${maxBucketAge} year old.`); 
    }
}

// evaluate all the objects returned to determine if they are over maxObjectAge years old
let evaluateObjects = (objData) => {
    for (i in objData.Contents) {
         let currentObjDate = new Date(objData.Contents[i].LastModified)
         // console.log(currentObjDate, today.getFullYear(), currentObjDate.getFullYear());
         let result = today.getFullYear() - currentObjDate.getFullYear();
         if (result >= maxObjectAge) console.log(`${objData.Contents[i].Key} \t LastModified: ${result} years`);
    }
}

let ageBucketObjects = (data) => {
    for (i in data.Buckets) {
        var params = {
            Bucket: data.Buckets[i].Name,
            // Delimiter: 'STRING_VALUE',  // using '/' would be interesting
            MaxKeys: '1000',
            // StartAfter: 'STRING_VALUE'  // subsequent calls cursor perhaps?
        };
        s3.listObjectsV2(params, function(objErr, objData) {
            if (objErr) {
                console.log(objErr, objErr.stack);
            } else {
                console.log(`Evaluating age of objects in bucket ${objData.Name}`)
                evaluateObjects(objData);
                console.log(`\n \n \n`);
            }
        });
    }
}

var processBuckets = function() {
    s3.listBuckets(function(err, data) {
        if (err) {
            console.log("Error:", err);
        } else {
            ageBuckets(data);
            console.log(`\n \n \n`);
            ageBucketObjects(data);
        }
    })
}

// -- main -- //
const today = new Date();
const maxBucketAge = 1;
const maxObjectAge = 3;

var credentials = new AWS.SharedIniFileCredentials({profile: 'rnd'});
AWS.config.credentials = credentials;
s3 = new AWS.S3({region: 'us-east-2', apiVersion: '2006-03-01'});

processBuckets();