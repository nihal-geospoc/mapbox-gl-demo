
import * as express from 'express';

import { MapboxController } from '../controllers/mapbox.controller';
import { TurfController } from '../controllers/turf.controller';
import { GeometryController } from '../controllers/geometry.controller';
import { ShapefileController } from '../controllers/shapefile.controller';

const multer = require('multer');
const DIR = './shapefiles'

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, callback: any) => {
      callback(null, DIR);
    },
    filename: (req: express.Request, file: Express.Multer.File, callback: any) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      callback(null, fileName.substring(0, fileName.length-4))
    }
});
let upload = multer({
    storage: storage,
    limits: {
    fileSize: 1024 * 1024 * 30
    },
    fileFilter: (req: Request, file: Express.Multer.File, callback: any) => {
      callback(null, true);
    }
});

export default function routerConfig(app: express.Application) {

  let router: express.Router;
  router = express.Router();

  //Define routes
  let mapboxController: MapboxController = new MapboxController(router);
  let turfController: TurfController = new TurfController(router);
  let lineController: GeometryController = new GeometryController(router);
  let shapefileController: ShapefileController = new ShapefileController(router, upload);

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
