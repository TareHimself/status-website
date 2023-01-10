import { Component, Input, OnInit } from '@angular/core';
import { IApiStatusApplication } from 'src/types';

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
      <span class="latency-avg" ><p>{{ this.latency_averaged }}ms</p></span>
    </div>
    <app-status-bar [status_bars]="WidgetData.status"></app-status-bar>
  `,
  styleUrls: ['../../scss/app.scss'],
})
export class StatusWidgetComponent implements OnInit {
  latency_averaged: number = 0
  ngOnInit(): void {
    this.latency_averaged = this.WidgetData.status.reduce((total, current) => {
      return total + Math.max(current.latency, 0)
    }, 0) / this.WidgetData.status.length
  }

  @Input() WidgetData: IApiStatusApplication = {
    id: '',
    name: '',
    url: '',
    status: [],
  };
}
