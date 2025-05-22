import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { itemVoPrintPattern, posFormPrintPattern, itemQueryPrintPattern } from './types';

/**
 * 查询列表
 * @param query
 * @returns {*}
 */

export const printPatternList = (query?: itemQueryPrintPattern): AxiosPromise<itemVoPrintPattern[]> => {
  return request({
    url: `/basePrintPattern/listPage`,
    method: 'get',
    params: query
  });
};


/**
 * 新增
 * @param data
 */
export const addPrintPattern = (data: posFormPrintPattern) => {
  return request({
    url: '/basePrintPattern/add',
    method: 'post',
    data: data
  });
};

/**
 * 修改
 * @param data
 */
export const updatePrintPattern = (data: posFormPrintPattern) => {
  return request({
    url: '/basePrintPattern/update',
    method: 'post',
    data: data
  });
};

/**
 * 删除
 * @param id
 */
export const delPrintPattern = (id: string | number | Array<string | number>) => {
  return request({
    url: '/basePrintPattern/' + id,
    method: 'delete'
  });
};

