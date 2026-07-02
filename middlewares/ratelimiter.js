// import rateLimit from 'express-rate-limit';
import { rateLimit } from 'express-rate-limit'


export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max:1000, // max 100 requests per IP per 15 mins
  message: 'Too many requests. Please try again later.'
});
