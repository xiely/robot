export interface posForm {
  组织名称: string[];
  名称: string;
  渠道: string;
  商户号: number;
  终端号: number;
}

export interface DeviceQuery extends PageQuery {
  组织名称: string;
}
