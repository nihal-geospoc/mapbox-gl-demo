import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import MapData from '../shared/utils/DTO/MapData';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  
  map: mapboxgl.Map;
  mapData: MapData;
  allLayers: Array<MapData>;
  constructor(private mapService: MapService) {
    this.getAllLayers();
    this.initializeMapObject();
  }

  ngOnInit(): void {
    this.initializeMapbox();
  }

  initializeMapbox() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmloYWwyOTg5NCIsImEiOiJjanBvMGp2ajIwODgyNDJtZ2c1aWs2cXIyIn0.5_dUTRDnTQYUm2O7LOuftA';
    this.map = new mapboxgl.Map({
      container: document.getElementById('map'),
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: [102.0, 0.5],
      zoom: 10
    });
    
    this.map.on('load', () => {
      this.addSourceAndAllLayers();
    });
  }

  initializeMapObject() {
    this.mapData = new MapData({
      sourceId: "" + new Date().getTime(),
      source: {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': []
        }
      },
      layers: []
    }); 
  }

  addSourceAndAllLayers() {
    this.map.addSource(this.mapData.sourceId, this.mapData.source);
      this.mapData.layers.forEach(layer => {
        this.map.addLayer(layer);
      });
  }

  addPoint(input) {
    let coordinates = input.value.trim().split(',');
    if(coordinates.length == 2) {
      let feature = {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': coordinates
        }
      }
      this.mapData.source.data.features.push(feature);
      if(this.mapData.layers.filter( layer => layer.id === 'points-layer').length == 0){
        this.addPointLayer();
      }
      this.map.getSource(this.mapData.sourceId).setData(this.mapData.source.data);
      input.value = '';
    } else {
      alert('Enter point coordinates');
    }
  }

  addLine(input) {
    let points = input.value.trim().split('|');
    let coordinates = [];
    points.forEach(point => {
      coordinates.push(point.trim().split(','));
    });
    if(coordinates.length >= 2) {
      let feature = {
        'type': 'Feature',
        'geometry': {
          'type': 'LineString',
          'coordinates': coordinates
        }
      }
      this.mapData.source.data.features.push(feature);
      if(this.mapData.layers.filter( layer => layer.id === 'lines-layer').length == 0){
        this.addLineLayer();
      }
      this.map.getSource(this.mapData.sourceId).setData(this.mapData.source.data);
      input.value = '';
    } else {
      alert('Enter minimum two points coordinates');
    }
    input.value = '';
  }

  addPointLayer() {
    let pointLayer = {
      'id': 'points-layer',
      'type': 'circle',
      'source': this.mapData.sourceId,
      'paint': {
        'circle-radius': 6,
        'circle-color': 'green'
      },
      'filter': ['==', '$type', 'Point']
    };
    this.mapData.layers.push(pointLayer);
    this.map.addLayer(pointLayer);
  }

  addLineLayer() {
    let lineLayer = {
      'id': 'lines-layer',
      'type': 'line',
      'source': this.mapData.sourceId,
      'paint': {
        'line-color': '#888',
        'line-width': 2
      },
      'filter': ['==', '$type', 'LineString']
    };
    this.mapData.layers.push(lineLayer);
    this.map.addLayer(lineLayer);
  }

  saveLayer(){
    this.mapService.addLayer(this.mapData).then((result)=>{
      this.allLayers.push(this.mapData);
      alert('Layer added !');
    }).catch((error)=>{
      alert('Something went wrong');
    });
  }

  getAllLayers(){
    this.mapService.getLayers().then((result: Array<MapData>)=>{
      this.allLayers = result;
    }).catch((error)=>{
      this.allLayers = [];
      alert('Something went wrong');
    });
  }

  loadLayer(layer){
    this.mapData = layer;
    this.addSourceAndAllLayers();
  }
}
