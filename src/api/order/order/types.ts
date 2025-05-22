export interface DeviceForm {
  deviceName: string;
  roleKey: string;
  roleSort: number;
  status: string;
  menuCheckStrictly: boolean;
  deptCheckStrictly: boolean;
  remark: string;
  dataScope?: string;
  roleId: string | undefined;
  menuIds: Array<string | number>;
  deptIds: Array<string | number>;
}

export interface DeviceQuery extends PageQuery {
  deviceName: string;
  roleKey: string;
  status: string;
}
