// src/app/weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl = 'https://travelcraft-4jl8.onrender.com//weather'; // URL de tu backend de Spring Boot

  constructor(private http: HttpClient) { }

  getWeather(location: string, date: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?location=${location}&date=${date}`);
  }
}
