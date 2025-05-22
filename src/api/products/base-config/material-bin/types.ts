export interface posForm {
  id?: string;
  name: string; //名称
  code: string; //料仓编码
  unit: string; //单位
  baseMaterialTypeId: number; //物料种类ID
  status: number; //状态
  capacity: number; //总容量
  countWay: number; // 计量方式
  videoUrl: string;// 视频地址
  alertThreshold: number; //警告阈值
  stopThreshold: number; // 停止阈值
  imgUrl: string // 图片
}

export interface itemQuery {
  name: string;
  baseMaterialTypeId: number;
  alertThreshold: number;
  status: number,
  size: number;
  current: number
}

export interface itemVo {
  id: string;
  name: string; //名称
  code: string; //编码
  unit: string; //单位
  baseMaterialTypeId: number; //物料种类ID
  status: number; //状态
  capacity: number; //总容量
  countWay: number; // 计量方式
  videoUrl: string;// 视频地址
  alertThreshold: number; //警告阈值
  stopThreshold: number; // 停止阈值
  imgUrl: string // 图片
  updateTime: number;
  createTime: number
}
