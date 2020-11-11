import * as express from 'express';
import { GeometryService } from '../services/geometry.service';
import { ErrorDTO } from '../DTO/ErrorDTO';

const BASE_URI = '/geometry';

module GeometryModule {
    export class GeometryController {
        geometryService: GeometryService;
        router: express.Router;
        constructor(router: express.Router) {
            this.geometryService = new GeometryService();
            this.router = router;
            this.configureController();
        }

        private configureController() {

            // Configure routes

            this.router.get(`${BASE_URI}/length-of-line-string/:gid/:options?`, (req: express.Request,
                res: express.Response, next: express.NextFunction) => {
                let gid = parseInt(req.params.gid);
                let options = req.params.options;
                this.geometryService.lengthOfLineString(gid, options).then((result: any) => {
                    res.status(200).send({ length: result });
                }).catch(e => {
                    let error = new ErrorDTO(e);
                    res.status(500).json(error);
                });
            });

            this.router.get(`${BASE_URI}/area-of-polygon/:gid`, (req: express.Request,
                res: express.Response, next: express.NextFunction) => {
                let gid = parseInt(req.params.gid);
                this.geometryService.areaOfPolygon(gid).then((result: any) => {
                    res.status(200).send({ area: result });
                }).catch(e => {
                    let error = new ErrorDTO(e);
                    res.status(500).json(error);
                });
            });

        }
    }
}

export = GeometryModule;
