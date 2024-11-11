import { Component } from '@angular/core';
import { IApiStatusApplication } from 'src/types';
import { StatusApiService } from '../services/status-api.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="status-widgets-container">
      <button (click)="openCreateModal()">Add Service</button>
      <dialog id="fill-data">
        <div class="add-service-container">
          <h2>Service Info</h2>
          <input
            type="text"
            placeholder="Service Name"
            (change)="onNameChanged($event)"
          />
          <input
            type="text"
            placeholder="Email Address"
            (change)="(onEmailChanged)"
          />
          <input
            type="text"
            placeholder="Service URL"
            (change)="(onUrlChanged)"
          />
          <button (click)="createService()">Create</button>
        </div>
      </dialog>
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
  newServiceData: {
    name: string;
    email: string;
    url: string;
  } | null = null;
  constructor(private api: StatusApiService) {
    api.fetchItems((d) => (this.StatusWidgetData = d));
  }

  onNameChanged(e: Event) {
    if (this.newServiceData) {
      this.newServiceData.name = (e.target as HTMLInputElement).value;
    }
  }

  onEmailChanged(e: Event) {
    if (this.newServiceData) {
      this.newServiceData.email = (e.target as HTMLInputElement).value;
    }
  }

  onUrlChanged(e: Event) {
    if (this.newServiceData) {
      this.newServiceData.url = (e.target as HTMLInputElement).value;
    }
  }

  createService() {
    if (this.newServiceData) {
      this.api.createNew(this.newServiceData);
    }
  }

  openCreateModal() {
    const modal = document.getElementById(
      'fill-data'
    ) as HTMLDialogElement | null;
    if (!modal) return;

    modal.showModal();

    this.newServiceData = {
      name: '',
      email: '',
      url: '',
    };
  }
}
