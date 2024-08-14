import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { 
  title = 'rou'; 
  formattedaddress=" "; 
  options={ 
    componentRestrictions:{ 
      country:["AU"] 
    } 
  } 
  public AddressChange(address: any) { 
   this.formattedaddress=address.formatted_address 
} 
constructor(private translate: TranslateService) {
  translate.setDefaultLang('es');
}

changeLanguage(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const selectedLang = selectElement.value;
  this.translate.use(selectedLang);
}

} 