export class DefaultLayer {
    get(type: string, sourceId: any) {
        switch (type) {
            case 'Point':
                return this.pointLayer(sourceId);
            case 'Line':
                return this.lineLayer(sourceId);
            case 'LineString':
                return this.lineLayer(sourceId);
            case 'Polygon':
                return this.polygonLayer(sourceId);
            default:
                throw new Error("Unknown Feature Type");
        }
    }

    pointLayer(sourceId: any) {
        return {
            'id': 'point-layer-' + sourceId,
            'type': 'circle',
            'source': sourceId,
            'paint': {
                'circle-radius': 6,
                'circle-color': '#bc0a0a',
                'circle-opacity': 1
            },
            'filter': ['==', '$type', 'Point']
        };
    }

    polygonLayer(sourceId: any) {
        return {
            'id': 'polygon-layer-' + sourceId,
            'type': 'fill',
            'source': sourceId,
            'paint': {
                'fill-color': '#888888',
                'fill-opacity': 1,
                'fill-outline-color': '#100202'
            },
            'filter': ['==', '$type', 'Polygon']
        };
    }

    lineLayer(sourceId: any) {
        return {
            'id': 'line-layer-' + sourceId,
            'type': 'line',
            'source': sourceId,
            'paint': {
                'line-color': '#e7d829',
                'line-width': 2,
                'line-opacity': 1
            },
            'filter': ['==', '$type', 'LineString']
        };
    }
}