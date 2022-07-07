const AWS = require('aws-sdk');
const { responseHelper } = require('./responseHelper');
const csv = require('csv-parser');
const { S3_BUCKET } = process.env;

module.exports = {
  importProductsFile: async function (event) {
    const s3 = new AWS.S3({ region: 'eu-west-1' });
    const path = `uploaded/${event.queryStringParameters.name}`;
    const params = {
      Bucket: S3_BUCKET,
      Key: path,
      Expires: 60,
      ContentType: 'text/csv',
    };

    const getSignedUrl = async () => {
      return new Promise((resolve, reject) => {
        s3.getSignedUrl('putObject', params, (err, url) => {
          err ? reject(err) : resolve(url);
        });
      });
    };

    try {
      const signedUrl = await getSignedUrl();

      return responseHelper(200, { signedUrl });
    } catch (err) {
      return responseHelper(500, 'Error while retrieving signedUrl from AWS');
    }
  },

  importFileParser: async function (event) {
    const s3 = new AWS.S3({ region: 'eu-west-1' });
    const sqs = new AWS.SQS();

    try {
      for (const file of event.Records) {
        const path = file.s3.object.key;
        const params = {
          Bucket: S3_BUCKET,
          Key: path,
        };
        const s3Stream = s3.getObject(params).createReadStream();
        await new Promise((resolve, reject) => {
          s3Stream
            .pipe(csv())
            .on('data', (record) => {
              sqs.sendMessage(
                {
                  QueueUrl: process.env.SQS_URL,
                  MessageBody: record,
                },
                (err, result) => {
                  if (err) {
                    console.error(
                      `Error while sending message to the queue: ${err}`
                    );
                  }
                  console.log(`Message sent without issues`);
                }
              );
            })
            .on('error', (err) => reject(err))
            .on('end', async () => {
              console.log('file succesfully parsed');
              await s3
                .copyObject({
                  Bucket: S3_BUCKET,
                  CopySource: `${S3_BUCKET}/${path}`,
                  Key: path.replace('uploaded', 'parsed'),
                })
                .promise();

              console.log('file succesfully moved to /parsed folder');

              await s3
                .deleteObject({
                  Bucket: S3_BUCKET,
                  Key: path,
                })
                .promise();
              console.log('file succesfully removed from /uploaded folder');

              resolve();
            });
        });
      }

      return responseHelper(202, 'Accepted');
    } catch (err) {
      console.error(err);
      return responseHelper(
        500,
        'Error while executing importFileParser lambda'
      );
    }
  },

  catalogBatchProcess: async function (event) {
    console.log(`catalogBatchProcess lambda called: ${event}`);
  },
};
