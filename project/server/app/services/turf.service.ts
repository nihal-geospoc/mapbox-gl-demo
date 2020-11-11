import * as turf from '@turf/turf';

export class TurfService {
    constructor() {}

    pointAlongStringLine(coordinates: Array<any>, distance: number, options? : any){
        return new Promise((resolve, reject)=>{
            try{
                let line = turf.lineString(coordinates);
                if(!options){
                    options = {units: 'miles'};
                }
                return resolve(turf.along(line, distance, options));
            }catch(error: any){
                console.log(error);
                return reject(error);
            }
        });
    }

    areaOfPolygon(coordinates: Array<any>){
        return new Promise((resolve, reject)=>{
            try{
                let polygon = turf.polygon(coordinates);
                let area = turf.area(polygon);
                return resolve(area);
            }catch(error: any){
                console.log(error);
                return reject(error);
            }
        });
    }

    bboxLineString(coordinates: Array<any>){
        return new Promise((resolve, reject)=>{
            try{
                let line = turf.lineString(coordinates);
                let bbox = turf.bbox(line);
                let bboxPolygon = turf.bboxPolygon(bbox);
                return resolve(bboxPolygon);
            }catch(error: any){
                console.log(error);
                return reject(error);
            }
        });
    }

    bboxPolygon(coordinates: Array<any>){
        return new Promise((resolve, reject)=>{
            try{
                let polygon = turf.polygon(coordinates);
                let bbox = turf.bbox(polygon);
                let bboxPolygon = turf.bboxPolygon(bbox);
                return resolve(bboxPolygon);
            }catch(error: any){
                console.log(error);
                return reject(error);
            }
        });
    }
}
