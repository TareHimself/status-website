export interface IApiStatusCheck {
  state: -1 | 0 | 1;
  latency: number;
  time: number;
}

export interface IApiStatusApplication {
  id: string;
  name: string;
  url: string;
  status: IApiStatusCheck[];
}

export type IApiResponse<T = any> =
  | {
      error: false;
      data: T;
    }
  | {
      error: true;
      data: string;
    };

const enum EApiCurrentStatus {
  ONLINE = 'Online',
  ERROR = 'Error',
  OFFLINE = 'Offline',
}

export { EApiCurrentStatus };
