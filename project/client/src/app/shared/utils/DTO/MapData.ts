export default class MapData {
    sourceId: string;
    source: Source;
    layers: Array<Layer>;

    constructor(mapData){
        this.sourceId = mapData.sourceId || new Date().toDateString();
        this.source = mapData.source || new Source();
        this.layers = mapData.layers || [];
    }
}
  
export class Layer {
    id: string;
    type: string;
    source: string;
    paint: any;
    filter: Array<string>;
}
  
export class Source {
    type: string;
    data: {
      type: string;
      features: Array<Feature>;
    }
}
  
export class Feature {
    type: string;
    geometry: Geometry
}
  
export class Geometry {
    type: string;
    coordinates: Array<any>
}