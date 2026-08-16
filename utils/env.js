import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  BASE_URL: process.env.BASE_URL,
  REGISTER_URL: process.env.REGISTER_URL,
  LOCATION_URL: process.env.LOCATION_URL,
  USERNAME: process.env.TEST_USERNAME,
  PASSWORD: process.env.TEST_PASSWORD,
};
