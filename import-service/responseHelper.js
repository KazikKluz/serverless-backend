function responseHelper(code, data) {
  return {
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    },
    statusCode: code,
    body: JSON.stringify(data),
  };
}

module.exports = {
  responseHelper,
};
