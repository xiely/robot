import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { itemVo, posForm, itemQuery } from './types';

/**
 * 查询列表
 * @param query
 * @returns {*}
 */

export const baseGoodsList = (query?: itemQuery): AxiosPromise<itemVo[]> => {
  return request({
    url: '/baseGood/listPage',
    method: 'get',
    params: query
  });
};


/**
 * 新增
 * @param data
 */
export const addBaseGoods = (data: posForm) => {
  return request({
    url: '/baseGood/add',
    method: 'post',
    data: data
  });
};

/**
 * 修改
 * @param data
 */
export const updateBaseGoods = (data: posForm) => {
  return request({
    url: '/baseGood/update',
    method: 'post',
    data: data
  });
};

/**
 * 删除
 * @param id
 */
export const delBaseGoods = (id: string | number | Array<string | number>) => {
  return request({
    url: `/baseGood/${id}`,
    method: 'delete'
  });
};

// 复制
export const copyBaseGoods = (data: posForm) => {
  return request({
    url: '/baseGood/copy',
    method: 'post',
    data: data
  });
};

