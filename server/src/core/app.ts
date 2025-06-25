import cors from 'cors';
import express from 'express';
import { CLIENT } from '@/config';
import cookieParser from 'cookie-parser';
import { allRoutes } from '@/routes/router';

// types
import { Nezto } from './nezto';
import { ResponseHandler } from './ext/response';

// middlewares
import { injector } from '@/middlewares/injector';


declare module 'express-serve-static-core' {
  interface Application {
    nezto: Nezto;
  }

   interface Response {
    handler: ResponseHandler;
  }
}


const app = express();
app.use(
  cors({
    origin: CLIENT.origin,
    credentials: true, // Crucial if your frontend sends cookies or auth tokens
  }),
);


app.use(injector); // inject nezto instance into request object
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

// mounted all routes
app.use('/', allRoutes);
export { app };
