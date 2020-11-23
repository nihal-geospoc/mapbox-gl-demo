import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import mapboxgl from 'mapbox-gl';
import MapData from '../shared/utils/DTO/MapData';
import { MapService } from './map.service';
// import { Observable } from 'rxjs';
// import * as shp from 'shpjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  
  map: mapboxgl.Map;
  mapData: MapData;
  // allLayers: Array<MapData>;
  shapefileForm: FormGroup;
  mapStyleList: Array<any>;
  stylelist: any;
  layersList: Array<any>;
  color: any;
  opacity: number;
  isLayerStyleShown: boolean = false ;
  selectedLayer: any;

  @ViewChild('shapeFileInput', {static: false})
  shapeFileInput: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private mapService: MapService
  ) {
    this.mapStyleList = [
      {
        name: 'Blank',
        id: 'blank',
        url: 'mapbox://styles/nihal29894/cjptp708k5jzv2rpb8rhbd3nl'
      },
      {
        name: 'light-v10',
        id: 'light-v10',
        url: 'mapbox://styles/mapbox/light-v10'
      },
      {
        name: 'outdoors-v11',
        id: 'outdoors-v11',
        url: 'mapbox://styles/mapbox/outdoors-v11'
      },
    ];
    this.layersList = [];
    this.createForm();
    this.opacity = 0;
    // this.getAllLayers();
    // this.initializeMapObject();
  }

  ngOnInit(): void {
    this.initializeMapbox();
  }

  createForm() {
    this.shapefileForm = this.formBuilder.group({
      shapefile: new FormControl(null, [Validators.required]),
    });
  }

  initializeMapbox() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmloYWwyOTg5NCIsImEiOiJjanBvMGp2ajIwODgyNDJtZ2c1aWs2cXIyIn0.5_dUTRDnTQYUm2O7LOuftA';
    this.map = new mapboxgl.Map({
      container: document.getElementById('map'),
      style: 'mapbox://styles/mapbox/light-v10',
      center: [79.094,21.141],
      zoom: 10
    });
    
    // this.map.on('load', () => {
    //   this.addSourceAndAllLayers();
    // });
  }

  // initializeMapObject() {
  //   this.mapData = new MapData({
  //     sourceId: "sourceId",
  //     source: {
  //       'type': 'geojson',
  //       'data': {
  //         'type': 'FeatureCollection',
  //         'features': []
  //       }
  //     },
  //     layers: []
  //   });
  // }

  get form(){
    return this.shapefileForm.controls;
  }

  onFileChange($event) {
    this.shapefileForm.patchValue({
      shapefile: $event.target.files[0]
    });
    this.shapefileForm.get('shapefile').updateValueAndValidity();
  }

  submitShapefileForm(form: NgForm) {
    if(this.shapefileForm.valid){
      this.mapService.uploadShapefile(this.getFormData(), this.layersList.length).subscribe(data =>
        {
          data.forEach(feature => {
            this.map.addSource(feature.sourceId, feature.source);
            this.map.addLayer(feature.layer);
            this.layersList.unshift({ name: feature.source.data.fileName, id: feature.layer.id,
              type: feature.layer.type, sourceId: feature.sourceId});
          });
          this.resetForm(form);
        },
        err => {
          alert("Something went wrong!");
        }
      );
    }
  }

  resetForm(form){
    form.form.markAsPristine();
    form.resetForm();
    this.shapeFileInput.nativeElement.value = "";
  }

  private getFormData(){
    let formData = new FormData();
    formData.append("shapefile", this.shapefileForm.get('shapefile').value);
    return formData;
  }

  // addSourceAndAllLayers() {
  //   this.map.addSource(this.mapData.sourceId, this.mapData.source);
  //     this.mapData.layers.forEach(layer => {
  //       this.map.addLayer(layer);
  //     });
  // }

  // addPoint(input) {
  //   let coordinates = input.value.trim().split(',');
  //   if(coordinates.length == 2) {
  //     let feature = {
  //       'type': 'Feature',
  //       'geometry': {
  //         'type': 'Point',
  //         'coordinates': coordinates
  //       }
  //     }
  //     this.mapData.source.data.features.push(feature);
  //     if(this.mapData.layers.filter( layer => layer.id === 'points-layer').length == 0){
  //       this.addPointLayer();
  //     }
  //     this.map.getSource(this.mapData.sourceId).setData(this.mapData.source.data);
  //     input.value = '';
  //   } else {
  //     alert('Enter point coordinates');
  //   }
  // }

  // addLine(input) {
  //   let points = input.value.trim().split('|');
  //   let coordinates = [];
  //   points.forEach(point => {
  //     coordinates.push(point.trim().split(','));
  //   });
  //   if(coordinates.length >= 2) {
  //     let feature = {
  //       'type': 'Feature',
  //       'geometry': {
  //         'type': 'LineString',
  //         'coordinates': coordinates
  //       }
  //     }
  //     this.mapData.source.data.features.push(feature);
  //     if(this.mapData.layers.filter( layer => layer.id === 'lines-layer').length == 0){
  //       this.addLineLayer();
  //     }
  //     this.map.getSource(this.mapData.sourceId).setData(this.mapData.source.data);
  //     input.value = '';
  //   } else {
  //     alert('Enter minimum two points coordinates');
  //   }
  //   input.value = '';
  // }

  // addPointLayer() {
  //   let pointLayer = {
  //     'id': 'points-layer',
  //     'type': 'circle',
  //     'source': this.mapData.sourceId,
  //     'paint': {
  //       'circle-radius': 6,
  //       'circle-color': 'green'
  //     },
  //     'filter': ['==', '$type', 'Point']
  //   };
  //   this.mapData.layers.push(pointLayer);
  //   this.map.addLayer(pointLayer);
  // }

  // addPolygonLayer() {
  //   let polygonLayer = {
  //     'id': 'polygon-layer',
  //     'type': 'fill',
  //     'source': 'sourceId',
  //     'paint': {
  //       'fill-color': '#888888',
  //       'fill-opacity': 1,
  //       'fill-outline-color': '#6987e0'
  //     },
  //     'filter': ['==', '$type', 'Polygon']
  //     };
  //   this.mapData.layers.push(polygonLayer);
  //   this.map.addLayer(polygonLayer);
  // }

  // addLineLayer() {
  //   let lineLayer = {
  //     'id': 'lines-layer',
  //     'type': 'line',
  //     'source': this.mapData.sourceId,
  //     'paint': {
  //       'line-color': '#888',
  //       'line-width': 2
  //     },
  //     'filter': ['==', '$type', 'LineString']
  //   };
  //   this.mapData.layers.push(lineLayer);
  //   this.map.addLayer(lineLayer);
  // }

  // saveLayer(){
  //   this.mapService.addLayer(this.mapData).then((result)=>{
  //     this.allLayers.push(this.mapData);
  //     alert('Layer added !');
  //   }).catch((error)=>{
  //     alert('Something went wrong');
  //   });
  // }

  // getAllLayers(){
  //   this.mapService.getLayers().then((result: Array<MapData>)=>{
  //     this.allLayers = result;
  //   }).catch((error)=>{
  //     this.allLayers = [];
  //     alert('Something went wrong');
  //   });
  // }

  // loadLayer(layer){
  //   this.mapData = layer;
  //   this.addSourceAndAllLayers();
  // }

  changeMapStyle(style){
    console.log(style);
    // if (this.layersList.filter(layer => layer.id === style.id).length == 0) {
    //   this.layersList.unshift({ name: style.name, id: style.id, type: 'raster', sourceId: style.id});
    //   this.map.addLayer({
    //     id: style.id,
    //     type: 'raster',
    //     source: {
    //       type: 'raster',
    //       tiles: [style.url],
    //       tileSize: 256,
    //     }
    //   });
    // }
  }

  toggleLayer(event){
    if (event.target.checked) {
      this.map.setLayoutProperty(event.target.value, 'visibility', 'visible');
    } else {
      this.map.setLayoutProperty(event.target.value, 'visibility', 'none');
    }
  }

  reorderLayers(index){
    if(index == 0){
      this.map.moveLayer(this.layersList[index].id);
    }else{
      this.map.moveLayer(this.layersList[index].id, this.layersList[index-1].id);
    }
  }

  setColor(){
    this.map.setPaintProperty(this.selectedLayer.id, this.selectedLayer.type+'-color', this.color);
  }

  setOpacity(){
    this.map.setPaintProperty(this.selectedLayer.id, this.selectedLayer.type+'-opacity', this.opacity/100);
  }

  openStyleOptions(layer){
    this.isLayerStyleShown = true;
    if(this.selectedLayer){
      document.getElementById(this.selectedLayer.id).style.outline = '';
    }
    this.selectedLayer = layer;
    document.getElementById(this.selectedLayer.id).style.outline = 'red solid 1px';
    this.color = this.map.getPaintProperty(this.selectedLayer.id, this.selectedLayer.type+'-color');
    this.opacity = this.map.getPaintProperty(this.selectedLayer.id, this.selectedLayer.type+'-opacity') * 100;
  }

  setLayerZoom(layer){
    console.log(layer);
    let source = this.map.getSource(layer.sourceId);
    // let coordinates = source._data.features[0].geometry.coordinates;
    // console.log(coordinates[0]);
    // let bounds = coordinates.reduce(function (bounds, coord) {
    //     return bounds.extend(coord);
    // }, new mapboxgl.LngLatBounds(coordinates[0][0], coordinates[0][0]));

    // this.map.fitBounds(bounds, {
    //     padding: 20
    // });
  }

}
