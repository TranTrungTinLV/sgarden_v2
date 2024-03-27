// import { RateLimiterMemory } from "rate-limiter-flexible";
// import { Request, Response, NextFunction } from 'express'

// const rateLimiter = new RateLimiterMemory({
//     points: 3, //đăng ký tối đa 2 lần
//     duration: 60 * 60
// })

// export function rateLimitMiddleware(req: Request, res: Response, next: NextFunction) {
//     console.log(req); // Thêm dòng này để kiểm tra
//     rateLimiter.consume(req.ip)
//       .then(() => {
//         next();
//       })
//       .catch(() => {
//         res.status(429).send('Too many requests, please try again later.');
//       });
// }