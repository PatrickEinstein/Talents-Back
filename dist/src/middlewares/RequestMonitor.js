const RequestMonitor = (req, res, next) => {
    const start = Date.now();
    const originalSend = res.send;
    let responseBody;
    res.send = function (body) {
        responseBody = body;
        return originalSend.apply(this, arguments);
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
