import { Injectable } from '@angular/core';
import { IApiResponse, IApiStatusApplication } from 'src/types';
import axios from 'axios';
@Injectable({
  providedIn: 'root',
})
export class StatusApiService {
  private rest = axios.create({
    baseURL: 'http://localhost:9090/',
  });
  private ApiItems: IApiStatusApplication[] = [];
  private pendingFetch:
    | {
        callback: (items: IApiStatusApplication[]) => void;
        timeout: ReturnType<typeof setTimeout>;
      }
    | undefined = undefined;
  constructor() {}

  async fetchItems(
    onNewItemsFetched: (items: IApiStatusApplication[]) => void
  ) {
    try {
      const response = await this.rest.get<
        IApiResponse<IApiStatusApplication[]>
      >('status');

      console.log(response.data);
      if (response.data.error) {
        throw new Error(response.data.data);
      }

      onNewItemsFetched(response.data.data);
    } catch (error) {
      console.error(error);
    }

    this.pendingFetch = {
      callback: onNewItemsFetched,
      timeout: setTimeout(
        this.fetchItems.bind(this),
        6 * 60 * 1000,
        onNewItemsFetched
      ),
    };
  }

  forceFetch() {
    if (this.pendingFetch) {
      clearTimeout(this.pendingFetch.timeout);
      this.fetchItems(this.pendingFetch.callback);
    }
  }

  async createNew(
    data: Omit<IApiStatusApplication, 'id' | 'status'> & { email: string }
  ) {
    const response = await this.rest.put<IApiResponse<string>>('status', data);
    this.forceFetch();
    return response.data;
  }
}
