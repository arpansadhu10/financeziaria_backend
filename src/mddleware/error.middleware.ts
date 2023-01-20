import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import { ValidationError } from 'joi';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import APIError from '../utils/APIError';

// const isDevelopment = process.env.NODE_ENV === 'development';
const isDevelopment = false;

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  // Check for JWT authentication error from passport
  if (err?.name === 'AuthenticationError') {
    console.log(err.message);

    res.status(httpStatus.UNAUTHORIZED).json({
      message: 'Unauthorized request',
      code: httpStatus.UNAUTHORIZED,
      stack_trace: isDevelopment ? err?.stack : undefined,
    });
  } else if (err instanceof JsonWebTokenError) {
    console.log(err.message);

    res.status(httpStatus.UNAUTHORIZED).json({
      message: 'Unauthenticated request',
      code: httpStatus.UNAUTHORIZED,
      stack_trace: isDevelopment ? err?.stack : undefined,
    });
  } else if (err instanceof TokenExpiredError) {
    console.log(err.message);

    res.status(httpStatus.UNAUTHORIZED).json({
      message: 'Token expired',
      code: httpStatus.UNAUTHORIZED,
      stack_trace: isDevelopment ? err?.stack : undefined,
    });
  }

  // Check for validation error from Joi
  else if (err?.error instanceof ValidationError) {
    const error = err?.error as ValidationError;

    console.log(error.message);
    console.log(JSON.stringify(error.details, null, 2));

    res.status(httpStatus.BAD_REQUEST).json({
      message: error?.message ?? 'Something went wrong',
      code: httpStatus.BAD_REQUEST,
      stack_trace: isDevelopment ? err?.stack : undefined,
      data: isDevelopment ? { error: error?.details } : undefined,
    });
  } else if (err instanceof APIError) {
    console.log(err.message);

    res.status(err.status).json({
      message: err.message,
      code: err.status,
      stack_trace: isDevelopment ? err?.stack : undefined,
    });
  } else if (err instanceof Error) {
    console.log(err.message);

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
      code: httpStatus.INTERNAL_SERVER_ERROR,
      stack_trace: isDevelopment ? err?.stack : undefined,
    });
  }

  // eslint-disable-next-line
  if (isDevelopment) console.error(err);

  next();
};

export default errorHandler;
