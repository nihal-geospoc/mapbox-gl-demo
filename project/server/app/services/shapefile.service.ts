import db from '../../database/config/db.config';
import { TurfService } from './turf.service';
import { DefaultLayer } from '../utils/default-layers';
import fs from 'fs';
import { feature } from '@turf/turf';
const shp =  require('shpjs');
const uniqueString = require('unique-string');
var that: any;

export class ShapefileService {
    turfService: TurfService;
    defaultLayer: DefaultLayer; 
    constructor() {
        this.turfService = new TurfService();
        this.defaultLayer = new DefaultLayer();
        that = this;
     }

    getGeojsonFromShapefile(file: any) {
        return new Promise((resolve, reject) => {
            fs.readFile(__dirname + file , function (err,data) {
                if (err) {
                    console.log('Read File',err);
                    return reject(err);
                }
                shp(data).then((result: any) => {
                    let mapData = [];
                    if(result instanceof Array){
                        result.forEach((feature) => {
                            let sourceId = uniqueString();
                            let filename = feature.fileName.split('/');
                            feature.fileName = filename[filename.length-1];  
                            let type = that.turfService.getType(feature.features[0]);
                            let layer = that.defaultLayer.get(type, sourceId);
                            mapData.push(that.getMapObject(sourceId, feature, layer));
                        });
                    }else{
                        let type = that.turfService.getType(result.features[0]);
                        let sourceId = uniqueString(); 
                        let layer = that.defaultLayer.get(type, sourceId);
                        mapData.push(that.getMapObject(sourceId, result, layer));
                    }
                    return resolve(mapData);
                }).catch((err: any)=>{
                    console.log('Shape Function',err)
                    return reject(err);
                });
            });
        });
    }

    getMapObject(sourceId: any, source: any, layer: any){
        return {
            sourceId: sourceId,
            source: {
              'type': 'geojson',
              'data': source
            },
            layer: layer
        }
    }
}
