// import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

// const createToken = (
//   payload: Record<string, unknown>,
//   secret: Secret,
//   expireTime: string
// ): string => {
//   return jwt.sign(payload, secret, {
//     expiresIn: expireTime,
//   });
// };

// const verifyToken = (token: string, secret: Secret): JwtPayload => {
//   return jwt.verify(token, secret) as JwtPayload;
// };

// export const jwtHelpers = {
//   createToken,
//   verifyToken,
// };

import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  'Creates a JSON Web Token (JWT)';
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  'Verifies a JSON Web Token (JWT)';
  const payload = jwt.verify(token, secret);
  return payload as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
