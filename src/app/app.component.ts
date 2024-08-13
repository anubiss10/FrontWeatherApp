import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { 
  title = 'rou'; 
  //Local Variable defined 
  formattedaddress=" "; 
  options={ 
    componentRestrictions:{ 
      country:["AU"] 
    } 
  } 
  public AddressChange(address: any) { 
  //setting address from API to local variable 
   this.formattedaddress=address.formatted_address 
} 
constructor(private translate: TranslateService) {
  // Configura el idioma por defecto
  translate.setDefaultLang('es');
}

changeLanguage(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const selectedLang = selectElement.value;
  this.translate.use(selectedLang);
}

} 