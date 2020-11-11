import db from '../../database/config/db.config';

export class GeometryService {
    constructor() { }

    lengthOfLineString(gid: number, options?: any) {
        return new Promise((resolve, reject) => {
            db.sequelize.query(
                "SELECT ST_Length(geom) FROM line WHERE gid = ?;",
                { replacements: [gid], type: db.sequelize.QueryTypes.SELECT }
            ).then((result: any) => {
                return resolve(result);
            }).catch((error: any) => {
                console.log(error);
                return reject(error);
            });
        });
    }

    areaOfPolygon(gid: number) {
        return new Promise((resolve, reject) => {
            db.sequelize.query(
                "SELECT ST_Area(geom) FROM line WHERE gid = ?;",
                { replacements: [gid], type: db.sequelize.QueryTypes.SELECT }
            ).then((result: any) => {
                return resolve(result);
            }).catch((error: any) => {
                console.log(error);
                return reject(error);
            });
        });
    }
}
