export interface posForm {
  id?: string;
  name: string;
  sort: number;
  imgUrl: string;
  status: number;
}

export interface itemQuery {
  name: string;
  sort: number;
  status: number;
  size: number;
  current: number
}

export interface itemVo {
  id: string;
  name: string;
  sort: number;
  imgUrl: string;
  status: number;
  createTime: number;
  updateTime: number
}
