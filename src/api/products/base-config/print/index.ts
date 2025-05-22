import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { itemVo, posForm, itemQuery } from './types';

/**
 * 查询列表
 * @param query
 * @returns {*}
 */

export const printList = (query?: itemQuery): AxiosPromise<itemVo[]> => {
  return request({
    url: '/basePrint/listPage',
    method: 'get',
    params: query
  });
};


/**
 * 新增
 * @param data
 */
export const addPrint = (data: posForm) => {
  return request({
    url: '/basePrint/add',
    method: 'post',
    data: data
  });
};

/**
 * 修改
 * @param data
 */
export const updatePrint = (data: posForm) => {
  return request({
    url: '/basePrint/update',
    method: 'post',
    data: data
  });
};

/**
 * 删除
 * @param id
 */
export const delPrint = (id: string | number | Array<string | number>) => {
  return request({
    url: '/basePrint/' + id,
    method: 'delete'
  });
};

