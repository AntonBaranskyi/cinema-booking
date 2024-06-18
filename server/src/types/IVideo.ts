export interface IVideo {
  name: string;
  key: string;
  site: string;
  size: number;
  id: string;
  type: string;
}

export interface IVideoResponse {
  results: IVideo[];
}
