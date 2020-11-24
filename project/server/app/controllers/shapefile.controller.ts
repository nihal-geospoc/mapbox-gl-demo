import * as express from 'express';
import { ShapefileService } from '../services/shapefile.service';
import { ErrorDTO } from '../DTO/ErrorDTO';

const BASE_URI = '/shapefile';

module ShapefileModule {
    export class ShapefileController {
        shapefileService: ShapefileService;
        router: express.Router;
        upload: any;
        constructor(router: express.Router, upload: any) {
            this.shapefileService = new ShapefileService();
            this.router = router;
            this.upload = upload;
            this.configureController();
        }

        private configureController() {

            // Configure routes

            this.router.post(`${BASE_URI}/upload`,this.upload.single('shapefile'), (req: express.Request,
                res: express.Response, next: express.NextFunction) => {
                    const filePath = '/../../shapefiles/'+req.file.filename;
                    this.shapefileService.getGeojsonFromShapefile(filePath).then((result: any)=>{
                        res.send(result);
                    }).catch((e: any)=>{
                        let error = new ErrorDTO(e);
                        res.status(500).json(error);
                    });
                }
            );
        }
    }
}

export = ShapefileModule;
