import { Component, Input, OnInit } from '@angular/core';
import { EApiCurrentStatus, IApiStatusApplication, IApiStatusCheck } from 'src/types';

@Component({
  selector: 'app-status-widget',
  styles: [`
  p{
    margin: 0 0;
    font-size: 13px;
  }
  h3{
    font-size: 15px;
  }
  `],
  template: `
    <div class="status-row">
      <h3>{{ WidgetData.name }}</h3>
      <span class="latency-avg" ><p>{{ this.api_status }}</p></span>
    </div>
    <app-status-bar [status_bars]="this.status"></app-status-bar>
  `,
  styleUrls: ['../../scss/app.scss'],
})
export class StatusWidgetComponent implements OnInit {
  api_status: EApiCurrentStatus = EApiCurrentStatus.ONLINE
  status: IApiStatusCheck[] = []
  ngOnInit(): void {
    this.status = [...this.WidgetData.status].reverse()
    if (this.WidgetData.status[0].latency == -1) {
      this.api_status = EApiCurrentStatus.OFFLINE
    }
    else if (this.WidgetData.status[0].state == 0) {
      this.api_status = EApiCurrentStatus.ERROR;
    }
    else {
      this.api_status = EApiCurrentStatus.ONLINE;
    }
  }

  @Input() WidgetData: IApiStatusApplication = {
    id: '',
    name: '',
    url: '',
    status: [],
  };
}
