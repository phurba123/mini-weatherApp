import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  // to store the current panel no
  @Input() public panelNo: any;

  public cityName: string;
  public cityData: any;

  // tracking not found
  public dataIsFound: boolean = true;

  public errorMsg: string;

  public currentImg: any;

  // controlling input visibility ,hide or show
  public showCityInput: boolean = true;

  constructor(private app: AppService) { }

  ngOnInit() {
    console.log('panel no : ', this.panelNo);

    // get data from local storage
    this.cityData = this.getSavedData();

    // if city data is present then hide input field for city
    this.hideCityInput();

  }

  public hideCityInput() {
    if (this.cityData) {
      this.showCityInput = false;
    }
  }

  // public getName()
  // {
  //   console.log(this.cityName)
  // }

  public keyEnterPressed() {

    if (this.cityName) {
      this.dataIsFound = true;
      console.log(this.cityName);

      this.cityData = null;
      this.removeSavedData()


      this.app.getWeatherData(this.cityName).subscribe((res) => {

        if (res['cod'] === 200) {
          console.log(res)
          this.cityData = res;

          this.savedData(this.panelNo, this.cityData)

          // make url for weather icon
          this.currentImg = `http://openweathermap.org/img/wn/${this.cityData.weather[0].icon}@2x.png`;

          // once data is fetched,hide search input
          this.hideCityInput();

          // clear cityname 
          this.cityName = null;
        }
      },
        (err) => {
          console.log('err : ', err);
          if (err.status === 404) {
            console.log('not found');
            console.log(err['cod']);
            this.dataIsFound = false;
            this.errorMsg = 'Not found search again'
          }
          else {
            this.dataIsFound = false;
            this.errorMsg = 'bad conncetion'
          }
        })
    }
  }

  // storing data on local storage particular to each panel
  public savedData(panelNo, data) {
    localStorage.setItem(`panel-${panelNo}`, JSON.stringify(data));
  }

  // getting data from local storage
  public getSavedData() {
    if (localStorage.getItem(`panel-${this.panelNo}`)) {
      return JSON.parse(localStorage.getItem(`panel-${this.panelNo}`))
    }
  }

  public removeSavedData() {
    if (localStorage.getItem(`panel-${this.panelNo}`)) {
      localStorage.removeItem(`panel-${this.panelNo}`)
    }
  }

  // fired when edit is clicked
  public editClicked() {
    // when edit is clicked,set show city input to true to make it visible
    this.showCityInput = true;
  }
}
