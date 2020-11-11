import * as express from 'express';
import { TurfService } from '../services/turf.service';
import { ErrorDTO } from '../DTO/ErrorDTO';

const BASE_URI = '/turf';

module TurfModule {
    export class TurfController {
        turfService: TurfService;
        router: express.Router;
        constructor(router: express.Router) {
            this.turfService = new TurfService();
            this.router = router;
            this.configureController();
        }

        private configureController() {

            // Configure routes
            this.router.get(`${BASE_URI}/point-along-line-string/:coordinates/:distance/:options?`, (req: express.Request,
                res: express.Response, next: express.NextFunction) => {
                let coordinates = JSON.parse(req.params.coordinates);
                let distance = parseInt(req.params.distance);
                let options = req.params.options;
                this.turfService.pointAlongStringLine(coordinates, distance, options).then( (result: any) => {
                    res.status(200).send(result);
                }).catch( e => {
                    let error = new ErrorDTO(e);
                    res.status(500).json(error);
                });
            });

            this.router.get(`${BASE_URI}/area-of-polygon/:coordinates`, (req: express.Request,
                res: express.Response, next: express.NextFunction) => {
                let coordinates = JSON.parse(req.params.coordinates); 
		        this.turfService.areaOfPolygon(coordinates).then( (result: any) => {
                    res.status(200).send({area: result});
                }).catch( e => {
                    let error = new ErrorDTO(e);
                    res.status(500).json(error);
                });
            });

            this.router.get(`${BASE_URI}/bbox-line-string/:coordinates`, (req: express.Request,
                res: express.Response, next: express.NextFunction) => {
                let coordinates = JSON.parse(req.params.coordinates); 
		        this.turfService.bboxLineString(coordinates).then( (result: any) => {
                    res.status(200).send({bbox: result});
                }).catch( e => {
                    let error = new ErrorDTO(e);
                    res.status(500).json(error);
                });
            });

            this.router.get(`${BASE_URI}/bbox-polygon/:coordinates`, (req: express.Request,
                res: express.Response, next: express.NextFunction) => {
                let coordinates = JSON.parse(req.params.coordinates); 
		        this.turfService.bboxPolygon(coordinates).then( (result: any) => {
                    res.status(200).send({bbox: result});
                }).catch( e => {
                    let error = new ErrorDTO(e);
                    res.status(500).json(error);
                });
            });

        }
    }
}

export = TurfModule;
