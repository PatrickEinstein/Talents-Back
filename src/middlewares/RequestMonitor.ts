import { RequestHandler, Request, Response, NextFunction } from "express";

const RequestMonitor: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const originalSend = res.send;

  let responseBody: any;

  res.send = function (body: any) {
    responseBody = body;
    return originalSend.apply(this, arguments as any);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log({
      route: req.route?.path,
      method: req.method,
      headers: req.headers,
      request: req.body,
      response: responseBody,
      statusCode: res.statusCode,
      timeToComplete: duration,
    });
  });

  next();
};

export default RequestMonitor;
