export interface posForm {
  "id"?: string;
  "name": string;
  "unit": string;
  "code": string;
  "mode": number;
}

export interface itemQuery {
  "name"?: string;
  "unit"?: string;
  "code"?: string;
  "size": number;
  "current": number
}

export interface itemVo {
  id: string;
  name: string;
  unit: string;
  code: string;
  mode: number;
  modeName: string;
  createTime: number;
  updateTime: number
}
