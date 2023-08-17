import { Component, OnInit,ElementRef, Renderer2, ViewChild, AfterViewInit  } from '@angular/core';
import * as Leaflet from 'leaflet';
import 'leaflet-control-geocoder';



Leaflet.Icon.Default.imagePath = 'assets/';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  popupContent:any=[]
  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options: Leaflet.MapOptions = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 16,
    center: { lat: 28.626137, lng: 79.821603 }
  };
  @ViewChild('container', { static: true }) container!: ElementRef;


   constructor(private renderer: Renderer2, private elementRef: ElementRef) { 
}

  ngOnInit(): void {
    // console.log("location"+this.getGeoLocation)
  }

  initMarkers() {
    const initialMarkers = [
      {
        position: { lat: 35.627560107770776, lng: 10.765265822410585 },
        draggable: false
      },
      {
        position: { lat: 35.82001853222029 , lng: 10.592751502990723 },
        draggable: false
      },
      {
        position: { lat: 35.829887589308406 , lng: 10.590021014213564 },
        draggable: true
      }
    ];
    
    this.popupContent = [
      `<div align='center'>
      <a class="btn btn-primary button-raised partner-link" id='confirm' onclick="${this.getlocation()}"">
       read me</a>
        <p style='font-size:14px;margin: 5px'>darna</p>
        <img style="height: 60px; width: 60px; margin: 0"  src="assets/images/avatar.jpg">
      </div>
      `,
      "<b>position teamdev</b>",
      "<b>position epi</b>"
    ];
  

    for (let index = 0; index < initialMarkers.length; index++) {
      const data = initialMarkers[index];
      const marker = this.generateMarker(data, index);
      
      marker.addTo(this.map).bindPopup(this.popupContent[index]) 
       .on("popupopen", () => {
        this.elementRef.nativeElement
          .querySelector("#confirm")
          .addEventListener("click", (e: any) => {
            this.textClick()
          });
      });
      
      this.map.panTo(data.position);
      this.markers.push(marker);
    }
  }

  textClick(){
    console.log('ffffffffffffffff');
    
  }
  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  onMapReady($event: any) {
    this.map = $event;
    this.initMarkers();
  }

  async mapClicked($event: any) {
    console.log("---------mapClicked",$event.latlng.lat, $event.latlng.lng);
     const address = await this.getAddress($event.latlng.lat, $event.latlng.lng);
    //const address = await this.getGeoLocation($event.latlng.lat, $event.latlng.lng);
    console.log(address)
  }

  markerClicked($event: any, index: number) {
    console.log("markerClicked-----------------",$event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log("markerDragEnd--------------",$event.target.getLatLng());
  } 

//Geocoder: Avec l'API Geocoding, vous utilisez des adresses pour placer des repères sur une carte ou pour convertir un repère sur une carte en adresse.
//  Ce service est conçu pour géocoder des adresses statiques prédéfinies pour placer le contenu d'une application sur une carte.
  getAddress(lat: number, lng: number) {
    const geocoder = (Leaflet.Control as any).Geocoder.nominatim();
    return new Promise((resolve, reject) => {
        geocoder.reverse(
            { lat, lng },
            this.map.getZoom(),
            (results: any) => results.length ? resolve(results[0].name) : reject(null)
        );
    })
  }
   getlocation(){
    console.log("leaftleft")
  }

}


