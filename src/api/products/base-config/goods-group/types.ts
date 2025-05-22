export interface posForm {
  id?: string;
  name: string; //名称
  code: string; //编码
  sort: number; //排序
  imgUrl: string // 图片
  appCode: number; //应用类别（1咖啡、2冰激凌、3餐食)
  description: string; //描述
  animationUrl: string; //动图
}

export interface itemQuery {
  name?: string;
  appCode?: number;
  size: number;
  current: number
}

export interface itemVo {
  id: string;
  name: string; //名称
  code: string; //编码
  sort: number; //排序
  imgUrl: string // 图片
  appCode: number; //应用类别（1咖啡、2冰激凌、3餐食)
  description: string; //描述
  animationUrl: string; //动图
  createTime: number;
  updateTime: number;
}
