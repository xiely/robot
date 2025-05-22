export interface imgObj {
  name: string;
  url: string
}
export interface posForm {
  id?: string;
  name: string,
  price: number; //售价
  remark: string; // 备注
  status: number; // 状态
  appCode: number; //应用类别(1咖啡、2冰激凌、3餐食)
  goodImg: imgObj[];
  iconImg: imgObj[];
  outCode: string; // 外部代码
  timeout: number; //制作超时（秒）
  coverImg: imgObj[];
  smallImg: imgObj[];
  taskMode: number; // 任务模式
  description: string;
  animationUrl: imgObj[];
  baseGoodCodeId: number; // 餐品码表
  baseGoodGroupId: number; //餐品分组
  originalPrice: number; // 原价
}

export interface posFormCopy {
  id: number;
  name: string;
  description: string;
  originName: string;
  originDescription?: string
}

export interface itemQuery {
  name: string;
  code: number;
  taskMode: number;
  appCode: number; //应用类别(1咖啡、2冰激凌、3餐食)
  status: number; // 状态
  baseGoodGroupId: string;
  size: number;
  current: number
}

export interface itemVo {
  id: string;
  name: string,
  price: number; //价格
  remark: string; // 备注
  status: number; // 状态
  appCode: number; //应用类别(1咖啡、2冰激凌、3餐食)
  goodImg: imgObj[];
  iconImg: imgObj[];
  outCode: string; // 外部代码
  timeout: number; //制作超时（秒）
  coverImg: imgObj[];
  smallImg: imgObj[];
  taskMode: number;
  description: string;
  animationUrl: imgObj[];
  baseGoodCodeId: number; // 餐品码表
  baseGoodGroupId: number; //餐品分组
  originalPrice: number; // 原价
  updateTime: number
}
