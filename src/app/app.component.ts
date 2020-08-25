import { Component } from '@angular/core';
import {AppService} from './app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mini-weatherApp';

  public panelExpanded:boolean=false;

  public notifyMsg:string;

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

    // check for panel expanded status from local storage 
    if(this.getSavedPanelExpanded())
    {
      console.log('yes ',this.getSavedPanelExpanded());
      this.panelExpanded = this.getSavedPanelExpanded()
    }

    if(this.getPanelsData())
    {
      this.panels = this.getPanelsData()
    }
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

    this.savePanelsData(this.panels);

  }

  // fired when expand panel btn is clicked
  public expandPanel()
  {
    this.panelExpanded=!this.panelExpanded;

    // store on local storage panel status
    this.savePanelExpanded(this.panelExpanded);
  }

  /**Local storage related to panelExpanded */

  // local storage to save current status of panelExpanded
  public savePanelExpanded(panelExpanded)
  {
    localStorage.setItem('panelExpanded',panelExpanded)
  }

  public getSavedPanelExpanded()
  {
    if(localStorage.getItem('panelExpanded'))
    {
      return JSON.parse(localStorage.getItem('panelExpanded'));
    }
  }

  /** Local storage related to isPanelShown to store and retrieve each panel's status */

  // save panels custom data
  public savePanelsData(panels)
  {
    localStorage.setItem('panels',JSON.stringify(panels));
  }

  //retrieve panels data
  public getPanelsData()
  {
    if(localStorage.getItem('panels'))
    {
      return JSON.parse(localStorage.getItem('panels'))
    }
  }

  public clearStorage()
  {
    console.log(localStorage.length)
    if(localStorage.length>0)
    {
      console.log('greater than 0 : ',localStorage.length);
      localStorage.clear();
      this.notifyMsg="data cleared";
      this.removeNotification();

      // make all panel is data shown to false
      this.panels.forEach((panel)=>
      {
        panel.isDataShown = false;
      })

      
    }
    else
    {
      this.notifyMsg="no data to clear";
      this.removeNotification()
    }
    localStorage.clear()
  }

  // remove notification after 1.5 second
  public removeNotification()
  {
    setTimeout(()=>
    {
      this.notifyMsg=null;
    },1500)
  }

}
