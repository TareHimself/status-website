import { Component } from '@angular/core';
import { IApiStatusApplication } from 'src/types';
import { StatusApiService } from '../services/status-api.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="status-widgets-container">
      <app-status-widget
        *ngFor="let data of StatusWidgetData"
        [WidgetData]="data"
      ></app-status-widget>

    </div>
  `,
  styleUrls: ['../../scss/app.scss'],
})
export class HomeComponent {
  StatusWidgetData: IApiStatusApplication[] = [];

  constructor(private api: StatusApiService) {
    api.fetchItems().then((d) => {
      this.StatusWidgetData = d;
    });
  }
}
