import db from '../../database/config/db.config';

export class MapboxService {
    constructor() {}

    getSource(){
        return new Promise((resolve, reject)=>{
            db.Layer.findAll()
                .then((data: any) => {
                    return resolve(data);
                }).catch((err: any) => {
                    return reject(err);
            });
        });
    }

    addLayer(data: any){
        return new Promise((resolve, reject)=>{
            db.Layer.create(data).then((newLayer: any)=>{
                return resolve(newLayer);
            }).catch((error: any) =>{
                return reject(error);
            });
        });
    }
}
