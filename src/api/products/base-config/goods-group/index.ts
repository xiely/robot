import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { itemVo, posForm, itemQuery } from './types';

/**
 * 查询列表
 * @param query
 * @returns {*}
 */

export const goodsGroupList = (query?: itemQuery): AxiosPromise<itemVo[]> => {
  return request({
    url: '/baseGoodGroup/listPage',
    method: 'get',
    params: query
  });
};


/**
 * 新增
 * @param data
 */
export const addGoodsGroup = (data: posForm) => {
  return request({
    url: '/baseGoodGroup/add',
    method: 'post',
    data: data
  });
};

/**
 * 修改
 * @param data
 */
export const updateGoodsGroup = (data: posForm) => {
  return request({
    url: '/baseGoodGroup/update',
    method: 'post',
    data: data
  });
};

/**
 * 删除
 * @param id
 */
export const delGoodsGroup = (id: string | number | Array<string | number>) => {
  return request({
    url: `/baseGoodGroup/${id}`,
    method: 'delete'
  });
};

