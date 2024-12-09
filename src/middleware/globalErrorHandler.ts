import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interfaces/error";
import config from "../config";
import handleZodError from "../errors/handleZodError";


const globalErrorHandler: ErrorRequestHandler = (
    err,
    req,
    res,
    next
) => {
    let statusCode = err.statusCode || 500
    let message = err.message || "Something went wrong";

    //setting default values    

    let errorSources: TErrorSource = [{
        path: '',
        message: 'Something went wrong'
    }]
   

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config.NODE_ENV === 'development' ? err?.stack : null

    })
};

export default globalErrorHandler;