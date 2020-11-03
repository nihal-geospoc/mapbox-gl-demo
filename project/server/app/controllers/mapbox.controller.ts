import * as express from 'express';
import { MapboxService } from '../services/mapbox.service';
import { ErrorDTO } from '../DTO/ErrorDTO';


const BASE_URI = '/mapbox';

module MapboxModule {
    export class MapboxController {
        mapboxService: MapboxService;
        router: express.Router;
        constructor(router: express.Router) {
            this.mapboxService = new MapboxService();
            this.router = router;
            this.configureController();
        }

        private configureController() {

            // Configure routes
            this.router.post(`${BASE_URI}/add-layer`, (req: express.Request,
                res: express.Response,
                next: express.NextFunction) => {
                this.mapboxService.addLayer(req.body).then((result)=>{
                    res.status(200).send(result);
                }).catch((e)=>{
                    let error = new ErrorDTO(e);
                    console.log(e)
                    res.status(500).json(error);
                });
            });

            this.router.get(`${BASE_URI}/get-layer`, (req: express.Request,
                res: express.Response, next: express.NextFunction) => {
                this.mapboxService.getSource().then( (result: any) => {
                    let { rows } = result;
                    res.status(200).send(result);
                }).catch( e => {
                    let error = new ErrorDTO(e);
                    res.status(500).json(error);
                });
            });

        }
    }
}

export = MapboxModule;