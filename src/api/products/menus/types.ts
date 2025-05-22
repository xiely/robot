
export interface showForm {
  id?: string;
  name: string;
  deviceSeriesIds: number[]; //设备型号(逗号分割)
  banner: string;
  tagImg: string; //点餐徽标
}
export interface posForm {
  id?: string;
  name: string;
  deviceSeriesIds: string; //设备型号(逗号分割)
  banner: string;
  tagImg: string; //点餐徽标
}

export interface itemQuery {
  name?: string;
  deviceSeriesName?: string
  size: number;
  current: number
}

export interface itemVo {
  id: string;
  name: string;
  deviceSeriesIds: string;
  deviceSeriesName: string;
  banner: string;
  tagImg: string; //点餐徽标
  updateTime: number;
  createTime: number;
}
