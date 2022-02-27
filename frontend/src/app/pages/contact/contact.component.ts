import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initMap();
  }

  send() {
    this.contactForm.markAllAsTouched();

    if (!this.contactForm.valid) {
      return;
    }

    const body = this.contactForm.value;
    // TODO: Send body to the server
  }

  initMap() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiYWJlbHRvdGgiLCJhIjoiY2tqdWYwbmFvNDg2cjJ6cW85ZTllZWY0ayJ9.KRM8CaTxmraeTxfQEXxuVg';
    let map = new mapboxgl.Map({
      container: 'map',
      center: [19.045033, 47.50576],
      zoom: 3.5,
      maxZoom: 10,
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
    });
    let marker = new mapboxgl.Marker({
      color: '#ffc100',
    })
      .setLngLat([19.045033, 47.50576])
      .addTo(map);
  }
}
