import express, { Express } from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
import passport from 'passport';
import APIError from './utils/APIError';
import router from './routes';
const createExpressApp=():Express=>{
    try{
        const app=express();
        app.disable('x-powered-by')
        app.use(express.json());
        app.use(express.urlencoded({extended:true}));
        app.use(cors());
        // app.use(timeout('15s'));
        app.use(passport.initialize());
        // app.use(morgan('combined', { stream, immediate: true }));

        app.get('/favicon.ico', (req, res) => res.status(204));

    // Application API Routes
    app.use('/api', router);

    // Handle invalid routes
    app.get('*', (req, res, next) => {
      next(new APIError('Invalid API path', httpStatus.NOT_FOUND));
    });
    return app;
    }catch (err) {
        if (err instanceof Error) console.log(err.message);
        throw err;
      }
}

export default createExpressApp;