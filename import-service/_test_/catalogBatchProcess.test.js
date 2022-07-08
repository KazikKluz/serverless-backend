const AWSMock = require('aws-sdk-mock');
const { importProductsFile } = require('../handler');

describe('testing catalogBatchProcess', () => {
  afterEach(() => {
    AWSMock.restore('SNS');
  });

  it('Should work correctly', async () => {
    AWSMock.mock('S3', 'getSignedUrl', `https://${testUrl}`);

    const event = {
      queryStringParameters: { name: testUrl },
    };

    const res = await importProductsFile(event, null, null);
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.body)).toEqual({ signedUrl: `https://${testUrl}` });
  });

  it('Should handle error', async () => {
    const error = 'Error while retrieving signedUrl from AWS';
    AWSMock.mock('S3', 'getSignedUrl', () => {
      throw new Error(error);
    });
    const event = {
      queryStringParameters: { name: testUrl },
    };

    const res = await importProductsFile(event, null, null);

    expect(res.statusCode).toEqual(500);
    expect(JSON.parse(res.body)).toEqual(error);
  });
});
