export interface posForm {
  组织名称: string[];
  收款设置: string;
  订单失败退款: boolean;
  收款账户?: string
}

export interface DeviceQuery extends PageQuery {
  组织名称: string;
}
