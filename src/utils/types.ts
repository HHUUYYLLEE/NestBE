export interface shazamAPI {
  [key: string]: any;
}
export interface WsSocketMessage {
  event: string;
  data: string | object | number;
}
