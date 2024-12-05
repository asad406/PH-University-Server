import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const message = err.message || "Something went wrong";
    // const statusCode = 500
    res.status(httpStatus.NOT_FOUND as number).json({
        success: false,
        message,
        error: err,
    })
};

export default globalErrorHandler;