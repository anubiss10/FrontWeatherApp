import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

declare const google: any;

@Component({
  selector: 'app-location-autocomplete',
  templateUrl: './location-autocomplete.component.html',
  styleUrls: ['./location-autocomplete.component.css']
})
export class LocationAutocompleteComponent implements OnInit {
  locationControl = new FormControl('');
  filteredOptions: Observable<any[]> = new Observable<any[]>();

  constructor() { }

  ngOnInit() {
    this.initializeAutocomplete();
  }

  private initializeAutocomplete(): void {
    const input = document.getElementById('location') as HTMLInputElement;
    if (input) {
      const autocomplete = new google.maps.places.Autocomplete(input, { types: ['address'] });
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          console.log('Selected Place:', place.formatted_address);
        }
      });
    }
  }
}
