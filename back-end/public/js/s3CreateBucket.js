import AWS from 'aws-sdk';

const ID = 'AKIA5JKZND6QG7QZMIHZ';
const SECRET = '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';

const BUCKET_NAME = 'polideck-bucket-2';

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const params = {
    Bucket: BUCKET_NAME,
    CreateBucketConfiguration: {
        // Set your region here
        LocationConstraint: "us-west-1"
    }
};

s3.createBucket(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else console.log('Bucket Created Successfully', data.Location);
});


