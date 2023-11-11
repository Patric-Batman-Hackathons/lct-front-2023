export interface ICameraStream {
  id: string;
  name: string;
  url: string;
  ip: string;
  login: string;
  password: string;
}

export type IGetStream = IAPIStream[];

export interface IAPIStream {
  uid: string;
  stream_name: string;
  creation_date: string;
  url: string;
  username: string;
  password: string;
  is_active: boolean;
}

export interface IPostStream {
  stream_name?: string;
  username: string;
  password: string;
  url: string;
}
