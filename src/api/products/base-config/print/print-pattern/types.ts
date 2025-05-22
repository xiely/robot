export interface posFormPrintPattern {
  id?: number;
  basePrintId: number;
  name: string;
  sort: number;
  status: number;
  patternUrl: string;
}

export interface itemQueryPrintPattern {
  basePrintId: number;
  size: number;
  current: number
}

export interface itemVoPrintPattern {
  basePrintId: number;
  id: number;
  name: string;
  sort: number;
  status: number;
  patternUrl: string;
  updateTime: number
  createTime: number
}
