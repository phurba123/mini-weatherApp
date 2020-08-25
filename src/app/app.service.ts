import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private uri=
  {
    url:'http://api.openweathermap.org/data/2.5/weather?units=metric',
    appid:'dfd36c4de9d260174824d27124e50c72'
  }

  public url:'http://api.openweathermap.org/data/2.5/weather?units=metric&appid=dfd36c4de9d260174824d27124e50c72'

  constructor(private http:HttpClient) { }

  //getting weather for certain city
  public getWeatherData(city)
  {
    return this.http.get(`${this.uri.url}&q=${city}&appid=${this.uri.appid}`);
  }
}
