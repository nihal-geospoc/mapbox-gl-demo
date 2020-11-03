
import * as express from 'express';

import { MapboxController } from '../controllers/mapbox.controller';


export default function routerConfig(app: express.Application) {

  let router: express.Router;
  router = express.Router();

  //Define routes
  let mapboxController: MapboxController = new MapboxController(router);

  // All of our routes will be prefixed with /api
  app.use('/api', router);

  // Serve static front-end assets
  app.use(express.static('/dist/public'));

  // Route to handle all Angular requests
  app.get('*', (req, res) => {
    // Load our src/app.html file
    //** Note that the root is set to the parent of this folder, ie the app root **
    // res.sendFile('./index.html', { root: __dirname});
  
    res.status(404).send({message: 'Not Found'});
  });

  // Use `router` middleware
  app.use(router);
};
