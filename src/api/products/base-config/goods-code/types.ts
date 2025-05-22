export interface posForm {
  id?: string;
  name: string; //名称
  code: string; //编码
  appCode: number; //应用类别（1咖啡、2冰激凌、3餐食)
  taskMode: number; //任务模式
}

export interface itemQuery {
  name?: string;
  appCode?: number;
  taskMode?: number;
  code?: string;
  size: number;
  current: number
}

export interface itemVo {
  id: string;
  name: string; //名称
  code: string; //编码
  appCode: number; //应用类别（1咖啡、2冰激凌、3餐食)
  taskMode: number; //任务模式
  updateTime: number;
  createTime: number;
}
