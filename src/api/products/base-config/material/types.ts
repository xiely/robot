export interface posForm {
  id?: string;
  name: string; //物料名称
  code: string; //物料编码
  capacity: number; //包装
  baseMaterialTypeId: number; //物料种类ID
  description: string; //描述
  status: string; //状态
  processMode: string // 参数/材料工艺
  imgUrl: string // 图片
}

export interface itemQuery {
  name?: string;
  baseMaterialTypeId?: number;
  status?: string;
  size: number;
  current: number
}

export interface itemVo {
  id: string;
  name: string;
  code: string;
  capacity: number;
  baseMaterialTypeId: number;
  description: string;
  status: string;
  processMode: string
  createTime: number;
  updateTime: number;
  imgUrl: string
  baseMaterialTypeName: string;//物料种类名称
}
