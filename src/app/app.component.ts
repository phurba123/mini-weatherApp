import { Component } from '@angular/core';
import {AppService} from './app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mini-weatherApp';

  // custom weather panel data for manipulation of views 
  public panels=[
    {
      id:1,
      isDataShown:false
    },
    {
      id:2,
      isDataShown:false
    },
    {
      id:3,
      isDataShown:false
    },
    {
      id:4,
      isDataShown:false
    },
    {
      id:5,
      isDataShown:false
    },
    {
      id:6,
      isDataShown:false
    },
    {
      id:7,
      isDataShown:false
    },
    {
      id:8,
      isDataShown:false
    },
    {
      id:9,
      isDataShown:false
    }
  ];

  // 

  constructor(private app:AppService){}

  ngOnInit()
  {
    // this.app.getWeatherData('sikkim').subscribe((res)=>
    // {
    //   console.log(res)
    // })
  }

  //fired when any panel is clicked
  public panelClicked(id)
  {
    console.log(id);

    this.panels.forEach((value)=>
    {
      if(value.id === id)
      {
        console.log('inside for loop')
        // on clicking any panel ,set its isDataShown to true,to make app-view component visible with ngIf
        if(!value.isDataShown)
        {
          value.isDataShown=true;
        }
      }
    })
  }
}
