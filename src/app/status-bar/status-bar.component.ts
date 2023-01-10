import { Component, Input, OnInit } from '@angular/core';
import { IApiStatusApplication } from 'src/types';

@Component({
  selector: 'app-status-bar',
  template: `
    <span
      class="status-bar"
      *ngFor="let status of status_bars"
      [attr.data-status]="status.state"
    ></span>
  `,
  styleUrls: ['../../scss/app.scss'],
})
export class StatusBarComponent implements OnInit {
  ngOnInit(): void {
    const maxBarsAmmount = 10;
    if (this.status_bars.length !== maxBarsAmmount) {
      let ammountNeeded = maxBarsAmmount - this.status_bars.length;
      if (ammountNeeded > 0) {
        for (let i = 0; i < ammountNeeded; i++) {
          this.status_bars.unshift({
            state: 1,
            latency: -1,
            time: -1,
          });
        }
      } else {
        ammountNeeded = Math.abs(ammountNeeded);
        for (let i = 0; i < ammountNeeded; i++) {
          this.status_bars.pop();
        }
      }
      console.log(ammountNeeded);
    }
  }
  @Input() status_bars: IApiStatusApplication['status'] = [];
}
