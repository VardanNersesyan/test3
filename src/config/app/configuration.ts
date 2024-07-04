import { registerAs } from '@nestjs/config';

export default registerAs('appConf', () => ({
  port: process.env.API_PORT,
  jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  jwtAccessTokenExpiration: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
  jwtRefreshTokenExpiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
}));
