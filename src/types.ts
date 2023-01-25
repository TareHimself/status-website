export interface IApiStatusCheck {
  state: 0 | 1;
  latency: number;
  time: number;
}
export interface IApiStatusApplication {
  id: string;
  name: string;
  url: string;
  status: IApiStatusCheck[];
}

export interface IApiResponse<T extends any = any> {
  success: boolean;
  data: T;
}

const enum EApiCurrentStatus {
  ONLINE = "Online",
  ERROR = "Error",
  OFFLINE = "Offline"
}

export {
  EApiCurrentStatus
}
