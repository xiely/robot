export interface posForm {
  id?: number;
  quantity: number; // 数量
  baseGoodId: number; //要配置的餐品ID
  processMode: string; // 参数
  baseMaterialId: number; // 物料ID
  baseMaterialTypeId: number; //所属物料种类
  unit: string; // 物料种类单位
}

export interface itemQuery {
  id: string;
  size: number;
  current: number
}


export interface itemVo {
  id: number;
  quantity: number; // 数量
  baseGoodId: number; //要配置的餐品
  processMode: string; // 参数
  baseMaterialName: string; // 物料名称
  baseMaterialTypeId: number; //所属物料种类
  baseMaterialTypeName: string
}
