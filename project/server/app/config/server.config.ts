'use strict';

import express from 'express';
import cors from 'cors';
import bodyParser from'body-parser';
import morgan from 'morgan';
import routerConfig from './routes.config';

/**
 * Server
 *
 * @class Server
 */
class Server {

    public app: express.Application;  
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.InjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
      return new Server();
    }
  
    /**
     * Constructor
     *
     * @class Server
     * @constructor
     */
    constructor() {

      // Create `Express` application
        this.app = express();
        this.config();
    }

    private config() {

        // Parse application/json
        this.app.use(bodyParser.json());
        // Parse application/x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // Set the static files location /public/img will be /img for users
        this.app.use(express.static(`${__dirname}+../../dist/public`));

        this.app.use(morgan('dev'));
        this.app.use(cors());

        routerConfig(this.app);

        // Error
        this.app.use(function (req: express.Request,
                            res:express.Response,
                            next: express.NextFunction) {
            let url = function() {
                return req.protocol + "://" + req.get('host') + req.originalUrl;
            }
            // Error goes via `next()` method
            setImmediate(() => {
                next(new Error('Something went wrong'));
            });
        });
        
        // Catch `404` and forward to `error` handler
        this.app.use(function(err: any,
                            req: express.Request,
                            res: express.Response,
                            next: express.NextFunction) {
            console.error(err.message);
            if (!err.statusCode) 
                err.statusCode = 500;
                res.status(err.statusCode).send(err.message);
        });
    }
}

let server = Server.bootstrap();
export = server.app;