import { UNAUTHORIZED } from 'http-status';

export const handler = async (event: any, _context: any, callback: any) => {
  console.log('BASIC AUTHORIZER:\n', JSON.stringify(event, null, 2));

  const { authorizationToken, methodArn, type } = event;

  if (type !== 'TOKEN' || !authorizationToken) callback(UNAUTHORIZED);

  const token = authorizationToken.split(' ')[1];
  const [username, password] = Buffer
    .from(token, 'base64')
    .toString('utf8')
    .split(':');
  const secret = process.env[username];

  const effect = (username && password) && (password === secret) 
    ? 'Allow'
    : 'Deny';

  const policy = {
    principalId: token,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: methodArn,
        },
      ],
    },
  };

  console.log('BASIC AUTHORIZER POLICY:\n', JSON.stringify(policy, null, 2));

  callback(null, policy);
};
