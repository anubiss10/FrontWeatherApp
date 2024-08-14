import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common'; // Importar DatePipe

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers: [DatePipe] // Añadir DatePipe a los proveedores del componente
})
export class WeatherComponent implements AfterViewInit {
  weatherData: any[] = []; // Cambiar a un array para manejar múltiples días
  location: string = '';
  startDate: string = '';
  endDate: string = '';
  isOneWay: boolean = false;
  hideEndDate: boolean = false; // Nueva propiedad para controlar la visibilidad de la fecha de vuelta
  weatherDataLoaded: boolean = false;
  currentLanguage: string = 'es'; // Idioma por defecto
  autocomplete: any; // Definir la propiedad autocomplete
  showToast: boolean = false; // Para controlar la visibilidad del toast
  toastMessage: string = '';  // Mensaje del toast
  displayedStartDate: string = '';
  displayedEndDate: string = '';
  // Mapa de condiciones a nombres de iconos personalizados
  conditionToIconMap: { [key: string]: string } = {
    'clear-day': 'clear-day.svg',
    'clear-night': 'clear-night.svg',
    'rain': 'rain.svg',
    'snow': 'snow.svg',
    'sleet': 'sleet.svg',
    'wind': 'wind.svg',
    'fog': 'fog.svg',
    'cloudy': 'cloudy.svg',
    'partly-cloudy-day': 'partly-cloudy-day.svg',
    'partly-cloudy-night': 'partly-cloudy-night.svg',
    'hail': 'hail.svg',
    'thunderstorm': 'thunderstorm.svg',
    'tornado': 'tornado.svg',
    'snow-showers-day': 'snow-showers-day.svg',
    'snow-showers-night': 'snow-showers-night.svg',
    'thunder-rain': 'thunder-rain.svg',
    'thunder-showers-day': 'thunder-showers-day.svg',
    'thunder-showers-night': 'thunder-showers-night.svg',
    'showers-day': 'showers-day.svg',
    'showers-night': 'showers-night.svg'
  };

  constructor(private http: HttpClient, private translate: TranslateService, private datePipe: DatePipe) {
    this.translate.setDefaultLang('es'); // Idioma por defecto
    this.translate.use(this.currentLanguage); // Idioma inicial
  }

  ngAfterViewInit() {
    this.initAutocomplete();
  }

  initAutocomplete() {
    if (typeof google !== 'undefined' && google.maps && google.maps.places) {
      const input = document.getElementById('location') as HTMLInputElement;
      if (input) {
        this.autocomplete = new google.maps.places.Autocomplete(input, {
          types: ['geocode']
        });

        this.autocomplete.addListener('place_changed', () => {
          const place = this.autocomplete.getPlace();
          if (place.geometry) {
            this.location = place.formatted_address;
          } else {
            this.location = '';
          }
        });
      }
    } else {
      console.error('Google Maps API not loaded');
    }
  }

  getWeather() {
    if (!this.location) {
      this.showToastMessage('Por favor, seleccione una ubicación.');
      return;
    }

    if (!this.startDate) {
      this.showToastMessage('Por favor, seleccione una fecha de ida.');
      return;
    }

    this.weatherData = [];
    this.weatherDataLoaded = false;

    const start = new Date(this.startDate);
    const end = new Date(this.endDate || this.startDate);

    const requests = [];
    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
      const url = `{{YOUR-BACKEND-URL}}/{YOUR-ENDPOINT}}?location=${this.location}&date=${formattedDate}`;
      requests.push(this.http.get(url).toPromise());
    }

    // Ejecutar todas las peticiones
    Promise.all(requests).then(responses => {
      this.weatherData = responses;
      this.weatherDataLoaded = true;

      // Actualizar las fechas mostradas en el <h3> solo después de obtener los datos del clima
      this.displayedStartDate = this.startDate;
      this.displayedEndDate = this.endDate || this.startDate;
    }).catch(error => {
      this.weatherDataLoaded = true;
      console.error('Error fetching weather data', error);
    });
  }
  

  getIcon(icon: string): string {
    return `assets/custom-icons/${this.conditionToIconMap[icon] || 'default.svg'}`;
  }

  translateCondition(condition: string): string {
    //  translate.instant para obtener la traducción inmediata
    let translatedCondition = this.translate.instant(`weather.${condition}`);
    return translatedCondition !== `weather.${condition}` ? translatedCondition : condition;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'dd/MM/yyyy') || dateString;
  }

  onOneWayChange() {
    // Si el viaje es solo de ida, oculta el campo de fecha de vuelta
    if (this.isOneWay) {
      this.endDate = ''; // Limpiar la fecha de vuelta si se marca como solo ida
    }
  }

  onStartDateChange() {
    if (this.startDate === this.endDate) {
      this.hideEndDate = true;
      this.endDate = '';
    } else {
      this.hideEndDate = false;
    }
  }

  onEndDateChange() {
    if (new Date(this.endDate) < new Date(this.startDate)) {
      this.endDate = '';
    }
  }
  showToastMessage(message: string) {
    console.log('Toast message:', message); 
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000); // Ocultar el toast después de 3 segundos
  }
  
}
