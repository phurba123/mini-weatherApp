import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  public cityName:string;
  public cityData:any;

  // tracking not found
  public dataIsFound:boolean=true;

  public currentImg:any;

  // controlling input visibility ,hide or show
  public showCityInput:boolean=true;

  constructor(private app:AppService) { }

  ngOnInit() {
  }

  public getName()
  {
    console.log(this.cityName)
  }

  public keyEnterPressed()
  {
    this.dataIsFound = true;
    console.log(this.cityName);

    if(this.cityName)
    {
      this.app.getWeatherData(this.cityName).subscribe((res)=>
      {

        if(res['cod']===200)
        {
          console.log(res)
          this.cityData = res;

          // make url for weather icon
          this.currentImg=`http://openweathermap.org/img/wn/${this.cityData.weather[0].icon}@2x.png`

          // clear cityname 
          this.cityName=null;
        }
      },
      (err)=>
      {
        if(err.status === 404)
        {
          console.log('not found');
          console.log(err['cod']);
          this.dataIsFound = false;
        }
      })
    }
  }

}
