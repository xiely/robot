import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { itemVo, posForm, itemQuery } from './types';

/**
 * 查询列表
 * @param query
 * @returns {*}
 */

export const goodsCodeList = (query?: itemQuery): AxiosPromise<itemVo[]> => {
  return request({
    url: '/baseGoodCode/listPage',
    method: 'get',
    params: query
  });
};


/**
 * 新增
 * @param data
 */
export const addGoodsCode = (data: posForm) => {
  return request({
    url: '/baseGoodCode/add',
    method: 'post',
    data: data
  });
};

/**
 * 修改
 * @param data
 */
export const updateGoodsCode = (data: posForm) => {
  return request({
    url: '/baseGoodCode/update',
    method: 'post',
    data: data
  });
};

/**
 * 删除
 * @param id
 */
export const delGoodsCode = (id: string | number | Array<string | number>) => {
  return request({
    url: `/baseGoodCode/${id}`,
    method: 'delete'
  });
};

