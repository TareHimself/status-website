import { Injectable } from '@angular/core';
import { IApiResponse, IApiStatusApplication } from 'src/types';
import axios from 'axios';
@Injectable({
  providedIn: 'root',
})
export class StatusApiService {
  private ApiItems: IApiStatusApplication[] = [];
  constructor() { }

  async fetchItems() {
    try {
      const response = await axios.get<IApiResponse<IApiStatusApplication[]>>('https://status-api.oyintare.dev/status/')
      if (response.data.success) {
        this.ApiItems = response.data.data
      }
    } catch (error) {

    }
    return this.ApiItems;
  }
}
