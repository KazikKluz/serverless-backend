'use strict';

module.exports = {
  basicAuthorizer: async function (event, _, callback) {
    console.log(`Event: ${JSON.stringify(event)}`);

    if (event['type'] != 'TOKEN') {
      callback('Unauthorized');
    }

    try {
      const authorization_token = event.authorizationToken.substring(6);

      const buff = Buffer.from(authorization_token, 'base64');
      const plainCreds = buff.toString('utf-8').split(':');
      const username = plainCreds[0];
      const password = plainCreds[1];

      console.log(`username: ${username} and password: ${password}`);

      const storedUserPassword = process.env[username];

      const effect =
        !storedUserPassword || storedUserPassword != password
          ? 'Deny'
          : 'Allow';

      const policy = {
        principalId: authorization_token,
        policyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Action: 'execute-api:Invoke',
              Effect: effect,
              Resource: event.methodArn,
            },
          ],
        },
      };
      callback(null, policy);
    } catch (err) {
      callback(`Unauthorized: ${err.message}`);
    }
  },
};
